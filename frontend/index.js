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
  console.log(data);
}

signupBtn.addEventListener("click", () => {
  let account = {
    username: signupUsername.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  signup(account);
});
