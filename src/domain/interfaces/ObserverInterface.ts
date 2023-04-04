export interface IObserver {
    update(id: string, completed: boolean): void;
}