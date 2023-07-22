const express = require("express");
const OEMModel = require("../models/OEM.model");
const OEMRoute = express.Router();


OEMRoute.get("/", async (req, res) => {
    try {
        const { q, sortBy, order } = req.query;

        if (q) {

            const items = await OEMModel.find({
                $and: [
                    { title: { $regex: q, $options: "i" } },
                ]
            })

            res.status(200).send(items);

        } else if (sortBy === "price") {

            if (order === "asc") {
                const items = await OEMModel.find().sort({ "price": 1 });
                res.status(200).send(items);

            } else {
                const items = await OEMModel.find().sort({ "price": -1 });
                res.status(200).send(items);
            }
        } else if (sortBy === "mileage") {

            if (order === "asc") {
                const items = await OEMModel.find().sort({ "mileage": 1 });
                res.status(200).send(items);

            } else {
                const items = await OEMModel.find().sort({ "mileage": -1 });
                res.status(200).send(items);
            }

        } else if (sortBy === "color") {

            const items = await OEMModel.find({
                $and: [
                    { colors: { $regex: order, $options: "i" } },
                ]
            })

            res.status(200).send(items);
        }
        else {
            const items = await OEMModel.find();
            res.status(200).send(items);
        }

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})


OEMRoute.get("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const items = await OEMModel.findOne({ _id: id });
        res.status(200).send(items);

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})


OEMRoute.post("/add", async (req, res) => {
    try {

        const item = OEMModel(req.body);
        await item.save();

        res.status(200).send({ msg: "new item added" })

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})

module.exports = OEMRoute;
