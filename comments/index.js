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
  comments.push({ id: commendId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;
  await axios.post("http://event-bus-srv:5000/events", {
    type: "CommentCreated",
    data: {
      id: commendId,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log(`Event received : ${req.body.type}`);

  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post("http://event-bus-srv:5000/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
