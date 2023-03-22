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
const inversify_config_1 = require("../../inversify.config");
const router = express_1.default.Router();
const controller = inversify_config_1.container.get(controller_1.default);
router.post('/create', auth_1.default.authorize, validator_1.default.checkCreateTodo(), ValidationError_1.default.handleValidationError, controller.createTodos);
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/readusers', 
// authMiddleware.authorize,
validator_1.default.checkReadTodo(), ValidationError_1.default.handleValidationError, controller.readUsers);
router.get('/read', auth_1.default.authorize, controller.readTodos);
router.get('/read/:id', 
// authMiddleware.authorize,
validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller.readById);
router.put('/update/:id', 
// authMiddleware.authorize,
validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller.update);
router.delete('/deletetodo/:id', auth_1.default.authorize, validator_1.default.checkIdParam(), ValidationError_1.default.handleValidationError, controller.deleteTodoById);
router.delete('/deleteuser/:id', auth_1.default.authorize, controller.deleteUsers);
exports.default = router;
