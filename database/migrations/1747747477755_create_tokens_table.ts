import { TokenType } from '#domain/entities/token_entity';
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'tokens';

  async up() {
    this.schema.createTable(this.tableName, (table) => {;
      table.string('token').notNullable();
      table.string('type').notNullable().checkIn(Object.values(TokenType));
      table.timestamp('expires_at').notNullable();

      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('cascade');

      table.primary(['token', "user_id"]);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}