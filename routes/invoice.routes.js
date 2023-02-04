const express = require("express");
const validateInvoiceDate = require("../middlewares/validateInvoiceDate");
const InvoiceModel = require("../models/invoice.model");
const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    let data = await InvoiceModel.find();
    res.status(200).send({ invoices: data });
  } catch (err) {
    res.status(500).send({ message: "error" });
  }
});

// Endpoint to enter new invoice details
router.post("/create", validateInvoiceDate, async (req, res) => {
  let { invoiceNumber } = req.body;
  try {
    let isInvoice = await InvoiceModel.findOne({ invoiceNumber });
    if (isInvoice) {
      res.status(401).send({ message: "invoice number already exist" });
    } else {
      const invoice = await InvoiceModel.create(req.body);
      res
        .status(200)
        .send({ message: "invoice created successfully", invoice: invoice });
    }
  } catch (e) {
    res.status(404).json(e.message);
  }
});

// Endpoint to update a specific invoice based on invoice number
router.patch(
  "/update/:invoiceNumber",
  validateInvoiceDate,
  async (req, res) => {
    const { invoiceNumber } = req.params;
    const { invoiceDate, invoiceAmount } = req.body;
    try {
      let updatedInvoice = await InvoiceModel.findOneAndUpdate(
        { invoiceNumber: invoiceNumber },
        {
          invoiceDate: invoiceDate,
          invoiceAmount: invoiceAmount,
        },
        { new: true }
      );
      res
        .status(200)
        .send({
          message: "invoice updated successfull!",
          invoice: updatedInvoice,
        });
    } catch (e) {
      res.status(404).json(e.message);
    }
  }
);

// Endpoint to delete a specific invoice based on invoice number
router.delete("/delete/:invoiceNumber", async (req, res) => {
  const { invoiceNumber } = req.params;
  try {
    let invoice = await InvoiceModel.findOne({ invoiceNumber });
    if (!invoice) {
      res.status(401).send({ message: "no invoice found" });
    } else {
      await invoice.delete();
      res.status(200).send({ message: "invoice deleted successfull" });
    }
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

module.exports = router;
