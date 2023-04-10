import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import lawyersService from "../services/advogado-service";

export async function postLawyer(req:AuthenticatedRequest, res:Response){
    const {officeId} = req
    const params = {
        officeId,
        ...req.body
    }
    try{
        const newLawyer = await lawyersService.createLawyer(params);
        return res.status(httpStatus.CREATED).send(newLawyer)
    }catch(err){
        res.status(httpStatus.FORBIDDEN).send(err)
    }
};

export async function getAllTheLawyers(req: AuthenticatedRequest, res:Response){

    const {oab} = req.query;
    const {name} = req.query

    try{
        const allLawyers = await lawyersService.getAllLawyers({oab, name});
        return res.send(allLawyers)
    }catch(err){
        console.log(err)
    }
}

export async function updateOneLawyer(req:AuthenticatedRequest, res: Response) {
    
    const officeId = req.officeId
    const {lawyerId} = req.params
    const params = {
        officeId,
        ...req.body
    }
    try{

        const uptadedLawyer = await lawyersService.updateLawyer(params, Number(lawyerId))
        return res.status(httpStatus.OK).send(uptadedLawyer)
        
    }catch(err){

        if(err.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(err)
        }
        return res.status(httpStatus.FORBIDDEN).send(err)
    }
}

export async function deleteOneLawyer(req:AuthenticatedRequest, res: Response) {
    
    const {officeId} = req
    const {lawyerId} = req.params
    try{
        const deletedLawyer = await lawyersService.deleteOneLawyer(Number(lawyerId), Number(officeId))
        return res.status(httpStatus.OK).send(deletedLawyer)
    }catch(err){
        if(err.name === "NotFoundError"){
            res.status(httpStatus.NOT_FOUND).send(err)
        }
        console.log(err)
    }
}