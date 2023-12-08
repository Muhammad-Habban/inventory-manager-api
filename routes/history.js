const express = require("express");
const router = express.Router();
const {
  getProductsHistory,
  createProductHistory,
  updateProductHistory,
} = require("../controllers/history");
const { userAuthMiddleware } = require("../middlewares/userAuth");

// Attaching user auth middleware for all task routes
router.use(userAuthMiddleware);

router.get("/", getProductsHistory);
router.post("/", createProductHistory);
router.patch("/", updateProductHistory);

module.exports = router;
