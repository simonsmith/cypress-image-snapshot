declare global {
  namespace Cypress {
    interface Chainable {
      matchImageSnapshot(
        options?: AddMatchImageSnapshotCommandOptions,
      ): Chainable
    }
  }
}

type AddMatchImageSnapshotCommandOptions = {
  foo?: string
}

type Subject =
  | void
  | Document
  | Window
  | Cypress.JQueryWithSelector<HTMLElement>

const matchImageSnapshot = (
  subject: Subject,
  options?: AddMatchImageSnapshotCommandOptions,
) => {
  console.log('subject', subject)
  return cy.wrap(subject)
}

export const addMatchImageSnapshotCommand = () => {
  Cypress.Commands.add(
    'matchImageSnapshot',
    {
      prevSubject: ['optional', 'element', 'document', 'window'],
    },
    matchImageSnapshot,
  )
}
