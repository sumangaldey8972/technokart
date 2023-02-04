const { Schema, model } = require("mongoose");

const InvoiceSchema = new Schema({
  invoiceDate: { type: String, required: true },
  invoiceNumber: { type: Number, required: true, unique: true },
  invoiceAmount: { type: Number, required: true },
});

const InvoiceModel = new model("invoice", InvoiceSchema);

module.exports = InvoiceModel;
