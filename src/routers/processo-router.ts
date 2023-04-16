import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { authenticateToken } from "../middlewares/auth-middleware";
import { createProcessSchema, updateProcessSchema } from "../schemas/processo-schema";
import { postProcess, getAllTheProcess, getProcessByCpf, updateOneProcess, deleteOneProcess } from "../controllers/processo-controller";

const processRouter = Router();

processRouter
    .get("/:cpf", getProcessByCpf)
    .all("/*", authenticateToken)
    .post("/", validateBody(createProcessSchema), postProcess)
    .get("/", getAllTheProcess)
    .put("/:processId", validateBody(updateProcessSchema), updateOneProcess)
    .delete("/:processId", deleteOneProcess)


export default processRouter