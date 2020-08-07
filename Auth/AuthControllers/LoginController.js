const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../Models/User');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login: login });

    if (!user) {
      return res.status(401).json({ message: 'login or password is invalid' });
    }

    const passwordResault = bcrypt.compareSync(password, user.password);

    if (!passwordResault) {
      return res.status(401).json({ message: 'login or password is invalid' });
    }

    const token = jwt.sign(
      {
        login: user.login,
        id: user._id,
      },
      process.env.JWT,
      { expiresIn: 60 * 60 },
    );

    return res.status(200).json({
      token: `Bearer ${token}`,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};
