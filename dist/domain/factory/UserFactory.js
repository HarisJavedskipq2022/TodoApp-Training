"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("../entity/user");
class UserFactory {
    static createModel(sequelize) {
        return sequelize.define('usertable', {
            id: {
                type: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        });
    }
    static createUser(data) {
        const { id, name, email } = data;
        return new user_1.User(id, name, email);
    }
}
exports.UserFactory = UserFactory;
