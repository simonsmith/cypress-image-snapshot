import {defineConfig} from 'cypress'
import {addMatchImageSnapshotPlugin} from './dist/plugin'

export default defineConfig({
  allowCypressEnv: false,
  expose: {
    updateSnapshots: process.env.CYPRESS_updateSnapshots === 'true',
    debugSnapshots: process.env.CYPRESS_debugSnapshots === 'true',
  },
  e2e: {
    video: false,
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on)
    },
  },
})
