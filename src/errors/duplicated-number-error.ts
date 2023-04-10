import { ApplicationError } from "../protocols";

export function duplicatedNumberError(): ApplicationError {
  return {
    name: "DuplicatedNumberError",
    message: "There is already an process with given number",
  };
}