"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
require("dotenv/config");
const route_1 = __importDefault(require("./presentation_layer/route"));
database_config_1.default.sync().then(() => {
    console.log("database is connected");
});
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/todo/', route_1.default);
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
