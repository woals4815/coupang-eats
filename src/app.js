import express from "express";

const app = express();

app.get("/", (req, res) => res.json("hi"));

app.listen(4000, () => console.log("listening: 4000"));
