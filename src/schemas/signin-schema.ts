import { Signin } from "../protocols";
import Joi from "joi";

export const signinSchema = Joi.object<Signin>({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).required()
})