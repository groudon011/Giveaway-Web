// ===== CONFIG =====
const ADMIN_SECRET = "bloxydhawal"; // 🔒 CHANGE THIS (remember it)

// ===== LOGIN PAGE =====
if (window.location.pathname.includes("login.html")) {
  const savedUser = localStorage.getItem("websiteUsername");
  if (savedUser) {
    window.location.href = "home.html";
  }
}

function saveUsername() {
  const username = document.getElementById("usernameInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!username) {
    errorMsg.textContent = "Please enter a username";
    return;
  }

  // Check admin login
  if (username === ADMIN_SECRET) {
    localStorage.setItem("websiteUsername", "Admin");
    localStorage.setItem("isAdmin", "true");
  } else {
    localStorage.setItem("websiteUsername", username);
    localStorage.removeItem("isAdmin");
  }

  window.location.href = "home.html";
}

// ===== HOME PAGE =====
if (window.location.pathname.includes("home.html")) {
  const username = localStorage.getItem("websiteUsername");
  if (!username) {
    window.location.href = "login.html";
  } else {
    document.getElementById("welcomeMsg").textContent = `Welcome, ${username} 👋`;
  }
}

// ===== ADMIN REDIRECT =====
function goToAdmin() {
  if (localStorage.getItem("isAdmin") === "true") {
    window.location.href = "admin.html";
  } else {
    alert("Access denied ❌");
  }
}

// ===== BUTTON LINKS =====
function goToRegister() {
  window.location.href = "register.html";
}

function subscribeChannel() {
  window.open("http://www.youtube.com/@BloxyTesoro");
}

function joinDiscord() {
  window.open("https://discord.gg/mkbY9jzd");
}
