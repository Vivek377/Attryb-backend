const express = require("express");
const InventoryModel = require("../models/inventory.model");
const authentication = require("../middleware/auth")
const inventoryRoute = express.Router();

inventoryRoute.get("/", async (req, res) => {
    try {
        const items = await InventoryModel.find();
        res.status(200).send(items);

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})


inventoryRoute.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const items = await InventoryModel.findOne({ _id: id });
        res.status(200).send(items);

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})


inventoryRoute.post("/add", authentication, async (req, res) => {
    try {

        const items = InventoryModel(req.body);
        await items.save()
        res.status(200).send({ msg: "new item added" });

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})


inventoryRoute.patch("/edit/:id", authentication, async (req, res) => {
    try {
        const { id } = req.params;
        await InventoryModel.findByIdAndUpdate({ _id: id }, req.body);

        res.status(200).send({ msg: "item updated" });

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message })
    }
})


inventoryRoute.delete("/delete/:id", authentication, async (req, res) => {
    try {
        const { id } = req.params;
        await InventoryModel.findByIdAndDelete({ _id: id });

        res.status(200).send({ msg: "item deleted" });

    } catch (e) {
        console.log(e);
        res.status(400).send({ err: e.message });
    }
})

module.exports = inventoryRoute;
