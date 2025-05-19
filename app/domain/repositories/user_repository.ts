import { User } from "#domain/entities/user_entity";


export abstract class UserRepository {
  abstract findById(id: number): Promise<User | null>;
}
