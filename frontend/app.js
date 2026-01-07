// 🔹 Mock response (swap this to test other types)
const response = {
  type: "video_vod",
  payload: {
    results: [
      {
        id: "1",
        title: "OU vs Texas Highlights",
        thumbnail: "https://via.placeholder.com/150",
        url: "https://example.com",
        duration: "10:32",
        published_at: "2025-10-01"
      }
    ]
  },
  meta: {
    source: "XSEN",
    timestamp: new Date().toISOString(),
    status: "ok"
  }
};

document.getElementById("jsonInput").textContent =
  JSON.stringify(response, null, 2);

renderResponse(response);

function renderResponse(res) {
  const out = document.getElementById("output");
  out.innerHTML = "";

  switch (res.type) {
    case "text":
      renderText(res.payload, out);
      break;

    case "video_vod":
      renderVideoVOD(res.payload, out);
      break;

    case "audio":
      renderAudio(res.payload, out);
      break;

    case "error":
      renderError(res.payload, out);
      break;

    default:
      out.innerHTML = "<div class='card'>Unknown response type</div>";
  }
}

function renderText(payload, out) {
  out.innerHTML = `<div class="card">${payload.message}</div>`;
}

function renderVideoVOD(payload, out) {
  payload.results.forEach(v => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${v.title}</h3>
      <img src="${v.thumbnail}" width="150" />
      <p>Duration: ${v.duration}</p>
      <a href="${v.url}" target="_blank">Watch</a>
    `;
    out.appendChild(div);
  });
}

function renderAudio(payload, out) {
  out.innerHTML = `
    <div class="card">
      <h3>${payload.title}</h3>
      <a href="${payload.stream_url}" target="_blank">Listen</a>
    </div>
  `;
}

function renderError(payload, out) {
  out.innerHTML = `<div class="card">❌ ${payload.message}</div>`;
}
