// Importation des fichiers CSS pour le style de la page d'accueil
import "./assets/styles/styles.scss";
import "./assets/javascript/topbar.js";
import "./index.scss";

// === AFFICHAGE DES ARTICLES SUR LA PAGE D'ACCUEIL ===

// Récupération de l'élément HTML qui contiendra la liste des articles
const articleContainerElement = document.querySelector(".articles-container");

const createArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
   
            <img
              src="${article.img}"
              alt="profile"
            />
            <h2>${article.title}</h2>
          <p class="article-author">${article.author} - ${
      // Création d'un objet Date à partir de la date de création de l'article et formatage en français
      new Date(article.createdAt).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    }</p>
            <p class="article-content">${article.content}</p>
            <div class="article-action">
              
              <button class="btn btn-danger" data-id="${
                article._id
              }" >Supprimer</button>
            </div>
         
          `;
    return articleDOM;
  });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);

  // === SUPPRESSION DES ARTICLES  ===

  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  console.log(deleteButtons);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const response = await fetch(
          `https://restapi.fr/api/article/${articleId}`,
          {
            method: "DELETE",
          }
        );
        const body = await response.json();
        fetchArticle();
      } catch (error) {
        console.log("Erreur : ", error);
      }
    });
  });
};

// === FONCTION POUR METTRE À JOUR UN ARTICLE (À utiliser manuellement) ===
const updateArticle = async (articleId, updatedData) => {
  try {
    const response = await fetch(
      `https://restapi.fr/api/article/${articleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    const result = await response.json();
    console.log("Article mis à jour :", result);
    // Recharger les articles après la mise à jour
    fetchArticle();
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
  }
};

//Mise a jour insertion de photo  article 1//
updateArticle("6874b87c8dae9bcf6cddd2d5", {
  author: "Nexa Digital school",
  category: "Technologie",
  content: "La première chose à savoir est ce...",
  title: "Quelles sont les bases du langage JavaScript",
  img: "https://randomuser.me/api/portraits/men/25.jpg",
});
//Mise a jour ajout de photo dans l'article 2//
updateArticle("6874bb028dae9bcf6cddd2d6", {
  author: "Arthur Weill ",
  category: "Technologie",
  content:
    "Cette première boucle va fonctionner avec un « compteur » qui va nous permettre de définir précisément le nombre d’itération à réaliser, ainsi que l’évolution de ce « compteur ».",
  title: "La boucle for en PHP",
  img: "https://randomuser.me/api/portraits/men/26.jpg",
});
// Mise a joour de photo dans l'article 3 //
updateArticle("6874bb408dae9bcf6cddd2d7", {
  author: "Arthur Weill ",
  category: "Technologie",
  content:
    "Cette première boucle va fonctionner avec un « compteur » qui va nous permettre de définir précisément le nombre d’itération à réaliser, ainsi que l’évolution de ce « compteur ».",
  title: "La boucle While en PHP ",
  img: "https://randomuser.me/api/portraits/men/27.jpg",
});

// === FONCTION POUR RÉCUPÉRER LES ARTICLES DEPUIS L'API ===
const fetchArticle = async () => {
  try {
    // === REQUÊTE GET VERS L'API ===
    // Envoi d'une requête HTTP GET pour récupérer tous les articles
    const response = await fetch("https://restapi.fr/api/article");

    // === CONVERSION DE LA RÉPONSE ===
    // Conversion de la réponse JSON en objet JavaScript utilisable
    const articles = await response.json();

    // === AFFICHAGE DES DONNÉES ===
    // Affichage des articles dans la console pour vérifier la récupération
    console.log(articles);
    createArticles(articles);
  } catch (error) {
    // === GESTION DES ERREURS ===
    // Si une erreur survient (problème réseau, API indisponible, etc.)
    console.log("Erreur lors de la récupération des articles :", error);
  }
};

// === EXÉCUTION DE LA FONCTION ===
// Appel de la fonction pour récupérer et afficher les articles au chargement de la page
fetchArticle();
