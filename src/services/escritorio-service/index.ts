import officeRepository from "../../repositories/escritorio-repositoy";
import { Offices } from "@prisma/client";
import { CreateOffice } from "../../protocols";
import { duplicateOficeError } from "../../errors/duplicated-office-error";
var bcrypt = require('bcrypt');

async function createAOffice(params:CreateOffice): Promise<Offices>{

    const isThereEmail = await officeRepository.findEmail(params.email)
    if(isThereEmail){
        throw duplicateOficeError()
    };

    const isThereUsername = await officeRepository.findUsername(params.username)
    if(isThereUsername){
        throw duplicateOficeError()
    };

    const hashedPassword = await bcrypt.hash(params.password, 12);

    const newOffice = await officeRepository.create({
        username: params.username,
        email: params.email,
        password: hashedPassword
    })

    return newOffice;
};

const officeService = {
    createAOffice
};

export default officeService;