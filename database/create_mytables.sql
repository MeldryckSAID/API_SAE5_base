-- Table Utilisateurs
CREATE TABLE user (
    UserID INTEGER PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    surname VARCHAR(255)  NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL
);
-- Table Montres
CREATE TABLE Montres (
    MontreID INTEGER PRIMARY KEY,
    NomMontres VARCHAR(255) NOT NULL,
    UserID INTEGER,
    BoitierID INTEGER,
    PierreID INTEGER,
    BraceletID INTEGER,
    TextureBoitierID INTEGER,
    TextureBraceletID INTEGER,
    FOREIGN KEY (UserID) REFERENCES user(UserID),
    FOREIGN KEY (PierreID) REFERENCES Pierre(PierreID),
    FOREIGN KEY (BraceletID) REFERENCES Bracelet(BraceletID),
    FOREIGN KEY (TextureBoitierID) REFERENCES TextureBoitier(TextureBoitierID),
    FOREIGN KEY (TextureBraceletID) REFERENCES TextureBracelet(TextureBraceletID),
    FOREIGN KEY (BoitierID) REFERENCES Boitier(BoitierID)
    
);

-- Table Boitier
CREATE TABLE Boitier (
    BoitierID INTEGER PRIMARY KEY,
    NomBoitier VARCHAR(255) UNIQUE NOT NULL,
    Prix DECIMAL(10, 2) NOT NULL,
    TextureBoitierID INTEGER,
    FOREIGN KEY (TextureBoitierID) REFERENCES TextureBoitier(TextureBoitierID)
);
-- Table TextureBoitier
CREATE TABLE TextureBoitier (
    TextureBoitierID INTEGER PRIMARY KEY,
    NomTexture VARCHAR(255) UNIQUE NOT NULL,
    Prix DECIMAL(10, 2) NOT NULL
    
);

-- Table Pierre
CREATE TABLE Pierres (
    PierreID INTEGER PRIMARY KEY,
    NomPierre VARCHAR(255) UNIQUE NOT NULL,
    PierreDescription VARCHAR(255) NOT NULL,
    Prix DECIMAL(10, 2) NOT NULL
);
-- Table Bracelet
CREATE TABLE Bracelet (
    BraceletID INTEGER PRIMARY KEY,
    NomBracelet VARCHAR(255) UNIQUE NOT NULL,
    Prix DECIMAL(10, 2) NOT NULL
   

);

-- Table TextureBracelet
CREATE TABLE TextureBracelet (
    TextureBraceletID INTEGER PRIMARY KEY,
    NomTexture VARCHAR(255) UNIQUE NOT NULL,
    TextureDescription VARCHAR(255) NOT NULL,
    Prix DECIMAL(10, 2) NOT NULL
   
);

-- Table Panier
CREATE TABLE cart (
    cartID INTEGER PRIMARY KEY,
    UserID INTEGER,
    MontreID INTEGER,
    FOREIGN KEY (UserID) REFERENCES user(UserID),
    FOREIGN KEY (MontreID) REFERENCES Montres(MontreID) 
);
