import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import { Response } from "express";
import clientService from "../services/cliente-service";
import httpStatus from "http-status";

export async function postClient(req:AuthenticatedRequest, res:Response){
    const {officeId} = req
    const params = {
        officeId,
        ...req.body
    }
    try{
        const newClient = await clientService.createClient(params);
        return res.status(httpStatus.CREATED).send(newClient)
    }catch(err){
        res.status(httpStatus.FORBIDDEN).send(err)
    }
};

export async function getAllTheClients(req: AuthenticatedRequest, res:Response){

    const {cpf} = req.query;
    const {name} = req.query

    try{
        const allclients = await clientService.getAllClients({cpf, name});
        return res.send(allclients)
    }catch(err){
        console.log(err)
    }
}

export async function updateOneClient(req:AuthenticatedRequest, res: Response) {
    
    const {officeId} = req
    const {clientId} = req.params
    const params = {
        officeId,
        ...req.body
    }
    try{
        const uptadedClient = await clientService.updateClient(params, Number(clientId))
        return res.status(httpStatus.OK).send(uptadedClient)
    }catch(err){

        if(err.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(err)
        }
        return res.status(httpStatus.FORBIDDEN).send(err)
    }
}

export async function deleteOneClient(req:AuthenticatedRequest, res: Response) {
    
    const {officeId} = req
    const {clientId} = req.params
    try{
        const deletedClient = await clientService.deleteOneClient(Number(clientId), Number(officeId))
        return res.status(httpStatus.OK).send(deletedClient)
    }catch(err){
        if(err.name === "NotFoundError"){
            res.status(httpStatus.NOT_FOUND).send(err)
        }
        console.log(err)
    }
}