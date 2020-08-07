const isLoginUnque = require('../../utils/isLoginUnique');
const errorHandler = require('../../utils/ErrorHandler');

module.exports = async (req, res) => {
  try {
    const { login } = req.body;

    const isloginUniqueResault = await isLoginUnque(login);

    if (isloginUniqueResault) {
      return res.status(200).json({
        message: 'login is unique',
      });
    } else {
      return res.status(409).json({ message: 'Login is already exist' });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
