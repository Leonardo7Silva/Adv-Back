import { ApplicationError } from "../protocols";

export function notFoundClientError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "Not Found this client",
  };
}