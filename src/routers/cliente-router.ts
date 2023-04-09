import { Router } from "express";
import { postClient, getAllTheClients, updateOneClient, deleteOneClient } from "../controllers/cliente-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createClienteSchema, uptadeClienteSchema } from "../schemas/cliente-schema";
import { authenticateToken } from "../middlewares/auth-middleware";

const clientRouter = Router();

clientRouter
    .all("/*", authenticateToken)
    .post("/", validateBody(createClienteSchema),postClient)
    .get("/", getAllTheClients)
    .put("/:clientId", validateBody(uptadeClienteSchema), updateOneClient)
    .delete("/:clientId", deleteOneClient)


export default clientRouter