import prisma from "../../database/database";
import { Processos } from "@prisma/client";
import { CreateProcess } from "../../protocols";


async function create(params: CreateProcess): Promise<Processos>{

    return prisma.processos.create({
        data:{
            ...params
        },
    });
};

async function findAll():Promise<Processos[]>{
    return prisma.processos.findMany({
        orderBy:{
            createdAt: "desc"
        }
    })
}

async function findWithNumberProcess(number: string):Promise<Processos[]> {
    return prisma.processos.findMany({
        where:{
            numberProcess:{
                startsWith: number
            }
        },
        orderBy:{
            createdAt: "desc"
        }
    })
};


async function findWithLawyerId(lawyerId: number):Promise<Processos[]> {
    return prisma.processos.findMany({
        where:{
            advogadoId: lawyerId
        },
        orderBy:{
            createdAt: "desc"
        }
    })
};

async function findWithClientId(clientId: number):Promise<Processos[]> {
    return prisma.processos.findMany({
        where:{
            clientId: clientId
        },
        orderBy:{
            createdAt: "desc"
        }
    })
};

async function findWithClientName(clientName: string): Promise<Processos[]>{
    return prisma.processos.findMany({
        where:{
            Clientes:{
                name:{
                    startsWith: clientName
                }
            }
        }
    })
};

async function findWithLawyerName(lawyerName: string): Promise<Processos[]>{
    return prisma.processos.findMany({
        where:{
            Advogados:{
                name:{
                    startsWith: lawyerName                }
            }
        }
    })
};

async function findById(processId: number):Promise<Processos> {
    return prisma.processos.findFirst({
        where:{
            id: processId
        }
    })
};

async function findAllWihtlimit(){
    return prisma.processos.findMany({
        orderBy:{
            limitTime:"asc"
        }
    })
}

async function update(params:CreateProcess, processId:number): Promise<Processos>{
    return prisma.processos.update({
        where:{
            id: processId
        },
        data:{
            ...params
        }
    })
}

async function deleteProcess(processId:number): Promise<Processos> {
    return prisma.processos.delete({
        where:{
            id: processId
        }
    })    
}


const processRepository = {
    create,
    findAll,
    findWithNumberProcess,
    findWithLawyerId,
    findWithClientId,
    findWithClientName,
    findWithLawyerName,
    findAllWihtlimit,
    update,
    findById,
    deleteProcess
}


export default processRepository;
