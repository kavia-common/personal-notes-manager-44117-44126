# Notes App (Ocean Professional)

This React app provides a modern notes experience with a clean Ocean Professional theme.

Features:
- Create, edit, pin, delete notes
- Tag-based filtering and full-text search
- Sort by updated time, title, or pinned
- Local persistence via localStorage with debounced saves
- Optional backend mode when REACT_APP_BACKEND_URL (or REACT_APP_API_BASE) is set

Environment:
- REACT_APP_BACKEND_URL (optional)
- REACT_APP_API_BASE (optional)

Behavior:
- If neither env is set, the app runs in Local mode and stores data in localStorage under key `notes_app:v1:notes`.
- If an env is set, the app attempts to use the backend endpoints `/notes`, `/notes/:id`. Failed requests fall back to local mode seamlessly.

Run:
- npm start (port 3000)
- First run seeds with two demo notes if storage is empty.

Accessibility:
- Editor modal supports Esc to close, Enter to save (when focus in title), and Ctrl/Cmd+S to save.
- Key elements include `data-testid` attributes for testing.
