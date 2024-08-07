const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const {signupSchema, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

// router.get("/", (req, res) => {
//     res.status(200).send("Welcome to world best mern series by thapa technical");
// });


// We can use chaining here! 
// router.route("/").get((req, res) => {
//     res.status(200).send("Welcome this is second method to send data")
// })

// router.route('/register').get((req, res) => {
//     res.status(200).send("This is registration page")
// })

router.route("/").get(authControllers.home);
router.route("/register").post(validate(signupSchema),authControllers.register);
router.route("/login").post(validate(loginSchema),authControllers.login);
module.exports = router;