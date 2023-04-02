"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
    static userFactory(data) {
        const { id, email, password } = data;
        return new User(id, email, password);
    }
}
exports.User = User;
