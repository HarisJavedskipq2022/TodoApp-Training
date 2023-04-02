"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const route_1 = __importDefault(require("./src/presentation_layer/route"));
const commander_1 = require("commander");
const connection_1 = require("./src/utils/connection");
const program = new commander_1.Command();
const app = (0, express_1.default)();
(0, connection_1.connectionToDb)();
app.use(express_1.default.json());
const a = program.parse(process.argv);
const port = Number(a.args[0]) || process.env.PORT;
app.use('/api/v1/todo/', route_1.default);
program.option('-p, --port <number>', 'port number');
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
