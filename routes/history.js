const express = require("express");
const router = express.Router();
const {
  getProductsHistory,
  createProductHistory,
} = require("../controllers/history");
const { userAuthMiddleware } = require("../middlewares/userAuth");

// Attaching user auth middleware for all task routes
router.use(userAuthMiddleware);

router.get("/", getProductsHistory);
router.post("/", createProductHistory);

module.exports = router;
