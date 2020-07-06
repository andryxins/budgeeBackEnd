const bcrypt = require('bcryptjs');
const User = require('../../models/user.js');
const passwordValidation = require('../../utils/passwordValidation');
const errorHandler = require('../../utils/ErrorHandler');

module.exports = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!passwordValidation(password)) {
      return res.status(403).json({
        message: 'not valid password',
      });
    }

    const candidate = await User.findOne({ login: login }, err => {
      if (err) {
        res.sendStatus(500);
        return console.log(err);
      }
    });

    if (candidate) {
      return res.status(409).send('Login is already exist');
    }

    const salt = bcrypt.genSaltSync(10);
    const saltedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ login: login, password: saltedPassword });
    return await newUser.save(null, (err, content) => {
      if (err) {
        res.sendStatus(500);
        return console.log(err);
      }
      return res.sendStatus(201);
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
