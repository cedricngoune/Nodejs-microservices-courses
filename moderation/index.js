import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const PORT = 4003;
const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  const { id, postId, content } = data;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:5000/events", {
      type: "CommentModerated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
