-- Insertion d'exemples d'utilisateurs
INSERT INTO user (name, surname, Password, mail)
VALUES 
    ('vick', 'haki', 'password123', 'vick@gmail.com'),
    ('alice', 'smith', 'securepass', 'alice@example.com'),
    ('bob', 'jackson', '123456', 'bob@example.com');
-- Insertion de données dans la table Montres
INSERT INTO Montres (
        UserID,
        NomMontres,
        Prix
    )
VALUES 
    (1,'yeesx' ,  1700),
    (1,'49.3' ,  2000);
-- Insertion de données dans la table Boitier
INSERT INTO Boitier (NomBoitier, Prix, TextureBoitierID)
VALUES 
    ('Boitier_carre', 600, 1),
    ('Boitier_rond', 700, 2);

-- Insertion de données dans la table TextureBoitier
INSERT INTO TextureBoitier (NomTexture, Chemin, Prix)
VALUES 
    ('Black', 'background_black.png', 100),
    ('White', 'background_white.png', 220);
-- Insertion de données dans la table Pierre
INSERT INTO Pierres (NomPierre,PierreDescription, Prix)
VALUES 
    ('Rubis','Pierre rouge vif, précieuse, symbole d amour et de passion, dure et résistante', 15000),
    ('Diamant','Gemme incolore, la plus dure, brillante, symbole déternité, souvent utilisée dans les bijoux.', 35000),
    ('Émeraude','Pierre verte, rare, symbolise la richesse et la royauté, souvent incluse dans des bijoux élégants.', 25000);
-- Insertion de données dans la table Bracelet
INSERT INTO Bracelet (NomBracelet, Prix, TextureBraceletID)
VALUES ('Bracelet', 3000, 1),
       ('Fermoir', 1000, 2);

-- Insertion de données dans la table TextureBracelet
INSERT INTO TextureBracelet (NomTexture, TextureDescription, Prix ,Chemin)
VALUES 
    ('Métal','Acier du chevalier' , 700, 'texture_metal.png'),
    ('Or Rose','Alliage captivant d or et de cuivre, l or rose est apprécié pour sa couleur chaude et romantique. Il évoque une élégance discrète et est souvent utilisé dans des bijoux fins et des montres de luxe.' , 500, 'texture_metal.png'),
    ('Platine','Métal noble et rare, le platine est célèbre pour sa brillance blanche, sa durabilité et sa résistance à la corrosion. Il symbolise l élégance ultime dans la joaillerie, parfait pour des bagues de fiançailles et autres bijoux haut de gamme.' , 500, 'texture_metal.png'),
    ('Titane Noir ','Le titane noir, avec son allure mystérieuse et sophistiquée, est un choix moderne pour les bijoux et les montres de luxe. Sa force remarquable et sa légèreté en font un matériau de prédilection pour des créations à la fois élégantes et pratiques. ' , 650, 'texture_metal.png'),
   
    ('Cuir de Crocodile', 'Un symbole ultime de luxe, ce cuir est renommé pour son motif unique et sa robustesse exceptionnelle. Utilisé dans la haute maroquinerie, il donne une allure majestueuse et un caractère distinctif à des articles tels que des sacs, ceintures et portefeuilles', 1000, 'texture_cuir.png'),
    ('Cuir de Veau de velours', 'Luxueusement doux et élégant, ce cuir issu du veau est célèbre pour sa texture veloutée et sa souplesse. Il apporte une touche de sophistication subtile à toute création, qu il sagisse de sacs à main haut de gamme ou de chaussures raffinées.', 300, 'texture_cuir.png'),
    ('Cuir de Cordovan','Provenant de la couche fibreuse de la croupe de cheval, ce cuir est prisé pour son éclat naturel, sa résistance et sa longévité. Il est souvent associé à des chaussures de luxe et des accessoires de mode, offrant une élégance intemporelle. ' , 2000, 'texture_cuir.png'),
   
    ('Tissus','cousus main' , 400, 'texture_tissus.png');

-- Insertion de données dans la table Panier
INSERT INTO cart (UserID, ConfigurationID ,Quantity,PrixTotal)
VALUES 
    (1, 1,2,52),
    (1, 2,1,800);