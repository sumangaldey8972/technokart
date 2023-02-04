const InvoiceModel = require("../models/invoice.model");

// Middleware function to validate invoice date
const validateInvoiceDate = async (req, res, next) => {
  const { invoiceNumber } = req.body;
  let data = await InvoiceModel.find();
  if (data.length === 0) {
    next();
  } else {
    InvoiceModel.find({ invoiceNumber: { $lt: invoiceNumber } })
      .sort({ invoiceNumber: -1 })
      .limit(1)
      .then((previousInvoice) => {
        // console.log("prev invoice", previousInvoice);
        InvoiceModel.find({ invoiceNumber: { $gt: invoiceNumber } })
          .sort({ invoiceNumber: 1 })
          .limit(1)
          .then((nextInvoice) => {
            // console.log("next invoice", nextInvoice);
            if (
              nextInvoice.length === 0 &&
              req.body.invoiceDate < previousInvoice[0].invoiceDate
            ) {
              res
                .status(401)
                .send({
                  message: `invoice date should be greater than or equals to ${previousInvoice[0].invoiceDate}`,
                });
            } else {
              if (
                previousInvoice.length === 0 ||
                nextInvoice.length === 0 ||
                (req.body.invoiceDate >= previousInvoice[0].invoiceDate &&
                  req.body.invoiceDate <= nextInvoice[0].invoiceDate)
              ) {
                next();
              } else {
                res.status(404).send({
                  message: "Invalid invoice date! please select another date",
                });
              }
            }
          });
      });
  }
};

module.exports = validateInvoiceDate;
