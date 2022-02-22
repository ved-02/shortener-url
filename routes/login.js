const { Router } = require("express");
const { comparePassword } = require("../utils/pwdManage");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const router = Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        res.json({ error: "missing credentials" });
    else {
        const user = await User.findOne({ username: username });
        if (!user) {
            res.json({ error: "incorrect credentials" });
        }
        else {
            const matchPwd = await comparePassword(password, user.password);
            if (matchPwd) {
                const token = jwt.sign({ id: user._id, username: user.username }, process.env.TOKEN_KEY, { expiresIn: "1d" });
                res.json({ status: "ok", data: token });
            }
            else
                res.json({ error: "incorrect credentials" });
        }
    }
});

module.exports = router;