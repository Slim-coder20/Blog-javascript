import "./form.scss";
import "../assets/styles/styles.scss";

// Mise en place du formulaire en javascript //
const form = document.querySelector("form");
let errors = [];
const errorElement = document.querySelector("#errors");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  // gérer les erreurs avant l'envoie vers le serveur //
  // si le formulaire est valide on va faire le fetch on envoie notre
  // article vres le servuer  pour cela on utilisera la fonction fetch()//
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      const response = await fetch("https://restapi.fr/api/article", {
        method: "POST",
        body: json,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const body = await response.json();
        console.log("Article créé avec succès :", body);
      } else {
        console.error(
          "Erreur du serveur :",
          response.status,
          response.statusText
        );
      }
    } catch (e) {
      console.error("Erreur lors de l'envoi :", e);
    }
  }
});

const formIsValid = (article) => {
  if (!article.author || !article.category || !article.content) {
    errors.push("Vous devez renseigner tous les champs.");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
