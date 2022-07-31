import { ApolloServer, gql } from "apollo-server";

import { PRODUCTS } from "./src/core-utils/constants";

// Scalar types - String , Int , Float , Boolean ,ID!
const typeDefs = gql`
  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }

  input ProductFilter {
    onSale: Boolean!
  }

  type Query {
    products(filter: ProductFilter): [Product!]
    productById(id: String): Product!
  }
`;

const resolvers = {
  Query: {
    products: (_parent, args, _context, _info) => {
      let filteredProducts = PRODUCTS;
      if (args?.filter) {
        let { onSale } = args.filter;
        filteredProducts = filteredProducts.filter((product) => {
          return product?.onSale === onSale;
        });
      }
      return filteredProducts;
    },
    productById: (_parent, args, _context, _info) => {
      return PRODUCTS.find((product) => {
        return product?.id === args?.id;
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: {
    dummy: {
      Name: "Abhigyan Pandey",
      Age: 23,
    },
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server ready at port : ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
