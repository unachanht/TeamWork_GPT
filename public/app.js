const screens = {
  splash: document.querySelector("#splash-screen"),
  carousel: document.querySelector("#carousel-screen"),
  chat: document.querySelector("#chat-screen"),
};

const knowRoleYesBtn = document.querySelector("#know-role-yes");
const knowRoleNoBtn = document.querySelector("#know-role-no");
const rolePicker = document.querySelector("#role-picker");
const roleCards = rolePicker.querySelectorAll(".style-card");
const splashContinueBtn = document.querySelector("#splash-continue");
const roleFeedback = document.querySelector("#role-feedback");

const slidesContainer = document.querySelector("#scenario-slides");
const progressContainer = document.querySelector("#carousel-progress");
const carouselPrevBtn = document.querySelector("#carousel-prev");
const carouselNextBtn = document.querySelector("#carousel-next");
const carouselBackBtn = document.querySelector("#carousel-back");
const preferenceButtonsContainer = document.querySelector("#preference-buttons");
const startChatBtn = document.querySelector("#start-chat");

const activeModeLabel = document.querySelector("#active-mode-label");
const rolePillGroup = document.querySelector("#role-pill-group");
const situationPillGroup = document.querySelector("#situation-pill-group");
const resetOnboardingBtn = document.querySelector("#reset-onboarding");
const clearHistoryBtn = document.querySelector("#clear-history");
const messagesEl = document.querySelector("#messages");
const formEl = document.querySelector("#chat-form");
const inputEl = document.querySelector("#user-input");
const sendBtn = document.querySelector("#send-btn");
const regenerateBtn = document.querySelector("#regenerate-btn");

const infoModal = document.querySelector("#info-modal");
const whatIsThisBtn = document.querySelector("#what-is-this");
const closeModalBtn = document.querySelector("#close-modal");

const customSituationModal = document.querySelector("#custom-situation-modal");
const closeCustomSituationModalBtn = document.querySelector("#close-custom-situation-modal");
const customSituationForm = document.querySelector("#custom-situation-form");
const customSituationNameInput = document.querySelector("#custom-situation-name");
const customSituationDescInput = document.querySelector("#custom-situation-desc");

const confirmModal = document.querySelector("#confirm-modal");
const confirmClearBtn = document.querySelector("#confirm-clear");
const cancelClearBtn = document.querySelector("#cancel-clear");

const ROLES = {
  team_leader: {
    label: "Team Leader",
    description: "Decisive, accountability-focused, delegation-oriented.",
  },
  facilitator: {
    label: "Facilitator",
    description: "Inclusive, process-aware, consensus-building.",
  },
  contributor: {
    label: "Individual Contributor",
    description: "Execution-oriented, detail-focused, delivery-driven.",
  },
  new_member: {
    label: "New Member",
    description: "Learning-oriented, onboarding-focused, trust-building.",
  },
};

const SITUATIONS = {
  forming_team: {
    label: "Forming a Team",
    description: "Create a team charter with roles, goals, and norms.",
  },
  running_meetings: {
    label: "Running Meetings",
    description: "Plan productive, time-boxed meetings.",
  },
  resolving_conflict: {
    label: "Resolving Conflict",
    description: "Navigate disagreements with a 6-step framework.",
  },
  tracking_progress: {
    label: "Tracking Progress",
    description: "Set up accountability tracking for tasks.",
  },
  giving_feedback: {
    label: "Giving Feedback",
    description: "Give constructive feedback using the SBI model.",
  },
};

