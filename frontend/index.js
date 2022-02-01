const signupBtn = document.getElementById("signupBtn");
const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

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

signupBtn.addEventListener("click", () => {
  let account = {
    username: signupUsername.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  signup(account);
});
