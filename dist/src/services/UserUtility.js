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
const UserEntity_1 = require("../infrastructure/domain/entity/UserEntity");
const uuid_1 = __importDefault(require("../utils/uuid"));
require("dotenv/config");
const bcrypt_1 = require("./bcrypt");
const UserRepository_1 = __importDefault(require("../infrastructure/repositories/UserRepository"));
// import {inject, injectable} from "inversify";
const userRepository = new UserRepository_1.default();
class UserService {
    constructor() {
    }
    readUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userRepository.findManyUsers();
            }
            catch (e) {
                throw new Error('Users not found');
            }
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findUserbyId(id);
            if (!user) {
                throw new Error('User does not exist');
            }
            return userRepository.deleteUser(id);
        });
    }
    signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = uuid_1.default.generate();
            const newUserData = { id, email, password };
            const finduser = yield userRepository.findUserByEmail(newUserData.email);
            if (finduser) {
                throw new Error("User already exists");
            }
            const createdUser = UserEntity_1.User.userFactory(newUserData);
            const hashedPassword = yield bcrypt_1.Auth.hashPassword(createdUser.password);
            return userRepository.createUser(createdUser, hashedPassword);
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const validatePassword = yield bcrypt_1.Auth.comparePassword(password, user.password);
            if (!validatePassword) {
                throw new Error('Invalid credentials');
            }
            const secretKey = process.env.JWT_SECRET_KEY;
            return bcrypt_1.Auth.sign({ id: user.id, email: user.email }, secretKey);
        });
    }
}
exports.default = UserService;
