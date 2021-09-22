import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";

import schema from "server/schema";
import connectMongoDB from "@/lib/connectMongoDB";
import Employee from "./Employee/model";
import Hr from "./Hr/model";

// import { verifyToken } from "@/utils/jwt";

const apolloServer = new ApolloServer({
  schema,
  subscriptions: false,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: true,
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
  async context({ req, res }) {
    await connectMongoDB();
    // const token = req.headers["authorization"];
    const authUser = { role: "HR", uid: "614b327898e90795c750c944" };
    // if (token) {
    //   authUser = verifyToken(token);
    // }
    return {
      req,
      res,
      authUser,
      Employee,
      Hr,
    };
  },
});

export default apolloServer;
