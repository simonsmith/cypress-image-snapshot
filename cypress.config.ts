import {defineConfig} from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        simon(arg) {
          return Promise.resolve(arg).then((res) => {
            return res
          })
        },
      })
    },
  },
})
