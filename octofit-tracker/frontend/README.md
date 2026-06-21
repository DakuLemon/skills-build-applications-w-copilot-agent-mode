# Octofit Tracker Frontend

React 19 + Vite presentation tier for the Octofit Tracker multi-tier application.

## Environment variables

Define `VITE_CODESPACE_NAME` when running the app in GitHub Codespaces so the frontend can reach the API tier on port 8000.

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend targets these endpoints:

- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
- `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`

If `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to `VITE_API_URL` and then to `http://localhost:8000/api`, avoiding broken `https://undefined-8000...` URLs.

## Scripts

- `npm run dev -- --host`
- `npm run build`
- `npm run lint`
