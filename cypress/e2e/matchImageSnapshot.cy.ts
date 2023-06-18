beforeEach(() => {
  cy.visit('http://localhost:9001')
  cy.viewport('macbook-16')
})

it('no arguments', () => {
  cy.matchImageSnapshot()
})

it('name and selector', () => {
  cy.get('body').matchImageSnapshot('with custom name')
})

// next two tests use blackout to change
// the snapshot image. Also validates options
it('name and options', () => {
  cy.matchImageSnapshot('name and options', {
    blackout: ['.feature-v20'],
  })
})

it('matches with just options', () => {
  cy.matchImageSnapshot({
    blackout: ['.card-v14'],
  })
})

/**
 * this test actually fails but we ignore it
 * Ensures that:
 * - pipeline still passes
 * - failOnSnapshotDiff `false` works
 * - that images are output to the `__diff_output__` dir
 **/
describe(
  'fail when image different',
  {
    env: {
      failOnSnapshotDiff: false,
    },
    retries: {
      openMode: 0,
      runMode: 3,
    },
  },
  () => {
    const isInteractive = Cypress.config('isInteractive')
    const pathPrefix = isInteractive
      ? `./cypress/snapshots/${Cypress.browser.name}/open`
      : `./cypress/snapshots/${Cypress.browser.name}`
    const pathSuffix = `/cypress/e2e/matchImageSnapshot.cy.ts/__diff_output__/fail when image different -- logs out the error when image is different.diff.png`

    it('logs out the error when image is different', () => {
      cy.get('.feature-v20').invoke('remove')
      cy.matchImageSnapshot()
      cy.readFile(pathPrefix + pathSuffix).should('exist')
    })
  },
)
