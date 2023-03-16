import { Model, DataTypes } from 'sequelize';
import { User } from '../entity/UserEntity';
import db from '../../../config/database.config';

export class UserModel extends Model<User> {
  password: string | undefined;
  id: string | undefined;
  email: string | undefined;
}
   
    UserModel.init(
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
        },
      },
      {
        sequelize: db,
        tableName: 'usertable'
      },
    );
