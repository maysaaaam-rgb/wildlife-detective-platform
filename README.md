# English Adventure Academy 🎓

Digital gamified ESL curriculum platform designed for Grade 3 & 4 (CEFR A1 / A1+) English learners, combining inquiry-based science missions, physical TPR movements, and smartboard mystery games.

```
english-adventure-academy/
├── index.html                   # Main Academy Portal & Library Homepage
├── css/
│   └── style.css                # Unified Academy Portal Styling
├── js/
│   ├── app.js                   # Portal UI Controller & Live Search
│   └── school-store.js          # Project Library & Activity Registry
└── lessons/
    ├── who-stole-the-treasure/  # Existing interactive module
    │   ├── index.html           # 4-Team Detective Mystery & Boss Lock
    │   ├── css/                 # Module styles
    │   └── js/                  # Game engines & audio
    └── wildlife-detective/      # NEW MODULE
        ├── index.html           # Student Game & Minigames Engine
        ├── slides.html          # Smartboard Teacher Presentation Deck
        └── lesson-plan.md       # 45-Minute Classroom Script & Protocol
```

---

## 📚 Modules Overview

### 1. 🐾 Wildlife Detective: TikTok vs Reality (`lessons/wildlife-detective/`)
* **Level & Grade:** Grade 4 • CEFR A1+
* **Topic:** Media Literacy, Animal Welfare, Capybaras & Axolotls (CLIL Science)
* **Components:**
  * `index.html`: 4 interactive investigative missions (Video Evidence Lounge, Care Matcher, Screen vs Reality, Pantanal Adaptation Escape) with Web Audio sound effects and Web Speech API narration.
  * `slides.html`: 5-slide classroom presentation with keyboard navigation (`Left`/`Right`/`Space`) and fullscreen mode.
  * `lesson-plan.md`: 45-minute lesson protocol with step-by-step timing and physical TPR activities (*Snorkel Face*, *Webbed Feet*, *Herd Power*).

### 2. 🕵️ Who Stole the Treasure? & Room Rescue (`lessons/who-stole-the-treasure/`)
* **Level & Grade:** Grade 3 & 4 • CEFR A1
* **Topic:** Detective Deduction, Past Tense, Character Identification, Alibis
* **Components:**
  * `index.html`: 8-suspect royal palace mystery with interactive 4-team live scoreboard (Red, Blue, Green, Yellow), 5 mini-game challenge rooms, and final vault boss lock.

---

## 🚀 Running the Academy Locally

You can launch the Academy Portal directly in any modern browser:

### Direct File Launch
```powershell
# Open the Academy Portal
Start-Process "index.html"

# Or directly open specific modules
Start-Process "lessons\wildlife-detective\index.html"
Start-Process "lessons\wildlife-detective\slides.html"
Start-Process "lessons\who-stole-the-treasure\index.html"
```

### Local HTTP Server (Python)
```powershell
python -m http.server 8000
```
Then navigate to:
- **Academy Portal:** [http://localhost:8000](http://localhost:8000)
- **Wildlife Detective Game:** [http://localhost:8000/lessons/wildlife-detective/index.html](http://localhost:8000/lessons/wildlife-detective/index.html)
- **Wildlife Detective Slides:** [http://localhost:8000/lessons/wildlife-detective/slides.html](http://localhost:8000/lessons/wildlife-detective/slides.html)
- **Who Stole the Treasure:** [http://localhost:8000/lessons/who-stole-the-treasure/index.html](http://localhost:8000/lessons/who-stole-the-treasure/index.html)
