import { Router } from "express";
import { postOffice } from "../controllers/escitorio-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createOfficeSchema } from "../schemas/escritório-schema";

const officeRouter = Router();

officeRouter
    .post("/", validateBody(createOfficeSchema), postOffice)



export default officeRouter;