import processRepository from "../../repositories/processo-repository";
import commentRepository from "../../repositories/comentario-repository";
import { CreateComment } from "../../protocols";
import { Comentarios } from "@prisma/client";
import { notFoundError } from "../../errors/not-found-error";
import { invalidParamsError } from "../../errors/invalid-params-error";
import { unauthorizedError } from "../../errors/unauthorized-error";
import { invalidUpdateError } from "../../errors/invalid-update-error";

async function createComment(params: CreateComment):Promise<Comentarios>{

    const process = await processRepository.findWithNumberProcess(params.numberProcess)
    if(process.length === 0){
        throw notFoundError()
    };

    const commentParams = {
        title: params.title,
        comment: params.comment,
        processId: process[0].id
    } as Partial<Comentarios>;

    const comment = await commentRepository.create(commentParams);
    return comment;
};

async function findComments(numberProcess: string):Promise<Comentarios[]>{

    if(!parseInt(numberProcess)){
        throw invalidParamsError();
    }

    const process = await processRepository.findWithNumberProcess(numberProcess)
    if(process.length === 0){
        throw notFoundError()
    };

    const comments = commentRepository.getMany(process[0].id);
    return comments;

};

async function updateComment(params: Partial<CreateComment>, commentId: string, officeId: number):Promise<Comentarios>{

    if(!params.comment && !params.title){
        throw invalidUpdateError();
    }

    if(!parseInt(commentId)){
        throw invalidParamsError();
    };

    const comment = await commentRepository.getOne(parseInt(commentId));
    if(!comment){
        throw notFoundError()
    };

    const process = await processRepository.findById(comment.processId)
    if(process.officeId !== officeId){
        throw notFoundError();
    }

    const commentParams = {
        title: params.title,
        comment: params.comment,
    } as Partial<Comentarios>;

    const updatedComment = await commentRepository.update(commentParams, parseInt(commentId))
    return updatedComment;
};

async function deleteOneComment(commentId: string, officeId: number): Promise<Comentarios>{

    if(!parseInt(commentId)){
        throw notFoundError();
    };

    const comment = await commentRepository.getOne(parseInt(commentId));
    if(!comment){
        throw notFoundError();
    };

    const process = await processRepository.findById(comment.processId);
    if(process.officeId !== officeId){
        throw notFoundError();
    };

    const deletedComment = await commentRepository.deleteOne(parseInt(commentId));
    return deletedComment;
}

const commentService = {
    createComment,
    findComments,
    updateComment,
    deleteOneComment
};

export default commentService;