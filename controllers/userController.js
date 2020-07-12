const User = require('../models').user;

module.exports = {
    list(req, res) {
        return User
            .findAll({
                order: [
                    ['createdAt', 'DESC'],
                ]})
            .then((users) => res.status(200).send(users))
            .catch((error) => { res.status(500).send(error); });
    },
    getById(req, res) {
        return User
            .findByPk(req.params.id)
            .then(async(user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                else return res.status(200).send(user);
            })
            .catch((error) => res.status(500).send(error));
    },

    add(req, res) {
        User.findAll({ where: { email: req.body.email } }).then((find) => {
            if (!find[0]) {
                return User
                    .create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password,
                        role: req.body.role,
                    })
                    .then((user) => res.status(201).send(user))
                    .catch((error) => res.status(500).send(error));
            }
            return res.status(404).send({
                message: 'Email already used',
            });
        });
    },
    update(req, res) {
        return User
            .findByPk(req.params.id, {})
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password,
                        role: req.body.role,
                    })
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.status(500).send(error));
            })
            .catch((error) => res.status(500).send(error));
    },

    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User not found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send("User Deleted"))
                    .catch((error) => res.status(500).send(error));
            })
            .catch((error) => res.status(500).send(error));
    },
}
