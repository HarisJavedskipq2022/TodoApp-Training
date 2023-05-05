import { Signale } from 'signale'

const customOptions = {
  disabled: false,
  interactive: false,
  scope: 'UserController',
  types: {
    error: {
      badge: '!!',
      color: 'red',
      label: 'Error',
    },
    info: {
      badge: 'ℹ',
      color: 'blue',
      label: 'Info',
    },
    warn: {
      badge: '⚠',
      color: 'yellow',
      label: 'Warning',
    },
    debug: {
      badge: '🐛',
      color: 'cyan',
      label: 'Debug',
    },
  },
}

export class Logger {
  private signale: Signale

  constructor(scope: string) {
    this.signale = new Signale({ ...customOptions, scope })
  }

  error(error: any): void {
    this.signale.error(error)
  }

  info(message: string): void {
    this.signale.info(message)
  }

  warn(message: string): void {
    this.signale.warn(message)
  }

  debug(message: string): void {
    this.signale.debug(message)
  }
}
