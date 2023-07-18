const router = require("express").Router();

router
    .route("/")
    .get((req, res) => {
        res.send("Hello world")
    })

module.exports = router;