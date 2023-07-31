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

it('file name should ignore directories', () => {
  cy.get('h1').matchImageSnapshot('../../../ignore-relative-dirs')
  cy.get('h1').matchImageSnapshot('ignore/folders/image')
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
