const { MongoExpiredSessionError } = require("mongodb");
const database = require("../db/database.js");
const ObjectId = require('mongodb').ObjectId;

const data = {
    getAllData: async function getAllData() {
        let db;

        try {
            db = await database.getDb();

            const allWines = await db.collection.find().toArray();

            return allWines;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    }
}

module.exports = data;
