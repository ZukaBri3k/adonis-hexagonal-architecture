import { User } from "#domain/entities/user_entity";
import { Email } from "#domain/valueObjects/email_vo";
import { Password } from "#domain/valueObjects/password_vo";
import { UserContract } from "#infrastructure/adapters/contracts/user_contract";

export class UserMapper {
  static toDomain(data: any): User {
    return new User(data)
  }

  static toContract(data: User): UserContract {
    return new UserContract({
      id: data.id,
      username: data.username,
      email: new Email(data.email),
      password: new Password(data.password),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }
}