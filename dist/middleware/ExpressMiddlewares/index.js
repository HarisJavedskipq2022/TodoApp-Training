"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("../../presentation_layer/route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/todo/', route_1.default);
