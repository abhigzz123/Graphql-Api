import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at port : ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
