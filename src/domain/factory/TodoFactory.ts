import { Model, DataTypes, Sequelize } from 'sequelize';
import { Todo } from '../entity/todo';

export class TodoFactory {
  static createModel(sequelize: Sequelize): typeof Model {
    return sequelize.define<Model>('todos', {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  }

  static createTodo(data: {id: string, title: string; completed: boolean }): Todo {
    const {id, title, completed } = data;
    return new Todo(id, title, completed);
  }
}