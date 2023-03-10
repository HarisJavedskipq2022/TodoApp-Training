"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const user_1 = require("../entity/user");
class UserFactory {
    static create({ id, email, password }) {
        return new user_1.User(id, password, email);
    }
}
exports.UserFactory = UserFactory;
