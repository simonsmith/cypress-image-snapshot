before(() => {
  cy.visit('http://localhost:9001')
})

it('matches snapshot with defaults', () => {
  cy.matchImageSnapshot()
})
