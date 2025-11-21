window.onload = () => {

  /* =============================
      LISA — CHATBOT IA DTN (v1)
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
  `;

  /* Injecte le CSS */
  const addStyle = document.createElement("style");
  addStyle.innerHTML = lisaStyles;
  document.head.appendChild(addStyle);

  /* === Création de la bulle === */
  const bubble = document.createElement("div");
  bubble.id = "dtn-bubble";
  document.body.appendChild(bubble);

  /* === Création de la fenêtre === */
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

  /* === Ouvre / ferme === */
  bubble.addEventListener("click", () => {
    windowBox.style.display =
      windowBox.style.display === "none" ? "block" : "none";
  });

  /* === Envoi message utilisateur === */
  document.getElementById("dtn-send").addEventListener("click", sendMessage);
  document.getElementById("dtn-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function addMessage(text, from = "LISA") {
    const box = document.getElementById("dtn-messages");
    const msg = document.createElement("div");
    msg.style.margin = "8px 0";
    msg.innerHTML = `<strong>${from} :</strong> ${text}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
  }

  function sendMessage() {
    const input = document.getElementById("dtn-input");
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, "Vous");
    input.value = "";

    setTimeout(() => {
      addMessage("Merci 🙏 Je traite votre demande…");
    }, 600);
  }

};
