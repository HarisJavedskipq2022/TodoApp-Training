"use strict";
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var Middleware = /** @class */ (function () {
    function Middleware() {
    }
    Middleware.prototype.handleValidationError = function (req, res, next) {
        var error = (0, express_validator_1.validationResult)(req);
        if (!error.isEmpty()) {
            return res.json(error.array()[0]);
        }
        next();
    };
    return Middleware;
}());
exports["default"] = new Middleware();
