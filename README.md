# Beat It — Lyrics Display

A single-page lyrics viewer for Michael Jackson's *Beat It*, built with plain HTML, CSS, and JavaScript. No frameworks, no build step — open `index.html` in any browser.

## Features

- **Line-by-line display** — lyrics shown one line at a time with a smooth fade-and-rise transition
- **Play / Pause** — auto-advances every 2 seconds; toggles with a single button
- **Navigation** — step forward and back through any line manually
- **Keyboard shortcuts** — fully usable without a mouse

| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `←` | Previous line |
| `→` | Next line |
| `Tab` | Move focus between buttons |

- **Progress bar** — red gradient bar with a glowing tip tracks position through the song
- **Line counter** — "Line X of Y" label above the progress bar
- **Accessible** — `aria-live` region announces each line to screen readers; `aria-pressed` reflects play state; all controls reachable by keyboard with visible focus rings

## Michael Jackson theme

The visual design draws from MJ's *Beat It* era:

- **Bebas Neue** concert-poster title with a red drop shadow
- CSS-drawn **fedora hat** with a red hat band
- Deep black background with a **stage spotlight** gradient from above
- Diagonal **leather jacket** stripe texture across the page
- 28 randomly-placed **sequin sparkles** (white glove reference) that twinkle independently
- **Zipper divider** — nine diamond teeth below the title, one glowing red to track progress
- Red progress bar with a glowing dot at the leading edge

## File structure

```
lyrics-display/
├── index.html   # Markup and page structure
├── styles.css   # All visual styling and animations
├── app.js       # Lyrics data, state management, event handling
├── lyrics.txt   # Source lyrics file
└── README.md
```

## Running locally

No server needed — just open the file directly:

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Or serve it with any static file server:

```bash
npx serve .
python3 -m http.server
```
