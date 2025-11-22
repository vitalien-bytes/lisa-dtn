/* =======================================================
   LISA – MODULE PRO : DEMANDES DE DEVIS (6 SCÉNARIOS)
   Version 1.0 – Compatible avec lisa.js
   Auteur : ChatGPT & Vitalien
======================================================= */

console.log("Module Pro Devis chargé ✔️");

/* === VARIABLES GLOBALES === */
let modeDevis = false;
let devisStep = 0;
let devisType = null;
let devisData = {};

/* === LISTE DES TYPES === */
const devisTypes = {
    "1": "Terrassement / Génie civil",
    "2": "Électricité générale",
    "3": "Panneaux photovoltaïques",
    "4": "Bornes de recharge IRVE",
    "5": "Problème internet / fibre",
    "6": "Autre demande"
};

/* === MESSAGE D’INTRO DEVIS === */
function startDevis() {
    modeDevis = true;
    devisStep = 0;
    devisData = {};

    addMessage(
        `Très bien 👍 Je vais vous aider à préparer un devis.\n
Voici les catégories disponibles :\n
1️⃣ Terrassement / Génie civil
2️⃣ Électricité générale
3️⃣ Panneaux photovoltaïques
4️⃣ Bornes de recharge IRVE
5️⃣ Problème internet / fibre
6️⃣ Autre demande

➡️ *Tapez simplement le numéro (1 à 6).*`,
        "LISA"
    );
}

/* === LOGIQUE PRINCIPALE DU MODULE === */
function handleDevis(message) {

    /* 1️⃣ Étape 0 : Choix du type de devis */
    if (devisStep === 0) {
        if (!devisTypes[message]) {
            addMessage("Merci de choisir un numéro entre 1 et 6.", "LISA");
            return;
        }

        devisType = devisTypes[message];
        devisData.type = devisType;

        addMessage(`Très bien, vous avez choisi : *${devisType}*`, "LISA");

        devisStep = 1;
        askNextQuestion();
        return;
    }

    /* 2️⃣ Enregistrement de la réponse précédente */
    registerPreviousAnswer(message);

    /* 3️⃣ Passage à la question suivante */
    devisStep++;
    askNextQuestion();
}

/* === ENREGISTREMENT DES RÉPONSES === */
function registerPreviousAnswer(message) {
    switch (devisStep) {

        case 1: devisData.q1 = message; break;
        case 2: devisData.q2 = message; break;
        case 3: devisData.q3 = message; break;
        case 4: devisData.q4 = message; break;
        case 5: devisData.q5 = message; break;
        case 6: devisData.q6 = message; break;
        case 7:
            const parts = message.split("/");
            devisData.nom = parts[0] || "";
            devisData.tel = parts[1] || "";
            devisData.mail = parts[2] || "";
            break;
    }
}

/* === QUESTIONS PAR SCÉNARIO === */
function askNextQuestion() {

    /* ARRIVÉE AU RÉCAPITULATIF */
    if (devisStep === 8) {
        showDevisRecap();
        return;
    }

    /* SCÉNARIOS */
    const scenar = devisType;

    if (scenar === "Terrassement / Génie civil") {
        terrQuestions();
    }
    else if (scenar === "Électricité générale") {
        elecQuestions();
    }
    else if (scenar === "Panneaux photovoltaïques") {
        pvQuestions();
    }
    else if (scenar === "Bornes de recharge IRVE") {
        irveQuestions();
    }
    else if (scenar === "Problème internet / fibre") {
        fibreQuestions();
    }
    else {
        autreQuestions();
    }
}

/* === LISTE DES QUESTIONS PAR SCÉNARIO === */

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
    addMessage(Q[devisStep], "LISA");
}

function elecQuestions() {
    const Q = {
        1: "Quel type de bâtiment (maison, entreprise…) ?",
        2: "Installation / rénovation / dépannage / autre ?",
        3: "Adresse des travaux ?",
        4: "Surface ou nombre de pièces ?",
        5: "Est-ce une urgence ?",
        6: "Photos ou plans disponibles ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    addMessage(Q[devisStep], "LISA");
}

function pvQuestions() {
    const Q = {
        1: "Maison / bâtiment pro / agricole ?",
        2: "Autoconsommation ou revente totale ?",
        3: "Type de toiture + orientation ?",
        4: "Adresse du chantier ?",
        5: "Date souhaitée (3 mois / 6 mois) ?",
        6: "Photos de la toiture disponibles ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    addMessage(Q[devisStep], "LISA");
}

function irveQuestions() {
    const Q = {
        1: "Installation chez particulier / entreprise / copropriété ?",
        2: "Nombre de bornes souhaitées ?",
        3: "Puissance souhaitée (7/11/22kW) ?",
        4: "Adresse du chantier ?",
        5: "Distance tableau → stationnement ?",
        6: "Photos disponibles ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    addMessage(Q[devisStep], "LISA");
}

function fibreQuestions() {
    const Q = {
        1: "Quel est votre problème exact ?",
        2: "Êtes-vous en fibre ou cuivre ?",
        3: "Quel opérateur ?",
        4: "Adresse du problème ?",
        5: "Avez-vous des photos ?",
        6: "Urgence ou non ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    addMessage(Q[devisStep], "LISA");
}

function autreQuestions() {
    const Q = {
        1: "Pouvez-vous décrire votre besoin ?",
        2: "Adresse de l’intervention ?",
        3: "Échéance souhaitée ?",
        4: "Photos disponibles ?",
        5: "Documents disponibles ?",
        6: "Avez-vous des informations supplémentaires ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    addMessage(Q[devisStep], "LISA");
}

/* === RÉCAPITULATIF === */
function showDevisRecap() {
    const rec = `
📄 **RÉCAPITULATIF DE VOTRE DEMANDE**
Type : ${devisData.type}

➡️ Réponses :
${JSON.stringify(devisData, null, 2)}

Confirmez-vous l’envoi ? (oui / non)
    `;

    addMessage(rec, "LISA");
    devisStep = 99;
}

/* === ENVOI DU MAIL === */
function sendDevisMail() {
    addMessage("Votre demande a bien été envoyée ✔️ Notre équipe vous recontacte rapidement.", "LISA");

    // Ici tu peux appeler EmailJS OU une API externe
}

/* === GESTION DE LA RÉPONSE FINALE === */
function handleFinal(message) {
    if (message.toLowerCase() === "oui") {
        sendDevisMail();
        modeDevis = false;
        return;
    }
    addMessage("Très bien, demande annulée. Je reste disponible 😊", "LISA");
    modeDevis = false;
}

/* === EXPORT — utilisation dans lisa.js === */
function processDevisMessage(message) {
    if (modeDevis === false) return false;

    if (devisStep === 99) {
        handleFinal(message);
        return true;
    }

    handleDevis(message);
    return true;
}

/* === EXPORT DE LA FONCTION start === */
window.startDevis = startDevis;
window.processDevisMessage = processDevisMessage;
