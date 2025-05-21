import { Token } from "#domain/entities/token_entity";

export abstract class MailRepository {
    
    abstract sendPasswordResetEmail(email: string, token: Token): Promise<void>;
}