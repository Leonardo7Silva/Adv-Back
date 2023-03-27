import { CreateClient } from "../repositories";
import { isValidCPF, isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import Joi from "joi";

const cpfValidationSchema = Joi.string().length(11).custom(joiCpfValidation).required();

const mobilePhoneValidationSchema = Joi.string().min(14).max(15).custom(joiMobilePhoneValidation);

export const createClienteSchema = Joi.object<CreateClient>({
    name: Joi.string().min(3).required(),
    cpf: cpfValidationSchema,
    tel: mobilePhoneValidationSchema,
    email: Joi.string().email()
})

export const uptadeClienteSchema = Joi.object<CreateClient>({
  name: Joi.string().min(3),
  cpf: cpfValidationSchema,
  tel: mobilePhoneValidationSchema,
  email: Joi.string().email()
})




function joiCpfValidation(value: string, helpers: Joi.CustomHelpers<string>) {
    if (!value) return value;
  
    if (!isValidCPF(value)) {
      return helpers.error("any.invalid");
    }
  
    return value;
  }
  
  function joiMobilePhoneValidation(value: string, helpers: Joi.CustomHelpers<string>) {
    if (!value) return value;
  
    if (!isValidMobilePhone(value)) {
      return helpers.error("any.invalid");
    }
  
    return value;
  }
  

