import "./form.scss";
import "../assets/styles/styles.scss";

// Mise en place du formulaire en javascript //
const form = document.querySelector("form");
let errors = [];
const errorElement = document.querySelector("#errors");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  // gérer les erreurs avant l'envoie vers le serveur //
  if (formIsValid(article)) {
    const json = JSON.stringify(article);
    // si le formulaire est valide on va faire le fetch //
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
  } else {
    errorElement.innerHTML = ''; 
  }
};
