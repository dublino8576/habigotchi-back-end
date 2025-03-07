import express from "express";
import apiRouter from "./router/api-router.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

//middleware error handlers

app.use((err, req, res, next) => {
  if (err.error === "Not found") {
    res.status(404).send({
      error: `Not found: ${err.detail}`,
    });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({
      error: `Bad Request: invalid input syntax`,
    });
  } else next(err);
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
