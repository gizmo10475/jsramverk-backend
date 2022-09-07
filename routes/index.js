var express = require('express');
var router = express.Router();

const dataModel = require("../models/data");

router.get('/', async (req, res) => {

    const allData = await dataModel.getAllData();


    res.json(allData);
});



module.exports = router;
