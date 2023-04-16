import Joi from "joi";
import { CreateComment } from "../protocols";

export const comentSchema = Joi.object<CreateComment>({
    comment: Joi.string().required(),
    numberProcess: Joi.string().length(18).required(),
    title: Joi.string().required()
});

export const updateComentSchema = Joi.object<CreateComment>({
    comment: Joi.string(),
    title: Joi.string()
});