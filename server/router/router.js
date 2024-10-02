const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.route("/").get(controller.home);

router.route("/studentSignup").post(controller.stdntSignup);

router.route("/registered_Students").get(controller.stdntDetails);

router.route("/total_Students").get(controller.totalStdnt);

module.exports = router;
