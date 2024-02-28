import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const PORT = 5000;
const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log("Error occured on post service", err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log("Error occured on comments service", err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log("Error occured on query service", err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log("Error occured on moderation service", err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (_req, res) => {
  res.send(events);
});
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
