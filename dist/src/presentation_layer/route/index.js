"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../validator"));
const ValidationError_1 = __importDefault(require("../../middleware/ValidationError"));
const controller_1 = __importDefault(require("../controller"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/create', auth_1.default.authorize, validator_1.default.checkCreateTodo(), ValidationError_1.default.handleValidationError, controller_1.default.createTodos);
router.post('/signup', controller_1.default.signup);
router.post('/login', controller_1.default.login);
router.get('/readusers', 
// authMiddleware.authorize,
validator_1.default.checkReadTodo(), ValidationError_1.default.handleValidationError, controller_1.default.readUsers);
router.get('/read', auth_1.default.authorize, controller_1.default.readTodos);
router.get('/read/:id', 
// authMiddleware.authorize,
validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller_1.default.readById);
router.put('/update/:id', 
// authMiddleware.authorize,
validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller_1.default.update);
router.delete('/deletetodo/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller_1.default.deleteTodoById);
router.delete('/deleteuser/:id', auth_1.default.authorize, controller_1.default.deleteUsers);
exports.default = router;
