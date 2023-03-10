import express from 'express';
import TodoValidator from '../validator'
import Middleware from '../../middleware/ValidationError';
import TodoController from '../controller';
import authMiddleware from '../../middleware/auth';

const router = express.Router();

router.post(
	'/create',
	authMiddleware.authorize,
	TodoValidator.checkCreateTodo(),
	Middleware.handleValidationError,
	TodoController.create
);

router.post(
	'/signup',
	TodoController.signup
)

router.post(
	'/login',
	TodoController.login
)

router.get(
	'/read',
	authMiddleware.authorize,
	TodoValidator.checkReadTodo(),
	Middleware.handleValidationError,
	TodoController.readPagination
);

router.get(
	'/getusers',
	authMiddleware.authorize,
	TodoController.readUsers
)

router.get(
	'/read/:id',
	authMiddleware.authorize,
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	TodoController.readByID
);

router.put(
	'/update/:id',
	authMiddleware.authorize,
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	TodoController.update
);

router.put(
	'/updatetodo/:id',
	authMiddleware.authorize,
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	TodoController.updateTodo
);

router.delete(
	'/delete/:id',
	authMiddleware.authorize,
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	TodoController.delete
);

router.delete(
	'/deleteuser/:id',
	authMiddleware.authorize,
	TodoController.deleteUsers
)

export default router;