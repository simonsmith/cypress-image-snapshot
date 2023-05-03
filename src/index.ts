import {runImageDiffAfterScreenshot} from './task'
import {matchImageSnapshot} from './command'

/**
 * @type {Cypress.PluginConfig}
 */
export const addMatchImageSnapshotPlugin = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  on('after:screenshot', runImageDiffAfterScreenshot)
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
