export interface ICommand {}

export interface ICommandHandler {
  handle(command: ICommand): Promise<any>
}
