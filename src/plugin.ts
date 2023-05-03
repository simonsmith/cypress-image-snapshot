/**
 * @type {Cypress.PluginConfig}
 */
export const addImageSnapshotPlugin = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  on('after:screenshot', runImageDiffAfterScreenshot)
}

const runImageDiffAfterScreenshot = (
  screenshotConfig: Cypress.ScreenshotDetails,
) => {
  console.log(screenshotConfig)
}
