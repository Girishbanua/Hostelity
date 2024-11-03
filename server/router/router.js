const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
const stdntSignupValidCheck = require("../validators/stdntSignupValidCheck");
const stdntSignupValidate = require("../middlewares/stdntSignupValidate");
const stdntLoginValidCheck = require("../validators/stdntLoginValidCheck");
const stdntLoginValidate = require("../middlewares/stdntLoginValidate");
const messAttendController = require("../controller/messAttendController");
const authMiddleware = require("../middlewares/authMiddleware");
const roomController = require("../controller/roomController");
const stdntUpdateValidCheck = require("../validators/stdntUpdateValidCheck");
const stdntUpdateValidate = require("../middlewares/stdntUpdateValidate");


router.route("/").get(controller.home);

router.route("/studentSignup").post(controller.stdntSignup,stdntSignupValidate(stdntSignupValidCheck));

router.route("/studentLogin").post(stdntLoginValidate(stdntLoginValidCheck), controller.stdntLogin);

router.route("/registered_Students").get(controller.stdntDetails);

router.route("/total_Students").get(controller.totalStdnt);

router.route("/loggedStudents").get(controller.loggedStudents);

router.route("/messAttend").post(messAttendController.messAttend);

router.route("/user").get(authMiddleware, controller.user);

router.route(("/messMenu")).get(controller.messMenu);

router.route(("/updateUser")).patch(controller.userUpdate);

router.route("/createRoom").post(roomController.createRoom);

router.route("/getAllRoom").get(roomController.getAllRooms);

router.route("/updateRoom").patch(stdntUpdateValidate(stdntUpdateValidCheck) ,roomController.updateRoom);

module.exports = router;
