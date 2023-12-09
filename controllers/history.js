const { StatusCodes } = require("http-status-codes");
// const mongoose = require("mongoose");

// const {
//   BadRequestError,
//   UnauthenticatedError,
//   NotFoundError,
// } = require("../errors");
const History = require("../models/History");

// Get History
const getProductsHistory = async (req, res) => {
  console.log("Getting history");
  const history = await History.find().populate("product");
  res.status(StatusCodes.OK).json({ total: history.length, history });
};

// Create Product History
const createProductHistory = async (req, res) => {
  console.log("Creating history");
  const { soldQuantity, productID } = req.body;
  if (!soldQuantity || !productID) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter all values" });
  }

  const date = new Date().toLocaleDateString();
  console.log("Created Date : " + date);
  const prod = await History.find({ product: productID });
  console.log("array : " + prod);
  let findProduct = null;
  if (prod.length > 0) {
    findProduct = prod.filter((p) => {
      return p.soldDate === date;
    })[0];
  }
  console.log(findProduct);
  if (findProduct) {
    console.log("product date : " + findProduct.soldDate);
    findProduct.soldQuantity += soldQuantity;
    await findProduct.save();
    console.log(findProduct);
    // res.status(StatusCodes.OK).json({ productExist: true, message: "Product already exist" });
    res
      .status(StatusCodes.OK)
      .json({ findProduct, message: "Product Updated" });
  } else {
    console.log("inside else ");
    const prodHistory = await History.create({
      soldDate: date,
      soldQuantity,
      product: productID,
    });
    console.log("product created : " + prodHistory);
    res
      .status(StatusCodes.OK)
      .json({ prodHistory, message: "Product successfully created" });
  }
};

module.exports = { getProductsHistory, createProductHistory };
