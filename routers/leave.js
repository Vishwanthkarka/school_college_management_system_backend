const express = require("express")
const router = express.Router()
const {addLeave,viewLeave,viewStudent,viewLeaveLecture,updatePermission}= require("../controllers/leave")
const {isLogined,customRole} = require("../middleware/user")

router.route("/addleave").post(isLogined ,addLeave)
router.route("/viewleaveuser").get(viewLeave);
router.route("/viewleavelecture").get(isLogined ,customRole("lecture"),viewLeaveLecture);
router.route("/viewleavestudent").get(isLogined ,customRole("lecture"),viewStudent);
router.route("/updateleave/:id").put(updatePermission);

// customRole
module.exports = router;