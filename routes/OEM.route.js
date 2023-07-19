const express = require("express");
const OEMModel = require("../models/OEM.model");
const OEMRoute = express.Router();


OEMRoute.get("/", async (req, res) => {
    try {
        const { q } = req.query;

        if (q) {

            const items = await OEMModel.find({
                $and: [
                    { title: { $regex: q, $options: "i" } },
                    // { model: { $regex: q.model, $options: "i" } },
                    // { modelYear: { $regex: q, $options: "s" } }
                ]
            })

            res.status(200).send(items);

        } else {
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
