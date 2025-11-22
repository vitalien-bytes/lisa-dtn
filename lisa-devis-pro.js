/* =======================================================
   LISA – MODULE PRO : DEMANDES DE DEVIS (EmailJS intégré)
   Version 1.2 – entièrement corrigée pour Anthony (DTN)
======================================================= */

console.log("Module Pro Devis chargé ✔️");

let modeDevis = false;
let devisStep = 0;
let devisType = null;
let devisData = {};

const devisTypes = {
    "1": "Terrassement / Génie civil",
    "2": "Électricité générale",
    "3": "Panneaux photovoltaïques",
    "4": "Bornes de recharge IRVE",
    "5": "Problème internet / fibre",
    "6": "Recherche de regard / Détection de réseaux",
    "7": "Autre demande"
};

/* === MESSAGE D’INTRO === */
function startDevis() {
    modeDevis = true;
    devisStep = 0;
    devisData = {};

    lisaReply(`
Très bien 👍 Je vais vous aider à préparer un devis.

Voici les catégories disponibles :

🔧 **1️⃣ Terrassement / Génie civil**  
⚡ **2️⃣ Électricité générale**  
🔆 **3️⃣ Panneaux photovoltaïques**  
🔌 **4️⃣ Bornes de recharge IRVE**  
📡 **5️⃣ Problème internet / fibre**  
🛰️ **6️⃣ Recherche de regard / Détection de réseaux**  
📄 **7️⃣ Autre demande**

➡️ Tapez simplement le numéro (1 à 7).
`, 1000);
}

/* === TRAITEMENT DU MESSAGE === */
function handleDevis(message) {

    // Étape 0 : choix du type
    if (devisStep === 0) {
        if (!devisTypes[message]) {
            lisaReply("Merci de choisir un numéro entre 1 et 7 🙏", 600);
            return;
        }

        devisType = devisTypes[message];
        devisData.type = devisType;

        lisaReply(`Parfait 👍 Vous avez choisi : <strong>${devisType}</strong>`, 600);

        devisStep = 1;
        askNextQuestion();
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
    else if (scen === "Recherche de regard / Détection de réseaux") detectQuestions();
    else autreQuestions();
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
        7: "Vos coordonnées (Nom / Téléphone / Email) ? (ex : Dupont / 0612345678 / mail@mail.com)"
    };
    lisaReply(Q[devisStep], 500);
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
    lisaReply(Q[devisStep], 500);
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
    lisaReply(Q[devisStep], 500);
}

function irveQuestions() {
    const Q = {
        1: "Installation chez particulier / entreprise / copropriété ?",
        2: "Nombre de bornes souhaitées ?",
        3: "Puissance souhaitée (7 / 11 / 22kW) ?",
        4: "Adresse du chantier ?",
        5: "Distance tableau → stationnement ?",
        6: "Photos disponibles ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 500);
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
    lisaReply(Q[devisStep], 500);
}

function detectQuestions() {
    const Q = {
        1: "S'agit-il d'un regard FT, EU, EP ou EDF ?",
        2: "Adresse de la recherche ?",
        3: "Terrain : maison / immeuble / entreprise ?",
        4: "Avez-vous des plans ?",
        5: "Photos disponibles ?",
        6: "Urgence ou non ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 500);
}

function autreQuestions() {
    const Q = {
        1: "Pouvez-vous décrire votre besoin ?",
        2: "Adresse de l’intervention ?",
        3: "Échéance souhaitée ?",
        4: "Photos disponibles ?",
        5: "Documents disponibles ?",
        6: "Informations supplémentaires ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    lisaReply(Q[devisStep], 500);
}

/* === RÉCAP === */
function showDevisRecap() {

    const recapTxt = `
📄 **RÉCAPITULATIF DE VOTRE DEMANDE**

${JSON.stringify(devisData, null, 2)}

Souhaitez-vous envoyer cette demande ? (oui / non)
`;

    lisaReply(recapTxt, 500);
    devisStep = 99;
}

/* === ENVOI EMAIL === */
function sendDevisMail() {

    emailjs.send("service_068lpkn", "template_n9quxp1", {
        type: devisData.type,
        nom: devisData.nom,
        tel: devisData.tel,
        mail: devisData.mail,
        details: JSON.stringify(devisData, null, 2)
    }, "U_SAAVe1bEpxcT99N")
    .then(() => {
        lisaReply("Votre demande a bien été envoyée ✔️ Nous venons de la transmettre à l’équipe DTN. Merci beaucoup 😊", 500);
    })
    .catch((err) => {
        lisaReply("⚠️ Une erreur est survenue pendant l’envoi. Vous pouvez réessayer dans quelques instants.", 500);
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
    lisaReply("Très bien, demande annulée. Je reste disponible 😊", 700);
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
