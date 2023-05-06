import extend from 'just-extend'
import {MATCH} from './constants'
import type {SnapshotOptions, Subject} from './types'

export const addImageSnapshotCommand = () => {
  Cypress.Commands.add(
    'matchImageSnapshot',
    {
      prevSubject: ['optional', 'element', 'document', 'window'],
    },
    matchImageSnapshot,
  )
}

const screenshotsFolder =
  Cypress.config('screenshotsFolder') || 'cypress/screenshots'
const isUpdateSnapshots: boolean = Cypress.env('updateSnapshots') || false
const isRequireSnapshots: boolean = Cypress.env('requireSnapshots') || false
const isSnapshotDebug: boolean = Cypress.env('debugSnapshots') || false
const isFailOnSnapshotDiff: boolean =
  typeof Cypress.env('failOnSnapshotDiff') === 'undefined'

const defaultOptions: SnapshotOptions = {
  screenshotsFolder,
  isUpdateSnapshots,
  isRequireSnapshots,
  isFailOnSnapshotDiff,
  isSnapshotDebug,
  specFileName: Cypress.spec.name,
  jestImageSnapshotOptions: {
    failureThreshold: 0,
    failureThresholdType: 'pixel',
  },
  cypressScreenshotOptions: {},
}

const matchImageSnapshot = (
  subject: Subject,
  nameOrCommandOptions: SnapshotOptions | string,
  commandOptions?: SnapshotOptions,
) => {
  const {filename, options} = getNameAndOptions(
    nameOrCommandOptions,
    commandOptions,
  )

  const elementToScreenshot = cy.wrap(subject)
  cy.task(MATCH, options)

  elementToScreenshot.screenshot(
    getScreenshotFilename(filename),
    options.cypressScreenshotOptions,
  )

  return elementToScreenshot
}

const getNameAndOptions = (
  nameOrCommandOptions: SnapshotOptions | string,
  commandOptions?: SnapshotOptions,
) => {
  let filename: string | undefined
  let options = extend({}, defaultOptions) as SnapshotOptions
  if (typeof nameOrCommandOptions === 'string' && commandOptions) {
    filename = nameOrCommandOptions
    options = extend(
      true,
      {},
      defaultOptions,
      commandOptions,
    ) as SnapshotOptions
  }
  if (typeof nameOrCommandOptions === 'string') {
    filename = nameOrCommandOptions
  }
  if (typeof nameOrCommandOptions === 'object') {
    options = extend(
      true,
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
