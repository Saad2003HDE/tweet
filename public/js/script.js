function confirmDeconnexion() {
    return confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
  }

// Dans le script de votre page
function suivreUtilisateur(utilisateurId) {
    fetch("/suivre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ utilisateurId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Ajoutez ici du code pour mettre à jour l'interface utilisateur si nécessaire.
      })
      .catch((error) => {
        console.error("Erreur lors du suivi de l'utilisateur :", error);
      });
  }
  