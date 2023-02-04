const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://sd:sd@cluster0.3vmvgom.mongodb.net/invoice"
  );
};

module.exports = connect;
