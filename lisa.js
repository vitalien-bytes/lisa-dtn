/* =============================
   LISA — CHATBOT IA DTN (v3 Pro)
   Compatible module devis
============================= */

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

#dtn-messages {
  padding: 10px;
  height: 360px;
  overflow-y: auto;
}

#typing {
  font-style: italic;
  color: #00e5ff;
  opacity: 0.8;
  margin: 8px 0;
}

.user-msg {
  color: #000;
  font-weight: bold;
}

.lisa-msg {
  color: #00e5ff;
  font-weight: bold;
}

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
`;

/* Inject CSS */
const style = document.createElement("style");
style.innerHTML = lisaStyles;
document.head.appendChild(style);

/* === Bulle === */
const bubble = document.createElement("div");
bubble.id = "dtn-bubble";
document.body.appendChild(bubble);

/* === Fenêtre === */
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

/* === Affichage / fermeture === */
bubble.addEventListener("click", toggleChat);

function toggleChat() {
  box.style.display = box.style.display === "none" ? "block" : "none";
}

/* === Auto-ouverture === */
setTimeout(() => {
  box.style.display = "block";
  sendWelcomeMessage();
}, 3000);

/* === Typing indicator === */
function showTyping() {
  const msgBox = document.getElementById("dtn-messages");
  let typing = document.getElementById("typing");

  if (!typing) {
    typing = document.createElement("div");
    typing.id = "typing";
    typing.innerHTML = "LISA est en train d'écrire…";
    msgBox.appendChild(typing);
  }

  msgBox.scrollTop = msgBox.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}

/* === Fonction d'ajout de message === */
function addMessage(text, from = "LISA") {
  const box = document.getElementById("dtn-messages");
  const msg = document.createElement("div");

  msg.style.margin = "8px 0";

  if (from === "LISA") {
    msg.innerHTML = `<span class="lisa-msg">LISA :</span> ${text}`;
  } else {
    msg.innerHTML = `<span class="user-msg">Vous :</span> ${text}`;
  }

  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

/* === Message de bienvenue === */
function sendWelcomeMessage() {
  showTyping();
  setTimeout(() => {
    hideTyping();
    addMessage("Bonjour 👋, je suis <strong>LISA</strong>, l’assistante numérique de Digital Telecom Network.");
  }, 600);

  setTimeout(() => {
    addMessage("Je peux vous aider pour :<br>📡 Fibre & Télécom<br>⚡ Électricité<br>🔆 Panneaux solaires<br>🔌 Bornes de recharge<br>🛠 Travaux & installations");
  }, 1200);

  setTimeout(() => {
    addMessage("Comment puis-je vous aider aujourd’hui ?");
    addServiceButtons();
  }, 1800);
}

/* === Boutons === */
function addServiceButtons() {
  const msgBox = document.getElementById("dtn-messages");

  const wrapper = document.createElement("div");
  wrapper.id = "dtn-buttons";

  wrapper.innerHTML = `
    <div class="dtn-btn" id="btn-help">Demande d’aide</div>
    <div class="dtn-btn" id="btn-devis">Demande de devis</div>
  `;

  msgBox.appendChild(wrapper);
  msgBox.scrollTop = msgBox.scrollHeight;

  document.getElementById("btn-help").onclick = () => {
    addMessage("Très bien 👍 Quel type d’aide souhaitez-vous ?");
  };

  document.getElementById("btn-devis").onclick = () => {
    addMessage("Parfait 🧾 Quel type de devis souhaitez-vous réaliser ?");
    if (window.startDevis) startDevis();
  };
}

/* === Envoi message utilisateur === */
document.getElementById("dtn-send").addEventListener("click", sendMessage);
document.getElementById("dtn-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("dtn-input");
  const msg = input.value.trim();
  if (msg === "") return;

  addMessage(msg, "Vous");
  input.value = "";

  // Module devis actif → on laisse gérer
  if (window.processDevisMessage && processDevisMessage(msg)) return;

  showTyping();

  setTimeout(() => {
    hideTyping();
    addMessage("Merci 🙏 Je traite votre demande…", "LISA");
  }, 1200);
}
