const controller = require("../../controllers/auth.controller");
const router = require('express').Router();

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post(
    "/signup",
    controller.signup
);

router.post("/signin", controller.signin);

module.exports = router