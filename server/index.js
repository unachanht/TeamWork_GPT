import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROLE_PROMPTS = {
  team_leader:
    "Adopt a decisive, accountability-focused tone. Emphasize delegation, ownership, and driving results. Help the user take charge and hold the team to high standards.",
  facilitator:
    "Respond with an inclusive, process-aware tone. Focus on consensus-building, ensuring every voice is heard, and designing fair processes. Highlight collaboration techniques.",
  contributor:
    "Provide execution-oriented, detail-focused guidance. Stress personal delivery, quality of work, and practical next steps. Offer concrete, actionable advice.",
  new_member:
    "Use a learning-oriented, supportive tone. Focus on onboarding, building trust, asking good questions, and finding your place on the team. Be encouraging and patient.",
};

const ROLE_LABELS = {
  team_leader: "Team Leader",
  facilitator: "Facilitator",
  contributor: "Individual Contributor",
  new_member: "New Member",
};

const SITUATION_PROMPTS = {
  forming_team: `Help the user create a Team Charter. Structure your response using this template:

**Team Charter**
1. **Mission Statement** — One clear sentence describing the team's purpose
2. **Members & Roles** — Table of member names, roles, and responsibilities
3. **SMART Goals** — 2–4 specific, measurable, achievable, relevant, time-bound goals
4. **Team Norms** — 4–6 ground rules for how the team will work together
5. **Decision-Making Process** — How decisions will be made (consensus, majority vote, leader decides, etc.)
6. **Communication Channels** — Which tools/platforms, expected response times, meeting cadence
7. **Conflict Escalation Path** — Steps to resolve disagreements before they escalate
8. **Review Cadence** — When and how the team will revisit this charter

Tailor the charter to the user's specific team situation. Ask clarifying questions if needed.`,

  running_meetings: `Help the user plan an effective meeting. Structure your response using this template:

**Meeting Agenda**
1. **Title & Date** — Meeting name and scheduled time
2. **Attendees & Roles** — Who is attending, who facilitates, who takes notes
3. **Meeting Objective** — One sentence: what success looks like by the end
4. **Timed Agenda Items** — Numbered list with time allocations (e.g., "5 min — Check-in")
5. **Parking Lot** — Space for off-topic items to revisit later
6. **Action Items** — Task / Owner / Deadline format
7. **Next Meeting** — Date, time, preliminary focus

Tailor the agenda to the user's specific meeting context. Ask clarifying questions if needed.`,

  resolving_conflict: `Help the user navigate a team conflict using this 6-step framework:

**Conflict Resolution Framework**
1. **Pause & Reflect** — What happened? What emotions are you feeling? Separate facts from interpretations.
2. **Share & Listen** — Each person shares their perspective using "I" statements. Active listening, no interrupting.
3. **Identify Interests** — What does each person actually need? Look beneath positions to find shared interests.
4. **Brainstorm Options** — Generate multiple solutions without judging. Focus on "both/and" rather than "either/or."
5. **Agree & Commit** — Choose a solution together. Define specific actions, owners, and timelines.
6. **Follow Up** — Schedule a check-in to see how the agreement is working. Adjust if needed.

Walk the user through each step based on their specific conflict situation. Be empathetic but structured.`,

  tracking_progress: `Help the user set up an accountability tracker. Structure your response using this template:

**Accountability Tracker**

| Task | Owner | Deadline | Status | Blockers | Next Step |
|------|-------|----------|--------|----------|-----------|
| (fill based on user's context) | | | Not Started / In Progress / Done | | |

Also include:
- **Review Schedule** — When the team will review progress (e.g., weekly standup)
- **Escalation Rule** — What happens when a task is blocked or overdue
- **Completion Criteria** — How "done" is defined for each task

Tailor the tracker to the user's specific project. Ask clarifying questions if needed.`,

  giving_feedback: `Help the user give effective peer feedback using the SBI model:

**Peer Feedback (SBI Model)**
1. **Situation** — When and where did this happen? Set the specific context.
2. **Behavior** — What exactly did the person do or say? Stick to observable facts.
3. **Impact** — How did it affect you, the team, or the work? Use "I" statements.
4. **Suggestion** — What would you like to see instead? Be specific and constructive.
5. **Tone Check** — Read it back. Is it respectful? Would you feel okay receiving this?

Help the user draft their feedback based on their specific situation. Coach them to be honest yet kind.`,
};

const SITUATION_LABELS = {
  forming_team: "Forming a Team",
  running_meetings: "Running Meetings",
  resolving_conflict: "Resolving Conflict",
  tracking_progress: "Tracking Progress",
  giving_feedback: "Giving Feedback",
};

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  const { messages = [], role = "team_leader", situation = "forming_team", customSituation } = req.body || {};

  const normalizedRole = ROLE_PROMPTS[role] ? role : "team_leader";
  let normalizedSituation = SITUATION_PROMPTS[situation] ? situation : "forming_team";

  if (situation === "custom" && customSituation?.description) {
    normalizedSituation = "custom";
  }

  if (!GEMINI_API_KEY) {
    return res.status(200).json({
      reply:
        "GEMINI_API_KEY is not configured. Add it to your .env file to receive live responses.",
    });
  }

  const rolePrompt = ROLE_PROMPTS[normalizedRole];
  const roleLabel = ROLE_LABELS[normalizedRole] || ROLE_LABELS.team_leader;

  let situationPrompt = SITUATION_PROMPTS[normalizedSituation];
  let situationLabel = SITUATION_LABELS[normalizedSituation] || SITUATION_LABELS.forming_team;

  if (normalizedSituation === "custom") {
    situationPrompt = customSituation.description;
    situationLabel = customSituation.label || "Custom Situation";
  }

  const systemPrompt = `You are TeamWork GPT, a helpful teamwork assistant for university students working on group projects. You adapt your voice based on the user's team role and current situation. The user's role: "${roleLabel}". Current situation: ${situationLabel}.\n\n${rolePrompt}\n\n${situationPrompt}`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((msg) => ({
            role: msg.role === "user" ? "user" : "assistant",
            content: msg.content ?? "",
          })),
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`Gemini API ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content?.trim() ??
      "Sorry, I could not generate a reply. Please try again later.";

    res.json({ reply });
  } catch (error) {
    console.error("Upstream request failed:", error);
    res
      .status(500)
      .json({ error: "Request failed", details: error.message ?? String(error) });
  }
});

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`TeamWork_GPT server listening on http://localhost:${PORT}`);
});
