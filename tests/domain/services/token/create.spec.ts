import { test } from '@japa/runner';
import app from '@adonisjs/core/services/app';
import { TokenRepository } from '#domain/ports/token_repository';
import { MockTokenRepository } from '#tests/mocks/repositories/mock_token_repository';
import { TokenService } from '#domain/services/token_service';
import { TokenContract } from '#infrastructure/adapters/contracts/token_contract';
import { User } from '#domain/entities/user_entity';
import { Email } from '#domain/valueObjects/email_vo';
import { Password } from '#domain/valueObjects/password_vo';
import { TokenType } from '#domain/entities/token_entity';
import { TokenCreationException } from '#domain/exceptions/token_exceptions';

test.group('Token create', (group) => {
  group.setup(async () => {
    app.container.swap(TokenRepository, () => new MockTokenRepository());
  });

  group.teardown(() => {
    app.container.restore(TokenRepository);
  });

  test('Should create a token', async ({ assert }) => {
    const tokenService = await app.container.make(TokenService);

    const token = await tokenService.create(new User({ id: 1, email: new Email("test@mail.com"), password: new Password("Test1234!"), username: "test", createdAt: new Date(), updatedAt: new Date() }), TokenType.RESET_PASSWORD);

    assert.instanceOf(token, TokenContract);
    assert.equal(token.toEntity().type, TokenType.RESET_PASSWORD);
    assert.equal(token.toEntity().userId, 1);
  });

  test('Should throw TokenCreationException when token already exists', async ({ assert }) => {
    const tokenService = await app.container.make(TokenService);
    try {
      await tokenService.create(new User({ id: 2, email: new Email("test@mail.com"), password: new Password("Test1234!"), username: "test", createdAt: new Date(), updatedAt: new Date() }), TokenType.RESET_PASSWORD);
      assert.fail();
    } catch (error) {
      assert.instanceOf(error, TokenCreationException);
    }
  });
});