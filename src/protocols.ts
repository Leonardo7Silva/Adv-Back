import { Clientes, Offices, Advogados, Processos } from "@prisma/client";

export type ApplicationError = {
    name: string;
    message: string;
  };

export type CreateClient = Omit<Clientes, 'id' | 'createdAt' | 'updatedAt' >

export type Signin = Omit<Offices, 'id' | 'createdAt' | 'updatedAt' | 'email' >

export type CreateOffice = Omit<Offices, "id" | "createdAt" | "updatedAt">

export type CreateLawyer = Omit<Advogados, 'id' | 'createdAt' | 'updatedAt'>

export type InputCreateLawyer = Omit<Advogados, 'id' | 'createdAt' | 'updatedAt' | 'officeId'>

export type CreateProcess = Omit<Processos, 'id' | 'createdAt' | 'updatedAt' >

export type GetProcess = {
  numberProcess: string,
  cpf: string,
  oab: string
}