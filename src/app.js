const express = require("express");
const app = express();
const { showRouter, userRouter } = require("../routes/routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/theatre/users", userRouter);
app.use("/theatre/shows", showRouter);

module.exports = {
  app,
};
