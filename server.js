import express from "express";
import { getTranscript } from "@johnny-reilly/youtube-transcript";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const { link } = req.body;
  try {
    const videoId = extractVideoId(link);
    const transcript = await getTranscript(videoId);
    const text = transcript.map(t => t.text).join(" ");
    res.json({ transcript: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

function extractVideoId(url) {
  const u = new URL(url);
  if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
  if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  throw new Error("Invalid YouTube URL");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
