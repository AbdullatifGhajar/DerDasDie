function updateIcon(active) {
  if (active) chrome.action.setIcon({ path: `images/icon.png` });
  else chrome.action.setIcon({ path: `images/inactive.png` });
}

function updatePopUp(active) {
  document.getElementById("active-checkbox").checked = active;

  if (active) document.getElementById("header-image").src = "images/header.svg";
  else
    document.getElementById("header-image").src = "images/header-inactive.svg";
}

function toggleActive() {
  chrome.storage.local.set({ active: this.checked });
  chrome.runtime.sendMessage({ message: "set_active", active: this.checked });
  updatePopUp(this.checked);
}

document
  .getElementById("active-checkbox")
  .addEventListener("change", toggleActive);

chrome.storage.local.get(["active"], (result) => {
  updatePopUp(result["active"]);
  updateIcon(result["active"]);
});
