const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
const stdntSignupValidCheck = require("../validators/stdntSignupValidCheck");
const stdntSignupValidate = require("../middlewares/stdntSignupValidate");
const stdntLoginValidCheck = require("../validators/stdntLoginValidCheck");
const stdntLoginValidate = require("../middlewares/stdntLoginValidate");
const messAttendController = require("../controller/messAttendController");

router.route("/").get(controller.home);

router.route("/studentSignup").post(stdntSignupValidate(stdntSignupValidCheck), controller.stdntSignup);

router.route("/studentLogin").post(stdntLoginValidate(stdntLoginValidCheck), controller.stdntLogin);

router.route("/registered_Students").get(controller.stdntDetails);

router.route("/total_Students").get(controller.totalStdnt);

router.route("/loggedStudents").get(controller.loggedStudents);

router.route("/messAttend").post(messAttendController.messAttend);

module.exports = router;