const scenarios = [
  {
    title: "A teammate isn't pulling their weight",
    prompt:
      "One person on our four-person team has missed the last two deadlines and isn't responding to messages. Our project is due in three weeks. What should we do?",
    responses: {
      team_leader:
        "Here's a direct action plan:\n\n1. Have a private one-on-one conversation with this teammate within 48 hours. Be specific: 'You missed the March 1 and March 8 deliverables, and we haven't heard back on Slack.'\n\n2. Listen first — there may be personal circumstances. But set clear expectations: 'We need X delivered by Friday. Can you commit to that?'\n\n3. Redistribute risk now. Identify which of their remaining tasks are critical-path and assign backups.\n\n4. Document the conversation and agreements. If the pattern continues, escalate to your instructor with specific dates and evidence.\n\n5. Update your accountability tracker so the whole team has visibility into who owns what.",
      facilitator:
        "Let's approach this with empathy but structure:\n\n1. Start with a team check-in — not singling anyone out. Ask everyone: 'How are we feeling about our pace? Any blockers?'\n\n2. Follow up with a private, caring conversation: 'Hey, I noticed you've been quiet lately. Everything okay? We want to support you.'\n\n3. Co-create a recovery plan together. Ask them what they feel they can realistically take on.\n\n4. Revisit your team norms together — this is a chance to strengthen your working agreement, not punish someone.\n\n5. Set up a brief weekly sync (15 min) so no one drifts silently. It's easier to course-correct early.",
      contributor:
        "From a practical standpoint, here's what I'd do:\n\n1. First, protect the project. Look at what's undone and figure out what you and the other active members can absorb without burning out.\n\n2. Send a clear, written message to the teammate: 'We're counting on you for [specific tasks]. Can you confirm by tomorrow?'\n\n3. Set up a shared tracker (even a simple spreadsheet) with Task / Owner / Deadline / Status columns so there's no ambiguity.\n\n4. Keep doing excellent work on your part — your contributions are documented through commits, docs, and deliverables.\n\n5. If nothing changes in a week, loop in the instructor with a factual summary. No drama, just dates and deliverables.",
      new_member:
        "This is tough, especially if you're newer to the team. Here's how to navigate it:\n\n1. Don't assume the worst — reach out to the teammate with genuine curiosity: 'Hey, just checking in. Is there anything blocking you?'\n\n2. Talk to the rest of your team about how you're feeling. You're allowed to say 'I'm worried about the timeline.'\n\n3. Offer to help — maybe they're stuck and don't know how to ask. 'I have some bandwidth — want to pair on that section?'\n\n4. If the team decides to redistribute work, volunteer for something specific. It builds trust and shows initiative.\n\n5. Keep notes on what's happening. If things escalate, having a clear record protects everyone.",
    },
  },
  {
    title: "Our team meetings feel unproductive",
    prompt:
      "We meet twice a week but nothing seems to get decided. People talk over each other, we go off-topic, and we leave without clear action items. How do we fix this?",
    responses: {
      team_leader:
        "Time to add structure. Here's your fix:\n\n1. Assign roles: one person facilitates, one takes notes, rotate weekly. The facilitator owns the agenda and keeps time.\n\n2. Create a standing agenda template:\n   - 2 min: Quick wins / updates\n   - 10 min: Decisions needed (list them in advance)\n   - 10 min: Blockers & problem-solving\n   - 3 min: Action items recap\n\n3. Rule: no topic gets discussed without being on the agenda. Side topics go in the 'parking lot.'\n\n4. End every meeting by reading back action items: who, what, by when. If it's not assigned, it's not real.\n\n5. Cut to one meeting per week if the second one isn't earning its time. Async updates can replace status meetings.",
      facilitator:
        "Let's redesign your meetings to be inclusive and focused:\n\n1. Before each meeting, share a brief agenda and ask: 'What do you need from this meeting?' This gives quieter members a voice early.\n\n2. Use a 'round-robin' format for key decisions — everyone gets 60 seconds to share their view before open discussion.\n\n3. Designate a 'parking lot' on a shared doc. When someone goes off-topic, gently say: 'Great thought — let's park that and come back to it.'\n\n4. Use a 'fist-to-five' quick vote to check consensus before moving on. It surfaces disagreement without long debates.\n\n5. Close with appreciations — 30 seconds where anyone can thank a teammate. It builds connection and ends on a positive note.",
      contributor:
        "Here's a practical checklist to make meetings count:\n\n1. Pre-meeting: Share the agenda + any documents 24 hours before. If there's nothing to decide, cancel the meeting.\n\n2. Use a shared Google Doc as the 'meeting log.' Real-time notes so everyone sees what's being captured.\n\n3. Time-box each topic. Use a phone timer. When time's up, either decide or schedule a follow-up.\n\n4. Action item format: 'TASK: [What] — [Who] — [By when].' Pin these at the top of your team chat after each meeting.\n\n5. Do a 1-minute 'meeting retro' monthly: 'What's working? What should we change?' Iterate on the process like you would on a product.",
      new_member:
        "Unproductive meetings are frustrating, especially when you're still learning the team dynamics. Here's how to help:\n\n1. Offer to be the note-taker. It's a great way to contribute, stay engaged, and learn what matters to the team.\n\n2. When discussion drifts, you can gently ask: 'Just to make sure I'm tracking — what are we trying to decide right now?'\n\n3. After the meeting, send a quick summary in your team chat: 'Here's what I captured — did I miss anything?' This naturally creates accountability.\n\n4. Suggest a simple experiment: 'What if we tried a 25-minute meeting with a timer next time?' Low-stakes, easy to try.\n\n5. Pay attention to who's not speaking. You might say: 'Alex, I'd love to hear your take on this.' It helps the whole group.",
    },
  },
  {
    title: "We need to give each other honest feedback",
    prompt:
      "Our professor asked us to do peer evaluations. Some teammates have issues to address but nobody wants to be the bad guy. How do we give honest but constructive feedback?",
    responses: {
      team_leader:
        "Feedback is a leadership responsibility. Here's how to do it well:\n\n1. Frame it for the team: 'Honest feedback is how we all get better. Let's agree to give it with respect and receive it with openness.'\n\n2. Use the SBI model for each piece of feedback:\n   - Situation: 'During last Tuesday's meeting...'\n   - Behavior: '...you interrupted Alex three times while they were presenting.'\n   - Impact: '...it made it hard for us to hear the full proposal and Alex seemed discouraged.'\n\n3. Balance every piece of critical feedback with something genuine they do well. Not a 'feedback sandwich' — real recognition.\n\n4. Go first. Share your own areas for improvement to set the tone.\n\n5. Make it forward-looking: 'Here's what I'd love to see more of' rather than 'Here's what you did wrong.'",
      facilitator:
        "Let's design a safe process for this:\n\n1. Set ground rules together: 'Feedback is about behaviors, not character. We're here to help each other grow.'\n\n2. Use a structured written format first — everyone writes SBI feedback for each teammate privately:\n   - Situation: When/where\n   - Behavior: What you observed\n   - Impact: How it affected the work or team\n\n3. Share feedback in pairs first, not in front of the whole group. It feels safer and allows real dialogue.\n\n4. After sharing, each person summarizes: 'What I heard is... The one thing I'll work on is...'\n\n5. Follow up in two weeks. Check in: 'How's it going with the thing you committed to?' Feedback without follow-up is just venting.",
      contributor:
        "Here's a practical approach to peer feedback:\n\n1. Write it down first. Don't wing it — draft your feedback using the SBI model and review it before sharing.\n\n2. Be specific, not general. 'Your section of the report was submitted two days late and had formatting issues' is actionable. 'You don't try hard enough' is not.\n\n3. Focus on what you need, not what they are: 'I need the data analysis by Thursday so I can integrate it' vs. 'You're always late.'\n\n4. Prepare one specific suggestion per person: 'One thing that would really help the team is if you could [specific action].'\n\n5. For the evaluation form: be honest but factual. Your professor will notice if everyone rates each other 10/10 — it signals avoidance, not teamwork.",
      new_member:
        "Peer feedback can feel intimidating, especially when you're newer. Here's how to approach it:\n\n1. Remember: giving honest feedback is a gift. You're helping someone see what they can't see themselves.\n\n2. Start with what you appreciate — genuinely. 'I've learned a lot from how you organize our shared docs.'\n\n3. For constructive feedback, use 'I' statements: 'I felt a bit lost when we changed direction without discussing it' vs. 'You never include me in decisions.'\n\n4. It's okay to ask for feedback too: 'I'm still finding my footing — what's one thing I could do differently to contribute more?'\n\n5. If you're nervous about a specific piece of feedback, practice saying it out loud first. Or write it as a letter you'd be comfortable receiving.",
    },
  },
];

