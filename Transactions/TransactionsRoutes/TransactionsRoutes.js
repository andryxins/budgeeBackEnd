const { Router } = require('express');
const router = Router();
const checkAuthAndGetUser = require('../../Middlewares/checkAuthAndGetUser');
const getBalanceAndLastTransactions = require('../TransactionsControllers/getBalanceAndLastTransactions');
const addNewTransaction = require('../TransactionsControllers/addNewTransaction');

router.get('/', checkAuthAndGetUser, getBalanceAndLastTransactions); // get balance and last five transactions

router.post('/new-category', () => {}); // add new category

router.post('/new-transaction', checkAuthAndGetUser, addNewTransaction); // add new tranaction

module.exports = router;
