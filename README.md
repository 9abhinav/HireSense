# HireSense — AI Career Intelligence Platform

> **"Turn your resume into your next opportunity."**

HireSense is an AI-powered Resume & Interview Assistant for ATS optimization, job matching, resume insights, personalized mock interviews, and career intelligence. Built with an editorial design system and a high-performance FastAPI backend.

---

## ✨ Features

- 🎯 **AI Resume Analysis & ATS Optimization**: Deep section-by-section audit, missing keyword detection, and before/after bullet rewrite suggestions.
- 💼 **Job Description Alignment**: Semantic match calculation against recruiter requirements with actionable resume adjustment checklists.
- 🎙️ **AI Mock Interview Cockpit**: Real-time simulated technical & system design interviews with live timer, waveform visuals, and STAR-method feedback.
- 📈 **Career Trajectory & Insights**: Dynamic salary benchmarking, market demand index, and step-by-step milestone progression roadmaps.
- 📑 **Resume Version Management**: Multi-version tracking, ATS score comparisons, and quick duplication.
- ✨ **Ask HireSense AI Assistant**: Floating conversational intelligence available across all dashboard views.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19, Vite
- **Routing**: React Router v7
- **Animations & Visuals**: Framer Motion, Recharts
- **Icons**: Lucide React
- **Styling**: Vanilla CSS Design System (Dark/Obsidian `#0a0a0f`, Electric Violet `#7c5cfc`)

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Security**: JWT Authentication (python-jose), Bcrypt
- **AI Integration**: Google Gemini API, LangChain
- **Storage**: Motor (Async MongoDB), ChromaDB vector embeddings
- **Parsing**: PyPDF

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+) & npm
- Python (v3.10+)

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python main.py
```
Backend API will be running at `http://localhost:8000` (Interactive Swagger docs at `http://localhost:8000/docs`).

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend Web App will be running at `http://localhost:3000`.

---

## 📄 License
MIT License
