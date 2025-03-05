import express from "express";
import apiRouter from "./router/api-router";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ error: "Endpoint not found" });
});
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ error: err.message });
  } else {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default app;
