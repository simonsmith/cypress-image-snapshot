import {addMatchImageSnapshotCommand} from '../../dist/command'

const path = Cypress.config('isInteractive')
  ? `cypress/snapshots/${Cypress.browser.name}/open`
  : `cypress/snapshots/${Cypress.browser.name}`

addMatchImageSnapshotCommand({
  customSnapshotsDir: path,
})
