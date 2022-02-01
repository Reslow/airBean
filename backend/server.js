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

  res.json(responsObject);
});

app.post("/api/auth/login", (req, res) => {
  const credentials = req.body;

  let responsObject = {
    success: false,
  };

  accounts.forEach((account) => {
    if (
      account.username == credentials.username &&
      account.password == credentials.password
    ) {
      responsObject.success = true;

      const cookieId = Math.round(Math.random() * 10000);

      account.cookie = cookieId;
      res.cookie("loggedIn", cookieId);
      console.log("check account");
      console.log(account);
    }
  });

  res.json(responsObject);
});

app.get("/api/loggedIn", (req, res) => {
  // to check if user is logged in to system I check it has teh cookie taht is set in login process
  console.log("LOGGEDIN API");
  const cookie = req.cookies.loggedIn;
  console.log("coockie " + cookie);
  console.log(console.log(accounts));

  let responsObject = {
    loggedIn: false,
  };
  accounts.forEach((account) => {
    if (account.cookie == parseInt(cookie)) {
      responsObject.loggedIn = true;
    }
  });
  console.log(responsObject);
  res.json(responsObject);
});

app.get("/api/logout", (req, res) => {
  res.clearCookie("loggedIn");
  const responsObject = {
    success: true,
  };
  res.json(responsObject);
});

app.get("/api/deleteAccount", (req, res) => {
  let cookie = req.cookies.loggedIn;

  const responsObject = {
    success: true,
  };

  accounts = accounts.filter((account) => {
    if (account.cookie !== parseInt(cookie)) {
      return account;
    }
  });

  console.log(accounts);

  res.clearCookie("loggedIn");
  res.json(responsObject);
});

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
