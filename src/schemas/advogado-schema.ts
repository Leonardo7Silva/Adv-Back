import Joi from "joi";
import { InputCreateLawyer } from "../protocols";
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";

const mobilePhoneValidationSchema = Joi.string().min(14).max(15).custom(joiMobilePhoneValidation);

export const createLawyerSchema = Joi.object<InputCreateLawyer>({
    name: Joi.string().min(3).required(),
    tel: mobilePhoneValidationSchema,
    email: Joi.string().email(),
    oab: Joi.string().min(6).required()
});

export const updateLawyerSchema = Joi.object<InputCreateLawyer>({
    name: Joi.string().min(3),
    tel: mobilePhoneValidationSchema,
    email: Joi.string().email(),
    oab: Joi.string().min(8)
});




function joiMobilePhoneValidation(value: string, helpers: Joi.CustomHelpers<string>) {
    if (!value) return value;
  
    if (!isValidMobilePhone(value)) {
      return helpers.error("any.invalid");
    }
  
    return value;
  }