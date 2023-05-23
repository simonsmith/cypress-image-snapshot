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
      openMode: 3,
      runMode: 3,
    },
  },
  () => {
    it('logs out the error when image is different', () => {
      cy.get('.feature-v20').invoke('remove')
      cy.matchImageSnapshot()
    })
  },
)
