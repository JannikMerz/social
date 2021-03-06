CREATE SCHEMA IF NOT EXISTS `socialPet` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `socialPet` ;

-- Host: 127.0.0.1    Database: socialPet
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- -----------------------------------------------------
-- Table `mydb`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `socialPet`.`account` (
  `idAccount` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `passwort` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`idAccount`))
ENGINE = InnoDB;

--
-- Dumping data for table `account`
--

LOCK TABLES `socialPet`.`account` WRITE;
/*!40000 ALTER TABLE `socialPet`.`Account` DISABLE KEYS */;
INSERT INTO `socialPet`.`account` VALUES (1, 'Jannik', '1234', 'jannik@gmx.de'), (2, 'Maria', '4321', 'maria@gmx.de'), (3, 'Max Mustermann', '9876', 'max@gmx.de'), (4, 'David Klotz', 'passwort1234', 'klotz@hdm-stuttgart.de');
/*!40000 ALTER TABLE `socialPet`.`Account` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `mydb`.`beitrag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `socialPet`.`beitrag` (
  `idBeitrag` INT NOT NULL,
  `titel` VARCHAR(45) NULL,
  `inhalt` VARCHAR(10000) NULL,
  `datum` VARCHAR(45) NULL,
  `img` VARCHAR(10000) NULL, 
  `accountId` INT NOT NULL,
  PRIMARY KEY (`idbeitrag`, `accountId`),
  INDEX `fk_beitrag_accountIdx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `fk_beitrag_account`
    FOREIGN KEY (`accountId`)
    REFERENCES `socialPet`.`account` (`idAccount`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Dumping data for table `beitrag`
--

LOCK TABLES `socialPet`.`beitrag` WRITE;
/*!40000 ALTER TABLE `socialPet`.`beitrag` DISABLE KEYS */;
INSERT INTO `socialPet`.`beitrag` VALUES (1, 'Bello wird erwachsen', 'Bello ist heute so brav an der Leine gelaufen *_* Ich bin richtig stolz auf ihn!', '2022-02-18 01:51:00', 'https://cdn.pixabay.com/photo/2016/02/19/15/46/labrador-retriever-1210559_1280.jpg','3'), (2, '4 Jahr mit Mauzi', 'Mauzi wird heute 4 Jahre alt!!!!', '2022-02-18 09:03:00', 'https://cdn.pixabay.com/photo/2015/11/16/22/14/cat-1046544_1280.jpg', '2');
/*!40000 ALTER TABLE `socialPet`.`beitrag` ENABLE KEYS */;
UNLOCK TABLES;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
