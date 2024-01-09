

-- Insertion d'exemples d'utilisateurs
INSERT INTO Users (name, surname, Password, mail)
VALUES 
    ('vick', 'haki', 'password123', 'vick@gmail.com'),
    ('alice', 'smith', 'securepass', 'alice@example.com'),
    ('bob', 'jackson', '123456', 'bob@example.com');

-- Insertion d'exemples de montres
INSERT INTO Watches (WatchName, BasePrice)
VALUES 
    ('Classic Watch', 200.00),
    ('Sports Watch', 300.00),
    ('Luxury Watch', 500.00);

-- Insertion d'exemples de composants
INSERT INTO Components (ComponentName, ComponentPrice)
VALUES 
    ('Steel Case', 50.00),
    ('Gold Dial', 30.00),
    ('Diamond Stones', 100.00),
    ('Leather Bracelet', 40.00),
    ('Fabric Bracelet', 20.00);

-- Insertion d'exemples de pierre
INSERT INTO stones (stoneName, stoneDescription, stonePrice)
VALUES 
    ('Steel Case', 'Acier chevalier', 50.00),
    ('Gold', 'Or de la couronne', 300.00),
    ('Diamond', 'Diamant africain', 1000.00),
    ('Tiger', 'Oeil du tigre', 80.00);

-- Insertion d'exemples de bracelets
INSERT INTO bracelets (braceletName, braceletDescription, braceletPrice)
VALUES 
    ('Steel Case', 'Acier chevaleresque', 50.00),
    ('Lacoste Bracelet', 'Peau de crocodile', 20.00);

-- Insertion d'exemples de configurations
INSERT INTO Configurations (WatchID, UserID, CartID,  stonesID, braceletsID)
VALUES 
    (1, 1, 1, 2, 3, 4),
    (2, 2, 2, 1, 4, 5),
    (3, 3, 3, 2, 3, 4);

-- Insertion d'exemples dans le panier
INSERT INTO Cart (UserID, ConfigurationID, Quantity)
VALUES 
    (1, 1, 2),
    (2, 2, 1),
    (3, 3, 3);
