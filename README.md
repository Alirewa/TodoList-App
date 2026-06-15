<div align="center">

# Todo List App — Persian RTL Task Manager

A modern, dark-themed todo list application built with Vanilla JavaScript.
Full **Persian / Farsi RTL** support, glassmorphism UI, Shamsi (Solar Hijri) calendar dates, and smooth animations.
No frameworks. No build tools. Just open `index.html`.

[![Live Demo](https://img.shields.io/badge/Live_Demo-%E2%86%92-14b8a6?style=for-the-badge)](https://alirewa.github.io/TodoList-App)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-264de4?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**[View Live Demo →](https://alirewa.github.io/TodoList-App)**

</div>

---

## Overview

**Todo List App** is a lightweight, feature-rich Persian task manager with a premium dark glassmorphism design. Built natively for **Persian / Farsi speakers** with full right-to-left layout, Shamsi calendar display, and Persian numerals (۱ ۲ ۳).

All data is saved to `localStorage` — no backend, no account required.

---

## Features

| Feature | Details |
|---|---|
| **CRUD** | Add, edit, complete, and delete tasks |
| **Filters** | All / Remaining / Completed |
| **Live Stats** | Real-time total, completed, and remaining counts |
| **Persian RTL** | Full right-to-left layout with Vazirmatn typeface |
| **Shamsi Dates** | Solar Hijri (Jalali) date shown per task |
| **Persian Numerals** | Automatic conversion to ۰ ۱ ۲ ۳ … |
| **Persistence** | Tasks saved in `localStorage` across sessions |
| **Dark Glassmorphism** | Blurred glass cards, animated blobs, teal accent |
| **Responsive** | Mobile-first, works from 360 px to 4 K |
| **Accessible** | ARIA labels, keyboard navigation, `prefers-reduced-motion` |

---

## Preview

![TodoList App Preview](https://github.com/user-attachments/assets/a440d38a-a84e-485a-8f57-0d1dd467abbc)

---

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript (ES6+) | Task logic, DOM manipulation, localStorage |
| HTML5 | Semantic markup, ARIA accessibility |
| CSS3 | Glassmorphism theme, RTL layout, CSS custom properties |
| [Vazirmatn](https://fonts.google.com/specimen/Vazirmatn) | Persian / Arabic typeface via Google Fonts |
| GitHub Actions | CI/CD — auto-deploys to GitHub Pages on push |

---

## Getting Started

No installation or build step required:

```bash
git clone https://github.com/Alirewa/TodoList-App.git
cd TodoList-App
# Open index.html in any modern browser
```

Or try the **[live demo](https://alirewa.github.io/TodoList-App)** instantly — no setup needed.

---

## Project Structure

```
TodoList-App/
├── index.html        # App markup (RTL, semantic HTML5, ARIA)
├── style.css         # Dark glassmorphism styles, responsive layout
├── todolist.js       # Vanilla JS — task logic, localStorage, DOM
└── .github/
    └── workflows/
        └── static.yml  # GitHub Pages deployment workflow
```

---

## License

Distributed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

Made by [Alirewa](https://github.com/Alirewa)

</div>
