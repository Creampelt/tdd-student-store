const express = require("express");
const morgan = require("morgan");
const router = require("./routes/store");
const { NotFoundError } = require("./utils/errors");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (res, req) => {
  res.status(200).json({ ping: "pong" });
});

app.use("/store", router);

app.use((req, res, next) => {
  next(new NotFoundError());
})

app.use((error, req, res, next) => {
  let { status, message } = error;
  if (!status)
    status = 500;
  if (!message)
    message = "Something went wrong in the application"
  res.status(status).json({ error: { status, message } });
});

module.exports = app;