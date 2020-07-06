const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.js');
const errorHandler = require('../../utils/errorHandler');

module.exports = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login: login }, err => {
      if (err) {
        res.sendStatus(500);
        return console.log(err);
      }
    });

    if (user) {
      const passwordResault = bcrypt.compareSync(password, user.password);

      if (passwordResault) {
        const token = jwt.sign(
          {
            login: user.login,
            userId: user._id,
          },
          process.env.JWT,
          { expiresIn: 60 * 60 },
        );

        return res.status(200).json({
          token: `Bearer ${token}`,
        });
      } else {
        return res.status(401).send('wrong password');
      }
    } else {
      return res.status(404).send('user is not exist');
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
