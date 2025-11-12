// Load iframe from localStorage
const iframeKey = "iframeList";

function loadIframe() {
  const data = JSON.parse(localStorage.getItem(iframeKey)) || [];
  const player = document.getElementById("movieFrame");

  if (player && data.length > 0) {
    player.src = data[data.length - 1]; // load latest iframe
  }
}

function addIframe() {
  const input = document.getElementById("iframeUrl");
  const url = input.value.trim();

  if (!url.startsWith("http")) {
    alert("Please enter a valid iframe URL!");
    return;
  }

  let data = JSON.parse(localStorage.getItem(iframeKey)) || [];
  data.push(url);
  localStorage.setItem(iframeKey, JSON.stringify(data));
  input.value = "";
  renderList();
}

function renderList() {
  const list = document.getElementById("iframeList");
  if (!list) return;

  const data = JSON.parse(localStorage.getItem(iframeKey)) || [];
  list.innerHTML = "";

  data.forEach((url, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${url}</span>
      <button onclick="deleteIframe(${i})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteIframe(index) {
  let data = JSON.parse(localStorage.getItem(iframeKey)) || [];
  data.splice(index, 1);
  localStorage.setItem(iframeKey, JSON.stringify(data));
  renderList();
}

// Auto-load functions
window.onload = () => {
  loadIframe();
  renderList();
};
