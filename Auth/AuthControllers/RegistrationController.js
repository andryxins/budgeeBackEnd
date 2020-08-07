const bcrypt = require('bcryptjs');
const UserSchema = require('../../Models/User');
const User = require('../../User/User');
const passwordValidation = require('../../utils/passwordValidation');
const isLoginUnique = require('../../utils/isLoginUnique');
const errorHandler = require('../../utils/ErrorHandler');

module.exports = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!passwordValidation(password)) {
      return res.status(403).json({
        message: 'not valid password',
      });
    }

    const isloginUniqueResault = await isLoginUnique(login);

    if (!isloginUniqueResault) {
      return res.status(409).json({ message: 'Login is already exist' });
    }

    const salt = bcrypt.genSaltSync(10);
    const saltedPassword = bcrypt.hashSync(password, salt);

    const user = new User(login, saltedPassword);

    const newUser = new UserSchema(user);
    await newUser.create(newUser);

    return res.status(200).send();
  } catch (e) {
    errorHandler(res, e);
  }
};
