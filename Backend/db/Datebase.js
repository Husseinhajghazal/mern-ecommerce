const mongoose = require("mongoose");

const connetDatabase = () => {
  mongoose
    .connect("YOUR_URL", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connetDatabase;
