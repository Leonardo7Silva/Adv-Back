import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { authenticateToken } from "../middlewares/auth-middleware";
import { createProcessSchema } from "../schemas/processo-schema";
import { postProcess, getAllTheProcess } from "../controllers/processo-controller";

const processRouter = Router();

processRouter
    .all("/*", authenticateToken)
    .post("/", validateBody(createProcessSchema), postProcess)
    .get("/", getAllTheProcess)


export default processRouter