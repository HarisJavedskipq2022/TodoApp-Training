"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const uuid_1 = require("uuid");
const todo_1 = require("../model/todo");
const usertable_1 = require("../model/usertable");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
class TodoController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            try {
                const record = yield todo_1.TodoInstance.create(Object.assign(Object.assign({}, req.body), { id }));
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
    readPagination(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.query.limit || 10;
                const offset = req.query.offset;
                const records = yield todo_1.TodoInstance.findAll({ where: {}, limit, offset });
                return res.json(records);
            }
            catch (e) {
                return res.json({
                    msg: "failed to read todo",
                    status: 500,
                    route: "/read",
                });
            }
        });
    }
    readByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield todo_1.TodoInstance.findOne({ where: { id } });
                return res.json(record);
            }
            catch (e) {
                return res.json({
                    msg: "failed to read todo",
                    status: 500,
                    route: "/read/:id",
                });
            }
        });
    }
    readUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield usertable_1.UserTableInstance.findAll({});
                return res.json(record);
            }
            catch (e) {
                return res.json({
                    msg: "users not found",
                    status: 500,
                    route: "/getusers",
                });
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield usertable_1.UserTableInstance.findOne({ where: { id } });
            if (!user) {
                return res.json({ msg: "user does not exist" });
            }
            const deleteUser = yield user.destroy();
            return res.json({ user: deleteUser });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield todo_1.TodoInstance.findOne({ where: { id } });
                if (!record) {
                    return res.json({ msg: "record not found" });
                }
                const updatedRecord = yield record.update({
                    completed: !record.getDataValue("completed"),
                });
                return res.json({ record: updatedRecord });
            }
            catch (e) {
                return res.json({
                    msg: "fail to read",
                    status: 500,
                    route: "/update/:id",
                });
            }
        });
    }
    updateTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield todo_1.TodoInstance.findOne({ where: { id } });
                if (!record) {
                    return res.json({ msg: "record not found" });
                }
                const updatedRecord = yield record.update({ title: "focus on the training" }, { where: { title: "drive a car" } });
                return res.json({ record: updatedRecord });
            }
            catch (e) {
                return res.json({
                    msg: "failed to update",
                    status: 500,
                    route: "/update/:id",
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield todo_1.TodoInstance.findOne({ where: { id } });
                if (!record) {
                    return res.json({ msg: "record does not exist" });
                }
                const deletedRecord = yield record.destroy();
                return res.json({ record: deletedRecord });
            }
            catch (e) {
                return res.json({
                    msg: "fail to read",
                    status: 500,
                    route: "/delete/:id",
                });
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const { email, password } = req.body;
            const user = yield usertable_1.UserTableInstance.findOne({ where: { email: email } });
            if (user) {
                return res.json({ msg: "user already exists" });
            }
            const saltrounds = 10;
            const salt = yield bcrypt.genSalt(saltrounds);
            const hashedpassword = yield bcrypt.hash(password, salt);
            const newUser = yield usertable_1.UserTableInstance.create({
                email: email,
                password: hashedpassword,
                id,
            });
            return res.json({ newUser, msg: "user successfully signed up" });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield usertable_1.UserTableInstance.findOne({ where: { email: email } });
            if (!user) {
                return res.json({ msg: "Invalid credentials" });
            }
            try {
                const validatePassword = yield bcrypt.compare(password, user.password);
                if (!validatePassword) {
                    res.send({ msg: "invalid credentials" });
                }
                const secretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign({ id: user.id, email: user.email }, secretKey);
                res.send({ msg: token });
            }
            catch (e) {
                res.status(500).send();
            }
        });
    }
}
exports.default = new TodoController();
