import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 4000;
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST"],
  })
);
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  if (!title) {
    res.status(400).send({
      error: true,
      message: "Title post must not be empty",
    });
  }
  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:5000/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(`Event received : ${req.body.type}`);

  res.send({});
});
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
