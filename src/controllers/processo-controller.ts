import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import processService from "../services/processo-service";
import { InputCreateProcess } from "../protocols";

export async function postProcess(req: AuthenticatedRequest, res:Response){

    const process = req.body as InputCreateProcess

    try{
        const createdProcess = await processService.createProcess(process);
        return res.status(httpStatus.CREATED).send(createdProcess);
    }catch(err){
        if(err.name === "DuplicatedNumberError"){
            return res.status(httpStatus.FORBIDDEN).send(err);
        };
        console.log(err)
        
        return res.status(httpStatus.NOT_FOUND).send(err);

    };
};