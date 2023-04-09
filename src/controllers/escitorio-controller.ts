import { Request, Response } from "express";
import httpStatus from "http-status";
import officeService from "../services/escritorio-service";

export async function postOffice(req:Request, res:Response){

    try{

        const newOffice = await officeService.createAOffice(req.body);
        res.sendStatus(httpStatus.CREATED)

    }catch(err){
        res.status(httpStatus.FORBIDDEN).send(err)
    }
}