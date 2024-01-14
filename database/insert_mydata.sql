
--Insertion d'un utilisateur 
INSERT INTO User (pseudo, mdp) VALUES ('said', 'said');
INSERT INTO User (pseudo, mdp) VALUES ('test', 'test');


-- Insert data into "Bracelet_Texture" table
INSERT INTO Bracelet_Texture (nom, prix) VALUES ('cuir-blanc', 55.00);
INSERT INTO Bracelet_Texture (nom, prix) VALUES ('tissus-marron', 100.00);
INSERT INTO Bracelet_Texture (nom, prix) VALUES ('tissus-or', 1500.00);

-- Insert data into "Pierre" table
INSERT INTO Pierre (nom, prix, couleur) VALUES ('aucunes', 00.00, "none");
INSERT INTO Pierre (nom, prix, couleur) VALUES ('Rubis', 1500.00, '#ff0000');
INSERT INTO Pierre (nom, prix, couleur) VALUES ('Diamant',3000.00, '#0000ff');
INSERT INTO Pierre (nom, prix, couleur) VALUES ('Emeraude',2000.00, '#00ff00');

-- Insert data into "Boitier_Texture" table
INSERT INTO Boitier_Texture (nom, prix) VALUES ('black01', 19.99);
INSERT INTO Boitier_Texture (nom, prix) VALUES ('black02', 19.99);
INSERT INTO Boitier_Texture (nom, prix) VALUES ('fluo01', 90.99);
INSERT INTO Boitier_Texture (nom, prix) VALUES ('mickey', 409.99);
INSERT INTO Boitier_Texture (nom, prix) VALUES ('white01', 19.99);
INSERT INTO Boitier_Texture (nom, prix) VALUES ('white02', 29.99);
INSERT INTO Boitier_Texture (nom, prix) VALUES ('white03', 69.99);
INSERT INTO Boitier_Texture (nom, prix) VALUES ('white04', 89.99);
INSERT INTO Boitier_Texture (nom, prix) VALUES ('white05', 9.99);


-- Insert data into "Boitier_Forme" table
INSERT INTO Boitier_Forme (nom, prix) VALUES ('boitier_carre', 400.00);
INSERT INTO Boitier_Forme (nom, prix) VALUES ('boitier_rond',800.00);


-- Insert data into "Montre" table
INSERT INTO Montre (nom, boitierTextureID, boitierFormeID, braceletTextureID, pierreID, main_color, userID) VALUES ("montre 1", 4, 2, 3, 2, '#ff00ff', 1);
INSERT INTO Montre (nom, boitierTextureID, boitierFormeID, braceletTextureID,  pierreID, main_color, userID) VALUES ("montre 2", 1, 1, 1, 1, '#ff00ff', 1);
INSERT INTO Montre (nom, boitierTextureID, boitierFormeID, braceletTextureID,  pierreID, main_color, userID) VALUES ("montre 3", 2, 2, 2, 2, '#ff00ff', 2);



INSERT INTO Panier (userID, montreID) VALUES (1, 1);
INSERT INTO Panier (userID, montreID) VALUES (1, 2);
INSERT INTO Panier (userID, montreID) VALUES (2, 3);