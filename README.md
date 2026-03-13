# TeamWork GPT

LLM-powered teamwork assistant for ENTR550 (Interpersonal Skills). Provides structured, template-aligned guidance for common team challenges.

## Features

- **4 Team Roles**: Team Leader, Facilitator, Individual Contributor, New Member
- **5 Situations** with embedded templates: Team Charter, Meeting Agenda, Conflict Resolution, Accountability Tracker, Peer Feedback (SBI)
- Custom situation support
- Interactive carousel previewing role-based responses
- Teal/amber color scheme

## Setup

```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
npm install
npm start
```

Server runs on **http://localhost:3001** by default.

## Tech Stack

Node.js, Express, vanilla JS, OpenAI API
