import { Request, Response } from "express";
import httpStatus from "http-status";
import signinService from "../services/signin-service";
import { Signin } from "../protocols";

export async function postSignin (req:Request, res:Response){

    const {username, password} = req.body as Signin;

    try{
        const office = await signinService.signin({username, password});
        return res.send(office)

    }catch(err){
        return res.status(httpStatus.FORBIDDEN).send(err)
    }

}