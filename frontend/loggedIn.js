const logoutBtn = document.getElementById("logoutBtn");
const deleteAccountBtn = document.getElementById("deleteAccountBtn");

async function isLoggedIn() {
  const res = await fetch("http://localhost:3000/api/loggedIn");
  const data = await res.json();
  console.log("LOGGEDIN FRONT END");
  console.log(data);

  if (data.loggedIn == false) {
    window.location.href = "http://localhost:3000/";
  }
}

async function logout() {
  const res = await fetch("http://localhost:3000/api/logout");
  const data = await res.json();
  console.log("LOGOUT AT LOGGEDIN");
  console.log(data);
  if (data) {
    window.location.href = "http://localhost:3000/";
  }
}

async function deleteAccount() {
  const res = await fetch("http://localhost:3000/api/deleteAccount");
  const data = await res.json();
  console.log("DELETE ACCOUNT AT LOOGEDIN");
  console.log(data);
  window.location.href = "http://localhost:3000/";
}

deleteAccountBtn.addEventListener("click", () => {
  deleteAccount();
});

logoutBtn.addEventListener("click", () => {
  logout();
});

isLoggedIn();
