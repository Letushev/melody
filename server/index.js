const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Melody = require('./resolvers/Melody');

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Melody,
  },
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
});

server.start({
  bodyParserOptions: { limit: "10mb", type: "application/json" }
},() => console.log(`Server is running on http://localhost:4000`));
