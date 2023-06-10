beforeEach(() => {
  cy.visit('http://localhost:9001')
  cy.viewport('macbook-16')
})

it('some other test taking a snapshot', () => {
  cy.matchImageSnapshot()
})
