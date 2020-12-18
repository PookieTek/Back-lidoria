const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
    User.findOne({pseudonym: req.body.pseudonym})
    .then(user => {
        if (!user)
            return res.status(401).json({error: "Invalid User found"});
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid)
                return res.status(401).json({error: "Invalid User"});
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'}
                )
            });
        }).catch(error => res.status(500).json({error}));
    }).catch(error => res.status(500).json({error}));
};

exports.signup = (req, res, next) => {
    if (!req.body.secret || req.body.secret !== "secret")
        return res.status(401).json({error: "Params Missing"});
    bcrypt.hash(req.body.password, 10)
    .then (hash => {
        const admin = new User({
            pseudonym: req.body.pseudonym,
            password: hash
        });
        admin.save()
            .then(() => res.status(201).json({message: "Success"}))
            .catch(error => res.status(401).json({error}));
    }).catch(error => res.status(500).json({error}));
};

exports.checkAuth = (req, res, next) => {
    return res.status(201).json({message: "ok"});
};