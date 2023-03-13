"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoFactory = void 0;
const sequelize_1 = require("sequelize");
const todo_1 = require("../entity/todo");
class TodoFactory {
    static createModel(sequelize) {
        return sequelize.define('todos', {
            id: {
                type: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            completed: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        });
    }
    static createTodo(data) {
        const { id, title, completed } = data;
        return new todo_1.Todo(id, title, completed);
    }
}
exports.TodoFactory = TodoFactory;
