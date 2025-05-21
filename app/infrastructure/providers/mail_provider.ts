import { MailRepository } from "#domain/ports/mail_repository";
import { AdonisMailRepository } from "#infrastructure/adapters/repositories/adonis_mail_repository";
import app from "@adonisjs/core/services/app";
import mail from "@adonisjs/mail/services/main";

app.container.bind(MailRepository, () => new AdonisMailRepository(mail));