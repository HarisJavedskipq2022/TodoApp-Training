"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TodoValidator {
    checkCreateTodo() {
        return [
            (0, express_validator_1.body)('id')
                .optional()
                .isUUID(4)
                .withMessage('The value should be UUID v4'),
            (0, express_validator_1.body)('title')
                .notEmpty()
                .withMessage('The title value should not be empty'),
            (0, express_validator_1.body)('completed')
                .optional()
                .isBoolean()
                .withMessage('The value should be boolean')
                .isIn([0, false])
                .withMessage('The value should be 0 or false'),
        ];
    }
    checkReadTodo() {
        return [
            (0, express_validator_1.query)('limit')
                .optional()
                .isInt({ min: 1, max: 10 })
                .withMessage('The limit value should be number and between 1-10'),
            (0, express_validator_1.query)('offset')
                .optional()
                .isNumeric()
                .withMessage('The value should be number'),
        ];
    }
    checkIdParam() {
        return [
            (0, express_validator_1.param)('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isUUID(4)
                .withMessage('The value should be uuid v4'),
        ];
    }
}
exports.default = new TodoValidator();
