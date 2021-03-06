const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const AuthRoutes = require('./Auth/AuthRoutes/AuthRoutes');
const TransactionsRoutes = require('./Transactions/TransactionsRoutes/TransactionsRoutes');

const PORT = process.env.PORT || 8080;

class Server {
  constructor() {
    this.server = null;
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: 'http://localhost:3000' }));
    this.server.use(
      morgan(':method :url :status :res[content-length] - :response-time ms'),
    );
  }

  initRoutes() {
    this.server.use('/auth', AuthRoutes);
    this.server.use('/transactions', TransactionsRoutes);
  }

  initServer() {
    this.server = express();
  }

  async initDb() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      console.log('DB connected');
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }

  initListening() {
    this.server.listen(PORT, () => {
      console.log('Server started listening on port', PORT);
    });
  }

  async start() {
    try {
      this.initServer();
      this.initMiddlewares();
      this.initRoutes();
      await this.initDb();
      this.initListening();
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
}

module.exports = new Server();
