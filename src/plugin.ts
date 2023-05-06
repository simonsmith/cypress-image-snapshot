import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'
import {diffImageToSnapshot} from 'jest-image-snapshot/src/diff-snapshot'
import {MATCH} from './constants'
import type {DiffSnapshotResult, SnapshotOptions} from './types'

/**
 * @type {Cypress.PluginConfig}
 */
export const addImageSnapshotPlugin = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  on('after:screenshot', runImageDiffAfterScreenshot)
  on('task', {
    [MATCH]: setOptions,
  })
}

let options = {} as SnapshotOptions

const setOptions = (commandOptions: SnapshotOptions) => {
  options = commandOptions
  return null
}

const PNG_EXT = '.png'
const SNAP_EXT = `.snap${PNG_EXT}`
const DIFF_EXT = `.diff${PNG_EXT}`
const DEFAULT_DIFF_DIR = '__diff_output__'

let snapshotResult = {} as DiffSnapshotResult

const runImageDiffAfterScreenshot = async (
  screenshotConfig: Cypress.ScreenshotDetails,
) => {
  const {path: screenshotPath} = screenshotConfig

  // name of the screenshot without the Cypress suffixes for test failures
  const snapshotName = screenshotConfig.name.replace(/ \(attempt [0-9]+\)/, '')

  const receivedImageBuffer = await fs.readFile(screenshotPath)
  await fs.rm(screenshotPath)

  const {customSnapshotsDir, customDiffDir} = options.jestImageSnapshotOptions
  const {specFileName, screenshotsFolder, isUpdateSnapshots} = options

  const snapshotsDir = customSnapshotsDir
    ? path.join(process.cwd(), customSnapshotsDir, specFileName)
    : path.join(screenshotsFolder, '..', 'snapshots', specFileName)

  const snapshotNameFullPath = path.join(
    snapshotsDir,
    `${snapshotName}${PNG_EXT}`,
  )
  const snapshotDotPath = path.join(snapshotsDir, `${snapshotName}${SNAP_EXT}`)

  const diffDir = customDiffDir
    ? path.join(process.cwd(), customDiffDir, specFileName)
    : path.join(snapshotsDir, DEFAULT_DIFF_DIR)

  const diffDotPath = path.join(diffDir, `${snapshotName}${DIFF_EXT}`)

  log('options', options)
  log('paths', {
    screenshotPath,
    snapshotsDir,
    diffDir,
    diffDotPath,
    specFileName,
    snapshotName,
    snapshotNameFullPath,
    snapshotDotPath,
  })

  const isExist = await pathExists(snapshotDotPath)
  if (isExist) {
    log(`copy snapshotDotPath to snapshotIdentifierPath...`)
    await fs.copyFile(snapshotDotPath, snapshotNameFullPath)
  }

  snapshotResult = diffImageToSnapshot({
    ...options.jestImageSnapshotOptions,
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

    log('copy diffOutputPath to diffDotPath')
    await fs.copyFile(diffOutputPath, diffDotPath)

    log('remove diffOutputPath')
    await fs.rm(diffOutputPath)

    log('remove snapshotIdentifierPath')
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

  log('copy snapshotIdentifierPath to snapshotDotPath')
  await fs.copyFile(snapshotNameFullPath, snapshotDotPath)

  log('remove snapshotIdentifierPath')
  await fs.rm(snapshotNameFullPath)

  snapshotResult.diffOutputPath = snapshotDotPath

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
  if (options.isSnapshotDebug) {
    console.log(chalk.blueBright.bold('matchImageSnapshot: '), ...message)
  }
}
