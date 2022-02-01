const signupBtn = document.getElementById("signupBtn");
const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const loginBtn = document.getElementById("loginBtn");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");

async function signup(accountInformation) {
  let res = await fetch("http://localhost:3000/api/auth/create", {
    method: "POST",
    body: JSON.stringify(accountInformation),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (data.success == false) {
    console.log("username already exists!, choose different");
  } else {
    console.log("SUCCESS, Welcome");
  }
}

async function login(accountInformation) {
  let res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(accountInformation),
    headers: { "Content-Type": "application/json" },
  });
  const data = res.json();
  if (data.success == false) {
    console.log("username or password is wrong or do not exist!");
  } else {
    console.log("SUCCESS, welcome to order!");
    window.location.href = "http://localhost:3000/loggedIn.html";
  }
}

signupBtn.addEventListener("click", () => {
  let accountInformation = {
    username: signupUsername.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  signup(accountInformation);
});

loginBtn.addEventListener("click", () => {
  let accountInformation = {
    username: loginUsername.value,
    password: loginPassword.value,
  };
  login(accountInformation);
});
