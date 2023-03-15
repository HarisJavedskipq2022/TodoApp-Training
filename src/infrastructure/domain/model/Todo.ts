import { Model, DataTypes } from 'sequelize';
import { Todo } from '../entity/todo';
import db from '../../../config/database.config';

export class TodoModel extends Model<Todo> {}
     TodoModel.init(
      {
        id : {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
    
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
     {
        sequelize: db,
        tableName: 'todos'
      },
    );