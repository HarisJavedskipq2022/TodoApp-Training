"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserEntity_1 = require("../infrastructure/domain/entity/UserEntity");
const uuid_1 = __importDefault(require("../utils/uuid"));
require("dotenv/config");
const bcrypt_1 = require("./bcrypt");
const UserRepository_1 = __importDefault(require("../infrastructure/repositories/UserRepository"));
const inversify_1 = require("inversify");
// const userRepository = new UserRepository();
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    readUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findManyUsers();
            }
            catch (e) {
                throw new Error('Users not found');
            }
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserbyId(id);
            if (!user) {
                throw new Error('User does not exist');
            }
            return this.userRepository.deleteUser(id);
        });
    }
    signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = uuid_1.default.generate();
            const newUserData = { id, email, password };
            const finduser = yield this.userRepository.findUserByEmail(newUserData.email);
            if (finduser) {
                throw new Error("User already exists");
            }
            const createdUser = UserEntity_1.User.userFactory(newUserData);
            const hashedPassword = yield bcrypt_1.Auth.hashPassword(createdUser.password);
            return this.userRepository.createUser(createdUser, hashedPassword);
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserByEmail(email);
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
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('UserRepository')),
    __metadata("design:paramtypes", [UserRepository_1.default])
], UserService);
exports.default = UserService;
