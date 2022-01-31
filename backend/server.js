const express = require("express");
const app = express();

app.use(express.static("../frontend"));
app.use(express.json());

app.post("/api/auth/create", (req, res) => {
  const account = req.body;
  console.log("SIGNING UP");

  res.json("hej");
});

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