let knowsRole = null;
let preselectedRole = null;
let selectedRole = null;
let selectedSituation = "forming_team";
let customSituationData = null;
let currentSlide = 0;
let autoRotationTimer = null;

let conversation = [];
let typingIndicatorEl = null;

const showScreen = (name) => {
  Object.entries(screens).forEach(([key, element]) => {
    if (key === name) {
      element.classList.add("active");
      element.classList.remove("hidden");
    } else {
      element.classList.remove("active");
      element.classList.add("hidden");
    }
  });
};

const resetSplash = () => {
  knowsRole = null;
  preselectedRole = null;
  selectedRole = null;
  selectedSituation = "forming_team";
  splashContinueBtn.disabled = true;
  rolePicker.classList.add("hidden");
  roleCards.forEach((card) => card.classList.remove("selected"));
  knowRoleYesBtn.classList.remove("selected");
  knowRoleNoBtn.classList.remove("selected");
  knowRoleYesBtn.setAttribute("aria-pressed", "false");
  knowRoleNoBtn.setAttribute("aria-pressed", "false");
  if (roleFeedback) {
    roleFeedback.textContent = "";
    roleFeedback.classList.add("hidden");
  }
  startChatBtn.disabled = true;
  preferenceButtonsContainer.innerHTML = "";
};

