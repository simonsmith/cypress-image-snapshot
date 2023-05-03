import {defineConfig} from 'cypress'
import {addMatchImageSnapshotPlugin} from './dist'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)
    },
  },
})
