# Wildlife Detective: TikTok vs Reality 🐾

An interactive educational platform designed for Grade 4 • CEFR A1+ English learners and classrooms to explore the truth behind viral exotic pet trends and wildlife welfare.

## Included Materials

### 1. 📋 Lesson Protocol (`LESSON_PLAN.md`)
A 45-minute structured delivery guide including:
- **00:00 – 00:07**: Warm-Up & Hook (Slide 1 & 2 pronunciation)
- **00:07 – 00:15**: Physical TPR (The 3 Wild Superpowers: Snorkel Face, Webbed Feet, Herd Power)
- **00:15 – 00:25**: Video Evidence & Contrast (Mission 1)
- **00:25 – 00:38**: Interactive Missions & Living Room Escape (Missions 2, 3, 4)
- **00:38 – 00:45**: Speaking Drill & Exit Ticket (Slide 5 Chant)

### 2. 📽️ Smartboard Presentation Deck (`slides.html` / `presentation.html`)
A 5-slide classroom interactive presentation designed for teachers and smartboards:
- **Slide 1**: Title & Academy Mission
- **Slide 2**: The 5 Viral Animals (Axolotl, Ball Python, Bearded Dragon, Black Widow, Capybara)
- **Slide 3**: Screen vs. Reality Comparison Table
- **Slide 4**: The 60-kg Hamster Dilemma (Apartment vs. Pantanal Wetlands)
- **Slide 5**: Call-and-Response Classroom Speaking Chant
- **Features**: Keyboard navigation (`Left`/`Right` arrows, `Space`), fullscreen toggle, and instant switch to the Detective Game.

### 3. 🎮 Interactive Detective Game (`index.html`)
An interactive 4-mission mini-game where learners act as wildlife detectives:
- **Mission 1: Video Evidence Lounge**: Real behavioral footage vs wild wetland herds, along with TikTok evidence links.
- **Mission 2: Animal Care Matcher**: Interactive needs matcher for exotic animals like the Mexican Axolotl.
- **Mission 3: Screen vs Reality**: Critical thinking test on responsible consumer choices (buying merchandise/nightlights vs keeping wild animals).
- **Mission 4: Living Room Escape**: Unlock 3 natural adaptations (Snorkel Face, Webbed Feet, Herd Power) to return the capybara to the Pantanal wetlands.
- **Official Wildlife Ranger Certificate**: Graduation screen celebrating completed missions with a pledge.
- **Audio & TTS**: Web Audio API sound synthesizer and Web Speech API narration.

## How to Run Locally

You can open the HTML files directly in any modern browser or host via local HTTP server:

### Direct File Open
```powershell
# Open Smartboard Slides
Start-Process "slides.html"

# Open Detective Game
Start-Process "index.html"
```

### Local HTTP Server (Python)
```powershell
python -m http.server 8000
```
Navigate to:
- Smartboard Deck: [http://localhost:8000/slides.html](http://localhost:8000/slides.html)
- Detective Game: [http://localhost:8000/index.html](http://localhost:8000/index.html)
