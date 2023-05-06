import extend from 'just-extend'
import {MATCH, RECORD} from './constants'
import type {
  CypressImageSnapshotOptions,
  DiffSnapshotResult,
  SnapshotOptions,
  Subject,
} from './types'

export const addImageSnapshotCommand = () => {
  Cypress.Commands.add(
    'matchImageSnapshot',
    {
      prevSubject: ['optional', 'element', 'document', 'window'],
    },
    matchImageSnapshot,
  )
}

const COMMAND_NAME = 'cypress-image-snapshot'

const screenshotsFolder =
  Cypress.config('screenshotsFolder') || 'cypress/screenshots'
const isUpdateSnapshots: boolean = Cypress.env('updateSnapshots') || false
const isRequireSnapshots: boolean = Cypress.env('requireSnapshots') || false
const isSnapshotDebug: boolean = Cypress.env('debugSnapshots') || false

const defaultOptions: SnapshotOptions = {
  screenshotsFolder,
  isUpdateSnapshots,
  isSnapshotDebug,
  specFileName: Cypress.spec.name,
  failureThreshold: 0,
  failureThresholdType: 'pixel',
}

const matchImageSnapshot = (
  subject: Subject,
  nameOrCommandOptions: CypressImageSnapshotOptions | string,
  commandOptions?: CypressImageSnapshotOptions,
) => {
  // access the env here so that it can be overridden in tests
  const isFailOnSnapshotDiff: boolean =
    typeof Cypress.env('failOnSnapshotDiff') === 'undefined' || false

  const {filename, options} = getNameAndOptions(
    nameOrCommandOptions,
    commandOptions,
  )

  const elementToScreenshot = cy.wrap(subject)
  cy.task(MATCH, options)

  const screenshotName = getScreenshotFilename(filename)
  elementToScreenshot.screenshot(screenshotName, options)

  return cy.task<DiffSnapshotResult>(RECORD).then((snapshotResult) => {
    const {
      added,
      pass,
      updated,
      imageDimensions,
      diffPixelCount,
      diffRatio,
      diffSize,
      diffOutputPath,
    } = snapshotResult

    if (added && isRequireSnapshots) {
      throw new Error(`New snapshot ${screenshotName} was added, but 'requireSnapshots' was set to true.
            This is likely because this test was run in a CI environment in which snapshots should already be committed.`)
    }

    if (!pass && !added && !updated) {
      const message = diffSize
        ? `Image size (${imageDimensions.baselineWidth}x${imageDimensions.baselineHeight}) different than saved snapshot size (${imageDimensions.receivedWidth}x${imageDimensions.receivedHeight}).\nSee diff for details: ${diffOutputPath}`
        : `Image was ${
            diffRatio * 100
          }% different from saved snapshot with ${diffPixelCount} different pixels.\nSee diff for details: ${diffOutputPath}`

      if (isFailOnSnapshotDiff) {
        throw new Error(message)
      } else {
        Cypress.log({name: COMMAND_NAME, message})
      }
    }
  })
}

const getNameAndOptions = (
  nameOrCommandOptions: CypressImageSnapshotOptions | string,
  commandOptions?: CypressImageSnapshotOptions,
) => {
  let filename: string | undefined
  let options = extend({}, defaultOptions) as SnapshotOptions
  if (typeof nameOrCommandOptions === 'string' && commandOptions) {
    filename = nameOrCommandOptions
    options = extend({}, defaultOptions, commandOptions) as SnapshotOptions
  }
  if (typeof nameOrCommandOptions === 'string') {
    filename = nameOrCommandOptions
  }
  if (typeof nameOrCommandOptions === 'object') {
    options = extend(
      {},
      defaultOptions,
      nameOrCommandOptions,
    ) as SnapshotOptions
  }
  return {
    filename,
    options,
  }
}

const getScreenshotFilename = (filename: string | undefined) => {
  if (filename) {
    return filename
  }
  return Cypress.currentTest.titlePath.join(' -- ')
}
