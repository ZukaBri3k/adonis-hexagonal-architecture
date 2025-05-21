import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm';
import { randomBytes } from 'crypto';
import { TokenType } from '#domain/entities/token_entity';
import LucidUserModel from '#models/lucid_model_user';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  declare token: string;

  @column()
  declare expiresAt: DateTime;

  @column()
  declare type: TokenType;

  @column({ isPrimary: true })
  declare userId: number;

  @belongsTo(() => LucidUserModel)
  declare user: BelongsTo<typeof LucidUserModel>;

  @beforeCreate()
  static generateToken(token: Token) {
    token.token = randomBytes(48).toString('hex');
  }

  @beforeCreate()
  static setExpiresAt(token: Token) {
    token.expiresAt = DateTime.now().plus({ hours: 1 });
  }
}