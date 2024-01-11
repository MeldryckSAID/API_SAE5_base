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

// Define a route for help and contact
app.get("/help-contact", (req, res) => {
  // The HTML file will be served automatically from the 'public' directory
  res.sendFile(__dirname + "/help-contact.html");
});

// -------------GET---------------------------//

//Get all
app.get("/montres", (req, res) => {
  db.all("SELECT * FROM montres", (err, rows) => {
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
  db.all("SELECT * FROM Cart", (err, rows) => {
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
app.get("/config", (req, res) => {
  db.all("SELECT * FROM Configurations", (err, rows) => {
    if (err) {
      console.error("Error fetching cart:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(rows); // Return the list of montres as JSON response
  });
});

//inscription user


app.post("/inscription", (req, res) => {
  const { name, Password, surname,mail } = req.body;

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

//login user

app.post("/login", (req, res) => {
  const { mail, Password } = req.body;

  if (!mail || !Password) {
    res.status(400).json({ error: "Email and Password are required" });
    return;
  }

  db.get("SELECT * FROM user WHERE mail = ?", [mail], (err, user) => {
    if (err) {
      console.error("Error fetching user:", err.message);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (user) {
      bcrypt.compare(Password, user.Password, (err, result) => {
        if (result) {
          res.json({ message: "Login successful", UserID: user.UserID });
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// -------------post---------------------------//

// montre
app.post("/montres/add", (req, res) => {
  const { NomMontres, UserID, Prix } = req.body;

  if (!NomMontres) {
    res.status(400).json({ error: "Nom de la montre requis" });
    return;
  }

  db.run(
    "INSERT INTO Montres (NomMontres, UserID, Prix ) VALUES (?, ?,?)",
    [NomMontres, UserID, Prix],
    function (err) {
      if (err) {
        console.error("Error adding Watches:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.json({ MontreID: this.lastID, NomMontres, UserID, Prix });
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
  const { NomBracelet, Prix } = req.body;

  if (!NomBracelet) {
    res.status(400).json({ error: "Nom du bracelet requis" });
    return;
  }

  db.run(
    "INSERT INTO Bracelet (NomBracelet,Prix) VALUES ( ?,?)",
    [NomBracelet, Prix],
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
      });
    }
  );
});
// configurations
app.post("/configurations", (req, res) => {
  const {  MontreID, UserID, BoitierID, PierreID, BraceletID } = req.body;

  if (!MontreID) {
    res.status(400).json({ error: "Num configurations requis" });
    return;
  }

  db.run(
    "INSERT INTO Configurations (MontreID,UserID, PierreID,BraceletID, BoitierID) VALUES (?,?,?,?,?)",
    [MontreID, BoitierID, UserID, PierreID, BraceletID],
    function (err) {
      if (err) {
        console.error("Error adding Bracelet:", err.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({
        ConfigurationID: this.lastID,
        MontreID,
        BoitierID,
        UserID,
        PierreID,
        BraceletID,
      });
    }
  );
});
// -------------inscription---------------------------//

// Start the server

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
