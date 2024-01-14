const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
//Enable CORS from all origins
app.use(cors());

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Middleware for parsing JSON requests

// Connect to your SQLite database
const db = new sqlite3.Database("./database/montresmyDB.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database");
  }
});

//----------------------------------------Route GET-------------------------------------//

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur la page d'accueil");
});

// Route pour afficher tous les utilisateurs
app.get("/user", (req, res) => {
  db.all("SELECT * FROM user", (err, user) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(user);
  });
});

// Route pour afficher un utilisateur et ses montres
app.get("/user/:id_user", (req, res) => {
  const { id_user } = req.params;

  db.all(
    `
      SELECT m.montreID, m.nom,
          u.pseudo AS createur,
          bot.nom AS boitier_texture, bot.prix AS boitier_texture_prix,
          bof.nom AS boitier_forme, bof.prix AS boitier_forme_prix,
          brf.nom AS bracelet_texture, brf.prix AS bracelet_texture_prix,
          p.nom AS pierre_nom, p.prix AS pierre_prix, p.couleur AS pierre_couleur,
          m.main_color,
      COALESCE(bot.prix, 0) + COALESCE(bof.prix, 0) + COALESCE(brf.prix, 0) + COALESCE(p.prix, 0) AS prix_montre
      FROM Montre m 
      JOIN User u ON m.userID = u.userID
      JOIN Boitier_Texture bot ON m.boitierTextureID = bot.boitierTextureID
      JOIN Boitier_Forme bof ON m.boitierFormeID = bof.boitierFormeID
      JOIN Bracelet_Texture brf ON m.braceletTextureID = brf.braceletTextureID
      JOIN Pierre p ON m.pierreID = p.pierreID
      WHERE m.userID = ?
      `,
    [id_user],
    (err, user) => {
      if (err) {
        console.error("Erreur, le user n'a pas été trouvé : ", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json(user);
    }
  );
});

// Retourner la liste des montres mis dans le panier d'un utilisateur.
app.get("/user/:id_user/panier", (req, res) => {
  const { id_user } = req.params;

  db.all(
    `
  SELECT m.montreID, m.nom,
      u.pseudo AS createur,
      bot.nom AS boitier_texture, bot.prix AS boitier_texture_prix,
      bof.nom AS boitier_forme, bof.prix AS boitier_forme_prix,
      brf.nom AS bracelet_texture, brf.prix AS bracelet_texture_prix,
      p.nom AS pierre_nom, p.prix AS pierre_prix, p.couleur AS pierre_couleur,
      m.main_color,
  COALESCE(bot.prix, 0) + COALESCE(bof.prix, 0) + COALESCE(brf.prix, 0) + COALESCE(p.prix, 0) AS prix_montre
  FROM Montre m 
  JOIN User u ON m.userID = u.userID
  JOIN Boitier_Texture bot ON m.boitierTextureID = bot.boitierTextureID
  JOIN Boitier_Forme bof ON m.boitierFormeID = bof.boitierFormeID
  JOIN Bracelet_Texture brf ON m.braceletTextureID = brf.braceletTextureID
  JOIN Pierre p ON m.pierreID = p.pierreID
  JOIN Panier pa ON m.montreID = pa.montreID    
  WHERE pa.userID = ?
  `,
    [id_user],
    (err, panier) => {
      if (err) {
        console.error("Erreur, le panier n'a pas été trouvé : ", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json(panier);
    }
  );
});

// Route pour afficher toutes les pierres
app.get("/pierres", (req, res) => {
  db.all("SELECT * FROM pierre", (err, rows) => {
    if (err) {
      console.error("Error fetching pierres:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows);
  });
});

// Route pour afficher toutes les textures de boitiers
app.get("/boitier_texture", (req, res) => {
  db.all("SELECT * FROM Boitier_Texture", (err, rows) => {
    if (err) {
      console.error("Error fetching Boitier_Texture:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows);
  });
});
// Route pour afficher toutes les formes de boitiers
app.get("/boitier_forme", (req, res) => {
  db.all("SELECT * FROM Boitier_Forme", (err, rows) => {
    if (err) {
      console.error("Error fetching Boitier_Forme:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows);
  });
});

app.get("/bracelet_texture", (req, res) => {
  db.all(
    `
        SELECT *
        FROM Bracelet_Texture 
        `,
    (err, bracelet_texture) => {
      if (err) {
        console.error(
          "Erreur, les textures de bracelets n'ont pas été trouvées :",
          err.message
        );
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json(bracelet_texture);
    }
  );
});

// Retourner la liste des montres ajoutées à la carte.
app.get("/montre", (req, res) => {
  db.all(
    `
      SELECT m.montreID, m.nom,
          u.pseudo AS createur,
          bot.nom AS boitier_texture, bot.prix AS boitier_texture_prix,
          bof.nom AS boitier_forme, bof.prix AS boitier_forme_prix,
          brf.nom AS bracelet_texture, brf.prix AS bracelet_texture_prix,
          p.nom AS pierre_nom, p.prix AS pierre_prix, p.couleur AS pierre_couleur,
          m.main_color,
      COALESCE(bot.prix, 0) + COALESCE(bof.prix, 0) + COALESCE(brf.prix, 0) + COALESCE(p.prix, 0) AS prix_montre
      FROM Montre m 
      JOIN User u ON m.userID = u.userID
      JOIN Boitier_Texture bot ON m.boitierTextureID = bot.boitierTextureID
      JOIN Boitier_Forme bof ON m.boitierFormeID = bof.boitierFormeID
      JOIN Bracelet_Texture brf ON m.braceletTextureID = brf.braceletTextureID
      JOIN Pierre p ON m.pierreID = p.pierreID
      `,
    (err, montre) => {
      if (err) {
        console.error(
          "Erreur, les montres n'ont pas été trouvées :",
          err.message
        );
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json(montre);
    }
  );
});

// Retourner une montre existante
app.get("/montre/:id_montre", (req, res) => {
  const { id_montre } = req.params;

  db.all(
    `
      SELECT m.montreID, m.nom,
          u.pseudo AS createur,
          bot.nom AS boitier_texture, bot.prix AS boitier_texture_prix,
          bof.nom AS boitier_forme, bof.prix AS boitier_forme_prix,
          brt.nom AS bracelet_texture, brt.prix AS bracelet_texture_prix,
          p.nom AS pierre_nom, p.prix AS pierre_prix, p.couleur AS pierre_couleur,
          m.main_color,
      COALESCE(bot.prix, 0) + COALESCE(bof.prix, 0) + COALESCE(brt.prix, 0) + COALESCE(p.prix, 0) AS prix_montre
      FROM Montre m 
      JOIN User u ON m.userID = u.userID
      JOIN Boitier_Texture bot ON m.boitierTextureID = bot.boitierTextureID
      JOIN Boitier_Forme bof ON m.boitierFormeID = bof.boitierFormeID
      JOIN Bracelet_Texture brt ON m.braceletTextureID = brt.braceletTextureID
      JOIN Pierre p ON m.pierreID = p.pierreID
      WHERE m.montreID = ?
      `,
    [id_montre],
    (err, montre) => {
      if (err) {
        console.error("Erreur, la montre n'a pas été trouvée : ", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json(montre);
    }
  );
});

//----------------------------------------Route POST-------------------------------------//

// Route pour créer un compte utilisateur
app.post("/register", (req, res) => {
  const { pseudo, mdp } = req.body;
  if (!pseudo || !mdp) {
    res.status(400).json({ error: "pseudo, mdp, are required" });
    return;
  }
  console.log("Trying to create user account...");
  db.run(
    "INSERT INTO User (pseudo, mdp) VALUES (?, ?)",
    [pseudo, mdp],
    function (err) {
      const userID = this.lastID;

      if (err) {
        console.error("Error creating user account:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      console.log("User account creation successful!");
      res.json({ userID, pseudo });
    }
  );
});

// Route pour se connecter
app.post("/login", (req, res) => {
  const { pseudo, mdp } = req.body;
  if (!pseudo || !mdp) {
    res
      .status(400)
      .json({
        error:
          "Nom d'utilisateur et mot de passe sont requis pour se connecter",
      });
    return;
  }
  console.log("Trying to log in user...");
  // Recherche de l'utilisateur dans la base de données par le nom d'utilisateur
  db.get(
    "SELECT * FROM User WHERE pseudo = ? AND mdp = ?",
    [pseudo, mdp],
    (err, user) => {
      if (err) {
        console.error("Error logging in user:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (!user) {
        console.log("User not found or incorrect mdp");
        res
          .status(401)
          .json({ error: "Utilisateur non trouvé ou mot de passe incorrect" });
        return;
      }
      // Envoyer une réponse JSON pour signaler la connexion réussie
      res.json({ token: user.userID });

      console.log(`${pseudo} connecté avec succès!`);
    }
  );
});

// Route POST pour ajouter une montre à la base de données
app.post("/montre/add", (req, res) => {
  const {
    nom,
    boitier_texture,
    boitier_forme,
    bracelet_texture,
    pierre,
    main_color,
    createur,
  } = req.body;

  // Vérifie si tous les paramètres sont renseignés
  if (
    !nom ||
    !boitier_texture ||
    !boitier_forme ||
    !bracelet_texture ||
    !pierre ||
    !main_color ||
    !createur
  ) {
    res
      .status(400)
      .json({
        error:
          "nom, boitier_texture, boitier_forme, bracelet_texture, pierre, main_color and createur are required",
      });
    return;
  }

  // vérifie si la montre existe déjà pour un certain utilisateur
  db.all(
    `
      SELECT *
      FROM Montre m
      JOIN User u ON m.userID = u.userID
      WHERE m.nom = ?
      AND u.pseudo = ?
      `,
    [nom, createur],
    (err, montre) => {
      if (err) {
        console.error(
          "Erreur, les montres n'ont pas pue être récupérées : ",
          err.message
        );
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // Si la monte n'existe pas déjà, l'ajouter
      if (montre.length == 0) {
        db.run(
          `INSERT
              INTO Montre (
                  nom,
                  boitierTextureID,
                  boitierFormeID,
                  braceletTextureID,
                  pierreID,
                  main_color,
                  userID
              )
              VALUES (
                  ?,
                  (SELECT boitierTextureID FROM Boitier_Texture WHERE nom = ?),
                  (SELECT boitierFormeID FROM Boitier_Forme WHERE nom = ?),
                  (SELECT braceletTextureID FROM Bracelet_Texture WHERE nom = ?),
                  (SELECT pierreID FROM Pierre WHERE nom = ?),
                  ?,
                  (SELECT userID FROM User WHERE pseudo = ?)
              )`,
          [
            nom,
            boitier_texture,
            boitier_forme,
            bracelet_texture,
            pierre,
            main_color,
            createur,
          ],
          function (err) {
            if (err) {
              console.error(
                "Erreur, la montre n'a pas pue être créée : ",
                err.message
              );
              res.status(500).json({ error: "Internal server error" });
              return;
            }
            res.json({ id_montre: this.lastID });
          }
        );
      } else {
        res.json({ message: "Cette montre existe déjà pour cet user" });
      }
    }
  );
});

// Ajouter une montre dans un panier
app.post("/user/panier/add", (req, res) => {
  const { id_montre, id_user } = req.body;

  // Vérifie si tous les paramètres sont renseignés
  if (!id_montre || !id_user) {
    res.status(400).json({ error: "id_montre and id_user are required" });
    return;
  }

  // vérifie si la montre existe avant de l'ajouter au panier
  db.all(
    `
      SELECT *
      FROM Montre 
      WHERE montreID = ?
      `,
    [id_montre],
    (err, montre_existe) => {
      if (err) {
        console.error(
          "Erreur, les montres n'ont pas pue être récupérées : ",
          err.message
        );
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // si la montre existe, l'ajouter au panier
      if (montre_existe.length > 0) {
        db.all(
          `
              SELECT *
              FROM Panier 
              WHERE userID = ?
              AND montreID = ?
              `,
          [id_user, id_montre],
          (err, panier) => {
            if (err) {
              console.error(
                "Erreur, le panier n'a pas pue être récupéré : ",
                err.message
              );
              res.status(500).json({ error: "Internal server error" });
              return;
            }

            // si la table Panier n'a pas déjà la combinaison id_user/id_montre, l'ajouter
            if (panier.length == 0) {
              db.run(
                `INSERT INTO Panier (userID, montreID) VALUES (?, ?)`,
                [id_user, id_montre],
                function (err) {
                  if (err) {
                    console.error("Error ajout panier:", err.message);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                  }
                  res.json({
                    message: "Montre ajoutée dans le panier avec succès.",
                  });
                }
              );
            } else {
              res.json({ message: "Déjà dans le panier." });
            }
          }
        );
      } else {
        res.json({ message: "Cette montre n'existe pas." });
      }
    }
  );
});

// Mettre à jour la configuration d’une montre déjà existante dans la base de données.
app.put("/montre/:id_montre/modif", (req, res) => {
  const { id_montre } = req.params;
  const {
    nom,
    boitier_texture,
    boitier_forme,
    bracelet_texture,
    pierre,
    main_color,
    createur,
  } = req.body;

  // Vérifie si tous les paramètres sont renseignés
  if (
    !id_montre ||
    !nom ||
    !boitier_texture ||
    !boitier_forme ||
    !bracelet_texture ||
    !pierre ||
    !main_color ||
    !createur
  ) {
    res
      .status(400)
      .json({
        error:
          "id_montre, nom, boitier_texture, boitier_forme, bracelet_texture, pierre, main_color and createur are required",
      });
    return;
  }

  // vérifie si la montre existe avant de la modidier, et si l'utilisateur qui la modifie est le même que celui qui la créer
  db.all(
    `
      SELECT *
      FROM Montre m
      JOIN User u ON m.userID = u.userID
      WHERE m.montreID = ?
      AND m.userID = u.userID
      AND u.pseudo = ?
      `,
    [id_montre, createur],
    (err, montre_existe) => {
      if (err) {
        console.error(
          "Erreur, la montre n'existe où ne vous impartient pas : ",
          err.message
        );
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // si elle existe, la modifier
      if (montre_existe.length > 0) {
        db.run(
          `
              UPDATE Montre
              SET nom = ?,
              boitierTextureID = (SELECT boitierTextureID FROM Boitier_Texture WHERE nom = ?),
              boitierFormeID = (SELECT boitierFormeID FROM Boitier_Forme WHERE nom = ?),
              braceletTextureID = (SELECT braceletTextureID FROM Bracelet_Texture WHERE nom = ?),
              pierreID = (SELECT pierreID FROM Pierre WHERE nom = ?),
              main_color = ?,
              userID = (SELECT userID FROM User WHERE pseudo = ?)
              WHERE montreID = ?
              `,
          [
            nom,
            boitier_texture,
            boitier_forme,
            bracelet_texture,
            pierre,
            main_color,
            createur,
            id_montre,
          ],
          (err) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }

            res.json({ message: "La montre a été modifiée avec succès." });
          }
        );
      } else {
        res.json({
          message:
            "Cette montre n'existe pas, ou n'a pas été créée par cet user.",
        });
      }
    }
  );
});

//----------------------------------------Route DELETE-------------------------------------//
// Supprimer une montre d'un panier
app.delete("/user/panier/supp/:id_user/:id_montre", (req, res) => {
  const { id_montre, id_user } = req.params;

  // Vérifie si tous les paramètres sont renseignés
  if (!id_montre || !id_user) {
    res.status(400).json({ error: "id_montre and id_user are required" });
    return;
  }

  db.run(
    `DELETE FROM Panier WHERE userID = ? AND montreID = ?`,
    [id_user, id_montre],
    function (err) {
      if (err) {
        console.error(
          "Erreur, la montre n'a pas pue être supprimé du panier : ",
          err.message
        );
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (this.changes === 0) {
        res
          .status(404)
          .json({
            error: "Utilisateur ou montre non trouvé. Rien n'a été supprimé.",
          });
      } else {
        res.json({ message: "Montre suprimée du panier avec succes." });
      }
    }
  );
});

// Vider un panier
app.delete("/user/panier/supp/:id_user", (req, res) => {
  const { id_user } = req.params;

  // Vérifie si tous les paramètres sont renseignés
  if (!id_user) {
    res.status(400).json({ error: "id_user are required" });
    return;
  }

  db.run(`DELETE FROM Panier WHERE userID = ?`, [id_user], function (err) {
    if (err) {
      console.error("Erreur, le Panier n'a pas pue être vidé : ", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (this.changes === 0) {
      res
        .status(404)
        .json({ error: "Utilisateur non trouvé. Rien n'a été supprimé." });
    } else {
      res.json({ message: "Panier vidé avec succes." });
    }
  });
});

// Supprimer une montre de la bdd
app.delete("/montre/:id_montre/supp/:id_user", (req, res) => {
  const { id_montre, id_user } = req.params;

  // Vérifie si tous les paramètres sont renseignés
  if (!id_montre || !id_user) {
    res.status(400).json({ error: "id_montre and id_user are required" });
    return;
  }

  // Vérifie si la montre a supprimé existe et si l'user qui veut la supprimé est celui qui l'a créé
  db.all(
    `SELECT * FROM Montre WHERE montreID = ? AND userID = ?`,
    [id_montre, id_user],
    function (err, montre) {
      // Vérifie si la montre supprimé est dans un panier
      if (err) {
        console.error("Error delete panier:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (montre.length > 0) {
        db.all(
          `SELECT * FROM Panier WHERE montreID = ?`,
          [id_montre],
          function (err, montre_dans_panier) {
            if (err) {
              console.error("Error delete panier:", err.message);
              res.status(500).json({ error: "Internal server error" });
              return;
            }

            // si la montre est dans la table Panier, supprimer le lien
            if (montre_dans_panier.length > 0) {
              db.run(
                `DELETE FROM Panier WHERE montreID = ?`,
                [id_montre],
                function (err) {
                  if (err) {
                    console.error("Error delete panier:", err.message);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                  }
                }
              );
            }

            // supprimer la montre
            db.run(
              `DELETE FROM Montre WHERE montreID = ?`,
              [id_montre],
              function (err) {
                if (err) {
                  console.error("Error delete Montre:", err.message);
                  res.status(500).json({ error: "Internal server error" });
                  return;
                }

                if (this.changes === 0) {
                  res.status(404).json({ error: "Montre non trouvé" });
                } else {
                  res.json({ message: "Montre suprimée avec succes" });
                }
              }
            );
          }
        );
      } else {
        res.json({
          message: "Une montre ne peut être supprimée que par son créateur.",
        });
      }
    }
  );
});

//----------------------------------------------------------------------------------------//

// Port d'écoute du serveur Express
const port = process.env.PORT || 4001;

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur le port http://localhost:${port}`);
});
