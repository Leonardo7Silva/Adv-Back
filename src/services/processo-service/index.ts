import processRepository from "../../repositories/processo-repository";
import lawyerRepository from "../../repositories/advogados-repository";
import clientRepository from "../../repositories/cliente-repository";
import { Clientes, Processos } from "@prisma/client";
import { notFoundError } from "../../errors/not-found-error";
import { notFoundClientError } from "../../errors/not-found-client-error";
import { notFoundLawyerError } from "../../errors/not-found-lawyer-error";
import { CreateProcess, InputCreateProcess, InputUpdateProcess } from "../../protocols";
import { duplicatedNumberError } from "../../errors/duplicated-number-error";
import { GetProcess } from "../../protocols";
import { invalidUpdateError } from "../../errors/invalid-update-error";

async function createProcess(params: InputCreateProcess, officeId: number): Promise<Processos>{

    const createParams = {...params} 
    delete createParams.cpf
    delete createParams.oab

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
        audienceDay: params.audienceDay,
        anotherPartDoc: params.anotherPartDoc,
        anotherPartName: params.anotherPartName,
        limitTime: params.limitTime,
        limitTimeDesc: params.limitTimeDesc,
        officeId
    } as CreateProcess


    const newProcess  = await processRepository.create(process)
    return newProcess
};

async function getAllProcess({numberProcess, oab, cpf, lawyerName, clientName}): Promise<Processos[]>{

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

async function findProcessByCpf(cpf: string):Promise<Processos[]>{

    if(cpf.length < 11){
        throw notFoundError();
    };

    if(!parseInt(cpf)){
        throw notFoundError();
    };

    const client = await clientRepository.findWithcpf(cpf);
    if(client.length === 0){
        throw notFoundClientError();
    };

    const processos = await processRepository.findWithClientId(client[0].id)
    if(processos.length === 0){
        throw notFoundError();
    };

    return processos;
};

async function updateProcess(params: InputUpdateProcess,officeId:number, processId: number): Promise<Processos> {
    
    const updateParams = params
    if(!params.numberProcess && !params.anotherPartDoc && !params.anotherPartName && params.secret === undefined && !params.oab && !params.cpf && !params.audienceDay && !params.limitTime && !params.limitTimeDesc){
        throw invalidUpdateError();
    };

    const process = await processRepository.findById(processId);
    if(!process){
        throw notFoundError();
    };

    if(officeId !== process.Advogados.officeId){
        throw notFoundError();
    };

    if(params.numberProcess){
        const thereIsProcess = await processRepository.findWithNumberProcess(params.numberProcess)
        if(thereIsProcess.length > 0 &&  thereIsProcess[0].id !== processId){
            throw duplicatedNumberError();
        }
    };

    if(params.cpf){
        const thereIsCpf = await clientRepository.findWithcpf(params.cpf);
        if(thereIsCpf.length === 0){
            throw notFoundClientError();
        };
        await processRepository.update({clientId: thereIsCpf[0].id}, processId)
    };

    if(params.oab){
        const thereIsOab = await lawyerRepository.findWithOab(params.oab);
        if(thereIsOab.length === 0){
            throw notFoundClientError();
        };
        await processRepository.update({advogadoId: thereIsOab[0].id}, processId)
    };


    if(params.oab || params.cpf){
        delete updateParams.cpf
        delete updateParams.oab
    };

    const updatedProcess = await processRepository.update(updateParams, processId);
    return updatedProcess;
};

async function deleteOneProcess(processId:number, officeId: number){

    const process = await processRepository.findById(processId)

    if(!process){
        throw notFoundError();
    }

    if(process.Advogados.officeId !== officeId){
        throw notFoundError
    }

    const deletedProcess = await processRepository.deleteProcess(processId)
    return deletedProcess
};

const processService = {
    createProcess,
    getAllProcess,
    updateProcess,
    deleteOneProcess,
    findProcessByCpf
};

export default processService