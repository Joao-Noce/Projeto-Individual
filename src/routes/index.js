var express = require("express");
var router = express.Router();

router.get("/Site_Login", function (req, res) {
    res.render("Site_Login");
});

module.exports = router;