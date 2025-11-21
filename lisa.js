/* =============================
   LISA — CHATBOT IA DTN (v2)
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
  height: 380px;
  overflow-y: auto;
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

.lisa-btn {
  margin-top: 8px;
  padding: 8px;
  width: 100%;
  border-radius: 8px;
  background: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
`;

/* Inject CSS */
const addStyle = document.createElement("style");
addStyle.innerHTML = lisaStyles;
document.head.appendChild(addStyle);

/* === Bulle flottante === */
const bubble = document.createElement("div");
bubble.id = "dtn-bubble";
document.body.appendChild(bubble);

/* === Fenêtre LISA === */
const windowBox = document.createElement("div");
windowBox.id = "dtn-window";
windowBox.innerHTML = `
  <div id="dtn-header">LISA • Assistance DTN</div>
  <div id="dtn-messages"></div>
  <div id="dtn-input-zone">
    <input id="dtn-input" type="text" placeholder="Votre message…" />
    <button id="dtn-send">➤</button>
  </div>
`;
document.body.appendChild(windowBox);

/* Ouvrir / fermer la fenêtre */
bubble.addEventListener("click", () => {
  windowBox.style.display =
    windowBox.style.display === "none" ? "block" : "none";
});

/* === Fonction pour afficher un message === */
function addMessage(text, from = "LISA") {
  const box = document.getElementById("dtn-messages");
  const msg = document.createElement("div");
  msg.style.margin = "8px 0";
  msg.innerHTML = `<strong>${from} :</strong> ${text}`;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

/* === Fonction pour ajouter un bouton === */
function addButton(label, action) {
  const box = document.getElementById("dtn-messages");
  const btn = document.createElement("button");
  btn.className = "lisa-btn";
  btn.innerText = label;
  btn.onclick = action;
  box.appendChild(btn);
}

/* === Message d’accueil automatique === */
function lisaWelcome() {
  windowBox.style.display = "block";

  addMessage(
    `Bonjour 👋, je suis <strong>LISA</strong>, l’assistante numérique de Digital Telecom Network.<br><br>
    Je peux vous aider pour :<br>
    📡 Fibre & Télécom<br>
    ⚡ Électricité<br>
    🔆 Panneaux solaires<br>
    🔌 Bornes de recharge<br>
    🛠 Travaux & installations<br><br>
    Comment puis-je vous aider aujourd’hui ?`
  );

  addButton("🆘 Demande d'aide", () => {
    addMessage("Très bien 👍 Comment puis-je vous aider ?", "LISA");
  });

  addButton("🧾 Demande de devis", () => {
    addMessage("Parfait ! Pour établir un devis, puis-je avoir :<br>• Votre nom<br>• Votre adresse<br>• Votre besoin précis ?", "LISA");
  });
}

/* === Ouverture auto après 3 secondes === */
setTimeout(() => {
  lisaWelcome();
}, 3000);

/* === Gestion de l’envoi classique === */
document.getElementById("dtn-send").addEventListener("click", sendMessage);
document.getElementById("dtn-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

/* === Intelligence simple === */
function sendMessage() {
  const input = document.getElementById("dtn-input");
  const msg = input.value.trim().toLowerCase();
  if (msg === "") return;

  addMessage(input.value, "Vous");
  input.value = "";

  setTimeout(() => {
    if (msg.includes("électr")) {
      addMessage("⚡ Très bien ! Quel type de problème électrique rencontrez-vous ?", "LISA");
      return;
    }

    if (msg.includes("fibre") || msg.includes("internet")) {
      addMessage("📡 D’accord ! Quel est votre souci avec la fibre ou l’internet ?", "LISA");
      return;
    }

    if (msg.includes("solaire") || msg.includes("panneau")) {
      addMessage("🔆 Voulez-vous une installation solaire ou un diagnostic ?", "LISA");
      return;
    }

    if (msg.includes("borne") || msg.includes("recharge")) {
      addMessage("🔌 Pour une borne de recharge, c’est pour un pro ou un particulier ?", "LISA");
      return;
    }

    addMessage("Merci 🙏 Pouvez-vous préciser votre demande ?", "LISA");
  }, 600);
}
