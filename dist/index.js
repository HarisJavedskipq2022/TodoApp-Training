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
const program = new commander_1.Command();
// const port: number = program.port;
const app = (0, express_1.default)();
app.use(express_1.default.json());
const a = program.parse(process.argv);
const port = Number(a.args[0]) || process.env.PORT;
app.use('/api/v1/todo/', route_1.default);
program.option('-p, --port <number>', 'port number');
// const logger = program.option('-p, --port <number>', 'port number');
// console.log({logger})
// program.parse(process.argv);
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
