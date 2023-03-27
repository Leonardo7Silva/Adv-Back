"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClienteSchema = void 0;
var brazilian_utils_1 = require("@brazilian-utils/brazilian-utils");
var joi_1 = __importDefault(require("joi"));
var cpfValidationSchema = joi_1.default.string().length(11).custom(joiCpfValidation).required();
var mobilePhoneValidationSchema = joi_1.default.string().min(14).max(15).custom(joiMobilePhoneValidation);
exports.createClienteSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    cpf: cpfValidationSchema,
    tel: mobilePhoneValidationSchema,
    email: joi_1.default.string().email()
});
function joiCpfValidation(value, helpers) {
    if (!value)
        return value;
    if (!(0, brazilian_utils_1.isValidCPF)(value)) {
        return helpers.error("any.invalid");
    }
    return value;
}
function joiMobilePhoneValidation(value, helpers) {
    if (!value)
        return value;
    if (!(0, brazilian_utils_1.isValidMobilePhone)(value)) {
        return helpers.error("any.invalid");
    }
    return value;
}
