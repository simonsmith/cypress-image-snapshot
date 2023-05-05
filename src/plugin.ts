import type {SnapshotOptions} from './types'

/**
 * @type {Cypress.PluginConfig}
 */
export const addImageSnapshotPlugin = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  on('after:screenshot', runImageDiffAfterScreenshot)
  on('task', {
    matchImageSnapshotOptions: setOptions,
  })
}

let options = {} as SnapshotOptions

const setOptions = (commandOptions: SnapshotOptions) => {
  options = commandOptions
  return null
}

const runImageDiffAfterScreenshot = (
  screenshotConfig: Cypress.ScreenshotDetails,
) => {
  console.log(screenshotConfig)
}
