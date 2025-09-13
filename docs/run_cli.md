## Backend
uvicorn app.main:app --reload --port 8001

## Frontend
npm run dev

## Fazer gif
ffmpeg -i seu_video -vf "fps=10,scale=800:-1:flags=lanczos" -c:v gif nome_do_video.gif
