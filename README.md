# Gwanak GPT App

ChatGPT + 검색 통합 모바일 앱 (Capacitor + Ionic React + FastAPI)

## 기능

- **AI Chat**: OpenAI GPT-4o-mini를 활용한 AI 채팅
- **네이버 검색**: 네이버 모바일 검색
- **YouTube 검색**: 유튜브 비디오 검색
- **Google 검색**: 구글 검색

## 기술 스택

### Frontend
- Ionic React
- Capacitor
- TypeScript
- Zustand (상태 관리)
- Axios

### Backend
- Python FastAPI
- OpenAI API
- uvicorn

## 설치 및 실행

### 1. 환경 설정

```bash
# Node.js 18+ 필수
node --version

# Python 3.9+ 필수
python --version
```

### 2. 백엔드 설정

```bash
cd backend

# Python 패키지 설치
pip install -r requirements.txt

# .env 파일 생성
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
echo "PORT=8000" >> .env

# 백엔드 서버 실행
python main.py
```

서버가 http://localhost:8000 에서 실행됩니다.

### 3. 프론트엔드 설정

```bash
# 프로젝트 루트에서
npm install

# 개발 서버 실행
npm start
# 또는
ionic serve
```

브라우저가 http://localhost:8100 으로 자동 실행됩니다.

## 환경 변수

### Backend (.env 또는 backend/.env)
```
OPENAI_API_KEY=sk-proj-...
PORT=8000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

## 모바일 빌드

### Android
```bash
ionic cap add android
ionic cap sync android
ionic cap open android
```

### iOS
```bash
ionic cap add ios
ionic cap sync ios
ionic cap open ios
```

## 주의사항

⚠️ **보안**:
- `.env` 파일은 절대 GitHub에 커밋하지 마세요
- OpenAI API 키는 안전하게 보관하세요
- 프로덕션 환경에서는 SSL 검증을 활성화하세요

## API 엔드포인트

- `GET /` - 서버 상태 확인
- `POST /api/chat` - ChatGPT API 호출
- `GET /api/health` - 헬스 체크

## 라이선스

MIT
