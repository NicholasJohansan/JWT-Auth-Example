const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware').default;

// Auth Middlewares
router.use([
  '/info',
  '/logout',
  '/delete'
], authMiddleware);

/* POST register user. */
router.post('/register', userController.register);

/* POST login user. */
router.post('/login', userController.login);

/* POST verify user credentials */
router.post('/verify', userController.verify);

/* GET user info */
router.get('/info', userController.info);

/* POST logout user */
router.post('/logout', userController.logout);

/* DELETE user */
router.delete('/delete', userController.delete);

module.exports = router;
