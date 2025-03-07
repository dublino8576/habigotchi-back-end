import express from "express";
import apiRouter from "./router/api-router.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.msg === "User not found") {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});
app.all("*", (req, res) => {
  res.status(404).send({ error: "Endpoint not found" });
});
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ error: err.message });
  } else {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default app;
