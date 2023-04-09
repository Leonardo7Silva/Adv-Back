import prisma from "../../database/database";
import { Advogados } from "@prisma/client";
import { CreateLawyer } from "../../protocols";

async function create(params: CreateLawyer): Promise<Advogados>{

    return prisma.advogados.create({
        data:{
            ...params
        },
    });
};

async function findAll():Promise<Advogados[]>{
    return prisma.advogados.findMany({
        orderBy:{
            name:"asc"
        }
    })
}

async function findWithOab(oab: string):Promise<Advogados[]> {
    return prisma.advogados.findMany({
        where:{
            oab:{
                startsWith: oab
            }
        },
        orderBy:{
            name:"asc"
        }
    })
}


async function findWithName(name: string):Promise<Advogados[]> {
    return prisma.advogados.findMany({
        where:{
            name:{
                startsWith: name
            }
        },
        orderBy:{
            name:"asc"
        }
    })
}

async function findById(lawyerId: number):Promise<Advogados> {
    return prisma.advogados.findFirst({
        where:{
            id: lawyerId
        }
    })
}

async function update(params:CreateLawyer, lawyerId:number):Promise<Advogados>{
    return prisma.advogados.update({
        where:{
            id: lawyerId
        },
        data:{
            ...params
        }
    })
}

async function deleteLawyer(LawyerId:number) {
    return prisma.advogados.delete({
        where:{
            id: LawyerId
        }
    })    
}


const lawyerRepository = {
    create,
    findAll,
    findWithOab,
    findWithName,
    update,
    findById,
    deleteLawyer
}


export default lawyerRepository;
