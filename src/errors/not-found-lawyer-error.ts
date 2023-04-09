import { ApplicationError } from "../protocols";

export function notFoundLawyerError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "Not Found this lawyer",
  };
}