import Joi from "joi";
import { InputCreateProcess } from "../protocols";
import { isValidCNPJ, isValidCPF } from "@brazilian-utils/brazilian-utils";

const cpfOrCnpjValidationSchema = Joi.string().min(11).custom(joiCpfOrCnpjValidation).required();

const cpfValidationSchema = Joi.string().length(11).custom(joiCpfValidation).required();

export const createProcessSchema = Joi.object<InputCreateProcess>({
    numberProcess: Joi.string().min(15).required(),
    cpf: cpfValidationSchema,
    oab: Joi.string().min(6).required(),
    secret:  Joi.boolean().required(),
    anotherPartDoc: cpfOrCnpjValidationSchema,
    anotherPartName: Joi.string().min(3).required()
});

function joiCpfValidation(value: string, helpers: Joi.CustomHelpers<string>) {
    if (!value) return value;
  
    if (!isValidCPF(value)) {
      return helpers.error("any.invalid");
    }
  
    return value;
  }

function joiCpfOrCnpjValidation(value: string, helpers: Joi.CustomHelpers<string>) {
    if (!value) return value;
  
    if (isValidCPF(value)) {
        return value;
    }

    if(isValidCNPJ(value)){
        return value;
    }

    return helpers.error("any.invalid");
  }