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
  isSnapshotDebug: boolean
  specFileName: string
  cypressScreenshotOptions: CypressScreenshotOptions
  jestImageSnapshotOptions: MatchImageSnapshotOptions
}

export type Subject =
  | void
  | Document
  | Window
  | Cypress.JQueryWithSelector<HTMLElement>

export type DiffSnapshotResult = {
  added?: boolean
  receivedSnapshotPath?: string
  updated?: boolean
  imgSrcString: string
  imageDimensions: {
    baselineHeight: number
    baselineWidth: number
    receivedWidth: number
    receivedHeight: number
  }
  pass: boolean
  diffSize: boolean
  diffOutputPath: string
  diffRatio: number
  diffPixelCount: number
}

export type DiffSnapshotOptions = {
  receivedImageBuffer: Buffer
  snapshotIdentifier: string
  snapshotsDir: string
  storeReceivedOnFailure?: boolean
  receivedDir?: string
  diffDir?: string
  updateSnapshot?: boolean
  updatePassedSnapshot?: boolean
  customDiffConfig?: Record<string, unknown>
} & Pick<
  MatchImageSnapshotOptions,
  | 'comparisonMethod'
  | 'blur'
  | 'allowSizeMismatch'
  | 'diffDirection'
  | 'onlyDiff'
  | 'failureThreshold'
  | 'failureThresholdType'
>
