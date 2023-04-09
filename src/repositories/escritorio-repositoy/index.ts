import prisma from "../../database/database";
import { CreateOffice } from "../../protocols";
import { Offices } from "@prisma/client";

async function create(params:CreateOffice):Promise<Offices>{

    return prisma.offices.create({
        data:{
            username:params.username,
            password:params.password,
            email:params.email
        }
    })

};

async function findEmail(email:string):Promise<Offices>{

    return prisma.offices.findFirst({
        where:{
            email: email
        }
    })
};

async function findUsername(username:string):Promise<Offices>{

    return prisma.offices.findFirst({
        where:{
            username: username
        }
    })
}

const officeRepository = {
    create,
    findEmail,
    findUsername
};

export default officeRepository