import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { comentSchema, updateComentSchema} from "../schemas/comentario-schema";
import { postComment, getComments, updateOneComment, deleteOneComment } from "../controllers/comentario-controller";
import { authenticateToken } from "../middlewares/auth-middleware";

const commentRouter = Router();

commentRouter
    .get("/:processNumber", getComments)
    .all("/*", authenticateToken)
    .post("/", validateBody(comentSchema), postComment)
    .put("/:commentId", validateBody(updateComentSchema), updateOneComment)
    .delete("/:commentId", deleteOneComment)

export default commentRouter

