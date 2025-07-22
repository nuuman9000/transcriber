const { YouTubeTranscriptApi } = require("youtube-transcript-api");
const { URL } = require("url");

function extractVideoId(link) {
  const u = new URL(link);
  if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
  if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  throw new Error("Unsupported link");
}

async function getTranscript(link) {
  const id = extractVideoId(link);
  const entries = await YouTubeTranscriptApi.getTranscript(id);
  return entries.map(e => e.text).join(" ");
}

module.exports = { getTranscript };
