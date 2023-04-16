import prisma from "../../database/database";
import { Comentarios } from "@prisma/client";

async function create(params: Partial<Comentarios>): Promise<Comentarios>{
    return prisma.comentarios.create({
        data:{
            comment: params.comment,
            title: params.title,
            processId: params.processId
        }
    })
};

async function getMany(processId: number): Promise<Comentarios[]>{
    return prisma.comentarios.findMany({
        where:{
            processId: processId
        },
        orderBy:{
            createdAt:"desc"
        }
    })
};

async function getOne(commentId: number): Promise<Comentarios>{
    return prisma.comentarios.findFirst({
        where:{
            id: commentId
        }
    })
}

async function update(params: Partial<Comentarios>, commentId: number): Promise<Comentarios>{
    return prisma.comentarios.update({
        where:{
            id: commentId
        },
        data:{
            comment: params.comment,
            title: params.title,
        }
    })
};

async function deleteOne(commentId: number): Promise<Comentarios>{
    return prisma.comentarios.delete({
        where:{
            id: commentId
        }
    })
};

const commentRepository = {
    create,
    getMany,
    getOne,
    update,
    deleteOne
};

export default commentRepository;