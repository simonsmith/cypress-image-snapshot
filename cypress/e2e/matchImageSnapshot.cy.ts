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

describe(
  `fail when new image added with 'requireSnapshots'`,
  {
    env: {
      requireSnapshots: true,
      failOnSnapshotDiff: false,
    },
  },
  () => {
    it('logs out error when new image is added', () => {
      cy.matchImageSnapshot('requireSnapshots env value')
    })
  },
)
