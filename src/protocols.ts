import { Clientes, Offices, Advogados, Processos } from "@prisma/client";
import { type } from "os";

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

export type InputCreateProcess = {
  numberProcess: string,
  cpf: string,
  oab: string,
  secret: boolean,
  anotherPartDoc: string,
  anotherPartName: string,
  audienceDay: Date,
  limitTime: Date,
  limitTimeDesc: string
};

export type InputUpdateProcess = {
  numberProcess: string,
  cpf: string,
  oab: string,
  secret: boolean,
  anotherPartDoc: string,
  anotherPartName: string,
  officeId: number,
  limitTime: Date,
  limitTimeDesc: string,
  audienceDay: Date
}

export type GetProcess = {
  numberProcess: string,
  cpf: string,
  oab: string,
  clientName: string,
  lawyerName: string
}

export type CreateComment = {
  comment: string,
  numberProcess: string,
  title: string
}