const renderSlides = () => {
  if (slidesContainer.childElementCount > 0) return;

  scenarios.forEach((scenario) => {
    const slide = document.createElement("article");
    slide.className = "scenario-slide";

    const meta = document.createElement("div");
    meta.className = "scenario-meta";
    meta.innerHTML = `<h3>${scenario.title}</h3>`;

    const promptCard = document.createElement("div");
    promptCard.className = "prompt-card";
    promptCard.innerHTML = `<strong>Scenario</strong><p>${scenario.prompt}</p>`;

    const responseGrid = document.createElement("div");
    responseGrid.className = "response-grid";

    Object.entries(ROLES).forEach(([roleKey, { label }]) => {
      const response = scenario.responses[roleKey];
      const responseCard = document.createElement("div");
      responseCard.className = "response-card";
      responseCard.innerHTML = `<h4>${label}</h4><p>${response}</p>`;
      responseGrid.appendChild(responseCard);
    });

    slide.appendChild(meta);
    slide.appendChild(promptCard);
    slide.appendChild(responseGrid);
    slidesContainer.appendChild(slide);
  });

  scenarios.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "progress-dot";
    if (index === currentSlide) dot.classList.add("active");
    progressContainer.appendChild(dot);
  });
};

const updateSlidePosition = () => {
  slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  const dots = progressContainer.querySelectorAll(".progress-dot");
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};

const startAutoRotation = () => {
  stopAutoRotation();
  autoRotationTimer = window.setInterval(() => {
    currentSlide = (currentSlide + 1) % scenarios.length;
    updateSlidePosition();
  }, 8000);
};

const stopAutoRotation = () => {
  if (autoRotationTimer) {
    window.clearInterval(autoRotationTimer);
    autoRotationTimer = null;
  }
};

const updatePreferenceButtons = () => {
  preferenceButtonsContainer.innerHTML = "";
  Object.entries(ROLES).forEach(([key, { label }]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.dataset.role = key;

    const suggestedBadge =
      preselectedRole && preselectedRole === key
        ? '<span class="badge">Suggested for you</span>'
        : "";

    button.innerHTML = `I prefer ${label}${suggestedBadge}`;

    if (selectedRole === key) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      selectedRole = key;
      updatePreferenceButtons();
      startChatBtn.disabled = false;
      renderRolePills();
      updateActiveModeLabel();
    });

    preferenceButtonsContainer.appendChild(button);
  });

  if (selectedRole) {
    startChatBtn.disabled = false;
  }
};

const renderRolePills = () => {
  rolePillGroup.innerHTML = "";
  Object.entries(ROLES).forEach(([key, { label }]) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "style-pill";
    pill.dataset.role = key;
    pill.textContent = label;
    if (selectedRole === key) {
      pill.classList.add("active");
    }
    pill.addEventListener("click", () => {
      selectedRole = key;
      renderRolePills();
      updatePreferenceButtons();
      updateActiveModeLabel();
    });
    rolePillGroup.appendChild(pill);
  });
};

const updateActiveModeLabel = () => {
  const roleLabel = selectedRole ? ROLES[selectedRole].label : "Team Leader";
  let situationLabel = "Forming a Team";

  if (selectedSituation === "custom" && customSituationData) {
    situationLabel = customSituationData.label;
  } else if (SITUATIONS[selectedSituation]) {
    situationLabel = SITUATIONS[selectedSituation].label;
  }

  activeModeLabel.textContent = `Chatting as ${roleLabel} – ${situationLabel}`;
};

