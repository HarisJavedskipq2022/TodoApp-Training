"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuid = void 0;
const uuid_1 = require("uuid");
class uuid {
    generate() {
        return (0, uuid_1.v4)();
    }
}
exports.uuid = uuid;
exports.default = new uuid();
