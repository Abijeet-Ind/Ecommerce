const router = require("express").Router();
const userController = require('./../controller/userController');

router.post('/signup', userController.signup);
router.post('/signup/:admin', userController.signup);

router.post('/login', userController.login);
router.post('/login/:admin', userController.login);

router.get('/logout', (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        status: "success"
    })
});
module.exports = router;