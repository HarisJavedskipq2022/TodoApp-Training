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
const TodoUtility_1 = __importDefault(require("../../services/TodoUtility"));
class ControllerInstance {
    createTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, completed } = req.body;
            try {
                const record = yield TodoUtility_1.default.createTodoItem(title, completed);
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
                const records = yield TodoUtility_1.default.findAllTodos(limit, offset);
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
                const record = yield TodoUtility_1.default.readById(id);
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
    readUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield TodoUtility_1.default.readUsers();
                return res.json(record);
            }
            catch (e) {
                return res.status(500).json({
                    msg: "unable to read users",
                    route: '/getusers',
                });
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedUser = yield TodoUtility_1.default.deleteUserById(id);
                return res.json({ user: deletedUser });
            }
            catch (e) {
                return res.json({
                    msg: "User not found",
                });
            }
        });
    }
    deleteTodoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedRecord = yield TodoUtility_1.default.deleteTodoById(id);
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
                const updatedRecord = yield TodoUtility_1.default.updateById(id);
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
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const newUser = yield TodoUtility_1.default.signUp(email, password);
                console.log({ newUser });
                return res.json({ newUser, msg: 'User successfully signed up' });
            }
            catch (error) {
                return res.status(400).json({ error: "user already exists" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield TodoUtility_1.default.loginUser(email, password);
                res.json({ msg: "successfully logged in" });
                console.log({ token });
            }
            catch (e) {
                res.status(401).json({ error: "invalid credentials" });
            }
        });
    }
}
exports.default = new ControllerInstance();
