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

  // Add other log levels as needed (info, warn, debug, etc.)
}
