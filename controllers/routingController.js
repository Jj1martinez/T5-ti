const jwt = require("jsonwebtoken");
const secretKey = process.env.TOKEN_KEY || "ansd971298whdn1298dn10228yehnqd912d";
const User = require('../models').user;


async function verifyJwt(autorization, res) {
    const authHeader = autorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(403).send({ msg: "Inicie Sesion" });
    try {
        const info = jwt.verify(token, secretKey);
        const user = await User.findByPk(info.id);
        return user;
    } catch (error) {

    }
}

module.exports = {
    create(req, res) {
        return User.findAll({ where: { email: req.body.email } })
            .then((find) => {
                if (find[0]) {
                    const user = find[0];
                    if (user.password === req.body.password) {
                        const info = { id: user.id };
                        const accessToken = jwt.sign(info, secretKey);
                        return res.status(201).send({ accessToken });
                    } else {
                        return res.status(403).send({ message: "Wrong password" });
                    }
                } else {
                    return res.status(404).send({ message: "User not found" });
                }
            })
            .catch((error) => res.status(500).send(error));
    },
    async autenticate(req, res, next) {
        const user = await verifyJwt(req.headers.authorization, res);
        if (!user) return res.send({ msg: "Token malo" });
        const baseUrl = req.baseUrl.substring(1);
        req.user = user;
        if (baseUrl === "admin" && user.role === 0) return next();
        if (baseUrl === "user") return next();
        return res.send({ msg: "Acceso denegado" });
    }
}