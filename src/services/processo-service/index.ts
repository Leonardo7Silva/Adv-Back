import processRepository from "../../repositories/Processo-repository";
import lawyerRepository from "../../repositories/advogados-repository";
import clientRepository from "../../repositories/cliente-repository";
import { Processos } from "@prisma/client";
import { notFoundError } from "../../errors/not-found-error";
import { CreateProcess } from "../../protocols";
import { duplicatedNumberError } from "../../errors/duplicated-number-error";
import { GetProcess } from "../../protocols";

async function createProcess(params: CreateProcess): Promise<Processos>{

    const thereNumber = await processRepository.findWithNumberProcess(params.numberProcess)
    if(thereNumber.length > 0){
        throw duplicatedNumberError();
    }

    const newProcess  = await processRepository.create(params)
    return newProcess
};

async function getAllProcess({numberProcess, oab, cpf}: GetProcess): Promise<Processos[]>{

    let process = []

    if (!oab && !numberProcess && !cpf){
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
    }

    if(numberProcess){
        process = await processRepository.findWithNumberProcess(numberProcess);
        return process
    }

    if(cpf){
        const client = await clientRepository.findWithcpf(cpf);
        if(client.length === 0){
            throw notFoundError
        }
        process = await processRepository.findWithClientId(client[0].id)
        return process
    }
   
    return process
};