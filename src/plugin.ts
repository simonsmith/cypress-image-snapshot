import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'
import {diffImageToSnapshot} from 'jest-image-snapshot/src/diff-snapshot'
import {MATCH, RECORD, RM} from './constants'
import type {DiffSnapshotResult, SnapshotOptions} from './types'

/**
 * Add this function in `setupNodeEvents` inside cypress.config.ts
 *
 * Required
 * @type {Cypress.PluginConfig}
 */
export const addMatchImageSnapshotPlugin = (on: Cypress.PluginEvents) => {
  on('after:screenshot', runImageDiffAfterScreenshot)
  on('task', {
    [MATCH]: setOptions,
    [RECORD]: getSnapshotResult,
    [RM]: removeSnapshot,
  })
}

// prevent the plugin running for general screenshots that aren't
// triggered by `matchImageSnapshot`
let isSnapshotActive = false

let options = {} as SnapshotOptions
const setOptions = (commandOptions: SnapshotOptions) => {
  isSnapshotActive = true
  options = commandOptions
  return null
}

const PNG_EXT = '.png'
const DEFAULT_DIFF_DIR = '__diff_output__'

let snapshotResult = {} as DiffSnapshotResult
const getSnapshotResult = () => {
  isSnapshotActive = false
  return snapshotResult
}

const removeSnapshot = async (path: string) => {
  await fs.rm(path)
  return null
}

const runImageDiffAfterScreenshot = async (
  screenshotConfig: Cypress.ScreenshotDetails,
) => {
  const {path: screenshotPath} = screenshotConfig
  if (!isSnapshotActive) {
    return {path: screenshotPath}
  }

  const receivedImageBuffer = await fs.readFile(screenshotPath)
  if (options.isDeleteScreenshot) {
    await fs.rm(screenshotPath)
  }

  const {
    currentTestTitle,
    screenshotsFolder,
    isUpdateSnapshots,
    customSnapshotsDir,
    specFileRelativeToRoot,
    customDiffDir,
    e2eSpecDir,
    snapFilenameExtension,
    diffFilenameExtension,
  } = options

  let snapshotName = path.basename(screenshotConfig.path, PNG_EXT)

  let cleanedScreenshotPath = screenshotConfig.path

  // In open mode it's an empty string so its skipped.
  if (screenshotConfig.specName) {
    // remove specName here because in run mode it's added and duplicated.
    cleanedScreenshotPath = cleanedScreenshotPath.replace(
      path.normalize(screenshotConfig.specName),
      '',
    )
  }

  // remove the screenshots path and just leave folders to be created in
  // the snapshots folder
  cleanedScreenshotPath = cleanedScreenshotPath.replace(screenshotsFolder, '')

  const dirName = path.dirname(cleanedScreenshotPath)

  snapshotName = path
    .join(dirName, snapshotName)
    .replace(/ \(attempt [0-9]+\)/, '')

  log('snapshotName', snapshotName)
  log('screenshotConfig', screenshotConfig)

  const specDestination = specFileRelativeToRoot.replace(
    path.normalize(e2eSpecDir),
    '',
  )

  const snapshotsDir = customSnapshotsDir
    ? path.join(process.cwd(), customSnapshotsDir, specDestination)
    : path.join(screenshotsFolder, '..', 'snapshots', specDestination)

  const snapshotNameFullPath = path.join(
    snapshotsDir,
    `${snapshotName}${PNG_EXT}`,
  )
  const snapshotDotPath = path.join(
    snapshotsDir,
    `${snapshotName}${snapFilenameExtension}${PNG_EXT}`,
  )

  const diffDir = customDiffDir
    ? path.join(process.cwd(), customDiffDir, specFileRelativeToRoot)
    : path.join(snapshotsDir, DEFAULT_DIFF_DIR)

  const diffDotPath = path.join(
    diffDir,
    `${snapshotName}${diffFilenameExtension}${PNG_EXT}`,
  )

  logTestName(currentTestTitle)
  log('options', options)
  log('paths', {
    screenshotPath,
    snapshotsDir,
    diffDir,
    diffDotPath,
    snapshotName,
    snapshotNameFullPath,
    snapshotDotPath,
  })

  const isExist = await pathExists(snapshotDotPath)
  if (isExist) {
    await fs.copyFile(snapshotDotPath, snapshotNameFullPath)
  }

  snapshotResult = diffImageToSnapshot({
    ...options,
    snapshotsDir,
    diffDir,
    receivedImageBuffer,
    snapshotIdentifier: snapshotName,
    updateSnapshot: isUpdateSnapshots,
  })
  log(
    'result from diffImageToSnapshot',
    (() => {
      const {imgSrcString, ...rest} = snapshotResult
      return rest
    })(),
  )

  const {pass, added, updated, diffOutputPath} = snapshotResult

  if (!pass && !added && !updated) {
    log('image did not match')

    await fs.copyFile(diffOutputPath, diffDotPath)
    await fs.rm(diffOutputPath)
    await fs.rm(snapshotNameFullPath)

    snapshotResult.diffOutputPath = diffDotPath

    log(`screenshot write to ${diffDotPath}...`)
    return {
      path: diffDotPath,
    }
  }

  if (pass) {
    log('snapshot matches')
  }
  if (added) {
    log('new snapshot generated')
  }
  if (updated) {
    log('snapshot updated with new version')
  }

  await fs.copyFile(snapshotNameFullPath, snapshotDotPath)

  // don't remove if the paths are the same, this can happen
  // if the user passes empty string for snapFilenameExtension
  if (snapshotNameFullPath !== snapshotDotPath) {
    await fs.rm(snapshotNameFullPath)
  }

  snapshotResult.diffOutputPath = snapshotDotPath
  log(snapshotResult)

  log('screenshot write to snapshotDotPath')
  return {
    path: snapshotDotPath,
  }
}

async function pathExists(path: string) {
  try {
    await fs.stat(path)
    return true
  } catch {
    return false
  }
}

const log = (...message: any) => {
  // eslint-disable-line
  if (options.isSnapshotDebug) {
    console.log(chalk.blueBright.bold('matchImageSnapshot: '), ...message)
  }
}

const logTestName = (name: string) => {
  log(chalk.yellow.bold(name))
}
