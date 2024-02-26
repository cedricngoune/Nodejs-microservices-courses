import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 4001;
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST"],
  })
);

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", async (req, res) => {
  const commendId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commendId, content });

  commentsByPostId[req.params.id] = comments;
  await axios.post("http://localhost:5000/events", {
    type: "CommentCreated",
    data: {
      id: commendId,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log(`Event received : ${req.body.type}`);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
