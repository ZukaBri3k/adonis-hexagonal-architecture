import { Token } from "#domain/entities/token_entity";
import { MailRepository } from "#domain/ports/mail_repository";
import { inject } from "@adonisjs/core";
import Mail from "@adonisjs/mail/services/main";

@inject()
export class AdonisMailRepository implements MailRepository {
    constructor(private mail: typeof Mail) {}
    
    async sendPasswordResetEmail(email: string, token: Token): Promise<void> {
        await this.mail.send((message: any) => {
          message
            .to(email)
            .from('reset-password@adonisjs.com')
            .subject('Reset Password')
            .text(`Click on the link to reset your password: ${token.token}`)
        })
    }
}
