"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../validator"));
const ValidationError_1 = __importDefault(require("../../middleware/ValidationError"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const TodoController_1 = __importDefault(require("../controller/TodoController"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const inversify_config_1 = require("../../../inversify.config");
const router = express_1.default.Router();
const todoController = inversify_config_1.container.get(TodoController_1.default);
const userController = inversify_config_1.container.get(UserController_1.default);
router.post('/create', auth_1.default.authorize, validator_1.default.checkCreateTodo(), ValidationError_1.default.handleValidationError, todoController.createTodos);
router.post('/createfaker', todoController.createTodosFaker);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/getusers', auth_1.default.authorize, validator_1.default.checkReadTodo(), ValidationError_1.default.handleValidationError, userController.readUsers);
router.get('/read', 
// authMiddleware.authorize,
todoController.readTodos);
router.get('/read/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, todoController.readById);
router.put('/update/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, todoController.update);
router.delete('/deletetodo/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, todoController.deleteTodoById);
router.delete('/deleteuser/:id', auth_1.default.authorize, userController.deleteUsers);
exports.default = router;
