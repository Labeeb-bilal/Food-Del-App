const { Router } = require("express");
const { hanldeUserSignup, handleUserLogin } = require("../controller/userController");
const router = Router();


router.post('/signup',hanldeUserSignup);
router.post('/login', handleUserLogin);

module.exports = router
