declare module 'jest-image-snapshot/src/diff-snapshot' {
  import type {DiffSnapshotResult, DiffSnapshotOptions} from './src/types'
  export function diffImageToSnapshot(
    options: DiffSnapshotOptions,
  ): DiffSnapshotResult
}
