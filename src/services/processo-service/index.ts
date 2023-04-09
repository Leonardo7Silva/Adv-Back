import processRepository from "../../repositories/Processo-repository";
import lawyerRepository from "../../repositories/advogados-repository";
import clientRepository from "../../repositories/cliente-repository";
import { Clientes, Processos } from "@prisma/client";
import { notFoundError } from "../../errors/not-found-error";
import { notFoundClientError } from "../../errors/not-found-client-error";
import { notFoundLawyerError } from "../../errors/not-found-lawyer-error";
import { CreateProcess, InputCreateProcess } from "../../protocols";
import { duplicatedNumberError } from "../../errors/duplicated-number-error";
import { GetProcess } from "../../protocols";

async function createProcess(params: InputCreateProcess): Promise<Processos>{

    const thereNumber = await processRepository.findWithNumberProcess(params.numberProcess)
    if(thereNumber.length > 0){
        throw duplicatedNumberError();
    }

    const client = await clientRepository.findWithcpf(params.cpf);
    if(client.length === 0){
        throw notFoundClientError()
    };

    const lawyer = await lawyerRepository.findWithOab(params.oab)
    
    if(lawyer.length === 0 ){
        throw notFoundLawyerError();
    }

    const process = {
        numberProcess: params.numberProcess,
        clientId: client[0].id,
        advogadoId: lawyer[0].id,
        secret: params.secret,
        anotherPartDoc: params.anotherPartDoc,
        anotherPartName: params.anotherPartName,
        limitTime: params.limitTime,
        limitTimeDesc: params.limitTimeDesc,
    } as CreateProcess


    const newProcess  = await processRepository.create(process)
    return newProcess
};

async function getAllProcess({numberProcess, oab, cpf, lawyerName, clientName}: GetProcess): Promise<Processos[]>{

    let process = []

    if (!oab && !numberProcess && !cpf && !clientName && !lawyerName){
        process = await processRepository.findAll();
        return process
    };

    if(oab){
        const lawyer = await lawyerRepository.findWithOab(oab);
        if(lawyer.length === 0){
            throw notFoundError();
        }
        process = await processRepository.findWithLawyerId(lawyer[0].id);

        return process;
    };

    if(numberProcess){
        process = await processRepository.findWithNumberProcess(numberProcess);
        return process
    };

    if(cpf){
        const client = await clientRepository.findWithcpf(cpf);
        if(client.length === 0){
            throw notFoundError
        }
        process = await processRepository.findWithClientId(client[0].id)
        return process
    };
    if(clientName){
        const clients = await clientRepository.findWithName(clientName);
        if(clients.length === 0){
            throw notFoundError
        };
        process = await processRepository.findWithClientName(clientName);
        return process
    };

    if(lawyerName){
        const lawyers = await lawyerRepository.findWithName(lawyerName);
        if(lawyers.length === 0){
            throw notFoundError
        };
        process = await processRepository.findWithLawyerName(lawyerName);
        return process
    };
   
    return process
};

const processService = {
    createProcess,
};

export default processService