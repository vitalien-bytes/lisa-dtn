/* =============================
   LISA — CHATBOT IA DTN (v3)
   Script externe GitHub
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

#dtn-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 6px;
  vertical-align: middle;
}

#typing {
  color: #00e5ff;
  font-style: italic;
  margin: 5px 0;
}
`;

/* Injecte CSS */
const style = document.createElement("style");
style.innerHTML = lisaStyles;
document.head.appendChild(style);

/* === Création de la bulle === */
const bubble = document.createElement("div");
bubble.id = "dtn-bubble";
document.body.appendChild(bubble);

/* === Création de la fenêtre === */
const box = document.createElement("div");
box.id = "dtn-window";
box.innerHTML = `
  <div id="dtn-header">LISA • Assistance DTN</div>
  <div id="dtn-messages"></div>
  <div id="typing" style="display:none;">LISA est en train d'écrire…</div>
  <div id="dtn-input-zone">
    <input id="dtn-input" type="text" placeholder="Votre message…" />
    <button id="dtn-send">➤</button>
  </div>
`;
document.body.appendChild(box);

/* === Ouvre / ferme === */
bubble.addEventListener("click", toggleChat);
function toggleChat() {
  box.style.display = box.style.display === "none" ? "block" : "none";
}

/* === Auto-ouverture après 3 sec === */
setTimeout(() => {
  box.style.display = "block";
  sendWelcomeMessage();
}, 3000);

/* === Affichage message === */
function addMessage(text, from = "LISA") {
  const msgBox = document.getElementById("dtn-messages");
  const msg = document.createElement("div");
  msg.style.margin = "8px 0";

  if (from === "LISA") {
    msg.innerHTML = `
      <img id="dtn-avatar" src="https://raw.githubusercontent.com/vitalien-bytes/lisa-dtn/main/avatar-lisa.png">
      <strong style="color:#00e5ff;">${from} :</strong>
      <span style="color:#00e5ff;"> ${text}</span>
    `;
  } else {
    msg.innerHTML = `<strong>${from} :</strong> ${text}`;
  }

  msgBox.appendChild(msg);
  msgBox.scrollTop = msgBox.scrollHeight;
}

/* === Animation “écriture” === */
function showTyping() {
  document.getElementById("typing").style.display = "block";
}
function hideTyping() {
  document.getElementById("typing").style.display = "none";
}

/* === Message d'accueil === */
function sendWelcomeMessage() {
  addMessage("Bonjour 👋, je suis <strong>LISA</strong>, l’assistante numérique de Digital Telecom Network.");
  addMessage("Je peux vous aider pour :<br>📡 Fibre & Télécom<br>⚡ Électricité<br>🔆 Panneaux solaires<br>🔌 Bornes de recharge<br>🛠 Travaux & installations");
  addMessage("Comment puis-je vous aider aujourd’hui ?");
  addServiceButtons();
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

/* === Envoi message === */
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

  // Si module devis actif
  if (window.processDevisMessage && processDevisMessage(msg)) return;

  showTyping();
  setTimeout(() => {
    hideTyping();
    addMessage("Merci 🙏 Je traite votre demande…");
  }, 700);
}
