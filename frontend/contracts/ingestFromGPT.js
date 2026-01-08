export function ingestFromGPT(rawText) {
  let parsed;

  try {
    parsed = JSON.parse(rawText);
  } catch {
    return {
      type: "error",
      payload: { message: "Invalid or malformed response" }
    };
  }

  if (!parsed || typeof parsed !== "object" || !parsed.type) {
    return {
      type: "error",
      payload: { message: "Invalid or malformed response" }
    };
  }

  return parsed;
}
