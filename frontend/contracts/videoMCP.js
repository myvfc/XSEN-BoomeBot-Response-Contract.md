// Mock Video MCP
// Simulates a real MCP server response

export async function fetchVideoVOD() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
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
  };
}
