function computeBalance(arr) {
  return arr.reduce((acc, t) => {
    if (t.transactionType === 'expense') return acc - t.quantity;

    if (t.transactionType === 'income') return acc + t.quantity;

    return acc;
  }, 0);
}

module.exports = async (req, res, next) => {
  try {
    const responce = {
      balance: computeBalance(req.user.transactions),
      lastTransactions: req.user.transactions.slice(-5),
    };

    return res.status(200).json(responce);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
