const { Router } = require("express");
const { hashPassword } = require("../utils/pwdManage");
const User = require("../model/user");

const router = Router();
router.post("/", async (req, res) => {
    const username = req.body.username;
    const plainPassword = req.body.password;
    if (!username || typeof username !== 'string') {
        res.json({ error: "incorrect username" });
    }
    else if (!plainPassword || typeof plainPassword !== 'string') {
        res.json({ error: "incorrect password" });
    }
    else {
        const checkDuplicate = await User.findOne({ username: username })
        if (checkDuplicate) {
            res.json({ error: "username already exist" });
        }
        else {
            const hashPwd = await hashPassword(plainPassword);
            try {
                const response = await User.create({ username: username, password: hashPwd });
                // console.log(response);
                res.json({ status: "created" });
            } catch (error) {
                console.log(JSON.stringify(error));
                res.json({ error: "something went wrong" });
            }
        }
    }
});

module.exports = router;