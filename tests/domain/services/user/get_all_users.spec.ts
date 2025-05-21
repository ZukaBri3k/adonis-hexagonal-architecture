import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { UserRepository } from '#domain/ports/user_repository'
import { MockUserRepository } from '#tests/mocks/repositories/mock_user_repository.'
import { UserService } from '#domain/services/user_service';
import { UserContract } from '#infrastructure/adapters/contracts/user_contract';

test.group('GetAllUsers', (group) => {
  // We swap the UserRepository with our mock
  group.setup(async () => {
    app.container.swap(UserRepository, () => {
      return new MockUserRepository();
    });
  });

  // We restore the UserRepository after the test
  group.teardown(() => {
    app.container.restore(UserRepository);
  })

  test('Should get all users', async ({ assert }) => {
    const userService = await app.container.make(UserService)

    const users = await userService.getAllUsers()

    assert.instanceOf(users, Array<UserContract>)
    assert.instanceOf(users[0], UserContract)
  })
})