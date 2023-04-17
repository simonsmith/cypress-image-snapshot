describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io').matchImageSnapshot()
    cy.visit('https://example.cypress.io')
      .get('body')
      .matchImageSnapshot({foo: 'test'})
  })
})
