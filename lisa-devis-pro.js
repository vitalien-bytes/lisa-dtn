/* =======================================================
   LISA – MODULE PRO : DEMANDES DE DEVIS (EmailJS intégré)
   Version 1.5 – Vitalien / DTN
   Amélioration : récapitulatif lisible (libellés)
======================================================= */

console.log("Module Pro Devis chargé ✔️");

let modeDevis = false;
let devisStep = 0;
let devisType = null;
let devisData = {};

// Types de prestations
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

    const introHtml = `
Très bien 👍 Je vais vous aider à préparer un devis.<br><br>
Merci de choisir une catégorie parmi les suivantes :<br><br>
<span style="color:#ff9800; font-weight:bold;">1️⃣ Terrassement / Génie civil</span><br>
<span style="color:#2196f3; font-weight:bold;">2️⃣ Électricité générale</span><br>
<span style="color:#4caf50; font-weight:bold;">3️⃣ Panneaux photovoltaïques</span><br>
<span style="color:#9c27b0; font-weight:bold;">4️⃣ Bornes de recharge IRVE</span><br>
<span style="color:#e91e63; font-weight:bold;">5️⃣ Problème internet / fibre</span><br>
<span style="color:#ff5722; font-weight:bold;">6️⃣ Recherche de regard / détection des réseaux</span><br>
<span style="color:#795548; font-weight:bold;">7️⃣ Autres</span><br><br>
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
    else if (scen === "Recherche de regard / détection des réseaux") regardQuestions();
    else autresQuestions();
}

/* === LISTES DE QUESTIONS === */
function terrQuestions() {
    const Q = {
        1: "Quel type de travaux de terrassement / génie civil souhaitez-vous réaliser ?",
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
        5: "Date souhaitée ?",
        6: "Photos de la toiture disponibles ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    addMessage(Q[devisStep], "LISA");
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
    addMessage(Q[devisStep], "LISA");
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
    addMessage(Q[devisStep], "LISA");
}

function regardQuestions() {
    const Q = {
        1: "Quel type de recherche souhaitez-vous (regard telecom, eau, EDF, autres réseaux) ?",
        2: "Adresse précise de l’intervention ?",
        3: "Contexte (panne, projet de travaux, autre) ?",
        4: "Accès au terrain (jardin, voirie, parking…) ?",
        5: "Photos ou plans disponibles ?",
        6: "Échéance souhaitée ?",
        7: "Vos coordonnées (Nom / Téléphone / Email) ?"
    };
    addMessage(Q[devisStep], "LISA");
}

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
    addMessage(Q[devisStep], "LISA");
}

/* =======================================================
   RÉCAP – version PROPRE avec libellés
======================================================= */
function buildRecapLines() {
    const scen = devisType;
    const L = [];

    L.push(`Type de prestation : ${devisData.type}`);

    if (scen === "Terrassement / Génie civil") {
        L.push(`Type de travaux : ${devisData.q1}`);
        L.push(`Adresse du chantier : ${devisData.q2}`);
        L.push(`Type de bâtiment : ${devisData.q3}`);
        L.push(`Plans / documents : ${devisData.q4}`);
        L.push(`Photos du terrain : ${devisData.q5}`);
        L.push(`Échéance souhaitée : ${devisData.q6}`);
    }

    else if (scen === "Électricité générale") {
        L.push(`Type de bâtiment : ${devisData.q1}`);
        L.push(`Nature des travaux : ${devisData.q2}`);
        L.push(`Adresse : ${devisData.q3}`);
        L.push(`Surface / pièces : ${devisData.q4}`);
        L.push(`Urgence : ${devisData.q5}`);
        L.push(`Photos / plans : ${devisData.q6}`);
    }

    else if (scen === "Panneaux photovoltaïques") {
        L.push(`Type de bâtiment : ${devisData.q1}`);
        L.push(`Autoconso / Revente : ${devisData.q2}`);
        L.push(`Toiture / orientation : ${devisData.q3}`);
        L.push(`Adresse : ${devisData.q4}`);
        L.push(`Date souhaitée : ${devisData.q5}`);
        L.push(`Photos toiture : ${devisData.q6}`);
    }

    else if (scen === "Bornes de recharge IRVE") {
        L.push(`Lieu : ${devisData.q1}`);
        L.push(`Nombre de bornes : ${devisData.q2}`);
        L.push(`Puissance : ${devisData.q3}`);
        L.push(`Adresse : ${devisData.q4}`);
        L.push(`Distance tableau / stationnement : ${devisData.q5}`);
        L.push(`Photos : ${devisData.q6}`);
    }

    else if (scen === "Problème internet / fibre") {
        L.push(`Problème : ${devisData.q1}`);
        L.push(`Fibre / Cuivre : ${devisData.q2}`);
        L.push(`Opérateur : ${devisData.q3}`);
        L.push(`Adresse : ${devisData.q4}`);
        L.push(`Photos : ${devisData.q5}`);
        L.push(`Urgence : ${devisData.q6}`);
    }

    else if (scen === "Recherche de regard / détection des réseaux") {
        L.push(`Type de recherche : ${devisData.q1}`);
        L.push(`Adresse : ${devisData.q2}`);
        L.push(`Contexte : ${devisData.q3}`);
        L.push(`Accès terrain : ${devisData.q4}`);
        L.push(`Photos / plans : ${devisData.q5}`);
        L.push(`Échéance : ${devisData.q6}`);
    }

    else {
        L.push(`Description : ${devisData.q1}`);
        L.push(`Adresse : ${devisData.q2}`);
        L.push(`Échéance : ${devisData.q3}`);
        L.push(`Photos : ${devisData.q4}`);
        L.push(`Documents : ${devisData.q5}`);
        L.push(`Infos supplémentaires : ${devisData.q6}`);
    }

    L.push("");
    L.push(`Nom : ${devisData.nom}`);
    L.push(`Téléphone : ${devisData.tel}`);
    L.push(`Email : ${devisData.mail}`);

    return L;
}

/* === AFFICHAGE DU RÉCAP === */
function showDevisRecap() {

    const rec = buildRecapLines();

    const recapTxt = `
📄 <strong>RÉCAPITULATIF DE VOTRE DEMANDE</strong><br><br>
<pre style="white-space: pre-wrap; font-size:12px;">
${rec.join("\n")}
</pre>
Souhaitez-vous envoyer cette demande à l’équipe DTN ? (oui / non)
`;

    addMessage(recapTxt, "LISA");
    devisStep = 99;
}

/* === ENVOI EMAIL === */
function sendDevisMail() {

    const details = buildRecapLines().join("\n");

    emailjs
        .send(
            "service_068lpkn",
            "template_ceee5k7",
            {
                type: devisData.type,
                nom: devisData.nom,
                tel: devisData.tel,
                mail: devisData.mail,
                details: details
            },
            "U_SAAVe1bEpxcT99N"
        )
        .then(() => {
            addMessage("✅ Votre demande a bien été envoyée à l’équipe DTN.", "LISA");
        })
        .catch((err) => {
            console.error("Erreur EmailJS :", err);
            addMessage("⚠️ Une erreur est survenue lors de l’envoi du mail.", "LISA");
        });

    modeDevis = false;
}

/* === CONFIRMATION === */
function handleFinal(message) {
    const msg = message.toLowerCase().trim();

    if (msg === "oui") {
        sendDevisMail();
        return;
    }

    addMessage("Très bien, demande annulée 😊", "LISA");
    modeDevis = false;
}

/* === EXPORT === */
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
