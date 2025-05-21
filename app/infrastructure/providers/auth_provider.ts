import { AuthRepository } from "#domain/ports/auth_repository";
import { AdonisAuthRepository } from "#infrastructure/adapters/repositories/adonis_auth_repository";
import app from "@adonisjs/core/services/app";
import { HttpContext } from "@adonisjs/core/http";


app.container.bind(AuthRepository, async (resolver) => {
  const ctx = await resolver.make(HttpContext)
  return new AdonisAuthRepository(ctx)
})