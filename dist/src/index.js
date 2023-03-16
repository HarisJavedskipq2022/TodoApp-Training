"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
(0, connection_1.connectionToDb)();
app.use(express_1.default.json());
app.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, completed } = req.body;
    try {
        const todo = yield prisma.todo.create({
            data: { task, completed },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create todo" });
    }
}));
app.use('/api/v1/todo/', route_1.default);
app.listen(port, () => {
    console.log({ port });
    console.log(`app is listening on port ${port}`);
});
