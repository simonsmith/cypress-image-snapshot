import {defineConfig} from 'cypress'
import {addMatchImageSnapshotPlugin} from './src'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)
    },
  },
})