const renderSituationPills = () => {
  if (!selectedSituation || !SITUATIONS[selectedSituation]) {
    selectedSituation = Object.keys(SITUATIONS)[0];
  }

  situationPillGroup.innerHTML = "";
  Object.entries(SITUATIONS).forEach(([key, { label }]) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "task-pill";
    pill.dataset.situation = key;
    pill.textContent = label;
    if (selectedSituation === key) {
      pill.classList.add("active");
    }
    pill.addEventListener("click", () => {
      selectedSituation = key;
      renderSituationPills();
      updateActiveModeLabel();
    });
    situationPillGroup.appendChild(pill);
  });

  // Add "Custom..." button
  const customBtn = document.createElement("button");
  customBtn.type = "button";
  customBtn.className = "task-pill custom-add";
  customBtn.textContent = customSituationData ? customSituationData.label : "+ Custom";
  if (selectedSituation === "custom") {
    customBtn.classList.add("active");
  }
  customBtn.addEventListener("click", () => {
    if (customSituationData) {
      selectedSituation = "custom";
      renderSituationPills();
      updateActiveModeLabel();
    } else {
      customSituationModal.classList.add("active");
    }
  });
  situationPillGroup.appendChild(customBtn);
};

const canRegenerate = () =>
  conversation.length > 0 && conversation[conversation.length - 1].role === "assistant";

const updateRegenerateAvailability = () => {
  regenerateBtn.disabled = !canRegenerate();
};

const showCarousel = () => {
  showScreen("carousel");
  currentSlide = 0;
  renderSlides();
  updateSlidePosition();
  updatePreferenceButtons();
  renderRolePills();
  updateActiveModeLabel();
  startAutoRotation();
};

const showChat = () => {
  showScreen("chat");
  stopAutoRotation();
  renderRolePills();
  renderSituationPills();
  updateActiveModeLabel();
  updateRegenerateAvailability();
  renderMessages();
  window.setTimeout(() => inputEl.focus(), 200);
};

const createTypingIndicator = () => {
  typingIndicatorEl = document.createElement("div");
  typingIndicatorEl.className = "typing-indicator";
  typingIndicatorEl.innerHTML = "<span></span><span></span><span></span>";
  renderMessages();
};

const removeTypingIndicator = () => {
  typingIndicatorEl = null;
  renderMessages();
};

const renderMessages = () => {
  if (!messagesEl) return;
  messagesEl.innerHTML = "";
  conversation.forEach((msg) => {
    const messageEl = document.createElement("article");
    messageEl.className = `message ${msg.role}`;

    const avatarEl = document.createElement("div");
    avatarEl.className = "avatar";
    avatarEl.textContent = msg.role === "user" ? "You" : "TW";

    const bubbleEl = document.createElement("div");
    bubbleEl.className = "bubble";
    bubbleEl.textContent = msg.content;

    messageEl.appendChild(avatarEl);
    messageEl.appendChild(bubbleEl);
    messagesEl.appendChild(messageEl);
  });

  if (typingIndicatorEl) {
    messagesEl.appendChild(typingIndicatorEl);
  }

  messagesEl.scrollTop = messagesEl.scrollHeight;
};

const autoResize = () => {
  inputEl.style.height = "auto";
  inputEl.style.height = `${Math.min(inputEl.scrollHeight, 200)}px`;
};

const sendMessage = async () => {
  const payload = {
    messages: conversation.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    role: selectedRole || "team_leader",
    situation: selectedSituation || "forming_team",
    customSituation: selectedSituation === "custom" ? customSituationData : undefined,
  };

  sendBtn.disabled = true;
  regenerateBtn.disabled = true;
  createTypingIndicator();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({}));
      throw new Error(errorPayload?.error || "Request failed");
    }

    const data = await response.json();
    conversation.push({
      role: "assistant",
      content: data.reply || "Sorry, no reply is available right now.",
    });
  } catch (error) {
    conversation.push({
      role: "assistant",
      content: `Request failed: ${error.message}`,
    });
  } finally {
    removeTypingIndicator();
    sendBtn.disabled = false;
    updateRegenerateAvailability();
  }
};

const regenerateResponse = async () => {
  if (!canRegenerate()) return;

  conversation.pop();
  updateRegenerateAvailability();
  renderMessages();

  await sendMessage();
  renderMessages();
};

