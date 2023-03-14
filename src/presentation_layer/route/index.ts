import express from 'express';
import TodoValidator from '../validator'
import Middleware from '../../middleware/ValidationError';
import * as controller from '../controller';
import authMiddleware from '../../middleware/auth';


const router = express.Router();

router.post(
	'/create',
	authMiddleware.authorize,
	TodoValidator.checkCreateTodo(),
	Middleware.handleValidationError,
	controller.createTodo
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
	'/read',
	authMiddleware.authorize,
	TodoValidator.checkReadTodo(),
	Middleware.handleValidationError,
	controller.readPagination
);

router.get(
	'/getusers',
	authMiddleware.authorize,
	controller.readUsers
)

router.get(
	'/read/:id',
	authMiddleware.authorize,
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	controller.readById
);

router.put(
	'/update/:id',
	authMiddleware.authorize,
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	controller.updateCompleted
);

// router.put(
// 	'/updatetodo/:id',
// 	authMiddleware.authorize,
// 	TodoValidator.checkIdParam(),
// 	Middleware.handleValidationError,
// 	controller.updateTodo
// );

router.delete(
	'/delete/:id',
	authMiddleware.authorize,
	TodoValidator.checkIdParam(),
	Middleware.handleValidationError,
	controller.deleteTodo
);

router.delete(
	'/deleteuser/:id',
	authMiddleware.authorize,
	controller.deleteUser
)

export default router;