describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io').matchImageSnapshot()
    cy.get('body').matchImageSnapshot({foo: 'test'})
  })
})
