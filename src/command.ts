import type {SnapshotOptions, Subject} from './types'
import extend from 'just-extend'

export const addImageSnapshotCommand = () => {
  Cypress.Commands.add(
    'matchImageSnapshot',
    {
      prevSubject: ['optional', 'element', 'document', 'window'],
    },
    matchImageSnapshot,
  )
}

const screenshotsFolder = Cypress.config('screenshotsFolder')
const isUpdateSnapshots: boolean = Cypress.env('updateSnapshots') || false
const isRequireSnapshots: boolean = Cypress.env('requireSnapshots') || false
const isFailOnSnapshotDiff: boolean = Cypress.env('failOnSnapshotDiff') || false

const defaultOptions: SnapshotOptions = {
  jestImageSnapshotOptions: {
    failureThreshold: 0.1,
  },
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
  let options: SnapshotOptions = extend({}, defaultOptions)
  if (typeof nameOrCommandOptions === 'string' && commandOptions) {
    filename = nameOrCommandOptions
    options = extend(true, {}, defaultOptions, commandOptions)
  }
  if (typeof nameOrCommandOptions === 'string') {
    filename = nameOrCommandOptions
  }
  if (typeof nameOrCommandOptions === 'object') {
    options = extend(true, {}, defaultOptions, nameOrCommandOptions)
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
