import { ApplicationError } from "../protocols";

export function duplicatedOabError(): ApplicationError {
  return {
    name: "DuplicatedOabError",
    message: "There is already an user with given oab",
  };
}
