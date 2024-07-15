beforeEach(() => {
  cy.visit('http://localhost:9001')
  cy.viewport('macbook-16')
})

it('no arguments', () => {
  cy.matchImageSnapshot()
})

it('works without element but with options passed', () => {
  cy.matchImageSnapshot('without-element', {
    blackout: ['.card-v14'],
  })
})

it('name and selector', () => {
  cy.get('body').matchImageSnapshot('with custom name')
})

it('file name should ignore relative directories', () => {
  cy.get('h1').matchImageSnapshot('../../../ignore-relative-dirs')
})

it('allows folders to be created within snapshots dir', () => {
  cy.get('h1').matchImageSnapshot('dir/subdir/image')
})

it('allows .snap extension to be changed', () => {
  cy.get('body').matchImageSnapshot('snap-ext', {
    snapFilenameExtension: '.custom-snap-name',
  })
  cy.readFile(
    './cypress/snapshots/matchImageSnapshot.cy.ts/snap-ext.custom-snap-name.png',
  ).should('exist')

  cy.get('body').matchImageSnapshot('no-ext', {
    snapFilenameExtension: '',
  })
  cy.readFile('./cypress/snapshots/matchImageSnapshot.cy.ts/no-ext.png').should(
    'exist',
  )
})

it('allows screenshot to not be deleted', () => {
  cy.get('body').matchImageSnapshot('no-delete', {
    isDeleteScreenshot: false,
  })

  cy.readFile(
    './cypress/screenshots/matchImageSnapshot.cy.ts/no-delete.png',
  ).should('exist')
})

it('allows screenshot to not be deleted default', () => {
  cy.get('body').matchImageSnapshot('no-delete-default')

  cy.readFile(
    './cypress/screenshots/matchImageSnapshot.cy.ts/no-delete-default.png',
  ).should('not.exist')
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
