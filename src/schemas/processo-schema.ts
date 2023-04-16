import Joi from "joi";
import { InputCreateProcess } from "../protocols";
import { isValidCNPJ, isValidCPF } from "@brazilian-utils/brazilian-utils";

const cpfOrCnpjValidationSchema = Joi.string().min(11).custom(joiCpfOrCnpjValidation).required();
const cpfValidationSchema = Joi.string().length(11).custom(joiCpfValidation).required();

const updateCpfOrCnpjValidationSchema = Joi.string().min(11).custom(joiCpfOrCnpjValidation);
const updateCpfValidationSchema = Joi.string().length(11).custom(joiCpfValidation);

export const createProcessSchema = Joi.object<InputCreateProcess>({
    numberProcess: Joi.string().length(18).required(),
    cpf: cpfValidationSchema,
    oab: Joi.string().min(6).required(),
    secret:  Joi.boolean().required(),
    audienceDay: Joi.string().isoDate().min(20),
    limitTime: Joi.string().isoDate().min(20),
    limitTimeDesc: Joi.string().min(3),
    anotherPartDoc: cpfOrCnpjValidationSchema,
    anotherPartName: Joi.string().min(3).required()
});

export const updateProcessSchema = Joi.object<InputCreateProcess>({

  numberProcess: Joi.string().length(18),
  cpf: updateCpfValidationSchema,
  oab: Joi.string().min(6),
  secret:  Joi.boolean(),
  anotherPartDoc: updateCpfOrCnpjValidationSchema,
  anotherPartName: Joi.string().min(3),
  audienceDay: Joi.string().isoDate().min(20),
  limitTime: Joi.string().isoDate().min(20),
  limitTimeDesc: Joi.string().min(3)

})

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