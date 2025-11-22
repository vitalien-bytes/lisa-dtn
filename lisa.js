/* =============================
   LISA — CHATBOT IA DTN (v3)
   Avatar + Typing + Couleurs pro
============================= */

/* === URL de l’avatar Lisa === */
const LISA_AVATAR = "https://raw.githubusercontent.com/vitalien-bytes/lisa-dtn/main/avatar-lisa.png";

/* === CSS dynamique === */
const lisaStyles = `
#dtn-bubble {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007bff;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 99999;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

#dtn-window {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 520px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.25);
  display: none;
  z-index: 99998;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

#dtn-header {
  background: #007bff;
  color: white;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
}

/* Messages */
.dtn-msg {
  margin: 8px 0;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.dtn-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 4px;
}

.dtn-text-lisa {
  background: #e0faff;
  padding: 10px;
  border-radius: 10px;
  max-width: 230px;
  color: #007bff;
  font-weight: 600;
}

.dtn-text-user {
  background: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  max-width: 230px;
  color: #000;
  margin-left: auto;
}

#dtn-typing {
  font-style: italic;
  color: #888;
  margin: 5px 0;
}

#dtn-messages {
  padding: 10px;
  height: 360px;
  overflow-y: auto;
}

/* Input zone */
#dtn-input-zone {
  padding: 10px;
  display: flex;
  gap: 5px;
  border-top: 1px solid #ddd;
}

#dtn-input-zone input {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #aaa;
}

#dtn-input-zone button {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
}

/* Buttons */
#dtn-buttons {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}

.dtn-btn {
  flex: 1;
  padding: 8px;
  background: #007bff;
  color: white;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
}
`;

/* Inject CSS */
const style = document.createElement("style");
style.innerHTML = lisaStyles;
document.head.appendChild(style);

/* === Create bubble === */
const bubble = document.createElement("div");
bubble.id = "dtn-bubble";
document.body.appendChild(bubble);

/* === Create window === */
const box = document.createElement("div");
box.id = "dtn-window";
box.innerHTML = `
  <div id="dtn-header">LISA • Assistance DTN</div>
  <div id="dtn-messages"></div>
  <div id="dtn-input-zone">
    <input id="dtn-input" type="text" placeholder="Votre message…" />
    <button id="dtn-send">➤</button>
  </div>
`;
document.body.appendChild(box);

/* === Toggle Chat === */
bubble.onclick = () => {
  box.style.display = box.style.display === "none" ? "block" : "none";
};

/* === Typing indicator === */
function showTyping() {
  const zone = document.getElementById("dtn-messages");
  const typing = document.createElement("div");
  typing.id = "dtn-typing";
  typing.innerHTML = "LISA est en train d’écrire…";
  zone.appendChild(typing);
  zone.scrollTop = zone.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById("dtn-typing");
  if (el) el.remove();
}

/* === Add message === */
function addMessage(text, from = "LISA") {
  const zone = document.getElementById("dtn-messages");

  hideTyping();

  const msg = document.createElement("div");
  msg.classList.add("dtn-msg");

  if (from === "LISA") {
    msg.innerHTML = `
      <img src="${LISA_AVATAR}" class="dtn-avatar">
      <div class="dtn-text-lisa">${text}</div>
    `;
  } else {
    msg.innerHTML = `
      <div class="dtn-text-user">${text}</div>
    `;
  }

  zone.appendChild(msg);
  zone.scrollTop = zone.scrollHeight;
}

/* === Auto-open + welcome === */
setTimeout(() => {
  box.style.display = "block";
  sendWelcomeMessage();
}, 3000);

function sendWelcomeMessage() {
  addMessage("Bonjour 👋, je suis <strong>LISA</strong>, l’assistante numérique de Digital Telecom Network.");
  addMessage("Je peux vous aider pour :<br>📡 Fibre & Télécom<br>⚡ Électricité<br>🔆 Panneaux solaires<br>🔌 Bornes de recharge<br>🛠 Travaux & installations");
  addMessage("Comment puis-je vous aider aujourd’hui ?");
  addServiceButtons();
}

/* === Buttons === */
function addServiceButtons() {
  const zone = document.getElementById("dtn-messages");
  const wrap = document.createElement("div");
  wrap.id = "dtn-buttons";

  wrap.innerHTML = `
    <div class="dtn-btn" id="btn-help">Demande d’aide</div>
    <div class="dtn-btn" id="btn-devis">Demande de devis</div>
  `;

  zone.appendChild(wrap);
  zone.scrollTop = zone.scrollHeight;

  document.getElementById("btn-help").onclick = () =>
    addMessage("Très bien 👍 Quel type d’aide souhaitez-vous ?");
  document.getElementById("btn-devis").onclick = () => startDevis();
}

/* === Input send === */
document.getElementById("dtn-send").onclick = sendMessage;
document.getElementById("dtn-input").addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("dtn-input");
  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "Vous");
  input.value = "";

  if (typeof processDevisMessage === "function" && processDevisMessage(msg)) return;

  showTyping();
  setTimeout(() => {
    addMessage("Merci 🙏 Je traite votre demande…");
  }, 600);
}
