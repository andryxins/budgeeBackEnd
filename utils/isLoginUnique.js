const User = require('../Models/User');

module.exports = async login => {
  try {
    const candidate = await User.findOne({ login });

    if (candidate) {
      return false;
    }

    return true;
  } catch (e) {
    console.log(e);
  }
};
