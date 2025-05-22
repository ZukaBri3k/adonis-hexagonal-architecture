import { TokenNotFoundException } from '#domain/exceptions/token_exceptions';
import { TokenRepository } from '#domain/ports/token_repository';
import { TokenService } from '#domain/services/token_service';
import { TokenContract } from '#infrastructure/adapters/contracts/token_contract';
import { MockTokenRepository } from '#tests/mocks/repositories/mock_token_repository';
import app from '@adonisjs/core/services/app';
import { test } from '@japa/runner'

test.group('Token find by token', (group) => {
  group.setup(async () => {
    app.container.swap(TokenRepository, () => new MockTokenRepository())
  })

  group.teardown(() => {
    app.container.restore(TokenRepository)
  })

  test('Should retrieve token when token exists', async ({ assert }) => {
    const tokenService = await app.container.make(TokenService)

    const token = await tokenService.findByToken("testToken")

    assert.instanceOf(token, TokenContract)
    assert.equal(token.toEntity().token, "testToken")
  })

  test('Should throw TokenNotFoundException when token is not found', async ({ assert }) => {
    const tokenService = await app.container.make(TokenService)
    try {
      await tokenService.findByToken("testWrongToken")
      assert.fail();
    } catch (error) {
      assert.instanceOf(error, TokenNotFoundException);
    }
  })
})