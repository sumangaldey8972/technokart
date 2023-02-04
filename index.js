const express = require("express");
const connect = require("./config/db");
const app = express();
const PORT = process.env.PORT || 8080;
const routerInvoice = require("./routes/invoice.routes");

app.use(express.json());

app.use("/invoice", routerInvoice);

app.get("/", (req, res) => {
  res.json("Welcome to invoice api.");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`Server started at ${PORT}.`);
});
