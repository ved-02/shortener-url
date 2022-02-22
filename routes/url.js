const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const URL = require("../model/url");


router.use(auth);
router.get("/", (req, res) => {
    const token = req.body.token;
    var decoded;
    try {
        decoded = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (error) {
        res.json({ error: "unexpected error occured" });
    }
    // console.log(decoded)
    URL.find({ createdBy: decoded.id }, (err, urls) => {
        if (err)
            res.json({ error: "unexpected error occured" });
        else if (urls)
            res.json({ urls });
    })
});
router.post("/", async (req, res) => {
    const longURL = req.body.longURL;
    const shortURL = req.body.shortURL;
    const token = req.body.token;
    const check = await URL.findOne({ shortURL: shortURL });
    if (!check) {
        var decoded;
        try {
            decoded = jwt.verify(token, process.env.TOKEN_KEY);
        } catch (error) {
            res.json({ error: "unexpected error occured" });
        }
        const createdBy = decoded.id;
        if (!longURL || !shortURL || !createdBy)
            res.json({ error: "enter details correctly" });
        try {
            const response = URL.create({ longURL: longURL, shortURL: shortURL, createdBy: createdBy });
            res.json({ status: "created" });
        } catch (error) {
            res.json({ error: "something went wrong" });
        }
    }
    else 
    {
        res.json({error: "short url already occupied"});
    }
})
module.exports = router;