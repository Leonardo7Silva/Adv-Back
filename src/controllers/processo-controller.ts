import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import { Response, Request } from "express";
import httpStatus from "http-status";
import processService from "../services/processo-service";
import { InputCreateProcess, GetProcess } from "../protocols";

export async function postProcess(req: AuthenticatedRequest, res:Response){

    const {officeId} = req
    const process = req.body  as InputCreateProcess

    try{
        const createdProcess = await processService.createProcess(process, officeId);
        return res.status(httpStatus.CREATED).send(createdProcess);
    }catch(err){
        if(err.name === "DuplicatedNumberError"){
            return res.status(httpStatus.FORBIDDEN).send(err);
        };

        console.log(err)
        return res.status(httpStatus.NOT_FOUND).send(err);

    };
};

export async function getAllTheProcess(req: AuthenticatedRequest, res:Response){

    const {oab} = req.query;
    const {numberProcess} = req.query;
    const {clientName} = req.query;
    const {cpf} = req.query;
    const {lawyerName} = req.query;

    try{
        const allprocess = await processService.getAllProcess({oab, numberProcess, clientName, cpf, lawyerName});
        return res.send(allprocess)
    }catch(err){
        return res.status(httpStatus.NOT_FOUND).send(err)
    }
};

export async function getProcessByCpf(req: Request, res: Response){

    const {cpf} = req.params;

    try{

        const process = await processService.findProcessByCpf(cpf);
        return res.status(httpStatus.OK).send(process)

    }catch(err){
        return res.status(httpStatus.NOT_FOUND).send(err)
    }

};

export async function updateOneProcess(req: AuthenticatedRequest, res: Response){
    
    const {officeId} = req
    const {processId} = req.params
    const params = {
        ...req.body
    };

    try{

        const updatedProcess = await processService.updateProcess(params,officeId, Number(processId));
        return res.status(httpStatus.OK).send(updatedProcess)

    }catch(err){
        if(err.name === "InvalidUpdateError" || err.name === "DuplicatedNumberError"){
            return res.status(httpStatus.FORBIDDEN).send(err)
        };
        console.log(err)
        return res.status(httpStatus.NOT_FOUND).send(err)
    }
};

export async function deleteOneProcess(req:AuthenticatedRequest, res: Response) {
    
    const {officeId} = req
    const {processId} = req.params
    try{
        const deletedProcess = await processService.deleteOneProcess(Number(processId), officeId);
        return res.status(httpStatus.OK).send(deletedProcess)
    }catch(err){

        res.status(httpStatus.NOT_FOUND).send(err)
    }
}