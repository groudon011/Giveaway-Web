document.addEventListener("DOMContentLoaded", () => {
  const robloxInput = document.getElementById("robloxUsername");
  const subCheck = document.getElementById("subCheck");
  const discordCheck = document.getElementById("discordCheck");
  const registerBtn = document.getElementById("registerBtn");
  const errorMsg = document.getElementById("errorMsg");

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbysUl2cZzzeKh2jadqlMqfDKODbsVl81jj_K1AmMzjXLZJVAqVXCg7czEI8B98NM6zhiA/exec";

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

  window.subscribe = function () {
    window.open("http://www.youtube.com/@BloxyTesoro");
    document.getElementById("subBox").classList.remove("hidden");
  };

  window.join = function () {
    window.open("https://discord.gg/mkbY9jzd");
    document.getElementById("discordBox").classList.remove("hidden");
  };

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
        errorMsg.textContent = "❌ This Roblox username is already registered!";
        registerBtn.disabled = false;
        return;
      }

      localStorage.setItem("robloxUsername", payload.robloxUsername);
      window.location.href = "success.html";

    } catch (err) {
      errorMsg.textContent = "⚠️ Error submitting. Try again.";
      registerBtn.disabled = false;
    }
  };
});
