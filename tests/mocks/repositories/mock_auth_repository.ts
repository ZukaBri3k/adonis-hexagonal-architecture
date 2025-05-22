import { AuthRepository } from "#domain/ports/auth_repository";
import { User } from "#domain/entities/user_entity";
import { Email } from "#domain/valueObjects/email_vo";
import { Password } from "#domain/valueObjects/password_vo";
import { LoginDTO } from "#domain/dto/auth_dto";

export class MockAuthRepository implements AuthRepository {

  async login(credentials: LoginDTO): Promise<User> {
    if (credentials.email !== "test@mail.com" || credentials.password !== "Test1234!") {
      throw new Error("Invalid credentials");
    }

    return new Promise((resolve) => resolve(new User({
      id: 1,
      email: new Email("test@mail.com"),
      password: new Password("Test1234!"),
      username: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    })));
  }

  async logout(): Promise<User> {
    return new Promise((resolve) => resolve(new User({
      id: 1,
      email: new Email("test@mail.com"),
      password: new Password("Test1234!"),
      username: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
    })));
  }

  async isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  }
}
