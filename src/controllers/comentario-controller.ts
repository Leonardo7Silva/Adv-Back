import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import { Response } from "express";
import commentService from "../services/comentario-service";
import httpStatus from "http-status";
import { CreateComment } from "../protocols";
import { Comentarios } from "@prisma/client";

export async function postComment(req: AuthenticatedRequest, res: Response) {

    const params = req.body as CreateComment

    try{
        const comment = await commentService.createComment(params);
        return res.status(httpStatus.CREATED).send(comment)
    }catch(err){
        console.log(err)
        return res.status(httpStatus.NOT_FOUND).send(err)
        
    }
    
};

export async function getComments(req: AuthenticatedRequest, res: Response) {

    const {processNumber} = req.params
    
    try{
        const comments = await commentService.findComments(processNumber);
        return res.status(httpStatus.OK).send(comments)
    }catch(err){
        if(err.name === "UnauthorizedError"){
            return res.status(httpStatus.FORBIDDEN).send(err)
        }
        return res.status(httpStatus.NOT_FOUND).send(err)
        
    }
    
};

export async function updateOneComment(req: AuthenticatedRequest, res: Response){

    const officeId = req.officeId;
    const {commentId} = req.params;
    const updateParams = req.body as Partial<Comentarios>

    try{
        const updatedComment = await commentService.updateComment(updateParams, commentId, officeId)
        return res.status(httpStatus.OK).send(updatedComment);

    }catch(err){
        if(err.name === "NotFoundError"){
            return res.status(httpStatus.NOT_FOUND).send(err);
        }
        return res.status(httpStatus.FORBIDDEN).send(err)
    }

};

export async function deleteOneComment(req: AuthenticatedRequest, res: Response){

    const officeId = req.officeId;
    const {commentId} = req.params;

    try{
        const deletedComment = await commentService.deleteOneComment(commentId, officeId);
        return res.status(httpStatus.OK).send(deletedComment);
        
    }catch(err){
        
        return res.status(httpStatus.FORBIDDEN).send(err)
    }

};