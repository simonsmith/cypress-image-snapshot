describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io').matchImageSnapshot()
    cy.matchImageSnapshot({
      jestImageSnapshotOptions: {
        failureThreshold: 100,
      },
    })
    cy.matchImageSnapshot('spec name')
    cy.matchImageSnapshot('filename', {
      jestImageSnapshotOptions: {
        failureThreshold: 1,
      },
    })
  })
})
