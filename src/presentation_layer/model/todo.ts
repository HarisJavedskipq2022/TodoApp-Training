import {Model, DataTypes} from 'sequelize';
import db from '../../config/database.config';
import { TodoAttributes } from '../../interfaces/Attributes';

export class TodoInstance extends Model<TodoAttributes> {}

TodoInstance.init(
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
}

)