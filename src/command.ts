import type {SnapshotOptions, Subject} from './types'

const screenshotsFolder = Cypress.config('screenshotsFolder')
const isUpdateSnapshots: boolean = Cypress.env('updateSnapshots') || false
const isRequireSnapshots: boolean = Cypress.env('requireSnapshots') || false
const isFailOnSnapshotDiff: boolean = Cypress.env('failOnSnapshotDiff') || false

export const matchImageSnapshot = (
  subject: Subject,
  options?: SnapshotOptions,
) => {
  cy.wrap(subject).then(($sub) => {
    console.log($sub)
  })
  return cy.wrap(subject)
}
