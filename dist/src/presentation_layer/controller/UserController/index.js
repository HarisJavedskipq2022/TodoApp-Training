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
const UserUtility_1 = __importDefault(require("../../../services/UserUtility"));
const userService = new UserUtility_1.default();
class UserControllerInstance {
    constructor() { }
    readUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield userService.readUsers();
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
                const deletedUser = yield userService.deleteUserById(id);
                return res.json({ user: deletedUser });
            }
            catch (e) {
                return res.json({
                    msg: "User not found",
                });
            }
        });
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const newUser = yield userService.signUp(email, password);
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
                const token = yield userService.loginUser(email, password);
                console.log({ token });
                res.json({ msg: "successfully logged in" });
                console.log({ token });
            }
            catch (e) {
                res.status(401).json({ error: "invalid credentials" });
            }
        });
    }
}
exports.default = new UserControllerInstance();
