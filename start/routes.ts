/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')


router.get('/', async () => {
  return {
    hello: 'world',
  }
}).use(middleware.auth())

router.get('/users/:id', [UsersController, "show"])
router.get('/users', [UsersController, "index"])
router.post('/users', [UsersController, "store"])
router.put('/users/:id', [UsersController, "update"])
router.delete('/users/:id', [UsersController, "destroy"])

router.post('/login', [AuthController, "login"])
router.get('/logout', [AuthController, "logout"])
router.post('/register', [AuthController, "register"])
router.post('/send-password-reset', [AuthController, "sendPasswordReset"])
router.post('/reset-password', [AuthController, "resetPassword"])

