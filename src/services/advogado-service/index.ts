import lawyerRepository from "../../repositories/advogados-repository";
import { Advogados } from "@prisma/client";
import { CreateLawyer } from "../../protocols";
import { notFoundError } from "../../errors/not-found-error";
import { duplicatedOabError } from "../../errors/duplicated-oab-error";
import { invalidUpdateError } from "../../errors/invalid-update-error";

async function createLawyer(params: CreateLawyer): Promise<Advogados>{

    const thereOab = await lawyerRepository.findWithOab(params.oab)
    if(thereOab.length > 0){
        throw duplicatedOabError();
    }

    const newLawyer  = await lawyerRepository.create(params)
    return newLawyer
};

async function getAllLawyers({oab, name}): Promise<Advogados[]>{

    let lawyers = []

    if (!oab && !name){
        lawyers = await lawyerRepository.findAll()
    };

    if(!!oab){
        lawyers = await lawyerRepository.findWithOab(oab)
    }

    if(!!name && !oab){
        lawyers = await lawyerRepository.findWithName(name)
    }
   
    return lawyers
};

async function updateLawyer(params:CreateLawyer, lawyerId:number):Promise<Advogados>{

    if(!params.email && !params.name && !params.oab && !params.tel){
        throw invalidUpdateError();
    }

    const lawyer = await lawyerRepository.findById(lawyerId)

    if(!lawyer){
        throw notFoundError();
    }

    if(lawyer.officeId !== params.officeId){
        throw notFoundError();
    }

    if(params.oab){
        const thereOab = await lawyerRepository.findWithOab(params.oab)
        if(thereOab.length > 0 && thereOab[0].id !== lawyerId){
            throw duplicatedOabError();
        }
    }

    const updatedLawyer = await lawyerRepository.update(params, lawyerId)
    return updatedLawyer

};

async function deleteOneLawyer(lawyerId:number, officeId: number){

    const lawyer = await lawyerRepository.findById(lawyerId)

    if(!lawyer){
        throw notFoundError();
    }

    if(lawyer.officeId !== officeId){
        throw notFoundError();
    }

    const deletedLawyer = await lawyerRepository.deleteLawyer(lawyerId)
    return deletedLawyer
};

const lawyersService = {
    createLawyer,
    getAllLawyers,
    updateLawyer,
    deleteOneLawyer
};

export default lawyersService;