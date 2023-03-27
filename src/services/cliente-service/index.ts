import clientRepository, {CreateClient} from "../../repositories/cliente-repository";
import { duplicatedCpfError } from "../../errors/duplicated-cpf-error";
import { notFoundError } from "../../errors/not-found-error";
import { Clientes } from "@prisma/client";


async function createClient(params: CreateClient): Promise<Clientes>{

    const thereCpf = await clientRepository.findWithcpf(params.cpf)
    if(thereCpf.length > 0){
        throw duplicatedCpfError();
    }

    const newClient  = await clientRepository.create(params)
    return newClient
};

async function getAllClients({cpf, name}): Promise<Clientes[]>{

    let clients = []

    if (!cpf && !name){
        clients = await clientRepository.findAll()
    };

    if(!!cpf){
        clients = await clientRepository.findWithcpf(cpf)
    }

    if(!!name && !cpf){
        clients = await clientRepository.findWithName(name)
    }
   
    return clients
}

async function updateClient(params:CreateClient, clientId:number):Promise<Clientes>{

    const client = await clientRepository.findById(clientId)

    if(!client){
        throw notFoundError();
    }

    const thereCpf = await clientRepository.findWithcpf(params.cpf)
    if(thereCpf.length > 0 && thereCpf[0].id !== clientId){
        throw duplicatedCpfError();
    }

    const updatedClient = await clientRepository.update(params, clientId)
    return updatedClient

}

async function deleteOneClient(clientId:number){

    const client = await clientRepository.findById(clientId)

    if(!client){
        throw notFoundError();
    }

    const deletedClient = await clientRepository.deleteClient(clientId)
    return deletedClient
}

const clientService = {
    createClient,
    getAllClients,
    updateClient,
    deleteOneClient
};

export default clientService;