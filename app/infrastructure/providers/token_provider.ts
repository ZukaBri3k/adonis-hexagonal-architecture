import { TokenRepository } from "#domain/ports/token_repository";
import { LucidTokenRepository } from "#infrastructure/adapters/repositories/lucid_token_repository";
import app from "@adonisjs/core/services/app";

app.container.bind(TokenRepository, () => new LucidTokenRepository());