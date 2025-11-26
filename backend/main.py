from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import ssl
import httpx
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# SSL 검증 우회 (개발 환경 전용 - 보안 경고!)
import warnings
warnings.filterwarnings('ignore', message='Unverified HTTPS request')

# SSL 검증을 비활성화한 httpx 클라이언트 생성
http_client = httpx.Client(verify=False, timeout=30.0)

app = FastAPI()

# CORS 설정 (개발 환경)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 환경에서 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI 클라이언트 초기화 (SSL 검증 비활성화)
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    timeout=30.0,  # 30초 타임아웃
    max_retries=2,  # 2번 재시도
    http_client=http_client,  # SSL 검증 우회
)


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    model: Optional[str] = "gpt-4"
    max_tokens: Optional[int] = 2000


class ChatResponse(BaseModel):
    message: str
    usage: dict


@app.get("/")
async def root():
    return {"status": "ok", "message": "ChatGPT API Server"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        print(f"Received request - model: {request.model}, messages: {len(request.messages)}")

        # OpenAI API 호출
        # gpt-4o-mini: 빠르고 저렴한 최신 모델
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # gpt-4o-mini 사용
            messages=[msg.model_dump() for msg in request.messages],
            max_tokens=request.max_tokens,
        )

        print(f"OpenAI API response received")

        return {
            "message": response.choices[0].message.content,
            "usage": {
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens,
            },
        }
    except Exception as e:
        print(f"Error details: {type(e).__name__}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
async def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
