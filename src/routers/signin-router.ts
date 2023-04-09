import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { postSignin } from "../controllers/signin-controller";
import { signinSchema } from "../schemas/signin-schema";

const signinRouter = Router();

signinRouter
    .post("/", validateBody(signinSchema), postSignin)


export default signinRouter