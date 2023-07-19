const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DealerModel = require("../models/dealers.model");
const dealersRoute = express.Router();

dealersRoute.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await DealerModel.findOne({ email });

        if (user) {
            res.status(200).send({ msg: "User already exists" });

        } else {

            bcrypt.hash(password, 5, async (err, hashed) => {
                
                if (err) {
                    res.status(400).send(err);
                } else {

                    const newUser = await DealerModel({ name, email, password: hashed });
                    await newUser.save();
                    res.status(200).send({ msg: "User Signed up" })
                }
            })
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})


dealersRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await DealerModel.findOne({ email });

        if (user) {

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(400).send({ err: "invalid password" })
                } else {
                    res.status(200).send({ msg: "Login Success", token: jwt.sign({ userId: user._id }, "secret") })
                }
            })

        } else {
            res.status(200).send({ msg: "No user found" });
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

module.exports = dealersRoute;
