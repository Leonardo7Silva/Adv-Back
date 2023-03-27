import { ApplicationError } from "../protocols";

export function duplicatedCpfError(): ApplicationError {
  return {
    name: "DuplicatedCpfError",
    message: "There is already an user with given cpf",
  };
}
