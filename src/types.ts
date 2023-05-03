import type {MatchImageSnapshotOptions} from 'jest-image-snapshot'

declare global {
  namespace Cypress {
    interface Chainable {
      matchImageSnapshot(options?: SnapshotOptions): Chainable
    }
  }
}

type CypressScreenshotOptions = Partial<Cypress.ScreenshotOptions>

export type SnapshotOptions = {
  foo?: string
  cypressScreenshotOptions?: CypressScreenshotOptions
  jestImageSnapshotOptions?: MatchImageSnapshotOptions
}

export type Subject =
  | void
  | Document
  | Window
  | Cypress.JQueryWithSelector<HTMLElement>
