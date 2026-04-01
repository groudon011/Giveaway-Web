document.addEventListener("DOMContentLoaded", () => {
  const robloxInput = document.getElementById("robloxUsername");
  const subCheck = document.getElementById("subCheck");
  const discordCheck = document.getElementById("discordCheck");
  const registerBtn = document.getElementById("registerBtn");
  const errorMsg = document.getElementById("errorMsg");

  // Your Google Apps Script URL (for saving to Sheets)
  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbz5HwnOoW_4A59KHf6nbt77tSjEC8VlTCwFFAYPB2-ePWpciaQtq42GxnJb37OjXKykhA/exec";

  function validateForm() {
    registerBtn.disabled = !(
      robloxInput.value.trim() &&
      subCheck.checked &&
      discordCheck.checked
    );
  }

  robloxInput.addEventListener("input", validateForm);
  subCheck.addEventListener("change", validateForm);
  discordCheck.addEventListener("change", validateForm);

  // Subscribe button
  window.subscribe = function () {
    if (!robloxInput.value.trim()) {
      errorMsg.textContent = "Enter Roblox username first!";
      return;
    }
    errorMsg.textContent = "";
    document.getElementById("subBox").classList.remove("hidden");
    window.open("https://www.youtube.com/@BloxyTesoro");
  };

  // Join Discord button
  window.join = function () {
    if (!robloxInput.value.trim()) {
      errorMsg.textContent = "Enter Roblox username first!";
      return;
    }
    errorMsg.textContent = "";
    document.getElementById("discordBox").classList.remove("hidden");
    window.open("https://discord.gg/mkbY9jzd");
  };

  // Register button
  window.registerUser = async function () {
    registerBtn.disabled = true;
    errorMsg.textContent = "Submitting...";

    const payload = {
      websiteUsername: localStorage.getItem("websiteUsername"),
      robloxUsername: robloxInput.value.trim()
    };

    try {
      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.status === "duplicate") {
        errorMsg.textContent =
          "❌ This Roblox username is already registered!";
        registerBtn.disabled = false;
        return;
      }

      window.location.href = "success.html";
    } catch (e) {
      errorMsg.textContent = "⚠️ Something went wrong. Try again.";
      registerBtn.disabled = false;
    }
  };
});
