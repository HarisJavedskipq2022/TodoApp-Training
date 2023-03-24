import express from 'express';
import TodoValidator from '../validator'
import Middleware from '../../middleware/ValidationError';
import TodoController from '../controller/TodoController';
import UserController from '../controller/UserController';
import authMiddleware from '../../middleware/auth';
// import {container} from "../../../inversify.config";

const router = express.Router();

// const controller = container.get<ControllerInstance>(ControllerInstance)

router.post(
    '/create',
    // authMiddleware.authorize,
    TodoValidator.checkCreateTodo(),
    Middleware.handleValidationError,
    TodoController.createTodos
);

router.post(
    '/createfaker',
    TodoController.createTodosFaker
)

router.post(
    '/signup',
    UserController.signup
)

router.post(
    '/login',
    UserController.login
)

router.get(
    '/readusers',
    // authMiddleware.authorize,
    TodoValidator.checkReadTodo(),
    Middleware.handleValidationError,
    UserController.readUsers
);

router.get(
    '/read',
    // authMiddleware.authorize,
    TodoController.readTodos
)

router.get(
    '/read/:id',
    // authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    TodoController.readById
);

router.put(
    '/update/:id',
    // authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    TodoController.update
);


router.delete(
    '/deletetodo/:id',
    authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    TodoController.deleteTodoById
);

router.delete(
    '/deleteuser/:id',
    authMiddleware.authorize,
    UserController.deleteUsers
)

export default router;