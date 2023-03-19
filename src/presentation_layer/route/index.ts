import express from 'express';
import TodoValidator from '../validator'
import Middleware from '../../middleware/ValidationError';
import ControllerInstance from "../controller";
import authMiddleware from '../../middleware/auth';


const router = express.Router();

router.post(
    '/create',
    authMiddleware.authorize,
    TodoValidator.checkCreateTodo(),
    Middleware.handleValidationError,
    ControllerInstance.createTodos
);

router.post(
    '/signup',
    ControllerInstance.signup
)

router.post(
    '/login',
    ControllerInstance.login
)

router.get(
    '/readusers',
    // authMiddleware.authorize,
    TodoValidator.checkReadTodo(),
    Middleware.handleValidationError,
    ControllerInstance.readUsers
);

router.get(
    '/read',
    authMiddleware.authorize,
    ControllerInstance.readTodos
)

router.get(
    '/read/:id',
    // authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    ControllerInstance.readById
);

router.put(
    '/update/:id',
    // authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    ControllerInstance.update
);


router.delete(
    '/deletetodo/:id',
    authMiddleware.authorize,
    TodoValidator.checkIdParam(),
    Middleware.handleValidationError,
    ControllerInstance.deleteTodoById
);

router.delete(
    '/deleteuser/:id',
    authMiddleware.authorize,
    ControllerInstance.deleteUsers
)

export default router;