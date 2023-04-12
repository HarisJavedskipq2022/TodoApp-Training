import { ICommand, ICommandHandler } from './CommandInterface'
import { injectable, multiInject, optional } from 'inversify'

@injectable()
export class CommandBus {
  private handlers: Map<string, ICommandHandler> = new Map()

  constructor(@multiInject('CommandHandler') @optional() handlers?: ICommandHandler[]) {
    handlers?.forEach((handler) => {
      this.register(handler.constructor.name.replace('Handler', 'Command'), handler)
    })
  }

  register(commandName: string, handler: ICommandHandler) {
    this.handlers.set(commandName, handler)
  }

  async execute(command: ICommand): Promise<any> {
    const handler = this.handlers.get(command.constructor.name)

    if (!handler) {
      throw new Error(`No handler found for ${command.constructor.name}`)
    }
    return handler.handle(command)
  }
}
