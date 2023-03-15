"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const route_1 = __importDefault(require("./presentation_layer/route"));
const connection_1 = require("./utils/connection");
const port = process.env.PORT;
const app = (0, express_1.default)();
(0, connection_1.connectionToDb)();
app.use(express_1.default.json());
app.use('/api/v1/todo/', route_1.default);
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
