import { ApplicationError } from "../protocols";

export function invalidParamsError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must be a valid params to continue",
  };
}