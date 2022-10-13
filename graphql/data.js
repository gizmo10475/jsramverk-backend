const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const DataType = new GraphQLObjectType({
    name: 'data',
    fields: () => ({
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        collab: { type: new GraphQLList(GraphQLString) },
    })
})

module.exports = DataType;