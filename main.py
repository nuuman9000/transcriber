from fastapi import FastAPI
from pydantic import BaseModel
from youtube_transcript_api import YouTubeTranscriptApi

app = FastAPI()

class VideoRequest(BaseModel):
    url: str
    languages: list[str]

@app.post("/transcript")
def get_transcript(data: VideoRequest):
    video_id = data.url.split("v=")[-1]
    transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=data.languages)
    return {"transcript": transcript}

