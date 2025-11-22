/* =======================================================
   LISA – MODULE PRO : DEMANDES DE DEVIS (EmailJS intégré)
   Version 1.2 – Configuré pour Vitalien (DTN)
======================================================= */

console.log("Module Pro Devis chargé ✔️");

let modeDevis = false;
let devisStep = 0;
let devisType = null;
let devisData = {};

/* === Types de devis mis à jour === */
const devisTypes = {
    "1": "Terrassement / Génie civil",
    "2": "Électricité générale",
    "3": "Panneaux photovoltaïques",
    "4": "Bornes de recharge IRVE",
    "5": "Problème internet / fibre",
    "6": "Recherche de regard / détection des réseaux",
    "7": "Autres"
};

/* === MESSAGE D’INTRO === */
function startDevis() {
    modeDevis = true;
    devisStep = 0;
    devisData = {};

    lisaReply(`

Très bien 👍 Je vais vous aider à préparer un devis.

Voici les catégories disponibles :<br><br>

<span style="color:#ff5733; font-weight:bold;">1️⃣ Terrassement / Génie civil</span><br><br>

<span style="color:#ff8c00; font-weight:bold;">2️⃣ Électricité générale</span><br><br>

<span style="color:#ffc300; font-weight:bold;">3️⃣ Panneaux photovoltaïques</span><br><br>

<span style="color:#28a745; font-weight:bold;">4️⃣ Bornes de recharge IRVE</span><br><br>

<span style="color:#007bff; font-weight:bold;">5️⃣ Problème internet / fibre</span><br><br>

<span style="color:#e67e22; font-weight:bold;">6️⃣ Recherche de regard / détection des réseaux</span><br><br>

<span style="color:#9b59b6; font-weight:bold;">7️⃣ Autres</span><br><br>

➡️ Tapez simplement le numéro (1 à 7).

`, 700);
}

/* === TRAITEMENT DU MESSAGE === */
function handleDevis(message) {

    // Première étape : sélection du type
    if (devisStep === 0) {
        if (!devisTypes[message]) {
            lisaReply("Merci de choisir un numéro entre 1 et 7 🙏", 600);
            return;
        }

        devisType = devisTypes[message];
        devisData.type = devisType;

        lisaReply(`Parfait 👍 Vous avez choisi : <strong>${devisType}</strong>`, 800);

        devisStep = 1;
        setTimeout(askNextQuestion, 800);
        return;
    }

    // Stocke la réponse précédente
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
            devisData.nom = p[0] || "";
            devisData.tel = p[1] || "";
            devisData.mail = p[2] || "";
            break;
    }
}

/* === QUESTIONS PAR SCÉNARIO === */
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
    else if (scen === "Recherche de regard / détection des réseaux") detectQuestions();
    else autresQuestions();
}

/* === LISTE DES QUESTIONS === */

function terrQuestions() {
    const Q = {
        1: "Quel type de travaux souhaitez-vous réaliser ?",
        2: "À quelle adresse se situe le chantier ?",
        3: "Quel type de bâtiment (maison / immeuble / local pro) ?",
        4: "Avez-vous des plans ou documents ?",
        5: "Avez-vous des photos du terrain ?",
        6: "Quelle est l’échéance souhaitée ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 700);
}

function elecQuestions() {
    const Q = {
        1: "Quel type de bâtiment (maison, entreprise…) ?",
        2: "Installation / rénovation / dépannage ?",
        3: "Adresse des travaux ?",
        4: "Surface ou nombre de pièces ?",
        5: "Est-ce une urgence ?",
        6: "Photos ou plans disponibles ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 700);
}

function pvQuestions() {
    const Q = {
        1: "Maison / bâtiment pro / agricole ?",
        2: "Autoconsommation ou revente totale ?",
        3: "Type de toiture + orientation ?",
        4: "Adresse du chantier ?",
        5: "Date souhaitée ?",
        6: "Photos de la toiture disponibles ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 700);
}

function irveQuestions() {
    const Q = {
        1: "Installation chez particulier / entreprise / copropriété ?",
        2: "Nombre de bornes souhaitées ?",
        3: "Puissance souhaitée (7 / 11 / 22 kW) ?",
        4: "Adresse du chantier ?",
        5: "Distance tableau → stationnement ?",
        6: "Photos disponibles ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 700);
}

function fibreQuestions() {
    const Q = {
        1: "Quel est votre problème exact ?",
        2: "Êtes-vous en fibre ou cuivre ?",
        3: "Quel opérateur ?",
        4: "Adresse du problème ?",
        5: "Photos disponibles ?",
        6: "Urgence ou non ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 700);
}

/* === NOUVELLE CATÉGORIE : DÉTECTION RESEAUX === */
function detectQuestions() {
    const Q = {
        1: "Quel type de réseau souhaitez-vous détecter ? (EDF / Télécom / Eau / Gaz)",
        2: "À quelle adresse se situe la zone de recherche ?",
        3: "Avez-vous une idée de l’emplacement approximatif ?",
        4: "S’agit-il d’une recherche pour travaux / dépannage / étude ?",
        5: "Avez-vous des plans ou photos de la zone ?",
        6: "Quelle est l’échéance souhaitée ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 700);
}

/* === CATÉGORIE 7 : AUTRES === */
function autresQuestions() {
    const Q = {
        1: "Pouvez-vous décrire votre besoin ?",
        2: "Adresse de l’intervention ?",
        3: "Échéance souhaitée ?",
        4: "Photos disponibles ?",
        5: "Documents disponibles ?",
        6: "Informations supplémentaires ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 700);
}

/* === RÉCAP === */
function showDevisRecap() {

    const recapTxt = `
📄 <strong>RÉCAPITULATIF DE VOTRE DEMANDE</strong><br><br>
<pre>${JSON.stringify(devisData, null, 2)}</pre>
<br>Souhaitez-vous envoyer cette demande ? (oui / non)
`;

    lisaReply(recapTxt, 1200);
    devisStep = 99;
}

/* === ENVOI EMAIL === */
function sendDevisMail() {

    emailjs.send("service_068lpkn", "template_ceee5k7", {
        type: devisData.type,
        nom: devisData.nom,
        tel: devisData.tel,
        mail: devisData.mail,
        details: JSON.stringify(devisData, null, 2)
    }, "U_SAAVe1bEpxcT99N")
    .then(() => {
        lisaReply("Votre demande a bien été envoyée ✔️ Notre équipe vous recontacte rapidement.", 1200);
    })
    .catch((err) => {
        lisaReply("⚠️ Erreur lors de l’envoi du mail. Essayez plus tard.", 1200);
        console.error(err);
    });

    modeDevis = false;
}

/* === CONFIRMATION === */
function handleFinal(message) {
    if (message.toLowerCase() === "oui") {
        sendDevisMail();
        return;
    }
    lisaReply("Très bien, demande annulée. Je reste disponible 😊", 900);
    modeDevis = false;
}

/* === EXPORT === */
function processDevisMessage(message) {
    if (!modeDevis) return false;

    if (devisStep === 99) {
        handleFinal(message);
        return true;
    }

    handleDevis(message);
    return true;
}

window.startDevis = startDevis;
window.processDevisMessage = processDevisMessage;
