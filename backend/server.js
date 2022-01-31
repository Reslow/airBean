const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.static("../frontend"));
app.use(express.json());
app.use(cookieParser());

let accounts = [];
app.post("/api/auth/create", (req, res) => {
  const account = req.body;
  console.log("SIGNING UP");

  let responsObject = {
    success: false,
  };

  if (account) {
    responsObject = true;
  }

  res.json(responsObject);
});

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
ç;
