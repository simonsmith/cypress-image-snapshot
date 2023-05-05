import type {MatchImageSnapshotOptions} from 'jest-image-snapshot'

declare global {
  namespace Cypress {
    interface Chainable {
      matchImageSnapshot(nameOrOptions?: SnapshotOptions | string): Chainable
      matchImageSnapshot(name: string, options: SnapshotOptions): Chainable
    }
  }
}

type CypressScreenshotOptions = Partial<Cypress.ScreenshotOptions>

export type SnapshotOptions = {
  screenshotsFolder: string
  isUpdateSnapshots: boolean
  isRequireSnapshots: boolean
  isFailOnSnapshotDiff: boolean
  specFileRelativeToRoot: string
  cypressScreenshotOptions?: CypressScreenshotOptions
  jestImageSnapshotOptions?: MatchImageSnapshotOptions
}

export type Subject =
  | void
  | Document
  | Window
  | Cypress.JQueryWithSelector<HTMLElement>
