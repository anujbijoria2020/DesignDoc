# SDE AI Workspace - Software Design Assistant 🚀

An intelligent AI-powered software engineering workspace that transforms natural language prompts into complete, structured software specification documents, relational databases, and visual diagrams.

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Folder Structure](#-folder-structure)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Project](#-running-the-project)
- [Database Migrations](#-database-migrations)
- [API Documentation](#-api-documentation)

---

## ✨ Key Features

*   **Unified AI Artifact Generation:** Generates a comprehensive software design suite (SRS document, ER diagram, Class diagram, Sequence diagram, and SQL DDL schema) in a single request using Google Gemini 2.5 Flash.
*   **Interactive UML Visualizations:** Renders interactive, zoomable, and downloadable SVG diagrams powered by Mermaid.js.
*   **SRS Document Exporter:** Allows exporting the generated Software Requirements Specification (SRS) to **PDF** (via clean browser print layout overrides) or **Microsoft Word (.doc)** format.
*   **SQL Script Inspector:** Formatted code editor view with syntax highlighting, click-to-copy, and standalone file downloading.
*   **Secure Session Authentication:** Includes user sign-up, login, and secure token rotation utilizing HttpOnly, SameSite, and secure-ready cookies.
*   **Database Persistency:** Automatically saves generated spec bundles into Neon PostgreSQL under user accounts.

---

## 📁 Folder Structure

```
minor/
├── 📄 README.md                 ← Project documentation
├── 📄 test.html                 ← Monolithic API playground (reassigned for developer testing)
├── 📄 .gitignore                ← Root gitignore configuration
│
├── 🔧 backend/                  ← FastAPI Python Backend
│   ├── main.py                  ← Server entry point
│   ├── requirements.txt         ← Python requirements list
│   ├── .env.example             ← Backend environment configurations template
│   ├── alembic/                 ← Schema migration history
│   │   └── versions/            ← Auto-generated migration scripts
│   ├── app/
│   │   ├── core/                ← App configurations, db engine setup, security, dependencies
│   │   ├── db_models/           ← SQLAlchemy schema definitions (User, Project, Artifacts)
│   │   ├── schemas/             ← Pydantic requests & responses models
│   │   ├── routes/              ← Auth, Projects, and Generation endpoints
│   │   └── services/            ← Prompt construction, Gemini integration, and parsers
│   └── alembic.ini              ← Alembic configuration file
│
└── 🎨 client/                   ← React 19 + TypeScript + Vite + Tailwind Client
    ├── package.json             ← Node package scripts and dev dependencies
    ├── eslint.config.js         ← Lint rules configuration
    ├── .env.example             ← Client environment configuration template
    ├── tsconfig.json            ← TypeScript config
    └── src/
        ├── App.tsx              ← App routing portal
        ├── main.tsx             ← Render mounting script
        ├── index.css            ← Global tailwind directives & print overrides
        ├── api/                 ← Axios instances and query endpoints
        ├── context/             ← Auth state provider
        ├── store/               ← Zustand state stores (chat, toasts)
        ├── types/               ← TypeScript type declarations
        ├── pages/               ← AuthPage, ChatPage
        └── components/
            ├── ProtectedRoute.tsx
            ├── ui/              ← Button, Spinner, Toast, Skeleton modal elements
            ├── chat/            ← ChatInput, ChatMessage, EmptyState
            ├── sidebar/         ← NewChatButton, ProjectListItem
            └── artifacts/       ← ArtifactTabs, SRSViewer, MermaidDiagram, SQLViewer
```

---

## 🛠 Tech Stack

### Client (Frontend)
*   **Core:** React 19, TypeScript, Vite
*   **State Management:** Zustand, TanStack React Query (v5)
*   **Styling:** Vanilla CSS, Tailwind CSS (v4)
*   **HTTP Client:** Axios (integrated with automatic JWT HttpOnly refresh rotation)
*   **Visualizations:** Mermaid.js, Lucide React

### Server (Backend)
*   **Core Framework:** FastAPI (ASGI Python 3.10+)
*   **ORM:** SQLAlchemy (v2.0+)
*   **Database Migrations:** Alembic
*   **AI Engine:** Google Generative AI (Gemini 2.5 Flash API)
*   **Authentication:** Python-Jose (JWT creation & decoding), Passlib (Bcrypt)

### Database
*   **Serverless SQL:** Neon PostgreSQL (integrated with SQLAlchemy `pool_pre_ping=True` and connection recycles to handle serverless idle timeouts)

---

## 📋 Prerequisites

Before running the project, make sure you have:
*   ✅ **Python** (v3.10+) - [Download](https://www.python.org/)
*   ✅ **Node.js** (v18+) & npm - [Download](https://nodejs.org/)
*   ✅ **Neon PostgreSQL Database** (or local Postgres instance)
*   ✅ **Google Gemini API Key** - [Google AI Studio](https://ai.google.dev/)

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/anujbijoria2020/SDE_AI_TOOL.git
cd minor
```

### Step 2: Configure the Backend Environment
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # macOS/Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file from the example:
   ```bash
   copy .env.example .env   # Windows
   cp .env.example .env     # macOS/Linux
   ```
5. Open the `.env` file and populate your actual `GEMINI_API_KEY`, `DATABASE_URL`, and a strong `SECRET_KEY`.

### Step 3: Configure the Client Environment
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   copy .env.example .env   # Windows
   cp .env.example .env     # macOS/Linux
   ```

---

## 💾 Database Migrations

Before starting the server, run the Alembic migrations to construct the database schema:

```bash
cd backend
# Make sure your virtual environment is active
alembic upgrade head
```

This will automatically create the `users`, `refresh_tokens`, `projects`, and `generated_artifacts` tables in your configured PostgreSQL database.

---

## ▶️ Running the Project

### Running the Backend
From the `backend` directory, run:
```bash
uvicorn main:app --reload
```
The FastAPI documentation will be available at `http://localhost:8000/docs` (Swagger UI).

### Running the Client
From the `client` directory, run:
```bash
npm run dev
```
The application interface will start at `http://localhost:5173`.

---

## 📡 API Documentation

### Authentication Routes (`/api/auth`)
*   `POST /api/auth/register` - Registers a new user.
*   `POST /api/auth/login` - Authenticates user credentials and sets access & refresh tokens in HttpOnly cookies.
*   `POST /api/auth/refresh` - Evaluates refresh token cookie and issues a new access token.
*   `POST /api/auth/logout` - Revokes refresh tokens and clears client cookies.
*   `GET /api/auth/me` - Retrieves current authenticated user profile details.

### Generation Routes (`/api`)
*   `POST /api/generate` - Submits a prompt description, invokes Gemini 2.5 Flash, validates returned JSON formatting, and persists the resulting SRS and diagram suite.

### Projects CRUD Routes (`/api/projects`)
*   `POST /api/projects/` - Saves a project layout manually.
*   `GET /api/projects/` - Lists all generated projects owned by the user.
*   `GET /api/projects/{project_id}` - Retrieves detailed information and all artifacts for a specific project.
*   `DELETE /api/projects/{project_id}` - Deletes a project and its associated artifacts cascadingly.
