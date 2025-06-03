const tagline = document.getElementById('tagline');
const overlay = document.getElementById('mic-overlay');
const enableBtn = document.getElementById('grant-mic-access');

// Add "X" close button after 8 seconds
setTimeout(() => {
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "20px";
  closeBtn.style.right = "30px";
  closeBtn.style.fontSize = "2rem";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.color = "#FFD700";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => overlay.style.display = "none";
  overlay.appendChild(closeBtn);
}, 8000);

function processCommand(transcript) {
  transcript = transcript.toLowerCase();
  const insightTags = document.getElementById("insight-tags");
  const gifContainer = document.getElementById("training-gif-container");

  if (
    transcript.includes("train with intent") ||
    transcript.includes("train for moments") ||
    transcript.includes("training for moments that matter") ||
    transcript.includes("training")
  ) {
    overlay.innerHTML = "<p style='color:#00ffee;'>✅ You’re in the right place. Welcome to Project Atlas.</p>";
    
    // Show the insight tags and video
    if (insightTags) insightTags.style.display = "block";
    if (gifContainer) gifContainer.style.display = "block";

    setTimeout(() => {
      overlay.style.display = "none";
    }, 3000);
  } else {
    overlay.innerHTML = "<p>😅 Hmm… you might be lost. Wanna try <a href='https://google.com' style='color:#FFD700;'>Google?</a>?</p>";
  }
}


if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  enableBtn.addEventListener('click', () => {
    enableBtn.disabled = true;
    enableBtn.innerText = "🎧 Listening...";
    recognition.start();
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    processCommand(transcript);
  };
} else {
  // Fallback input if speech isn't supported
  overlay.innerHTML = `
    <h2>🔇 Voice not supported</h2>
    <p>Try typing one of the phrases below:</p>
    <input type="text" id="fallback-input" placeholder="Type here..." style="padding: 10px; font-size: 1rem;">
    <button id="submit-text" style="margin-top:10px;padding:10px;font-size:1rem;">Submit</button>
  `;

  setTimeout(() => {
    const submitBtn = document.getElementById("submit-text");
    const inputBox = document.getElementById("fallback-input");
    submitBtn.addEventListener("click", () => {
      const text = inputBox.value;
      processCommand(text);
    });
  }, 100);
}
// Dynamic fade-in scrolling effect
const fadeElements = document.querySelectorAll('.fade-in');
const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

fadeElements.forEach(el => scrollObserver.observe(el));

// Keep track of whether the user has already triggered the demo
let hasTriggered = false;

function getRandomInsight() {
  const insights = [
    "🧠 You process information quickly and benefit from goal-oriented feedback.",
    "💬 You sound like someone who leads with intent — this helps build trust fast.",
    "🗣️ You speak with high information density. Consider how you modulate for different audiences.",
    "🔎 Your voice shows confident pacing and a clear sense of purpose.",
    "📘 You speak like someone who reads often — your rhythm is structured and expressive.",
    "🎯 Your tone signals decisiveness. This is great for leadership communication.",
    "📡 You project calm clarity — a valuable skill for training others under pressure.",
    "⏱️ You speak with measured precision. This supports long-term memory retention in learning environments.",
    "🌟 Your delivery is personable. That’s a core asset in team-building and outreach roles.",
    "💡 You reflect curiosity and focus. That makes you a natural systems thinker."
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}

function processCommand(transcript) {
  if (hasTriggered) return;

  transcript = transcript.toLowerCase();
  const insightTags = document.getElementById("insight-tags");
  const insightText = document.getElementById("insight-text");
  const gifContainer = document.getElementById("training-gif-container");

  if (
    transcript.includes("train with intent") ||
    transcript.includes("train for moments") ||
    transcript.includes("training for moments that matter") ||
    transcript.includes("training")
  ) {
    hasTriggered = true; // Prevent retrigger

    // Show confirmation
    overlay.innerHTML = "<p style='color:#00ffee;'>✅ You’re in the right place. Welcome to Project Atlas.</p>";

    // Update & show random insight
    if (insightText) {
      insightText.textContent = getRandomInsight();
      insightTags.style.display = "block";
    }
    if (insightText) {
  insightText.textContent = getRandomInsight();
  insightTags.style.display = "block";
    }
        // Fade out after 8 seconds
    setTimeout(() => {
      insightText.style.opacity = "0";
    }, 8000);
    // Fade out entire insight container
    setTimeout(() => {
      insightTags.style.opacity = "0";
      insightTags.style.transition = "opacity 1s ease-out";
    }, 8000);

    // Show video or gif
    if (gifContainer) gifContainer.style.display = "block";

    setTimeout(() => {
      overlay.style.display = "none";
    }, 3000);
  } else {
    overlay.innerHTML = "<p>😅 Hmm… you might be lost. Wanna try <a href='https://google.com' style='color:#FFD700;'>Google?</a>?</p>";
  }
}
// === Tagline/Video Cycle Logic ===
const gifContainer = document.getElementById("training-gif-container");
const video = document.getElementById("training-video");

function cycleTaglineAndVideo() {
  // Step 1: Show tagline
  tagline.style.opacity = "1";
  gifContainer.style.display = "none";

  // Step 2: Wait 8 seconds, then fade out tagline
  setTimeout(() => {
    tagline.style.opacity = "0";

    // Step 3: After fade, show video
    setTimeout(() => {
      gifContainer.style.display = "block";
      if (video) {
        video.currentTime = 0;
        video.play();
        video.style.opacity = "1";
      }

      // Step 4: After 20 seconds, fade out video
      setTimeout(() => {
        if (video) video.style.opacity = "0";

        // Step 5: After fade, cycle back to tagline
        setTimeout(cycleTaglineAndVideo, 1000); // loop
      }, 20000);
    }, 1000);
  }, 8000);
}

// 🚀 Start the cycle
cycleTaglineAndVideo();


//
// This file is meant to regroup your javascript code. You can either copy/past
// any code that should be executed on each page loading or write your own
// taking advantage of the Odoo framework to create new behaviors or modify
// existing ones. For example, doing this will greet any visitor with a 'Hello,
// world !' message in a popup:
//
/*
import { ConfirmationDialog } from '@web/core/confirmation_dialog/confirmation_dialog';
import { Interaction } from "@web/public/interaction";
import { registry } from "@web/core/registry";

class HelloWorldPopup extends Interaction {
    static selector = "#wrapwrap";

    start() {
        this.services.dialog.add(ConfirmationDialog, { body: "hello world"});
    }
}

registry
    .category("public.interactions")
    .add("website.hello_world_popup", HelloWorldPopup);
*/
