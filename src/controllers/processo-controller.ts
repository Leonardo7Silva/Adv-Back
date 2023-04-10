import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import processService from "../services/processo-service";
import { InputCreateProcess, GetProcess } from "../protocols";

export async function postProcess(req: AuthenticatedRequest, res:Response){

    const process = req.body as InputCreateProcess

    try{
        const createdProcess = await processService.createProcess(process);
        return res.status(httpStatus.CREATED).send(createdProcess);
    }catch(err){
        if(err.name === "DuplicatedNumberError"){
            return res.status(httpStatus.FORBIDDEN).send(err);
        };

        
        return res.status(httpStatus.NOT_FOUND).send(err);

    };
};

export async function getAllTheProcess(req: AuthenticatedRequest, res:Response){

    const {oab} = req.query;
    const {numberProcess} = req.query;
    const {clientName} = req.query;
    const {cpf} = req.query;
    const {lawyerName} = req.query

    try{
        const allprocess = await processService.getAllProcess({oab, numberProcess, clientName, cpf, lawyerName});
        return res.send(allprocess)
    }catch(err){
        return res.status(httpStatus.NOT_FOUND).send(err)
    }
}