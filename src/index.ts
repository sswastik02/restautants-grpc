import express from "express";
import mongoose from "mongoose";

import { port, mongodbUrl } from "./config";

const app = express();

app.listen(port, async () => {
  await mongoose.connect(mongodbUrl);
  console.log(`Server Running on ${port}`);
});
