import { Router } from "express";
import { validateBody } from "../middlewares/validation-middleware";
import { postLawyer, getAllTheLawyers, updateOneLawyer, deleteOneLawyer } from "../controllers/advogado-controller";
import { authenticateToken } from "../middlewares/auth-middleware";
import { createLawyerSchema, updateLawyerSchema } from "../schemas/advogado-schema";

const lawyerRouter = Router();

lawyerRouter
    .all("/*", authenticateToken)
    .post("/", validateBody(createLawyerSchema), postLawyer)
    .get("/", getAllTheLawyers)
    .put("/:lawyerId", validateBody(updateLawyerSchema), updateOneLawyer)
    .delete("/:lawyerId", deleteOneLawyer)


export default lawyerRouter;