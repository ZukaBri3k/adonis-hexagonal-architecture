import { CreateUserDTO, UpdateUserDTO } from "#domain/dto/user_dto";
import { User } from "#domain/entities/user_entity";


export abstract class UserRepository {
  abstract findById(id: number): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract create(user: CreateUserDTO): Promise<User>;
  abstract update(id: number, userProps: UpdateUserDTO): Promise<User>;
  abstract delete(id: number): Promise<User>;
}
