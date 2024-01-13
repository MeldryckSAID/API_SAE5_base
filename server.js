const express = require("express");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
const port = 4001; // Change this to your desired port

app.use(cors());
// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Connect to your SQLite database
const db = new sqlite3.Database("./database/montresmyDB.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database");
  }
});

// Define the API endpoints
// Redirect the home
app.get("/", (req, res) => {
  res.redirect("/");
});

// -------------GET---------------------------//

//Get all
app.get("/montres", (req, res) => {
  db.all("SELECT * FROM Montres", (err, rows) => {
    if (err) {
      console.error("Error fetching montres:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows); // Return the list of montres as JSON response
  });
});
app.get("/user", (req, res) => {
  db.all("SELECT * FROM user", (err, rows) => {
    if (err) {
      console.error("Error fetching user:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows); // Return the list of montres as JSON response
  });
});
app.get("/boitier", (req, res) => {
  db.all("SELECT * FROM Boitier", (err, rows) => {
    if (err) {
      console.error("Error fetching boitier:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows); // Return the list of montres as JSON response
  });
});
app.get("/cart", (req, res) => {
  db.all("SELECT * FROM cart", (err, rows) => {
    if (err) {
      console.error("Error fetching cart:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows); // Return the list of montres as JSON response
  });
});
app.get("/stones", (req, res) => {
  db.all("SELECT * FROM Pierres", (err, rows) => {
    if (err) {
      console.error("Error fetching cart:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows); // Return the list of montres as JSON response
  });
});
// -------------ByID---------------------------//
//informations par user
app.get("/user/:UserID", (req, res) => {
  const { UserID } = req.params;

  db.all(
    `SELECT
      UserID,
      name,
      mail,
      surname

      FROM user
      WHERE UserID = ?;`,
    [UserID],
    (err, rows) => {
      if (err) {
        console.error("Error fetching watches:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(rows); // Return the list of recipes as JSON response
    }
  );
});
//informations par montre
app.get("/montre/:MontreID", (req, res) => {
  const { MontreID } = req.params;

  db.all(
    `SELECT
      MontreID,
      NomMontres,
      UserID,
      BoitierID,
      PierreID,
      BraceletID,
      TextureBraceletID,
      TextureBoitierID

      FROM Montres
      WHERE MontreID = ?;`,
    [MontreID],
    (err, rows) => {
      if (err) {
        console.error("Error fetching watches:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(rows); // Return the list of recipes as JSON response
    }
  );
});

// -------------inscription---------------------------//

//inscription user

app.post("/inscription", (req, res) => {
  const { name, Password, surname, mail } = req.body;

  if (!mail) {
    res.status(400).json({ error: "mail requis" });
    return;
  }

  db.run(
    "INSERT INTO user (name, Password, surname,mail) VALUES (?,?, ?,?)",
    [name, Password, surname, mail],
    function (err) {
      if (err) {
        console.error("Error adding Watches:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json({ UserID: this.lastID, name, Password, surname, mail });
    }
  );
});
// -------------connexion---------------------------//
//connexion user
app.post("/login", async (req, res) => {
  const { mail, Password } = req.body;

  // Récupération de l'utilisateur depuis la base de données
  db.get(
    `
        SELECT *
        FROM user
        WHERE mail = ?
        AND Password = ?`,
    [mail, Password],
    async (err, user) => {
      if (err) {
        res.status(500).json({ error: "Erreur interne du serveur" });
        return;
      }

      if (!user) {
        res.status(401).json({ error: "Pseudo ou Mot de passe incorrect" });
        return;
      }

      // Envoi du token en réponse
      res.json({ token: user.UserID });
    }
  );
});

// -------------post---------------------------//
// montre
app.post("/montres/add", (req, res) => {
  const { 
    UserID,
    NomMontres,
    BoitierID,
    PierreID,
    BraceletID,
    TextureBoitierID,
    TextureBraceletID,
  } = req.body;

  if (!NomMontres) {
    res.status(400).json({ error: "Nom de la montre requis" });
    return;
  }

  db.run(
    "INSERT INTO Montres ( UserID,NomMontres,BoitierID, PierreID, BraceletID, TextureBoitierID, TextureBraceletID ) VALUES (?,?,?,?,?,?,?)",
    [ UserID,
      NomMontres,
      BoitierID,
      PierreID,
      BraceletID,
      TextureBoitierID,
      TextureBraceletID,
    ],
    function (err) {
      if (err) {
        console.error("Error adding Watches:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json({
        MontreID: this.lastID,
         UserID,
        NomMontres,
        BoitierID,
        PierreID,
        BraceletID,
        TextureBoitierID,
        TextureBraceletID,
      });
    }
  );
});
// pierre
app.post("/stones/add", (req, res) => {
  const { NomPierre, PierreDescription, Prix } = req.body;

  if (!NomPierre) {
    res.status(400).json({ error: "Nom de la pierre requise" });
    return;
  }

  db.run(
    "INSERT INTO Pierres (NomPierre, PierreDescription,Prix ) VALUES (?, ?,?)",
    [NomPierre, PierreDescription, Prix],
    function (err) {
      if (err) {
        console.error("Error adding Watches:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json({
        WatchID: this.lastID,
        NomPierre,
        PierreDescription,
        Prix,
      });
    }
  );
});
// Bracelet
app.post("/bracelets/add", (req, res) => {
  const { NomBracelet, Prix, TextureBraceletID } = req.body;

  if (!NomBracelet) {
    res.status(400).json({ error: "Nom du bracelet requis" });
    return;
  }

  db.run(
    "INSERT INTO Bracelet (NomBracelet,Prix) VALUES ( ?,?,?)",
    [NomBracelet, Prix, TextureBraceletID],
    function (err) {
      if (err) {
        console.error("Error adding Bracelet:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({
        BraceletID: this.lastID,
        NomBracelet,
        Prix,
        TextureBraceletID,
      });
    }
  );
});
// texture Bracelet
app.post("/TextureBracelet/add", (req, res) => {
  const { NomTexture, Prix, TextureDescription } = req.body;

  if (!NomTexture) {
    res.status(400).json({ error: "Nom du Boitier requis" });
    return;
  }

  db.run(
    "INSERT INTO TextureBracelet (NomTexture,Prix,TextureDescription) VALUES ( ?,?,?)",
    [NomTexture, Prix, TextureBoitierID],
    function (err) {
      if (err) {
        console.error("Error adding Boitier:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({
        BraceletID: this.lastID,
        NomTexture,
        Prix,
        TextureDescription,
      });
    }
  );
});
//  boitier
app.post("/boitier/add", (req, res) => {
  const { NomBoitier, Prix, TextureBoitierID } = req.body;

  if (!NomBoitier) {
    res.status(400).json({ error: "Nom du Boitier requis" });
    return;
  }

  db.run(
    "INSERT INTO Boitier (NomBoitier, Prix, TextureBoitierID) VALUES ( ?,?,?)",
    [NomBoitier, Prix, TextureBoitierID],
    function (err) {
      if (err) {
        console.error("Error adding Boitier:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({
        BraceletID: this.lastID,
        NomBracelet,
        Prix,
        TextureBoitierID,
      });
    }
  );
});
// texture boitier
app.post("/TextureBoitier/add", (req, res) => {
  const { NomTexture, Prix } = req.body;

  if (!NomTexture) {
    res.status(400).json({ error: "Nom du Boitier requis" });
    return;
  }

  db.run(
    "INSERT INTO TextureBracelet (NomTexture,Prix,) VALUES ( ?,?)",
    [NomTexture, Prix],
    function (err) {
      if (err) {
        console.error("Error adding Boitier:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({
        BraceletID: this.lastID,
        NomTexture,
        Prix,
      });
    }
  );
});


// -------------app.put  et undapte into ---------------------------//


// modification montre 
app.put("/montre/:MontreID/update", (req, res) => {
  const { MontreID } = req.params;
  const {
    NomMontres,
    BoitierID,
    PierreID,
    BraceletID,
    TextureBoitierID,
    TextureBraceletID,
  } = req.body;

  // Vérifie si tous les paramètres sont renseignés
  if (
    !MontreID ||
    !NomMontres ||
    !BoitierID ||
    !PierreID ||
    !BraceletID ||
    !TextureBoitierID ||
    !TextureBraceletID
  ) {
    res.status(400).json({
      error: "Tous les champs sont obligatoires",
    });
    return;
  }

  // Mettre à jour la montre sans vérifier l'ID de l'utilisateur
  db.run(
    `UPDATE Montres
     SET NomMontres = ?, BoitierID = ?, PierreID = ?, BraceletID = ?, TextureBoitierID = ?, TextureBraceletID = ?
     WHERE MontreID = ?`,
    [
      NomMontres,
      BoitierID,
      PierreID,
      BraceletID,
      TextureBoitierID,
      TextureBraceletID,
      MontreID,
    ],
    (err) => {
      if (err) {
        res.status(500).json({ error: "Erreur interne du serveur" });
        return;
      }
      res.json({ message: "La montre a été modifiée avec succès." });
    }
  );
});

// modification montre by id avec  id user (hypotese)
app.put("/montre/user/:MontreID/update", (req, res) => {
  const { MontreID } = req.params;
  const UserID = req.user.UserID; 
  const {
    NomMontres,
    BoitierID,
    PierreID,
    BraceletID,
    TextureBoitierID,
    TextureBraceletID,
  } = req.body;

  // Vérifie si tous les paramètres sont renseignés
  if (
    !MontreID ||
    !NomMontres ||
    !BoitierID ||
    !PierreID ||
    !BraceletID ||
    !TextureBoitierID ||
    !TextureBraceletID
  ) {
    res.status(400).json({
      error: "Tous les champs sont obligatoires",
    });
    return;
  }

  db.all(
    `SELECT *
     FROM Montres m
     JOIN user u ON m.UserID = u.UserID
     WHERE m.MontreID = ?
     AND u.UserID = ?`,
    [MontreID, UserID],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Erreur interne du serveur" });
        return;
      }

      if (rows.length > 0) {
        // Si la montre existe, mettre à jour ses informations
        db.run(
          `UPDATE Montres
           SET NomMontres = ?, BoitierID = ?, PierreID = ?, BraceletID = ?, TextureBoitierID = ?, TextureBraceletID = ?
           WHERE MontreID = ?`,
          [
            NomMontres,
            BoitierID,
            PierreID,
            BraceletID,
            TextureBoitierID,
            TextureBraceletID,
            MontreID,
          ],
          (err) => {
            if (err) {
              res.status(500).json({ error: "Erreur interne du serveur" });
              return;
            }
            res.json({ message: "La montre a été modifiée avec succès." });
          }
        );
      } else {
        res
          .status(404)
          .json({
            message: "Montre non trouvée ou n'appartient pas à l'utilisateur",
          });
      }
    }
  );
});




// Start the server

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
