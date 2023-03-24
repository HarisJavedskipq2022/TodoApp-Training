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
const TodoUtility_1 = __importDefault(require("../../../services/TodoUtility"));
// import {inject, injectable} from "inversify";
const todoService = new TodoUtility_1.default();
class TodoControllerInstance {
    constructor() {
    }
    createTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, completed } = req.body;
            try {
                const record = yield todoService.createTodoItem(title, completed);
                return res.json({ record, msg: "Successfully created todo" });
            }
            catch (e) {
                return res.json({
                    msg: "failed to create todo",
                    status: 500,
                    route: "/create",
                });
            }
        });
    }
    createTodosFaker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield todoService.createTodoFaker();
                return res.json({ record, msg: "Successfully created todo" });
            }
            catch (e) {
                return res.json({
                    msg: "failed to create todo",
                    status: 500,
                    route: "/create",
                });
            }
        });
    }
    readTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.query.limit || 10;
                const offset = req.query.offset;
                const records = yield todoService.findAllTodos(limit, offset);
                return res.json(records);
            }
            catch (e) {
                return res.json({
                    msg: 'failed to read todo',
                    status: 500,
                    route: '/read',
                });
            }
        });
    }
    readById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield todoService.readById(id);
                return res.json(record);
            }
            catch (e) {
                return res.status(500).json({
                    msg: "failed to get todo by Id",
                    route: '/read/:id',
                });
            }
        });
    }
    deleteTodoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedRecord = yield todoService.deleteTodoById(id);
                return res.json({ record: deletedRecord });
            }
            catch (e) {
                return res.status(500).json({
                    msg: "fail to read Todo",
                    route: '/delete/:id',
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedRecord = yield todoService.updateById(id);
                return res.json({ record: updatedRecord });
            }
            catch (e) {
                return res.status(500).json({
                    msg: "todo not found",
                    route: '/update/:id',
                });
            }
        });
    }
}
exports.default = new TodoControllerInstance();
