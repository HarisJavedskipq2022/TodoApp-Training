"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
function generateTodo() {
    return {
        id: faker_1.faker.datatype.uuid(),
        title: faker_1.faker.animal.cat(),
        completed: faker_1.faker.datatype.boolean(),
    };
}
exports.default = generateTodo;
