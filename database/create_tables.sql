-- Table Utilisateurs
CREATE TABLE Users (
    ID INTEGER PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    surname VARCHAR(255)  NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL
);
-- Table Montres
CREATE TABLE Watches (
    ID INTEGER PRIMARY KEY,
    WatchName VARCHAR(255) NOT NULL,
    BasePrice DECIMAL(10, 2) NOT NULL
);
-- Table Composants
CREATE TABLE Components (
    ID INTEGER PRIMARY KEY,
    ComponentName VARCHAR(255) NOT NULL,
    ComponentPrice DECIMAL(10, 2) NOT NULL
);
-- Table stone
CREATE TABLE stones (
    ID INTEGER PRIMARY KEY,
    stoneName VARCHAR(255) NOT NULL,
    stoneDescription VARCHAR(255) NOT NULL,
    stonePrice DECIMAL(10, 2) NOT NULL
);
-- Table bracelet
CREATE TABLE bracelets (
    ID INTEGER PRIMARY KEY,
    braceletName VARCHAR(255) NOT NULL,
    braceletDescription VARCHAR(255) NOT NULL,
    braceletPrice DECIMAL(10, 2) NOT NULL
);
-- Table Configurations
CREATE TABLE Configurations (
    ID INTEGER PRIMARY KEY,
    WatchID INTEGER,
    UserID INTEGER,
    CaseID INTEGER,
    DialID INTEGER,
    StoneID INTEGER,
    BraceletID INTEGER,
    FOREIGN KEY (WatchID) REFERENCES Watches(ID),
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (CaseID) REFERENCES Components(ID),
    FOREIGN KEY (DialID) REFERENCES Components(ID),
    FOREIGN KEY (StoneID) REFERENCES stones(ID),
    FOREIGN KEY (BraceletID) REFERENCES brace(ID)
);
-- Table Panier
CREATE TABLE Cart (
    ID INTEGER PRIMARY KEY,
    UserID INTEGER,
    ConfigurationID INTEGER,
    Quantity INTEGER,
    FOREIGN KEY (UserID) REFERENCES Users(ID),
    FOREIGN KEY (ConfigurationID) REFERENCES Configurations(ID)
);