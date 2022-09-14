var express = require('express');
var router = express.Router();

const dataModel = require("../models/data");

router.get("/", async (req, res) => {
    try {
        const allData = await dataModel.getAllData();

        res.json(allData);
    } catch (err) {
    console.error(err.message);
    res.send(400).send('Server Error');

    }
});

router.post("/", async (req, res) => {
    const newDoc = req.body;

    const result = await dataModel.insertDoc(newDoc);
    return res.status(201).json({ data: result });
});

router.put('/', async (req, res) => {
    try {
        const oldId = req.body.id;
        const newContent = req.body.newContent;

        const result = await dataModel.updateDoc(oldId, newContent);

        return res.status(201).json({ data: result });

    } catch (err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});



module.exports = router;