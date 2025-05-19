import factory from '@adonisjs/lucid/factories'
import User from '#models/lucid_model_user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.internet.username(),
      password: "azerty",
      email: faker.internet.email(),
    }
  })
  .build()