const { Router } = require('express');
const router = Router();
const LoginController = require('../AuthControllers/LoginController');
const RegistrationController = require('../AuthControllers/RegistrationController');
const IsLoginUniqueController = require('../AuthControllers/IsLoginUniqueController');

router.post('/login', async (req, res) => LoginController(req, res));

router.post('/registration', async (req, res) =>
  RegistrationController(req, res),
);

router.post('/isUniqueLogin', async (req, res) =>
  IsLoginUniqueController(req, res),
);

module.exports = router;
