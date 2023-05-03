import type {SnapshotOptions, Subject} from './types'
import extend from 'just-extend'

const screenshotsFolder = Cypress.config('screenshotsFolder')
const isUpdateSnapshots: boolean = Cypress.env('updateSnapshots') || false
const isRequireSnapshots: boolean = Cypress.env('requireSnapshots') || false
const isFailOnSnapshotDiff: boolean = Cypress.env('failOnSnapshotDiff') || false

const defaultOptions: SnapshotOptions = {
  jestImageSnapshotOptions: {
    failureThreshold: 0.1,
  },
}

export const matchImageSnapshot = (
  subject: Subject,
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
  return cy.wrap(subject)
}
