import express from "express";
import mongoose from "mongoose";
import { expressConnectMiddleware } from "@bufbuild/connect-express";

import routes from "./routes";
import { port, mongodbUrl } from "./config";

const app = express();

app.use(
  expressConnectMiddleware({
    routes,
  })
);

app.listen(port, async () => {
  await mongoose.connect(mongodbUrl);
  console.log(`Server Running on ${port}`);
});
