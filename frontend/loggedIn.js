const logoutBtn = document.getElementById("logoutBtn");
const deleteAccountBtn = document.getElementById("deleteAccountBtn");
const orderBtn = document.getElementById("orderBtn");
const menuSelection = document.getElementById("menuSelection");

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

function setMenu(menu) {
  menu.forEach((menuItem) => {
    //   för varje arrayItem skapas element i varje object

    let list = document.createElement("ul");

    let menu_title = document.createElement("li");
    menu_title.innerText = menuItem.title;
    list.appendChild(menu_title);
    let menu_desc = document.createElement("li");
    menu_desc.innerText = menuItem.desc;
    list.appendChild(menu_desc);
    let menu_price = document.createElement("li");
    menu_price.innerText = menuItem.price;
    list.appendChild(menu_price);
    // list created
    let radiobuttons = document.createElement("INPUT");
    radiobuttons.setAttribute("id", "select");
    let radiobuttonsLabel = document.createElement("LABEL");
    radiobuttonsLabel.setAttribute("for", "select");
    radiobuttonsLabel.setAttribute("id", "select");
    radiobuttonsLabel.textContent = menuItem.id;

    menuSelection.appendChild(radiobuttons);
    menuSelection.appendChild(radiobuttonsLabel);
    radiobuttons.setAttribute("type", "checkbox");
    radiobuttons.setAttribute("value", menuItem.title);
    radiobuttons.classList.add("d");

    radiobuttonsLabel.appendChild(list);
  });
}

async function viewMenu() {
  const res = await fetch("http://localhost:3000/coffee/menu");
  const data = await res.json();
  console.log("MENU!!!!!! Frontend");
  console.log(data.menu);
  setMenu(data.menu);
}

deleteAccountBtn.addEventListener("click", () => {
  deleteAccount();
});

logoutBtn.addEventListener("click", () => {
  logout();
});

orderBtn.addEventListener("click", () => {
  let checkboxes = document.querySelectorAll(".d");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      let res = checkbox.value;
      console.log(res);
    }
  });
});

isLoggedIn();
viewMenu();
