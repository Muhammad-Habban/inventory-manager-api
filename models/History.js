const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  soldDate: {
    type: String,
    required: [true, "Please provide Sold Date"],
  },
  soldQuantity: {
    type: Number,
    required: [true, "Please provide Sold Quantity"],
  },

  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = mongoose.model("History", HistorySchema);
