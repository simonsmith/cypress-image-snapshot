import type {UserConfig} from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => message.includes('chore(release):')],
}

export default config
