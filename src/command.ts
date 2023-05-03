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

const defaultOptions: SnapshotOptions = {
  jestImageSnapshotOptions: {
    failureThreshold: 0.1,
  },
}

const screenshotsFolder = Cypress.config('screenshotsFolder')
const isUpdateSnapshots: boolean = Cypress.env('updateSnapshots') || false
const isRequireSnapshots: boolean = Cypress.env('requireSnapshots') || false
const isFailOnSnapshotDiff: boolean = Cypress.env('failOnSnapshotDiff') || false

const matchImageSnapshot = (
  subject: Subject,
  nameOrCommandOptions: SnapshotOptions | string,
  commandOptions?: SnapshotOptions,
) => {
  const {fileName, options} = getNameAndOptions(
    nameOrCommandOptions,
    commandOptions,
  )
  console.log(fileName, options)
  return cy.wrap(subject)
}

const getNameAndOptions = (
  nameOrCommandOptions: SnapshotOptions | string,
  commandOptions?: SnapshotOptions,
) => {
  let fileName: string | undefined
  let options: SnapshotOptions = extend({}, defaultOptions)
  if (typeof nameOrCommandOptions === 'string' && commandOptions) {
    fileName = nameOrCommandOptions
    options = extend(true, {}, defaultOptions, commandOptions)
  }
  if (typeof nameOrCommandOptions === 'string') {
    fileName = nameOrCommandOptions
  }
  if (typeof nameOrCommandOptions === 'object') {
    options = extend(true, {}, defaultOptions, nameOrCommandOptions)
  }
  return {
    fileName,
    options,
  }
}
