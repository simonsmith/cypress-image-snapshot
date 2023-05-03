import {defineConfig} from 'cypress'
import {addImageSnapshotPlugin} from './dist/plugin'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      addImageSnapshotPlugin(on, config)
    },
  },
})
