// Importation des fichiers CSS pour le style
import "../assets/styles/styles.scss";
import "./form.scss";
import "../assets/javascript/topbar.js";

// === CONFIGURATION INITIALE ===
// Récupération des éléments HTML nécessaires
const form = document.querySelector("form"); // Le formulaire HTML
let errors = []; // Tableau pour stocker les erreurs de validation
const errorElement = document.querySelector("#errors"); // Élément pour afficher les erreurs
// Selection du btn annuler // 
const btnCancel = document.querySelector(".btn-secondary");
// mettre uen ecoute sur le bouton annuler avec une redirection vers le home pour renvoyer sur l'index // 
btnCancel.addEventListener("click", () => {
  location.assign("/index.html");
});

// === GESTION DE LA SOUMISSION DU FORMULAIRE ===
form.addEventListener("submit", async (event) => {
  // Empêche le rechargement de la page lors de la soumission
  event.preventDefault();

  // Récupération des données du formulaire
  const formData = new FormData(form); // Collecte toutes les données des inputs
  const article = Object.fromEntries(formData.entries()); // Conversion en objet JavaScript

  // Vérification que le formulaire est valide avant l'envoi
  if (formIsValid(article)) {
    try {
      // === ENVOI VERS L'API ===
      // Conversion de l'objet en JSON pour l'API
      const json = JSON.stringify(article);

      // Envoi de la requête POST vers l'API
      const response = await fetch("https://restapi.fr/api/article", {
        method: "POST", // Type de requête
        body: json, // Données à envoyer
        headers: {
          "Content-Type": "application/json", // Spécifie que nous envoyons du JSON
        },
      });
      if (response.status < 299) {
        location.assign("/index.html");
      }

      // === GESTION DE LA RÉPONSE ===
      if (response.ok) {
        // Si la requête réussit (statut 200-299)
        const body = await response.json();
        console.log("Article créé avec succès :", body);
      } else {
        // Si la requête échoue (statut 400, 500, etc.)
        console.error(
          "Erreur du serveur :",
          response.status,
          response.statusText
        );
      }
    } catch (e) {
      // Gestion des erreurs de réseau ou autres
      console.error("Erreur lors de l'envoi :", e);
    }
  }
});

// === FONCTION DE VALIDATION ===
const formIsValid = (article) => {
  // On renitialise le tableau a un tableau vide 
  errors = []; 
  // Vérification que tous les champs obligatoires sont remplis
  if (
    !article.author ||
    !article.category ||
    !article.content ||
    !article.title ||
    !article.img
  ) {
    errors.push("Vous devez renseigner tous les champs.");
  } else {
    // Si tout est OK, on vide le tableau d'erreurs
    errors = [];
  }

  // === AFFICHAGE DES ERREURS ===
  if (errors.length) {
    // S'il y a des erreurs, on les affiche
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`; // Création d'une liste HTML
    });
    errorElement.innerHTML = errorHTML; // Affichage dans le DOM
    return false; // Formulaire invalide
  } else {
    // Pas d'erreurs, on efface l'affichage
    errorElement.innerHTML = "";
    return true; // Formulaire valide
  }
};
