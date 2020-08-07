const User = require('../../Models/User');

module.exports = async (req, res, next) => {
  try {
    await User.updateOne(
      { _id: req.user.id },
      { $push: { transactions: req.body } },
    );
    return res.status(200).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
