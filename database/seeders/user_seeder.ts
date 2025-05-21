import { UserFactory } from '#database/factories/user_factory'
import User from '#models/lucid_model_user';
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await UserFactory.createMany(10)
    await User.create({
      email: "admin@admin.com",
      password: "azerty",
      username: "admin",
    })
    await User.create({
      email: "kyrilldumerchat@gmail.com",
      password: "azerty",
      username: "kyrill",
    })
  }
}