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
  background: url("https://raw.githubusercontent.com/vitalien-bytes/lisa-dtn/main/avatar-lisa.png?raw=1");
  background-size: cover;
  background-position: center;
  width: 60px;
  height: 60px;
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
  display: flex;
  align-items: center;
  gap: 10px;
}

#dtn-header img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

#dtn-messages {
  padding: 10px;
  height: 360px;
  overflow-y: auto;
}

.msg-lisa {
  color: #0abdc6;
  font-weight: bold;
}

.msg-user {
  color: #000;
}

#typing {
  font-style: italic;
  color: grey;
  margin: 5px 0;
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
  <div id="dtn-header">
      <img src="https://raw.githubusercontent.com/vitalien-bytes/lisa-dtn/main/avatar-lisa.png?raw=1" />
      LISA • Assistance DTN
  </div>
  <div id="dtn-messages"></div>
  <div id="dtn-input-zone">
    <input id="dtn-input" type="text" placeholder="Votre message…" />
    <button id="dtn-send">➤</button>
  </div>
`;
document.body.appendChild(box);


/* Toggle */
bubble.addEventListener("click", toggleChat);
function toggleChat() {
  box.style.display = box.style.display === "none" ? "block" : "none";
}


/* Auto-open */
setTimeout(() => {
  box.style.display = "block";
  sendWelcomeMessage();
}, 3000);


/* Messages */
function addMessage(text, from="LISA") {
  const msgBox = document.getElementById("dtn-messages");

  const div = document.createElement("div");
  div.className = from === "LISA" ? "msg-lisa" : "msg-user";
  div.innerHTML = `<strong>${from} :</strong> ${text}`;

  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
}

/* Typing animation */
function typing(on=true) {
  const msgBox = document.getElementById("dtn-messages");
  let t = document.getElementById("typing");

  if (on) {
    if (!t) {
      t = document.createElement("div");
      t.id = "typing";
      t.innerHTML = "LISA est en train d'écrire...";
      msgBox.appendChild(t);
    }
  } else if (t) t.remove();
}


/* Message d'accueil */
function sendWelcomeMessage() {
  typing(true);
  setTimeout(() => {
    typing(false);
    addMessage(
      "Bonjour 👋, je suis <strong>LISA</strong>, l’assistante numérique de Digital Telecom Network."
    );
    addMessage("Je peux vous aider pour :<br>📡 Fibre & Télécom<br>⚡ Électricité<br>🔆 Panneaux solaires<br>🔌 Bornes de recharge<br>🛠 Travaux & installations");
    addMessage("Comment puis-je vous aider aujourd’hui ?");
    addServiceButtons();
  }, 1000);
}


/* Boutons */
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


/* Envoi */
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

  if (window.processDevisMessage && window.processDevisMessage(msg)) return;

  typing(true);
  setTimeout(() => {
    typing(false);
    addMessage("Merci 🙏 Je traite votre demande…");
  }, 800);
}
