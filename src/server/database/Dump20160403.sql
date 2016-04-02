CREATE DATABASE  IF NOT EXISTS `electric_car` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `electric_car`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: electric_car
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'BMW i3'),(2,'Ford Focus Electric'),(3,'Mitsubishi i-MiEV'),(4,'Nissan Leaf'),(5,'smart fortwo electric drive'),(6,'Tesla Model S'),(7,'Kia Soul'),(8,'Chevrolet Spark EV');
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `charger`
--

DROP TABLE IF EXISTS `charger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `charger` (
  `charger_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`charger_id`),
  UNIQUE KEY `charger_id_UNIQUE` (`charger_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charger`
--

LOCK TABLES `charger` WRITE;
/*!40000 ALTER TABLE `charger` DISABLE KEYS */;
INSERT INTO `charger` VALUES (2,'CHAdeMO'),(27,'Tesla Supercharger'),(32,'SAE J1772 Combo');
/*!40000 ALTER TABLE `charger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model` (
  `model_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `car_id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `range_km` int(11) NOT NULL,
  PRIMARY KEY (`model_id`),
  UNIQUE KEY `model_id_UNIQUE` (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (1,'Base',1,2016,160),(2,'Rex',1,2016,250),(3,'Base',2,2016,122),(4,'Base',3,2016,100),(5,'S',4,2016,133),(6,'SV',4,2016,172),(7,'SL',4,2016,172),(8,'Base',5,2016,109),(9,'70D',6,2016,385),(10,'90D',6,2016,460),(11,'P90D',6,2016,435),(12,'All',7,2016,150),(13,'Base',8,2016,132);
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_charger`
--

DROP TABLE IF EXISTS `model_charger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_charger` (
  `model_id` int(11) NOT NULL,
  `charger_id` int(11) NOT NULL,
  PRIMARY KEY (`model_id`),
  KEY `charger_id_idx` (`charger_id`),
  CONSTRAINT `model_id` FOREIGN KEY (`model_id`) REFERENCES `model` (`model_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_charger`
--

LOCK TABLES `model_charger` WRITE;
/*!40000 ALTER TABLE `model_charger` DISABLE KEYS */;
INSERT INTO `model_charger` VALUES (4,2),(5,2),(6,2),(7,2),(12,2),(9,27),(10,27),(11,27),(1,32),(2,32),(13,32);
/*!40000 ALTER TABLE `model_charger` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-02 13:59:58
