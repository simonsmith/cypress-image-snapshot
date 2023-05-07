import {defineConfig} from 'cypress'
import {addMatchImageSnapshotPlugin} from './dist/plugin'

export default defineConfig({
  e2e: {
    video: false,
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on)
    },
  },
})
