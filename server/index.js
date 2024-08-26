

const express = require('express')
const { ApolloServer } = require('@apollo/server')
// ApolloServer is used to create a GraphQL server that will handle queries, mutations, and subscriptions according to the schema you define.
const bodyParser = require("body-parser")
const cors = require('cors');
const { expressMiddleware } = require('@apollo/server/express4');
const { default: axios } = require('axios');
// integrate Apollo Server with Express

const { USERS } = require("./user");
const { TODOS } = require("./todo");



 // Type definitions define the shape of the data that your GraphQL API can return, as well as the operations (queries, mutations, subscriptions) that clients can perform. These type definitions are written using the GraphQL schema definition language (SDL)
    // Queries: Define the read operations that clients can perform
    // Mutations: Define the write operations (like creating, updating, or deleting data).
    // Subscriptions: Define real - time update    //

    // Resolvers are the functions that handle the logic behind the operations defined in your schema. When a client queries your GraphQL API, the resolvers are responsible for fetching the data, processing it, and returning the response.

    async function startServer() {
        const app = express();
        const server = new ApolloServer({
          typeDefs: `
              type User {
                  id: ID!
                  name: String!
                  username: String!
                  email: String!
                  phone: String!
                  website: String!
              }
      
              type Todo {
                  id: ID!
                  title: String!
                  completed: Boolean
                  user: User
              }
      
              type Query {
                  getTodos: [Todo]
                  getAllUsers: [User]
                  getUser(id: ID!): User
              }
      
          `,
          resolvers: {
            Todo: {
              user: (todo) => USERS.find((e) => e.id === todo.id),
            },
            Query: {
              getTodos: () => TODOS,
              getAllUsers: () => USERS,
              getUser: async (parent, { id }) => USERS.find((e) => e.id === id),
            },
          },
        });
      
        app.use(bodyParser.json());
        app.use(cors());
      
        await server.start();
      
        app.use("/graphql", expressMiddleware(server));
      
        app.listen(8000, () => console.log("Serevr Started at PORT 8000"));
      }
startServer();
