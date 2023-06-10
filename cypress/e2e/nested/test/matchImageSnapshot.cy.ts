beforeEach(() => {
  cy.visit('http://localhost:9001')
  cy.viewport('macbook-16')
})

it('takes a snapshot of the page', () => {
  cy.matchImageSnapshot()
})
