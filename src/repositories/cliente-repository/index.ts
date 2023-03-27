import prisma from "../../database/database";
import { Clientes } from "@prisma/client";

async function create(params: CreateClient): Promise<Clientes>{

    return prisma.clientes.create({
        data:{
            ...params
        },
    });
};

async function findAll():Promise<Clientes[]>{
    return prisma.clientes.findMany({
        orderBy:{
            name:"asc"
        }
    })
}

async function findWithcpf(cpf: string):Promise<Clientes[]> {
    return prisma.clientes.findMany({
        where:{
            cpf:{
                startsWith: cpf
            }
        },
        orderBy:{
            name:"asc"
        }
    })
}


async function findWithName(name: string):Promise<Clientes[]> {
    return prisma.clientes.findMany({
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

async function findById(clientId: number):Promise<Clientes> {
    return prisma.clientes.findFirst({
        where:{
            id: clientId
        }
    })
}

async function update(params:CreateClient, clientId:number):Promise<Clientes>{
    return prisma.clientes.update({
        where:{
            id: clientId
        },
        data:{
            ...params
        }
    })
}

async function deleteClient(clientId:number) {
    return prisma.clientes.delete({
        where:{
            id: clientId
        }
    })    
}


const clientRepository = {
    create,
    findAll,
    findWithcpf,
    findWithName,
    update,
    findById,
    deleteClient
}

export type CreateClient = Omit<Clientes, 'id' | 'createdAt' | 'updatedAt' >
export default clientRepository;
