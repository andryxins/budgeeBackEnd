const defaultUserCategories = require('./UserCategories');

class User {
  constructor(login, password) {
    this.login = login;
    this.password = password;
    this.userTransactionCategories = defaultUserCategories;
    this.transactions = [];
  }
}

module.exports = User;
