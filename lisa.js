/* ===========================================
   LISA — CHATBOT IA DTN (Script externe GitHub)
   Version 1.0
   =========================================== */

/* --- Injection CSS --- */
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
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
}
#dtn-messages {
    padding: 15px;
    height: 360px;
    overflow-y: auto;
}
.lisa {
    background: #e9f2ff;
    margin: 8px 0;
    padding: 10px;
    border-radius: 10px;
    width: fit-content;
    max-width: 80%;
}
.user {
    background: #007bff;
    color: white;
    margin: 8px 0 8px auto;
    padding: 10px;
    border-radius: 10px;
    width: fit-content;
    max-width: 80%;
}
#dtn-input-zone {
    padding: 10px;
    border-top: 1px solid #ddd;
    display: flex;
    gap: 5px;
}
#dtn-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #aaa;
    border-radius: 8px;
}
#send {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 14px;
    border-radius: 8px;
    cursor: pointer;
}
`;
const styleTag = document.createElement("style");
styleTag.innerHTML = lisaStyles;
document.head.appendChild(styleTag);

/* --- Injection HTML --- */
const bubble = document.createElement("div");
bubble.id = "dtn-bubble";
document.body.appendChild(bubble);

const windowBox = document.createElement("div");
windowBox.id = "dtn-window";
windowBox.innerHTML = `
    <div id="dtn-header">Lisa – Assistante DTN</div>
    <div id="dtn-messages"></div>
    <div id="dtn-input-zone">
        <input id="dtn-input" placeholder="Écrire ici…">
        <button id="send">Envoyer</button>
    </div>
`;
document.body.appendChild(windowBox);

/* --- Logique UI --- */
document.getElementById("dtn-bubble").onclick = () => {
    const w = document.getElementById("dtn-window");
    w.style.display = (w.style.display === "none") ? "block" : "none";
};

function lisaMessage(txt) {
    const box = document.getElementById("dtn-messages");
    const msg = document.createElement("div");
    msg.className = "lisa";
    msg.innerHTML = txt;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function userMessage(txt) {
    const box = document.getElementById("dtn-messages");
    const msg = document.createElement("div");
    msg.className = "user";
    msg.innerText = txt;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

/* --- Envoi email FormSubmit --- */
function sendMailToDTN(data) {
    fetch("https://formsubmit.co/ajax/contact@digitaltelecomnetwork.fr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

/* --- Logique conversation --- */
let step = 0;
let infos = {};

lisaMessage("Bonjour 👋<br>Je suis <b>Lisa</b>, l’assistante DTN. Comment puis-je vous aider aujourd’hui ?");

document.getElementById("send").onclick = () => {
    const txt = document.getElementById("dtn-input").value.trim();
    if (!txt) return;

    userMessage(txt);
    document.getElementById("dtn-input").value = "";

    if (step === 0) {
        infos.type = txt;
        step = 1;
        lisaMessage("Super 👍<br>Quelle est l’adresse exacte du chantier ?");
    }
    else if (step === 1) {
        infos.adresse = txt;
        step = 2;
        lisaMessage("Très bien ! Pouvez-vous décrire brièvement votre besoin ?");
    }
    else if (step === 2) {
        infos.description = txt;
        step = 3;
        lisaMessage("Merci 🙌<br>J’envoie les informations à DTN…");

        sendMailToDTN({
            "Type de demande": infos.type,
            "Adresse": infos.adresse,
            "Description": infos.description
        });

        setTimeout(() => {
            lisaMessage("Votre demande a été envoyée 📩.<br>L’équipe vous recontacte rapidement !");
        }, 1500);
    }
};
