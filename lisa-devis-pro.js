/* =======================================================
   LISA – MODULE PRO : DEMANDES DE DEVIS (EmailJS intégré)
   Version corrigée – Vitalien / DTN – 25/11/2025
======================================================= */

console.log("Module Pro Devis chargé ✔️");

let modeDevis = false;
let devisStep = 0;
let devisType = null;
let devisData = {};

/* === INITIALISATION EMAILJS — OBLIGATOIRE ✔️ === */
(function() {
    emailjs.init("U_SAAVe1bEpxcT99N"); // ← TA PUBLIC KEY
})();

/* === TYPES DE PRESTATION === */
const devisTypes = {
    "1": "Terrassement / Génie civil",
    "2": "Électricité générale",
    "3": "Panneaux photovoltaïques",
    "4": "Bornes de recharge IRVE",
    "5": "Problème internet / fibre",
    "6": "Recherche de regard / détection des réseaux",
    "7": "Autres"
};

/* === DÉMARRAGE === */
function startDevis() {
    modeDevis = true;
    devisStep = 0;
    devisData = {};

    const introHtml = `
Très bien 👍 Je vais vous aider à préparer un devis.<br><br>
Merci de choisir une catégorie parmi les suivantes :<br><br>
1️⃣ Terrassement / Génie civil<br>
2️⃣ Électricité générale<br>
3️⃣ Panneaux photovoltaïques<br>
4️⃣ Bornes de recharge IRVE<br>
5️⃣ Problème internet / fibre<br>
6️⃣ Recherche de regard / détection des réseaux<br>
7️⃣ Autres<br><br>
➡️ Tapez simplement le numéro (1 à 7).
`;

    addMessage(introHtml, "LISA");
}

/* === TRAITEMENT DU MESSAGE === */
function handleDevis(message) {

    if (devisStep === 0) {
        if (!devisTypes[message]) {
            addMessage("Merci de choisir un numéro entre 1 et 7 🙏", "LISA");
            return;
        }

        devisType = devisTypes[message];
        devisData.type = devisType;

        addMessage(`Parfait 👍 Vous avez choisi : <strong>${devisType}</strong>`, "LISA");

        devisStep = 1;
        askNextQuestion();
        return;
    }

    registerPreviousAnswer(message);

    devisStep++;
    askNextQuestion();
}

/* === STOCKAGE DES RÉPONSES === */
function registerPreviousAnswer(message) {
    switch (devisStep) {
        case 1: devisData.q1 = message; break;
        case 2: devisData.q2 = message; break;
        case 3: devisData.q3 = message; break;
        case 4: devisData.q4 = message; break;
        case 5: devisData.q5 = message; break;
        case 6: devisData.q6 = message; break;
        case 7:
            const p = message.split("/");
            devisData.nom = (p[0] || "").trim();
            devisData.tel = (p[1] || "").trim();
            devisData.mail = (p[2] || "").trim();
            break;
    }
}

/* === QUESTIONS === */
function askNextQuestion() {

    if (devisStep === 8) {
        showDevisRecap();
        return;
    }

    const scen = devisType;

    if (scen === "Terrassement / Génie civil") terrQuestions();
    else if (scen === "Électricité générale") elecQuestions();
    else if (scen === "Panneaux photovoltaïques") pvQuestions();
    else if (scen === "Bornes de recharge IRVE") irveQuestions();
    else if (scen === "Problème internet / fibre") fibreQuestions();
    else if (scen === "Recherche de regard / détection des réseaux") regardQuestions();
    else autresQuestions();
}

/* === LISTES DES QUESTIONS — inchangées === */
function terrQuestions() { /* ... identique ... */ }
function elecQuestions() { /* ... identique ... */ }
function pvQuestions() { /* ... identique ... */ }
function irveQuestions() { /* ... identique ... */ }
function fibreQuestions() { /* ... identique ... */ }
function regardQuestions() { /* ... identique ... */ }
function autresQuestions() { /* ... identique ... */ }

/* === RÉCAP === */
function showDevisRecap() {

    const recapTxt = `
📄 <strong>RÉCAPITULATIF DE VOTRE DEMANDE</strong><br><br>
<pre style="white-space: pre-wrap; font-size:12px;">
${JSON.stringify(devisData, null, 2)}
</pre>
Souhaitez-vous envoyer cette demande à l’équipe DTN ? (répondez : <strong>oui</strong> ou <strong>non</strong>)
`;

    addMessage(recapTxt, "LISA");
    devisStep = 99;
}

/* === ENVOI EMAIL — FONCTION CORRIGÉE ✔️ === */
function sendDevisMail() {

    addMessage("Parfait 👍 J’envoie votre demande à l’équipe DTN…", "LISA");

    emailjs
        .send(
            "service_068lpkn",        // Ton service ID
            "template_ceee5k7",       // Ton template ID
            {
                type: devisData.type,
                nom: devisData.nom,
                tel: devisData.tel,
                mail: devisData.mail,
                details: JSON.stringify(devisData, null, 2)
            }
        )
        .then(() => {
            addMessage(
                "✅ Votre demande a bien été envoyée. L’équipe DTN vous recontacte rapidement.",
                "LISA"
            );
        })
        .catch((err) => {
            console.error("Erreur EmailJS :", err);
            addMessage(
                "⚠️ Erreur lors de l’envoi. Merci de nous contacter par téléphone ou email.",
                "LISA"
            );
        });

    modeDevis = false;
}

/* === CONFIRMATION FINALE === */
function handleFinal(message) {
    const msg = message.toLowerCase().trim();

    if (msg === "oui") {
        sendDevisMail();
        return;
    }

    addMessage("Très bien, demande annulée 😊", "LISA");
    modeDevis = false;
}

/* === EXPORT GLOBAL === */
function processDevisMessage(message) {
    if (!modeDevis && message.toLowerCase().startsWith("devis")) {
        startDevis();
        return true;
    }

    if (!modeDevis && devisStep !== 99) return false;

    if (devisStep === 99) {
        handleFinal(message);
        return true;
    }

    handleDevis(message);
    return true;
}

window.startDevis = startDevis;
window.processDevisMessage = processDevisMessage;
