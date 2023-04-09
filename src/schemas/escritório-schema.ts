import { CreateOffice } from "../protocols";
import Joi from "joi";

export const createOfficeSchema = Joi.object<CreateOffice>({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})