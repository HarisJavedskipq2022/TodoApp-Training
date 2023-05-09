import { body, param, query } from 'express-validator'

class TodoValidator {
  checkCreateTodo() {
    return [
      body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
      body('title').notEmpty().withMessage('The title value is empty, it should not be empty but a string'),
      body('completed')
        .optional()
        .isBoolean()
        .withMessage('Incorrect value, the value should be a boolean')
        .isIn([0, false])
        .withMessage('The value should be 0 or false'),
    ]
  }
  checkReadTodo() {
    return [
      query('limit')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('The limit value should be number and between 1-10'),
      query('offset').optional().isNumeric().withMessage('The value should be number'),
    ]
  }
  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('The value should be not empty')
        .isUUID(4)
        .withMessage('The value should be uuid v4'),
    ]
  }

  checkUser() {
    return [
      body('id').optional().isUUID(4).withMessage('The value should be UUID v4'),
      body('email')
        .notEmpty()
        .withMessage('The email value is empty, it should not be empty')
        .isEmail()
        .withMessage('Invalid email format'),
      body('password')
        .notEmpty()
        .withMessage('The password value is empty, it should not be empty')
        .isLength({ min: 8 })
        .withMessage('The password should be at least 8 characters long'),
      body('isActive').optional().isBoolean().withMessage('Incorrect value, the value should be a boolean'),
    ]
  }
}

export default new TodoValidator()
