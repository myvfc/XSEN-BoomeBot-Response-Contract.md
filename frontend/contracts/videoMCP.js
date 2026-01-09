// XSEN Video MCP Adapter
// Connects XSEN frontend to the real XSEN Video MCP backend

export async function fetchVideoVOD({ query = "", limit = 3 } = {}) {
  const BASE_URL = "https://xsen-mcp-production.up.railway.app";

  const response = await fetch(
    `${BASE_URL}/videos?query=${encodeURIComponent(query)}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new Error("XSEN Video service request failed");
  }

  const data = await response.json();

  // 🔁 Normalize response to XSEN frontend contract
  return {
    results: (data.results || []).map(video => ({
      title: video.title,
      thumbnail: video.thumbnail,
      duration: video.duration,
      url: video.url
    }))
  };
}
