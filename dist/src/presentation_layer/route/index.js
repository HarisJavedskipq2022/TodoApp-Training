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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../validator"));
const ValidationError_1 = __importDefault(require("../../middleware/ValidationError"));
const controller = __importStar(require("../controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/create', auth_1.default.authorize, validator_1.default.checkCreateTodo(), ValidationError_1.default.handleValidationError, controller.createTodo);
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/read', auth_1.default.authorize, validator_1.default.checkReadTodo(), ValidationError_1.default.handleValidationError, controller.readPagination);
router.get('/getusers', auth_1.default.authorize, controller.readUsers);
router.get('/read/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller.readById);
router.put('/update/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller.updateCompleted);
router.put('/updatetodo/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller.updateTodo);
router.delete('/delete/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller.deleteTodo);
router.delete('/deleteuser/:id', auth_1.default.authorize, controller.deleteUser);
exports.default = router;
