import Cors from "micro-cors";

import apolloServer from "server";

const cors = Cors();
const startServer = apolloServer.start();

async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(handler);
