import {defineConfig} from 'cypress'
import {addImageSnapshotPlugin} from './dist/plugin'

export default defineConfig({
  e2e: {
    video: false,
    setupNodeEvents(on) {
      addImageSnapshotPlugin(on)
    },
  },
})
