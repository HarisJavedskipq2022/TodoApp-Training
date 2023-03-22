import express from 'express';
import TodoValidator from '../validator'
import Middleware from '../../middleware/ValidationError';
import ControllerInstance from "../controller";
import authMiddleware from '../../middleware/auth';
import {container} from "../../inversify.config";

const router = express.Router();

const controller = container.get<ControllerInstance>(ControllerInstance)

router.post(
    '/create',
    authMiddleware.authorize,
    TodoValidator.checkCreateTodo(),
    Middleware.handleValidationError,
    controller.createTodos
);

router.post(
    '/signup',
    controller.signup
)

router.post(
    '/login',
    controller.login
)

router.get(
    '/readusers',
    // authMiddleware.authorize,
    TodoValidator.checkReadTodo(),
    Middleware.handleValidationError,
    controller.readUsers
);

router.get(
    '/read',
    authMiddleware.authorize,
    controller.readTodos
)

router.get(
    '/read/:id',
    // authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    controller.readById
);

router.put(
    '/update/:id',
    // authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    controller.update
);


router.delete(
    '/deletetodo/:id',
    authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    controller.deleteTodoById
);

router.delete(
    '/deleteuser/:id',
    authMiddleware.authorize,
    controller.deleteUsers
)

export default router;