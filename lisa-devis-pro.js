/* =============================
   LISA — Assistant Devis DTN (PRO)
   Version stable + questions étape par étape
============================= */

/* === EmailJS === */
const SERVICE_ID = "service_068lpkn";  // Ton service Gmail
const TEMPLATE_ID = "template_n9quxp1"; // Ton template EmailJS

/* === Animation écriture === */
function lisaType(text, delay = 35) {
    return new Promise(resolve => {
        let box = document.getElementById("lisa-chat");
        let i = 0;

        let interval = setInterval(() => {
            box.innerHTML += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, delay);
    });
}

/* === "LISA écrit..." === */
function showTyping() {
    let box = document.getElementById("lisa-chat");
    let bubble = document.createElement("div");
    bubble.id = "lisa-typing";
    bubble.innerHTML = "<em>LISA est en train d'écrire…</em>";
    box.appendChild(bubble);
}

function hideTyping() {
    let bubble = document.getElementById("lisa-typing");
    if (bubble) bubble.remove();
}

/* === Envoi Email === */
async function envoyerEmail(data) {
    showTyping();
    await new Promise(r => setTimeout(r, 1200));
    hideTyping();

    await lisaType("📡 J’envoie votre demande à l’équipe DTN…<br><br>");

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, data);

        if (response.status === 200) {
            await lisaType("✅ Votre demande a bien été envoyée !<br>");
            await lisaType("Un technicien vous rappellera très vite.<br>");
        } else {
            throw new Error();
        }
    } catch {
        await lisaType("❌ Impossible d’envoyer le mail pour le moment.<br>");
        await lisaType("Merci de réessayer plus tard.<br>");
    }
}

/* === LOGIQUE DU CHAT === */

let recupData = {};
let etape = 0;

async function lisaRepond(message) {

    let chat = document.getElementById("lisa-chat");
    chat.innerHTML += `<div class="client-msg">${message}</div>`;

    showTyping();
    await new Promise(r => setTimeout(r, 1200));
    hideTyping();

    /* === ÉTAPE 0 — DÉBUT === */
    if (etape === 0) {
        await lisaType("Très bien 👍 Quel type de prestation souhaitez-vous ?<br><br>");
        await lisaType("1️⃣ Terrassement / Génie civil <br>");
        await lisaType("2️⃣ Électricité générale <br>");
        await lisaType("3️⃣ Panneaux photovoltaïques <br>");
        await lisaType("4️⃣ Bornes de recharge IRVE <br>");
        await lisaType("5️⃣ Problème internet / fibre <br>");
        await lisaType("6️⃣ Recherche de regard / détection de réseaux <br>");
        await lisaType("7️⃣ Autre demande <br>");
        etape = 1;
        return;
    }

    /* === ÉTAPE 1 — TYPE === */
    if (etape === 1) {
        recupData.type = message;
        await lisaType("Très bien 👍 Quel est votre nom ?<br>");
        etape = 2;
        return;
    }

    /* === ÉTAPE 2 — NOM === */
    if (etape === 2) {
        recupData.nom = message;
        await lisaType("Quel est votre numéro de téléphone ?<br>");
        etape = 3;
        return;
    }

    /* === ÉTAPE 3 — TÉLÉPHONE === */
    if (etape === 3) {
        recupData.tel = message;
        await lisaType("Votre adresse e-mail ? (facultatif)<br>");
        etape = 4;
        return;
    }

    /* === ÉTAPE 4 — EMAIL === */
    if (etape === 4) {
        recupData.mail = message;
        await lisaType("Pouvez-vous me donner quelques détails sur votre demande ?<br>");
        etape = 5;
        return;
    }

    /* === ÉTAPE 5 — DÉTAILS === */
    if (etape === 5) {
        recupData.details = message;

        await lisaType("Voici un récapitulatif :<br><br>");
        await lisaType("<pre>" + JSON.stringify(recupData, null, 2) + "</pre><br>");
        await lisaType("Souhaitez-vous envoyer cette demande ? (oui / non)<br>");

        etape = 6;
        return;
    }

    /* === ÉTAPE 6 — CONFIRMATION === */
    if (etape === 6) {
        if (message.toLowerCase() === "oui") {
            await envoyerEmail(recupData);
        } else {
            await lisaType("D’accord 👍 Je n’envoie rien. Si vous avez une autre question, je suis là !");
        }

        etape = 0;
        recupData = {};
        return;
    }
}
