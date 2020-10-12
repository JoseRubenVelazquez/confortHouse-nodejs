const mongoose = require("mongoose");
const config = require("./config");

const MONGODB_URI = 'mongodb+srv://Ruben:ujm4AQ4VM41tU9g0@cluster0.leugp.mongodb.net/confortHouse'

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Mongodb is connected to", db.connection.host))
  .catch((err) => console.error(err));