knowRoleYesBtn.addEventListener("click", () => {
  knowsRole = true;
  rolePicker.classList.remove("hidden");
  splashContinueBtn.disabled = !preselectedRole;
  knowRoleYesBtn.setAttribute("aria-pressed", "true");
  knowRoleNoBtn.setAttribute("aria-pressed", "false");
  knowRoleNoBtn.classList.remove("selected");
  if (roleFeedback) {
    roleFeedback.textContent = "";
    roleFeedback.classList.add("hidden");
  }
});

knowRoleNoBtn.addEventListener("click", () => {
  knowsRole = false;
  rolePicker.classList.add("hidden");
  preselectedRole = null;
  selectedRole = null;
  roleCards.forEach((card) => card.classList.remove("selected"));
  splashContinueBtn.disabled = false;
  knowRoleYesBtn.classList.remove("selected");
  knowRoleYesBtn.setAttribute("aria-pressed", "false");
  knowRoleNoBtn.setAttribute("aria-pressed", "true");
  knowRoleNoBtn.classList.add("selected");
  if (roleFeedback) {
    roleFeedback.textContent = "No worries! Explore the scenarios and pick a perspective that fits.";
    roleFeedback.classList.remove("hidden");
  }
});

roleCards.forEach((card) => {
  card.addEventListener("click", () => {
    roleCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    preselectedRole = card.dataset.role;
    selectedRole = preselectedRole;
    splashContinueBtn.disabled = false;
  });
});

splashContinueBtn.addEventListener("click", () => {
  showCarousel();
});

carouselPrevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + scenarios.length) % scenarios.length;
  updateSlidePosition();
  startAutoRotation();
});

carouselNextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % scenarios.length;
  updateSlidePosition();
  startAutoRotation();
});

startChatBtn.addEventListener("click", () => {
  showChat();
});

carouselBackBtn.addEventListener("click", () => {
  stopAutoRotation();
  showScreen("splash");
});

resetOnboardingBtn.addEventListener("click", () => {
  stopAutoRotation();
  conversation = [];
  renderMessages();
  inputEl.value = "";
  autoResize();
  resetSplash();
  updateRegenerateAvailability();
  showScreen("splash");
});

clearHistoryBtn.addEventListener("click", () => {
  confirmModal.classList.add("active");
});

confirmClearBtn.addEventListener("click", () => {
  conversation = [];
  renderMessages();
  updateRegenerateAvailability();
  confirmModal.classList.remove("active");
});

cancelClearBtn.addEventListener("click", () => {
  confirmModal.classList.remove("active");
});

confirmModal.addEventListener("click", (e) => {
  if (e.target === confirmModal) {
    confirmModal.classList.remove("active");
  }
});

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const content = inputEl.value.trim();
  if (!content) return;

  conversation.push({ role: "user", content });
  updateRegenerateAvailability();
  inputEl.value = "";
  autoResize();
  renderMessages();

  await sendMessage();
  renderMessages();
});

regenerateBtn.addEventListener("click", async () => {
  await regenerateResponse();
});

inputEl.addEventListener("input", autoResize);
inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    formEl.dispatchEvent(new Event("submit", { cancelable: true }));
  }
});

whatIsThisBtn.addEventListener("click", () => {
  infoModal.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
  infoModal.classList.remove("active");
});

infoModal.addEventListener("click", (e) => {
  if (e.target === infoModal) {
    infoModal.classList.remove("active");
  }
});

closeCustomSituationModalBtn.addEventListener("click", () => {
  customSituationModal.classList.remove("active");
});

customSituationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = customSituationNameInput.value.trim();
  const desc = customSituationDescInput.value.trim();

  if (name && desc) {
    customSituationData = { label: name, description: desc };
    selectedSituation = "custom";
    customSituationModal.classList.remove("active");
    renderSituationPills();
    updateActiveModeLabel();

    // Reset form
    customSituationNameInput.value = "";
    customSituationDescInput.value = "";
  }
});

customSituationModal.addEventListener("click", (e) => {
  if (e.target === customSituationModal) {
    customSituationModal.classList.remove("active");
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoRotation();
  } else if (screens.carousel.classList.contains("active")) {
    startAutoRotation();
  }
});

resetSplash();
autoResize();
renderRolePills();
renderSituationPills();
updateActiveModeLabel();
updateRegenerateAvailability();
renderMessages();
