const out = document.getElementById("output");

// Show loading immediately
renderLoading(out, "Fetching stats…");

// Fetch real data
fetch("data.json")
   .then(res => {
    if (!res.ok) throw new Error("Network error");
    return res.json();
  })
  .then(data => {
    document.getElementById("jsonInput").textContent =
      JSON.stringify(data, null, 2);

    renderResponse(data);
  })
  .catch(err => {
    console.error(err);
    renderResponse({
      type: "error",
      payload: { message: "Failed to load stats." },
      meta: {
        source: "INTERNAL",
        timestamp: new Date().toISOString(),
        status: "error"
      }
    });
  });

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

  case "error":
    renderError(res.payload, out);
    break;

  case "trivia":
    renderTrivia(res.payload, out);
    break;


  default:
    out.innerHTML = "<div class='card'>Unknown response type</div>";
}

}

// ==============================
// Renderer
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


function renderLoading(out, message = "Loading…") {
  out.innerHTML = `
    <div class="card loading">
      <strong>${message}</strong>
    </div>
  `;
}
