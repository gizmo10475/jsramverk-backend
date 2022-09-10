const { MongoExpiredSessionError } = require("mongodb");
const database = require("../db/database.js");
const ObjectId = require('mongodb').ObjectId;

const data = {
    getAllData: async function getAllData() {
        let db;

        try {
            db = await database.getDb();

            const allDocs = await db.collection.find().toArray();

            return allDocs;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                },
            };
        } finally {
            await db.client.close();
        }
    },
    insertDoc: async function insertDoc(newDoc) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newDoc);

            return {
                ...newDoc,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },

    updateDoc: async function updateDoc(oldId, newContent) {
        let db;

        let filter = {
            _id: ObjectId(oldId)
        };


        try {
            db = await database.getDb();

            const updateObject = await db.collection.updateOne( filter , { $set: { "content": newContent }});
            console.log(updateObject);

            return updateObject;
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }

    }

};

module.exports = data;