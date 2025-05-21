import { CreateUserDTO, UpdateUserDTO } from "#domain/dto/user_dto";
import { User } from "#domain/entities/user_entity";
import { UserRepository } from "#domain/ports/user_repository";
import { Email } from "#domain/valueObjects/email_vo";
import { Password } from "#domain/valueObjects/password_vo";
import string from "@adonisjs/core/helpers/string";

export class MockUserRepository implements UserRepository {
  create(user: CreateUserDTO): Promise<User> {
    return new Promise((resolve) => resolve(new User({...user, password: user.password, email: user.email, id: 1, createdAt: new Date(), updatedAt: new Date()})));
  }

  update(id: number, userProps: UpdateUserDTO): Promise<User> {
    if (id !== 1) {
      throw new Error("User not found");
    }

    return new Promise((resolve) => resolve(new User({id: 1, email: userProps.email ?? new Email("test@mail.com"), password: userProps.password ?? new Password("Test1234!"), username: userProps.username ?? "test", createdAt: new Date(), updatedAt: new Date()})));
  }

  delete(id: number): Promise<User> {
    if (id !== 1) {
      throw new Error("User not found");
    }

    return new Promise((resolve) => resolve(new User({id: 1, email: new Email("test@mail.com"), password: new Password("Test1234!"), username: "test", createdAt: new Date(), updatedAt: new Date()})));
  }

  findById(id: number): Promise<User> {
    if (id !== 1) {
      throw new Error("User not found");
    }

    return new Promise((resolve) => resolve(new User({id: 1, email: new Email("test@mail.com"), password: new Password("Test1234!"), username: "test", createdAt: new Date(), updatedAt: new Date()})));
  }

  findAll(): Promise<User[]> {
    return new Promise((resolve) => resolve([
      new User({id: 1, email: new Email("test@mail.com"), password: new Password("Test1234!"), username: "test", createdAt: new Date(), updatedAt: new Date()})
    ]));
  }

  getUserByEmail(email: string): Promise<User> {
    if (email !== "test@mail.com") {
      throw new Error("User not found");
    }

    return new Promise((resolve) => resolve(new User({id: 1, email: new Email("test@mail.com"), password: new Password("Test1234!"), username: "test", createdAt: new Date(), updatedAt: new Date()})));
  }

  updatePassword(user: User, newPassword: string): Promise<User> {
    if (user.id !== 1) {
      throw new Error("User not found");
    }

    return new Promise((resolve) => resolve(new User({id: 1, email: new Email("test@mail.com"), password: new Password(newPassword), username: "test", createdAt: new Date(), updatedAt: new Date()})));
  }
}
