import { UserRepository } from "#domain/repositories/user_repository";
import { LucidUserRepository } from "#infrastructure/repositories/lucid_user_repository";
import app from "@adonisjs/core/services/app";


app.container.bind(UserRepository, () => new LucidUserRepository());