import { test } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import { UserContract } from '#infrastructure/adapters/contracts/user_contract';
import { UserNotFoundException } from '#domain/exceptions/user_exceptions';
import { UserService } from '#domain/services/user_service';
import { MockUserRepository } from '#tests/mocks/repositories/mock_user_repository.';

test.group('GetUserByEmail', (group) => {
  // We swap the UserRepository with our mock
  group.setup(async () => {
    app.container.swap(UserService, () => {
      return new UserService(new MockUserRepository());
    });
  });

  // We restore the UserRepository after the test
  group.teardown(() => {
    app.container.restore(UserService);
  })

  test('Should retrieve user when user exists', async ({ assert }) => {
    const userService = await app.container.make(UserService)

    const user = await userService.getUserByEmail("test@mail.com")

    assert.instanceOf(user, UserContract)
    assert.equal(user.toEntity().email, "test@mail.com")
  })

  test('Should throw UserNotFoundException when user is not found', async ({ assert }) => {
    const userService = await app.container.make(UserService)
    try {
      await userService.getUserByEmail("test1@mail.com")
      assert.fail();
    } catch (error) {
      assert.instanceOf(error, UserNotFoundException);
    }
  })
})