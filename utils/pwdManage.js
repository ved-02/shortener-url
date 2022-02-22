const bcrypt = require("bcrypt");
const saltRounds = 8;

async function hashPassword(password) {
    let hash = bcrypt.hash(password, saltRounds);
    return hash;
}

async function comparePassword(password, hash) {
    let ans = await bcrypt.compare(password, hash);
    return ans;
}

module.exports = {
    hashPassword,
    comparePassword
};