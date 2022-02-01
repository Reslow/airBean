const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.static("../frontend"));
app.use(express.json());
app.use(cookieParser());

let accounts = [
  {
    username: "ada",
    email: "ada@ada",
    password: "ada123",
  },
];
app.post("/api/auth/create", (req, res) => {
  const credentials = req.body;
  console.log("SIGNING UP");

  let responsObject = {
    success: true,
    usernameExists: false,
    emailExists: false,
  };

  accounts.forEach((account) => {
    if (account.username == credentials.username) {
      responsObject.usernameExists = true;
    } else if (account.email == credentials.email) {
      responsObject.emailExists = true;
    }
  });

  if (
    responsObject.usernameExists == true ||
    responsObject.emailExists == true
  ) {
    responsObject.success = false;
  } else {
    accounts.push(credentials);
  }
  console.log(accounts);
  res.json(responsObject);
});

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
