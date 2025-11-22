/* =============================
   LISA — Assistant Devis DTN
   Version PRO — mise à jour ID EmailJS
============================= */

/* === EmailJS === */
const SERVICE_ID = "service_068lpkn";  // ✅ Ton bon service Gmail
const TEMPLATE_ID = "template_n9quxp1"; // garde ton template actuel

/* === Interface === */
function lisaType(text, delay = 40) {
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

/* === Message "LISA écrit..." === */
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

/* === Envoi EmailJS === */
async function envoyerEmail(recup) {
    showTyping();

    // petit délai pour l’effet
    await new Promise(r => setTimeout(r, 1200));
    hideTyping();

    // Message avant l’envoi
    await lisaType("📡 J’envoie votre demande à l’équipe DTN…<br><br>");

    try {
        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, recup);

        if (response.status === 200) {
            await lisaType("✅ Votre demande a bien été envoyée !<br>");
            await lisaType("Un technicien vous rappellera au plus vite.<br>");
        } else {
            throw new Error();
        }
    } catch (error) {
        await lisaType("❌ Une erreur est survenue lors de l’envoi du mail.<br>");
        await lisaType("Merci de réessayer dans quelques minutes.<br>");
    }
}

/* === Logique de dialogue === */

let recupData = {};
let etape = 0;

async function lisaRepond(message) {

    let chat = document.getElementById("lisa-chat");
    chat.innerHTML += `<div class='client-msg'>${message}</div>`;

    showTyping();
    await new Promise(r => setTimeout(r, 1500));
    hideTyping();

    /* === Début du dialogue === */
    if (etape === 0) {
        await lisaType("Très bien, quel type de prestation souhaitez-vous ?<br><br>");
        await lisaType("1️⃣ Terrassement / Génie civil <br>");
        await lisaType("2️⃣ Électricité générale <br>");
        await lisaType("3️⃣ Panneaux photovoltaïques <br>");
        await lisaType("4️⃣ Bornes de recharge IRVE <br>");
        await lisaType("5️⃣ Problème internet / fibre <br>");
        await lisaType("6️⃣ Recherche de regard / détection des réseaux <br>");
        await lisaType("7️⃣ Autre demande <br>");
        etape = 1;
        return;
    }

    /* === Étape 1 : type === */
    if (etape === 1) {
        recupData.type = message;
        await lisaType("Très bien, quel est votre nom ?<br>");
        etape = 2;
        return;
    }

    /* Étape 2 : nom */
    if (etape === 2) {
        recupData.nom = message;
        await lisaType("Votre numéro de téléphone ?<br>");
        etape = 3;
        return;
    }

    /* Étape 3 : tel */
    if (etape === 3) {
        recupData.tel = message;
        await lisaType("Votre email ? (facultatif)<br>");
        etape = 4;
        return;
    }

    /* Étape 4 : email */
    if (etape === 4) {
        recupData.mail = message;
        await lisaType("Pouvez-vous me donner quelques détails sur votre demande ?<br>");
        etape = 5;
        return;
    }

    /* Étape 5 : détails */
    if (etape === 5) {
        recupData.details = message;

        await lisaType("Voici un récapitulatif de votre demande :<br><br>");
        await lisaType(JSON.stringify(recupData, null, 2) + "<br><br>");
        await lisaType("Souhaitez-vous envoyer cette demande à DTN ? (oui / non)<br>");

        etape = 6;
        return;
    }

    /* Étape 6 : confirmation */
    if (etape === 6) {
        if (message.toLowerCase() === "oui") {
            await envoyerEmail(recupData);
        } else {
            await lisaType("D’accord, je n’envoie rien. N'hésitez pas si vous avez une autre demande !<br>");
        }
        etape = 0;
        recupData = {};
    }
}
