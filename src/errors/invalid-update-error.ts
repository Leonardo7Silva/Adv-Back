import { ApplicationError } from "../protocols";

export function invalidUpdateError(): ApplicationError {
  return {
    name: "InvalidUpdateError",
    message: "This update is invalid",
  };
}