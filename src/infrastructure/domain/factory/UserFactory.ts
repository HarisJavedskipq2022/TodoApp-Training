import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from '../entity/user';

export class UserFactory {
  static createModel(sequelize: Sequelize) {
    return sequelize.define<Model>('usertable', {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  }

  static createUser(data: { id: string, name: string; email: string }): User {
    const { id, name, email } = data;
    return new User(id, name, email);
  }
}