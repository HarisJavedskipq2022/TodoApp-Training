import { Command, CommandBus, CommandHandler } from '@tshio/command-bus'

class TestHandler implements CommandHandler<Command<string>> {
  public commandType: string = 'test-type'

  async execute(command: Command<string>) {
    return `handler-message ${command.payload}`
  }
}

const bus = new CommandBus([new TestHandler()])

const testCommand: Command<string> = {
  payload: 'payload-data',
  type: 'test-type',
}

const result = bus.execute(testCommand)

console.log(result)
