const { Schema, model } = require('mongoose');

const user = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userTransactionCategories: [
    {
      transactionCategoryName: {
        type: String,
      },
      transactionCategoryType: {
        type: String,
        enum: ['income', 'expense'],
      },
    },
  ],
  transactions: [
    {
      transactionCategory: Schema.Types.ObjectId,
      transactionType: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = model('user', user);
