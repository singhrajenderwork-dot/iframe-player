const iframeKey = "iframeList";

// Add new iframe
function addIframe() {
  const input = document.getElementById("iframeUrl");
  const titleInput = document.getElementById("title");
  const url = input.value.trim();
  const title = titleInput.value.trim();

  if (!url.startsWith("http")) {
    alert("Please enter a valid iframe URL!");
    return;
  }

  const data = JSON.parse(localStorage.getItem(iframeKey)) || [];
  data.push({ url, title });
  localStorage.setItem(iframeKey, JSON.stringify(data));

  input.value = "";
  titleInput.value = "";
  renderList();
}

// Render iframe list with share links
function renderList() {
  const list = document.getElementById("iframeList");
  if (!list) return;

  const data = JSON.parse(localStorage.getItem(iframeKey)) || [];
  list.innerHTML = "";

  data.forEach((item, i) => {
    const li = document.createElement("li");
    const viewUrl = `${window.location.origin}${window.location.pathname.replace("admin.html", "")}view.html?id=${i}`;

    li.innerHTML = `
      <div>
        <strong>${item.title || "Untitled Video"}</strong><br>
        <small>${item.url}</small>
      </div>
      <div>
        <a href="${viewUrl}" target="_blank">🔗 View</a>
        <button onclick="deleteIframe(${i})">🗑 Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Delete iframe entry
function deleteIframe(index) {
  const data = JSON.parse(localStorage.getItem(iframeKey)) || [];
  data.splice(index, 1);
  localStorage.setItem(iframeKey, JSON.stringify(data));
  renderList();
}

// Load video on view.html
function loadView() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const data = JSON.parse(localStorage.getItem(iframeKey)) || [];

  if (!data[id]) {
    document.getElementById("videoTitle").textContent = "Video Not Found";
    return;
  }

  const { url, title } = data[id];
  document.getElementById("videoTitle").textContent = title || "🎬 InstaMovie Player";
  document.getElementById("movieFrame").src = url;
}

// Auto run correct function
window.onload = () => {
  if (document.getElementById("iframeList")) renderList();
  if (document.getElementById("movieFrame")) loadView();
};    const li = document.createElement("li");
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
