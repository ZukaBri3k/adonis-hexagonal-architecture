import { UserRepository } from "#domain/ports/user_repository";
import { LucidUserRepository } from "#infrastructure/adapters/repositories/lucid_user_repository";
import app from "@adonisjs/core/services/app";


app.container.bind(UserRepository, () => new LucidUserRepository());