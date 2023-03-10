import {Model, DataTypes} from 'sequelize';
import db from '../../config/database.config';
import { User } from '../../interfaces/User';


export class UserTableInstance extends Model<User> {
  password: any;
  id: any;
  email: any;
}

UserTableInstance.init(
{
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    
    
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

},

{
    sequelize: db,
    tableName: 'usertable'
}

)