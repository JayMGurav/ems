import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";

import schema from "server/schema";
import connectMongoDB from "@/lib/connectMongoDB";
import Employee from "./Employee/model";
import Hr from "./Hr/model";

import { getAuthTokenCookie } from "@/utils/authCookies";
import { verifyToken } from "@/utils/jwt";

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
    const token = getAuthTokenCookie(req);
    let authUser = null;
    // const authUser = { role: "HR", uid: "614b327898e90795c750c944" };
    if (token) {
      const { data, ...jwtDetails } = verifyToken(token);
      authUser = data;
    }
    console.log({ authUser });
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
