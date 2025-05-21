import { Password } from "#domain/valueObjects/password_vo";
import { Email } from "#domain/valueObjects/email_vo";

export interface CreateUserDTO {
  username: string;
  password: Password;
  email: Email;
}

export interface UpdateUserDTO {
  username?: string;
  password?: Password;
  email?: Email;
}