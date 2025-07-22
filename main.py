from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi
from urllib.parse import urlparse, parse_qs

app = FastAPI()

class TranscriptRequest(BaseModel):
    url: str
    lang: str = "en"

@app.post("/transcript")
async def get_transcript(req: TranscriptRequest):
    try:
        video_id = parse_qs(urlparse(req.url).query)["v"][0]
        data = YouTubeTranscriptApi.get_transcript(video_id, languages=[req.lang])
        text = " ".join([item["text"] for item in data])
        return {"transcript": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
