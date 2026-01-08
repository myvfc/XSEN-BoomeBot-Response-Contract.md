import { ingestFromGPT } from "./contracts/ingestFromGPT.js";

const out = document.getElementById("output");

// Show loading immediately
renderLoading(out, "Fetching content…");

// 🤖 Simulated GPT output (INTENT ONLY)
// Change this to test different intents
const gptOutput = `
{
  "type": "audio",
  "mode": "live"
}
`;

// Show what GPT "said"
document.getElementById("jsonInput").textContent = gptOutput;

// ✅ SAFETY GATE
const safeData = ingestFromGPT(gptOutput);

// ==============================
// ✅ INTENT RESOLVER (AUDIO + VIDEO)
// ==============================

function resolveIntent(res) {
  // 🎧 LIVE AUDIO
  if (res.type === "audio" && res.mode === "live") {
    return {
      type: "audio",
      payload: {
        title: "Boomer Bot Live Fan Cast",
        description: "Live Oklahoma Sooners fan commentary",
        stream_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        is_live: true
      }
    };
  }

  // 🎬 VIDEO ON DEMAND
  if (res.type === "video" && res.mode === "vod") {
    return {
      type: "video_vod",
      payload: {
        results: [
          {
            title: "OU Highlights vs Texas",
            thumbnail: "https://via.placeholder.com/640x360?text=OU+Highlights",
            duration: "8:42",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          },
          {
            title: "Top Plays of the Season",
            thumbnail: "https://via.placeholder.com/640x360?text=Top+Plays",
            duration: "12:15",
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          }
        ]
      }
    };
  }

  // Pass through render-ready responses
  return res;
}

// Render resolved response
setTimeout(() => {
  renderResponse(resolveIntent(safeData));
}, 500);


// ==============================
// Router
// ==============================

function renderResponse(res) {
  const out = document.getElementById("output");
  out.innerHTML = "";

  switch (res.type) {
    case "stats":
      renderStats(res.payload, out);
      break;

    case "trivia":
      renderTrivia(res.payload, out);
      break;

    case "video_vod":
      renderVideoVOD(res.payload, out);
      break;

    case "audio":
      renderAudio(res.payload, out);
      break;

    case "error":
      renderError(res.payload || { message: "Invalid response" }, out);
      break;

    default:
      out.innerHTML = "<div class='card'>Unknown response type</div>";
  }
}

// ==============================
// Renderers
// ==============================

function renderStats(payload, out) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>${payload.team}</h3>
    <p><strong>Season:</strong> ${payload.season}</p>
    <p><strong>Record:</strong> ${payload.record}</p>
    <p><strong>Ranking:</strong> #${payload.ranking}</p>
    <p><strong>Conference:</strong> ${payload.conference}</p>
    <hr />
    <p><strong>Last Game:</strong></p>
    <p>${payload.last_game.result} vs ${payload.last_game.opponent}</p>
    <p>Score: ${payload.last_game.score}</p>
  `;

  out.appendChild(card);
}

function renderError(payload, out) {
  out.innerHTML = `
    <div class="card error">
      ❌ ${payload.message}
    </div>
  `;
}

function renderTrivia(payload, out) {
  const card = document.createElement("div");
  card.className = "card";

  const question = document.createElement("h3");
  question.textContent = payload.question;
  card.appendChild(question);

  payload.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice";
    btn.style.display = "block";
    btn.style.margin = "8px 0";
    btn.style.width = "100%";

    btn.onclick = () => {
      btn.style.background = "#e5e7eb";
    };

    card.appendChild(btn);
  });

  out.appendChild(card);
}

function renderVideoVOD(payload, out) {
  payload.results.forEach(video => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${video.title}</h3>
      <img src="${video.thumbnail}" style="width:100%; border-radius:6px;" />
      <p>Duration: ${video.duration}</p>
      <a href="${video.url}" target="_blank">Watch Video</a>
    `;

    out.appendChild(card);
  });
}

function renderAudio(payload, out) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>${payload.title}</h3>
    <p>${payload.description || ""}</p>

    <audio controls style="width:100%; margin-top:10px;">
      <source src="${payload.stream_url}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>

    ${payload.is_live ? "<p><strong>🔴 Live</strong></p>" : ""}
  `;

  out.appendChild(card);
}

function renderLoading(out, message = "Loading…") {
  out.innerHTML = `
    <div class="card loading">
      <strong>${message}</strong>
    </div>
  `;
}
