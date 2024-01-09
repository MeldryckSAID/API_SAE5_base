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
    Prix DECIMAL(10, 2) NOT NULL
    
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
    Chemin VARCHAR(255) NOT NULL,
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
    Prix DECIMAL(10, 2) NOT NULL,
    TextureBraceletID INTEGER,
    FOREIGN KEY (TextureBraceletID) REFERENCES TextureBracelet(TextureBraceletID)

);

-- Table TextureBracelet
CREATE TABLE TextureBracelet (
    TextureBraceletID INTEGER PRIMARY KEY,
    NomTexture VARCHAR(255) UNIQUE NOT NULL,
    TextureDescription VARCHAR(255) NOT NULL,
    Prix DECIMAL(10, 2) NOT NULL,
    Chemin VARCHAR(255) NOT NULL
);

CREATE TABLE Configurations (
    ID INTEGER PRIMARY KEY,
    MontreID INTEGER,
    UserID INTEGER,
    BoitierID INTEGER,
    PierreID INTEGER,
    BraceletID INTEGER,
    FOREIGN KEY (MontreID) REFERENCES Montres(MontreID),
    FOREIGN KEY (UserID) REFERENCES user(UserID),
    FOREIGN KEY (BoitierID) REFERENCES Boitier(BoitierID),
    FOREIGN KEY (PierreID) REFERENCES Pierres(ID),
    FOREIGN KEY (BraceletID) REFERENCES Bracelet(ID)
);

-- Table Panier
CREATE TABLE cart (
    PanierID INTEGER PRIMARY KEY,
    UserID INTEGER,
    ConfigurationID INTEGER,
    Quantity INTEGER,
    PrixTotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES user(UserID),
    FOREIGN KEY (ConfigurationID) REFERENCES Configurations(ID) -- Modifié pour référencer ConfigurationID
);
