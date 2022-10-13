const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const DataType = require("./data.js");

const data = require("../models/data.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        alldata: {
            type: new GraphQLList(DataType),
            resolve: async function () {
                const allData = await data.getAllData();

                return allData;
            }
        }
    })
});

module.exports = RootQueryType;
