"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cliente_controller_1 = require("../controllers/cliente-controller");
var validation_middleware_1 = require("../middlewares/validation-middleware");
var cliente_schema_1 = require("../schemas/cliente-schema");
var clientRouter = (0, express_1.Router)();
clientRouter
    .post("/", (0, validation_middleware_1.validateBody)(cliente_schema_1.createClienteSchema), cliente_controller_1.postClient);
exports.default = clientRouter;
