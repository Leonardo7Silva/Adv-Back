import { ApplicationError } from "../protocols";

export function duplicateOficeError(): ApplicationError {
  return {
    name: "DuplicatedOfficeError",
    message: "There is already an user with given email or usrename",
  };
}
