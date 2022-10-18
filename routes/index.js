var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const config = require("../config.json");

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

router.get("/log", async (req, res) => {
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

router.put('/addCollab', async (req, res) => {
    try {
        const oldId = req.body.id;
        const newCollab = req.body.newCollab;

        const result = await dataModel.addCollabToDoc(oldId, newCollab);

        return res.status(201).json({ data: result });

    } catch (err) {
        console.error(err.message);
        res.send(400).send('Server Error');
    }
});


router.post("/sendmail", (req, res) => {
    let user = req.body.email;
    let sendTO = req.body.sendToEmail;

    sendMail(user, sendTO, (err, info) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: "Failed to send email" });
        } else {
            // console.log("Email has been sent");
            res.send(info);
        }
    });

    return res.status(201).json({});
});

const sendMail = (user, sendTO, callback) => {
    let transporter = nodemailer.createTransport({
        service: "Outlook365",
        host: "smtp.office365.com",
        port: "587",
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
        auth: {
            user: config.sendermail,
            pass: config.senderpassword
        },
    });

    const html = "<h3>" + user + " bjöd in dig till sitt dokument </h3> " +
        " <p> Logga in på <a><i> https://www.student.bth.se/~edfa18/editor/jsramverk-editor/login </i></a> för att ta del av dokumentet.";

    const mailOptions = {
        from: config.sendermail,
        to: sendTO,
        subject: "Eddietor - Inbjudan tilll dokument",
        html: html
    };
    transporter.sendMail(mailOptions, callback);
}

module.exports = router;
