import { ApplicationError } from "../protocols";

export function invalidSigninError(): ApplicationError {
    return {
      name: "InvalidCredentialsError",
      message: "username or password are incorrect",
    };
  }
  