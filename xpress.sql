-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: xpress
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `OTP`
--

DROP TABLE IF EXISTS `OTP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OTP` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `OTP` mediumint(9) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OTP`
--

LOCK TABLES `OTP` WRITE;
/*!40000 ALTER TABLE `OTP` DISABLE KEYS */;
/*!40000 ALTER TABLE `OTP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `active_session`
--

DROP TABLE IF EXISTS `active_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `active_session` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `session_id` varchar(45) NOT NULL,
  `ip` varchar(40) NOT NULL,
  `user` int(11) NOT NULL,
  `time_start` datetime NOT NULL,
  `last_active` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_session`
--

LOCK TABLES `active_session` WRITE;
/*!40000 ALTER TABLE `active_session` DISABLE KEYS */;
INSERT INTO `active_session` VALUES (1,'4r2c475t199mrmihou6nan150j','27.123.140.181',50,'2021-05-25 12:32:13','2021-05-25 12:32:13'),(10,'4r2c475t199mrmihou6nan150j','27.123.136.104',10,'2021-06-05 14:49:13','2021-06-05 14:49:13'),(12,'4r2c475t199mrmihou6nan150j','27.123.136.161',10,'2021-06-06 09:08:16','2021-06-06 09:08:16'),(15,'bts2164vhpfbjrnl3kcj96qu7t','123.201.90.123',10,'2021-06-09 14:06:41','2021-06-09 14:06:41'),(20,'bts2164vhpfbjrnl3kcj96qu7t','203.187.238.157',10,'2021-06-17 04:32:34','2021-06-17 04:32:34'),(24,'bts2164vhpfbjrnl3kcj96qu7t','203.187.238.14',10,'2021-06-27 11:57:23','2021-06-27 11:57:23'),(25,'iia3u8bu4rglpni5j9ltb9ceb2','203.88.145.85',10,'2021-09-11 11:05:12','2021-09-11 11:05:12'),(26,'o8323m7ptb26717vne6h8lu8pj','45.117.247.247',10,'2021-09-19 08:36:52','2021-09-19 08:36:52'),(27,'o8323m7ptb26717vne6h8lu8pj','45.117.247.237',10,'2021-09-19 21:33:58','2021-09-19 21:33:58'),(30,'jkonmsnfq4jbr7ds8t7a3bpj82','203.187.228.18',10,'2021-10-16 14:01:49','2021-10-16 14:01:49'),(31,'aurir0uusc8dkijvc79tgs8rmf','203.187.228.18',10,'2021-10-16 14:09:29','2021-10-16 14:09:29'),(32,'jtvg2u2mdknv6a5pbuu0uh1ar4','203.187.238.114',10,'2021-10-25 07:38:44','2021-10-25 07:38:44'),(49,'dekeiig3eniht5h2eu79l605u3','127.0.0.1',2,'2022-02-16 17:09:44','2022-02-16 17:09:44'),(50,'dekeiig3eniht5h2eu79l605u3','127.0.0.1',2,'2022-02-16 18:47:29','2022-02-16 18:47:29'),(51,'dekeiig3eniht5h2eu79l605u3','127.0.0.1',2,'2022-02-16 18:47:56','2022-02-16 18:47:56'),(52,'dekeiig3eniht5h2eu79l605u3','127.0.0.1',2,'2022-02-16 18:49:46','2022-02-16 18:49:46'),(112,'11qc0t3lnjsvbkg2c6u25gipq8','123.201.95.100',2,'2022-03-08 05:01:47','2022-03-08 05:01:47'),(115,'qarsdfm4mai3t0m1et3l2qaa6s','119.235.89.15',2,'2022-03-08 19:50:44','2022-03-08 19:50:44'),(116,'11qc0t3lnjsvbkg2c6u25gipq8','203.88.145.38',2,'2022-03-09 01:09:13','2022-03-09 01:09:13'),(117,'qarsdfm4mai3t0m1et3l2qaa6s','119.235.89.15',2,'2022-03-09 01:29:10','2022-03-09 01:29:10'),(119,'11qc0t3lnjsvbkg2c6u25gipq8','203.187.228.4',2,'2022-03-09 08:06:38','2022-03-09 08:06:38'),(120,'11qc0t3lnjsvbkg2c6u25gipq8','203.187.228.4',2,'2022-03-09 14:12:05','2022-03-09 14:12:05'),(121,'11qc0t3lnjsvbkg2c6u25gipq8','123.201.15.140',2,'2022-03-10 05:13:47','2022-03-10 05:13:47'),(122,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-10 06:06:12','2022-03-10 06:06:12'),(123,'11qc0t3lnjsvbkg2c6u25gipq8','203.187.238.157',2,'2022-03-10 09:09:28','2022-03-10 09:09:28'),(124,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-10 19:54:10','2022-03-10 19:54:10'),(126,'11qc0t3lnjsvbkg2c6u25gipq8','123.201.90.111',2,'2022-03-11 05:30:54','2022-03-11 05:30:54'),(128,'bhctdgflv0gac3h48keci94org','123.201.90.111',2,'2022-03-11 05:41:18','2022-03-11 05:41:18'),(129,'bhctdgflv0gac3h48keci94org','219.91.213.206',2,'2022-03-12 00:55:43','2022-03-12 00:55:43'),(130,'bhctdgflv0gac3h48keci94org','203.187.238.161',2,'2022-03-12 09:12:16','2022-03-12 09:12:16'),(131,'bhctdgflv0gac3h48keci94org','203.187.238.52',2,'2022-03-13 11:40:43','2022-03-13 11:40:43'),(133,'11qc0t3lnjsvbkg2c6u25gipq8','203.187.228.34',2,'2022-03-14 04:30:41','2022-03-14 04:30:41'),(134,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-14 04:40:36','2022-03-14 04:40:36'),(135,'11qc0t3lnjsvbkg2c6u25gipq8','123.201.15.249',2,'2022-03-15 03:31:23','2022-03-15 03:31:23'),(139,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-15 05:26:42','2022-03-15 05:26:42'),(140,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-15 06:23:25','2022-03-15 06:23:25'),(141,'11qc0t3lnjsvbkg2c6u25gipq8','219.91.220.67',2,'2022-03-15 07:53:08','2022-03-15 07:53:08'),(142,'11qc0t3lnjsvbkg2c6u25gipq8','219.91.220.66',2,'2022-03-16 03:57:51','2022-03-16 03:57:51'),(144,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-16 04:09:18','2022-03-16 04:09:18'),(145,'11qc0t3lnjsvbkg2c6u25gipq8','203.187.194.209',2,'2022-03-16 17:45:47','2022-03-16 17:45:47'),(146,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-16 20:11:20','2022-03-16 20:11:20'),(147,'11qc0t3lnjsvbkg2c6u25gipq8','203.187.194.209',2,'2022-03-17 03:35:06','2022-03-17 03:35:06'),(148,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-17 03:43:03','2022-03-17 03:43:03'),(149,'11qc0t3lnjsvbkg2c6u25gipq8','203.187.228.21',2,'2022-03-17 08:23:03','2022-03-17 08:23:03'),(150,'11qc0t3lnjsvbkg2c6u25gipq8','203.187.238.185',2,'2022-03-17 16:56:49','2022-03-17 16:56:49'),(152,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-18 00:52:25','2022-03-18 00:52:25'),(154,'11qc0t3lnjsvbkg2c6u25gipq8','203.88.145.226',2,'2022-03-18 04:53:26','2022-03-18 04:53:26'),(155,'bhctdgflv0gac3h48keci94org','203.88.145.226',2,'2022-03-18 06:14:20','2022-03-18 06:14:20'),(157,'11qc0t3lnjsvbkg2c6u25gipq8','203.88.145.226',2,'2022-03-18 14:09:33','2022-03-18 14:09:33'),(158,'11qc0t3lnjsvbkg2c6u25gipq8','203.88.145.56',2,'2022-03-19 08:28:31','2022-03-19 08:28:31'),(159,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-21 02:02:03','2022-03-21 02:02:03'),(160,'bhctdgflv0gac3h48keci94org','219.91.213.211',2,'2022-03-21 03:33:51','2022-03-21 03:33:51'),(161,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-21 03:55:24','2022-03-21 03:55:24'),(162,'b9mvfj0ng0em582mpuulcr02pr','103.241.225.50',2,'2022-03-21 06:49:06','2022-03-21 06:49:06'),(163,'11qc0t3lnjsvbkg2c6u25gipq8','219.91.213.174',2,'2022-03-21 09:18:18','2022-03-21 09:18:18'),(164,'bhctdgflv0gac3h48keci94org','219.91.213.174',2,'2022-03-21 12:38:07','2022-03-21 12:38:07'),(166,'bhctdgflv0gac3h48keci94org','219.91.213.174',2,'2022-03-21 15:12:03','2022-03-21 15:12:03'),(168,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-21 20:08:31','2022-03-21 20:08:31'),(169,'bhctdgflv0gac3h48keci94org','123.201.90.124',2,'2022-03-22 02:46:21','2022-03-22 02:46:21'),(170,'alig3d55cj4is5b6ru62rrcmd3','210.7.2.88',2,'2022-03-22 02:54:03','2022-03-22 02:54:03'),(171,'11qc0t3lnjsvbkg2c6u25gipq8','203.88.145.137',2,'2022-03-22 08:47:33','2022-03-22 08:47:33'),(172,'11qc0t3lnjsvbkg2c6u25gipq8','203.88.145.137',2,'2022-03-22 09:08:46','2022-03-22 09:08:46'),(175,'gdlhbvnd4kvkjcl1qtldcqiii3','203.187.238.217',2,'2022-03-23 12:43:06','2022-03-23 12:43:06'),(177,'9vipo9f2grcs4t2u7ftcf8p5sf','210.7.29.204',2,'2022-03-23 14:15:12','2022-03-23 14:15:12'),(179,'506fbe727ciise34lf131mole8','203.187.238.217',2,'2022-03-23 15:31:01','2022-03-23 15:31:01'),(181,'506fbe727ciise34lf131mole8','123.201.15.131',2,'2022-03-24 03:54:47','2022-03-24 03:54:47'),(182,'49ds34mctkvubclltt4ghmfc1a','210.7.29.204',2,'2022-03-24 04:26:19','2022-03-24 04:26:19'),(183,'9vipo9f2grcs4t2u7ftcf8p5sf','210.7.29.204',2,'2022-03-24 04:27:24','2022-03-24 04:27:24'),(184,'49ds34mctkvubclltt4ghmfc1a','210.7.29.204',55,'2022-03-24 05:26:52','2022-03-24 05:26:52'),(185,'506fbe727ciise34lf131mole8','203.187.238.61',2,'2022-03-24 08:28:52','2022-03-24 08:28:52'),(186,'c8fgfc5udevioa2svv13g9nqhc','203.187.238.61',2,'2022-03-24 09:47:22','2022-03-24 09:47:22');
/*!40000 ALTER TABLE `active_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `binding`
--

DROP TABLE IF EXISTS `binding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `binding` (
  `id` bigint(20) NOT NULL,
  `book_size` varchar(255) DEFAULT NULL,
  `collating_charges` double DEFAULT NULL,
  `folding_charges` double DEFAULT NULL,
  `hard_bound` double DEFAULT NULL,
  `manual` double DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  `no_of_pages_in_plate_signature` double DEFAULT NULL,
  `perfect` double DEFAULT NULL,
  `sewing_charges` double DEFAULT NULL,
  `stapling_charges` double DEFAULT NULL,
  `total_pages` double DEFAULT NULL,
  `userid` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binding`
--

LOCK TABLES `binding` WRITE;
/*!40000 ALTER TABLE `binding` DISABLE KEYS */;
INSERT INTO `binding` VALUES (2854,'4',NULL,NULL,NULL,5,'Binding',NULL,5,NULL,NULL,NULL,3),(2864,'',120,225,NULL,NULL,'Binding',NULL,NULL,350,500,NULL,18),(3077,'',NULL,NULL,NULL,NULL,'Binding',NULL,NULL,NULL,NULL,NULL,3),(3599,'',100,150,NULL,NULL,'Binding',NULL,NULL,250,500,NULL,2),(3970,'3987',80,225,NULL,NULL,'Binding',NULL,NULL,350,250,NULL,10);
/*!40000 ALTER TABLE `binding` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `binding_library`
--

DROP TABLE IF EXISTS `binding_library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `binding_library` (
  `id` bigint(20) NOT NULL,
  `binding_cost` double DEFAULT NULL,
  `binding_type` varchar(255) DEFAULT NULL,
  `finish_cut_size` double DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binding_library`
--

LOCK TABLES `binding_library` WRITE;
/*!40000 ALTER TABLE `binding_library` DISABLE KEYS */;
/*!40000 ALTER TABLE `binding_library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `binding_table`
--

DROP TABLE IF EXISTS `binding_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `binding_table` (
  `id` bigint(20) NOT NULL,
  `book_cost` varchar(255) DEFAULT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_size` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binding_table`
--

LOCK TABLES `binding_table` WRITE;
/*!40000 ALTER TABLE `binding_table` DISABLE KEYS */;
INSERT INTO `binding_table` VALUES (2382,'14','Top Cover','8',3),(2383,'12','Hard Bound','9',3);
/*!40000 ALTER TABLE `binding_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_size`
--

DROP TABLE IF EXISTS `book_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_size` (
  `id` bigint(20) NOT NULL,
  `book_size` varchar(255) DEFAULT NULL,
  `hard` varchar(255) DEFAULT NULL,
  `manual` varchar(255) DEFAULT NULL,
  `perfect` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_size`
--

LOCK TABLES `book_size` WRITE;
/*!40000 ALTER TABLE `book_size` DISABLE KEYS */;
INSERT INTO `book_size` VALUES (2709,'aaa','4','1','2',3),(2759,'Demy (18\"x23\") 1/4 (Little < 11.5\"x 9\")','10','2','6',18),(2756,'Demy (18\"x23\") 1/4 (Little < 11.5\"x 9\")','8','2','6',11),(2713,'Demy (18\"x23\") 1/4 (Little < 11.5\"x 9\")','15','1.75 ','4.50',30),(2711,'Demy (18\"x23\") 1/4 (Little < 11.5\"x 9\")','7','3','4',3),(2712,'aaasff','45','2','3',3),(2710,'Firefox','5','1','2',3),(3987,'Demy (18\"x23\") 1/4 (Little < 11.5\"x 9\")','12.50','1.25','3.80',10);
/*!40000 ALTER TABLE `book_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_library`
--

DROP TABLE IF EXISTS `customer_library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_library` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `person_name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4377 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_library`
--

LOCK TABLES `customer_library` WRITE;
/*!40000 ALTER TABLE `customer_library` DISABLE KEYS */;
INSERT INTO `customer_library` VALUES (947,'Karelibag Ind. Estate, Jalaram Mandir Road, Karelibag, Vadodara-390018','Jayesh Printery','8401890170','jayeshpritery@yahoo.com','Gopalbhai Patel',18),(972,'\'SONA-RUPA\' Basement, Opp. Badamadi Bag, Dandiya Bazar, Vadodara-390001','Printwell Offset','9408770876','anil.h.desai@gmail.com','Anil Desai',18),(984,'Vadodara','Test Private Ltd','1234567890','test@gmail.com','Test ',3),(4052,'SONA-RUPA Appt, Shankar Tekari, Dandia Bazar, Vadodara','Printwell Publication','9974087411','','AH Desai',41),(4343,'Ahmednagar','Printshop','9923399388','printshopnagar@gmail.com','Kiran',73),(1487,'SONA-RUPA Basement, Opp. Badamdi Baug, Dandia Bazar, Vadodara. ','Printwell Offset','9408770876','printwell_offset@gmail.com','Anil Desai',10),(1791,'India','Xpress Quote','9408770876','xpressquote.in@gmail.com','Karan Desai',28),(1510,'RBG Complex, Bahucharaji Road, Karelibag, Vadodara','Xpress Quote','9408770876','xpressquote.in@gmail.com','Anil Desai',3),(1801,'','Krishna Multiprints','9825607488','','Sunil Gadodia',28),(3529,'AG-49, RBG Complex, Opp Bahucharaji Temple, Bahucharaji Road, Karelibag,\nVadodara-390018','eXpress Tech','918604860412','expresstech.in@gmail.com','Anil Desai',2),(3340,'1240, Parivar Complex, MG Road, Dadar, Mumbai.','JoshiTech Solutions','9974087407','joshitechsolutions@gmail.com','VN Joshi',18),(3070,'AG-49, RBG Complex, Bahucharaji Road, Karelibag, Vadodara-390018','Xpress Quote','8604860412','expresstech.in@gmail.com','Anil Desai',18),(2526,'AG-49, RBG Complex, Bahucharaji Road, Karelibag, Vadodara','Express Tech Pvt. Ltd.','8604860412','expresstech.in@gmail.com','Maithili Desai',10),(4354,'Matri Society, Nr. ISKON Mandir, Gotri Road, vadodara','Naginbhai','8200224358','toesnt','Vasava',18),(4366,'Near ISKON, Gotri Road, Vadodara.','Naginbhai','','','Vasava',78),(4367,'','a','1','','b',18),(4368,'Karelibag Ind. Estate, Jalaram Mandir Road, Karelibag, Vadodara-390018','Jayesh Printery','8401890170','jayeshpritery@yahoo.com','Gopalbhai Patel',30),(4369,'\'SONA-RUPA\' Building Basement, Opp. Badamadi Bag, Dandiya Bazar, Vadodara-390001','Printwell Offset','9408770876','anil.h.desai@gmail.com','Anil Desai',30),(4370,'12, Laxmi Estate, Opp. Old Gujarat Samachar Press, Jalaram Marg, Karelibag, Vadodara-390 018','Yamuna Art Printery','9429256999','yamunaartprinters@gmail.com','Rajiv Patel',30),(4371,'AG-49, RBG Complex, Bahucharaji Road, Karelibag, Vadodara-390018','Xpress Quote','8604860412','expresstech.in@gmail.com','Anil Desai',30),(4372,'1240, Parivar Complex, MG Road, Dadar, Mumbai.','JoshiTech Solutions','9974087407','joshitechsolutions@gmail.com','VN Joshi',30),(4373,'Ahmednagar - 414001','Printshop','9923399388','kiranlakhara75@gmail.com','Kiran Lakhara',30),(4374,'AG-49, RBG Complex, Bhhucharaji Road, Karelibag, Vadodara-390018','eXpress Tech','918604860412','expresstech.in@gmail.com','Anil Desai',30),(4375,'921 A1, Janak Engineers Compound GIDC Makarpura, Vadodara, Gujarat - 390010, India','Solar Impulse','919707270542','hello@SuGreeProducts.com','Manish Naik',30),(4376,'SONA-RUPA Basement, Opp. Badamadi Baug, Dandia Bajar, VADODARA-390001','Printwell Offset','919974087411','anil.h.desai@gmail.com','Gopal Patel',2);
/*!40000 ALTER TABLE `customer_library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_format`
--

DROP TABLE IF EXISTS `invoice_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_format` (
  `id` bigint(20) NOT NULL,
  `note1` varchar(255) DEFAULT NULL,
  `note2` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `qtya` bit(1) DEFAULT NULL,
  `qtyb` bit(1) DEFAULT NULL,
  `qtyc` bit(1) DEFAULT NULL,
  `sign_url` varchar(255) DEFAULT NULL,
  `userid` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_format`
--

LOCK TABLES `invoice_format` WRITE;
/*!40000 ALTER TABLE `invoice_format` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paper_library`
--

DROP TABLE IF EXISTS `paper_library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paper_library` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `paperlibrary` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3o2oqjia6bfewmibxqt5djpat` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4672 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paper_library`
--

LOCK TABLES `paper_library` WRITE;
/*!40000 ALTER TABLE `paper_library` DISABLE KEYS */;
INSERT INTO `paper_library` VALUES (88,'High Bright SS Maplitho',3),(87,'LWC Duplex Board Soham Papers',3),(89,'Premium Board White Back',3),(90,'Royal Board Tulsi Paper',3),(91,'JK Cote Chromo Gloss',3),(92,'Belarpur White Maplitho',3),(112,'Sun Shine White Map. ',3),(113,'JK Super White Art Paper',10),(116,'Silver Coat Art Paper',10),(4369,'Maplitho White',78),(128,'Ballarpur Offset Maplitho',2),(129,'Duplex White FBB Card',2),(130,'Soham Master Coat Art Paper',10),(133,'Bhadrachalam Super White Art Paper',NULL),(134,'Soham Coated Art Paper',NULL),(135,'Krishna Art Paper',NULL),(209,'Bhadrachalam Mirorcoat Art Card',11),(205,'Sinarmas Super White Art Paper ',11),(233,'Paper 1',12),(253,'SS Maplitho',13),(254,'SInarmas Art Card',13),(255,'Sinarmas Mirrorcoat Art Paper',13),(577,'Sinarmas Art Paper',3),(638,'Ballarpur White Maplitho',18),(3454,'Alabaster Paper',30),(4668,'xyz new',18),(641,'Art Card JK Royal',18),(655,'JK Gray Back Duplex1',18),(883,'Paper 1',20),(933,'JK Art Paper',20),(934,'Ballrpur Maplitho',20),(935,'Sinarmas Art Card',20),(1777,'ABC Color Paper',18),(1784,'Sunshine Super White',18),(1792,'Ballarpur Maplitho ',28),(1793,'JK Art Paper',28),(1794,'Sirpur Cream Wove',28),(1795,'JK Super White Maplitho',28),(1796,'JK Miror Coat Art Paper',28),(3015,'Sinarmas Art Card',18),(3320,'Naini Prime Era',30),(3341,'JK White Back Duplex',18),(2528,'Ballarpur Art Card',10),(2584,'Ballarpur Maplitho	',30),(2586,'Sinarmas Art paper',30),(2587,'Sunshine Super Print',30),(2590,'Sinar Art Card',30),(2591,'Ballarpur Magna/Wisdom ',30),(2592,'Royal Exe bond paper',30),(2593,'JK Excel bond paper',30),(2594,'JK Ultima Card',30),(2595,'FBB Card',30),(2596,'Ledger Paper',30),(2610,'Ballarpur Chromo paper',30),(2622,'Ballarpur Natural Shade',30),(2623,'Color paper',30),(3531,'JK White Back Duplex',2),(3530,'Orient White Creamwove Paper',2),(2981,'Chromo Paper',30),(3466,'XYZ',18),(3018,' Orient White CW Paper',18),(3171,'Sinarmas White Cream Wove Paper',10),(3043,' Belapur Yellow',18),(3080,'Magna print',30),(3143,'Shreyas Prime Era paper',30),(3324,'ABC White Paper',18),(3532,'Sinarmas Art Paper',2),(3533,'Sinarmas Art Card',2),(3534,'Sirpur Colour Paper',2),(3535,'XYZ Duplicate/Rough Paper',2),(3536,'XYZ Cover Paper',2),(3537,'XYZ Offset Printing Paper',2),(3603,'XYZ Buff/Blue Tint Paper',2),(3604,'XYZ Pink Cover Paper 90 GSM',2),(3805,'Bible paper',30),(4172,'Wisdom Print',30),(4046,'Sirpur Creamwove White',41),(4045,'Sinarmas Art Paper',41),(4047,'Glossy Duplex White-Back',41),(4227,'Maplitho CG',30),(4351,'15 mic bopp',75),(4370,'Art Card',78),(4544,'Color Card',30),(4664,'art card',76),(4665,'test',55),(4666,'test2',55),(4667,'test paper 3',55),(4670,'Duplex Gray Back Card',2),(4671,'Chromo-Art Paper',2);
/*!40000 ALTER TABLE `paper_library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `permission_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promocode`
--

DROP TABLE IF EXISTS `promocode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promocode` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `contact` varchar(255) DEFAULT NULL,
  `promo_code` varchar(255) DEFAULT NULL,
  `promo_code_limit` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promocode`
--

LOCK TABLES `promocode` WRITE;
/*!40000 ALTER TABLE `promocode` DISABLE KEYS */;
INSERT INTO `promocode` VALUES (1,'1234567890','GDNSKRI',0,32),(2,'1234567891','FPBDNPM',3,33),(3,'1234567892','XZQZCKH',3,34),(4,'1234567893','JHCLMXA',3,35),(5,'+6798792954','XEXKACX',3,36),(6,'9376325327','FDKNJNC',3,37),(7,'9595959595','BYKXFQZ',3,38),(8,'7417148331','JZKSYVG',3,39),(9,'8871200893','HVDTBNC',3,40),(10,'9825017683','MITOZBF',3,41);
/*!40000 ALTER TABLE `promocode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation`
--

DROP TABLE IF EXISTS `quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quotation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `quote_number` int(11) NOT NULL,
  `type` enum('stationery','single_sheet','multi_sheet','book','calendar','box') NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  `job_ref` varchar(1000) NOT NULL,
  `description` text NOT NULL,
  `qty1` int(11) NOT NULL DEFAULT 0,
  `qty2` int(11) NOT NULL,
  `qty3` int(11) NOT NULL,
  `inputs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `total_quote_a` decimal(10,2) NOT NULL,
  `total_quote_b` decimal(10,2) NOT NULL,
  `total_quote_c` decimal(10,2) NOT NULL,
  `quote_lock` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation`
--

LOCK TABLES `quotation` WRITE;
/*!40000 ALTER TABLE `quotation` DISABLE KEYS */;
INSERT INTO `quotation` VALUES (1,55,1,'single_sheet',0,'2022-02-23 00:00:00','test','thdt',10,20,20,'[{\"quantity_a\":\"10\",\"quantity_b\":\"20\",\"quantity_c\":\"20\",\"job_ref\":\"test\",\"pdf_desc\":\"thdt\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"80\",\"inp_paper_cost\":\"120\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"200\",\"inp_finish_size_format\":\"\",\"sel_print_sides\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]',0.00,0.00,0.00,0),(2,18,158,'single_sheet',972,'2022-02-24 00:00:00','dthue','tnhnte',100,0,0,'[{\"quantity_a\":\"100\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"dthue\",\"pdf_desc\":\"tnhnte\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"500\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"80\",\"inp_paper_gsm\":\"20\",\"inp_paper_cost\":\"50\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"sel_print_sides\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]',0.00,0.00,0.00,0),(3,18,159,'single_sheet',3070,'2022-02-24 00:00:00','','',0,100,0,'[{\"quantity_a\":\"\",\"quantity_b\":\"100\",\"quantity_c\":\"100\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"\",\"print_calculation_every\":\"\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"80\",\"inp_paper_gsm\":\"20\",\"inp_paper_cost\":\"20\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"sel_print_sides\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]',0.00,0.00,0.00,0),(5,18,161,'stationery',947,'2022-02-25 00:00:00','test ref','test desc',100,200,300,'[{\"quantity_a\":\"100\",\"quantity_b\":\"200\",\"quantity_c\":\"200\",\"job_ref\":\"test ref\",\"pdf_desc\":\"test desc\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"500\"},{\"paper_desc_amount\":\"100.000\",\"paper_desc_sel\":\"2\",\"inp_wastage\":\"1\",\"inp_copies_set\":\"2\",\"inp_sets_book\":\"1\",\"sel_finish_cut_format\":\"1\\/16\",\"margin-adjust js-disabled\":\"x\",\"dtp_select\":\"None\",\"inp_ups_in_plate\":\"2\",\"sel_plate_master\":\"Double\",\"sel_num_colors\":\"1\",\"inp_plate_master_cost_each\":\"1\",\"inp_print_rate\":\"\",\"inp_binding_type\":\"\",\"sel_binding_type\":\"\",\"inp_numbing\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"},{\"paper_desc_amount\":\"50\",\"paper_desc_sel\":\"\",\"disabled\":\"\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"disabled\":\"\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"disabled\":\"\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"disabled\":\"\"}]',0.00,0.00,0.00,0),(6,30,144,'single_sheet',4368,'2022-02-26 00:00:00','F/C Handbill for LIC','Handbill in 80 GSM Maplitho paper. Both sides 4 color printing in Demy 1/8 Size ( Aprox. 9\"x5.75\")',85000,125000,150000,'[{\"quantity_a\":\"85000\",\"quantity_b\":\"125000\",\"quantity_c\":\"125000\",\"job_ref\":\"F\\/C Handbill for LIC\",\"pdf_desc\":\"Handbill in 80 GSM Maplitho paper. Both sides 4 color printing in Demy 1\\/8 Size ( Aprox. 9\\\"x5.75\\\")\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"80\",\"inp_paper_cost\":\"78.25\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"2\",\"inp_finish_size_format\":\"16\",\"sel_print_sides\":\"2\",\"inp_dtp\":\"300\",\"dtp_select\":\"Lot\",\"inp_pages_in_plate_sig\":\"8\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"350\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"125\",\"inp_hidden_expense\":\"1\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',0.00,0.00,0.00,0),(7,30,145,'single_sheet',4368,'2022-02-26 00:00:00','Election Posters BJP','Posters in 120 GSM Art paper in four color printing in Crown 20\"x 30\" size',35000,50000,75000,'[{\"quantity_a\":\"35000\",\"quantity_b\":\"50000\",\"quantity_c\":\"50000\",\"job_ref\":\"Election Posters BJP\",\"pdf_desc\":\"Posters in 120 GSM Art paper in four color printing in Crown 20\\\"x 30\\\" size\",\"min_print_charges\":\"3000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"2586\",\"width\":\"30\",\"height\":\"40\",\"inp_paper_gsm\":\"120\",\"inp_paper_cost\":\"42\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"1\",\"inp_finish_size_format\":\"2\",\"sel_print_sides\":\"1\",\"inp_dtp\":\"1500\",\"dtp_select\":\"Lot\",\"inp_pages_in_plate_sig\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"350\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"125\",\"inp_hidden_expense\":\"1\",\"profit_inp\":\"15\",\"profit_type\":\"percernt\"}]',0.00,0.00,0.00,0),(8,0,145,'single_sheet',4368,'2022-02-26 00:00:00','Election Posters BJP','Posters in 120 GSM Art paper in four color printing in Crown 20\"x 30\" size',35000,50000,75000,'[{\"quantity_a\":\"35000\",\"quantity_b\":\"50000\",\"quantity_c\":\"50000\",\"job_ref\":\"Election Posters BJP\",\"pdf_desc\":\"Posters in 120 GSM Art paper in four color printing in Crown 20\\\"x 30\\\" size\",\"min_print_charges\":\"3000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"2586\",\"width\":\"30\",\"height\":\"40\",\"inp_paper_gsm\":\"120\",\"inp_paper_cost\":\"42\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"1\",\"inp_finish_size_format\":\"2\",\"sel_print_sides\":\"1\",\"inp_dtp\":\"1500\",\"dtp_select\":\"Lot\",\"inp_pages_in_plate_sig\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"350\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"125\",\"inp_hidden_expense\":\"1\",\"profit_inp\":\"15\",\"profit_type\":\"percernt\"}]',0.00,0.00,0.00,0),(9,0,150,'single_sheet',4368,'2022-02-28 09:24:00','Election Posters BJP','Posters in 120 GSM Art paper in four color printing in Crown 20\"x 30\" size',35000,50000,50000,'[{\"quantity_a\":\"35000\",\"quantity_b\":\"50000\",\"quantity_c\":\"50000\",\"job_ref\":\"Election Posters BJP\",\"pdf_desc\":\"Posters in 120 GSM Art paper in four color printing in Crown 20\\\"x 30\\\" size\",\"min_print_charges\":\"3000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"2586\",\"width\":\"30\",\"height\":\"40\",\"inp_paper_gsm\":\"120\",\"inp_paper_cost\":\"42\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"1\",\"inp_finish_size_format\":\"2\",\"sel_print_sides\":\"1\",\"inp_dtp\":\"1500\",\"dtp_select\":\"Lot\",\"inp_pages_in_plate_sig\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"350\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"125\",\"inp_hidden_expense\":\"1\",\"profit_inp\":\"15\",\"profit_type\":\"percernt\"}]',0.00,0.00,0.00,0),(10,55,2,'single_sheet',0,'2022-02-28 18:03:00','Election Posters BJP','Posters in 120 GSM Art paper in four color printing in Crown 20\"x 30\" size',35000,50000,50000,'[{\"quantity_a\":\"35000\",\"quantity_b\":\"50000\",\"quantity_c\":\"50000\",\"job_ref\":\"Election Posters BJP\",\"pdf_desc\":\"Posters in 120 GSM Art paper in four color printing in Crown 20\\\"x 30\\\" size\",\"min_print_charges\":\"3000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"20\",\"height\":\"30\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"0\",\"inp_finish_size_format\":\"2\",\"sel_print_sides\":\"1\",\"inp_dtp\":\"100\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"4\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"inp_hidden_expense\":\"1\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',0.00,0.00,0.00,0),(11,55,3,'single_sheet',0,'2022-03-01 10:49:00','single sheet test','single sheet test according to excel',25000,35000,50000,'[{\"quantity_a\":\"25000\",\"quantity_b\":\"35000\",\"quantity_c\":\"35000\",\"job_ref\":\"single sheet test\",\"pdf_desc\":\"single sheet test according to excel\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"4665\",\"width\":\"20\",\"height\":\"30\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"0\",\"inp_finish_size_format\":\"2\",\"sel_print_sides\":\"1\",\"inp_dtp\":\"100\",\"dtp_select\":\"Lot\",\"inp_pages_in_plate_sig\":\"4\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"inp_hidden_expense\":\"1\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',57297.03,79882.54,79882.54,0),(12,30,151,'multi_sheet',0,'2022-03-01 11:06:00','Brochure','Brochure \n4 pages\nSize A5 (Folded)',5000,0,0,'[{\"quantity_a\":\"5000\",\"quantity_b\":\"0\",\"quantity_c\":\"0\",\"job_ref\":\"Brochure\",\"pdf_desc\":\"Brochure \\n4 pages\\nSize A5 (Folded)\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"paper_sel\":\"\",\"width\":\"36\",\"height\":\"25\",\"inp_paper_gsm\":\"170\",\"inp_paper_cost\":\"7.31\",\"paper_cost_sel\":\"Sheet\",\"inp_wastage\":\"8\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"4\",\"inp_dtp\":\"1000\",\"dtp_select\":\"Lot\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"4\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"200\",\"inp_min_print_rate\":\"550\",\"inp_balance_qty\":\"125\",\"lami_uv_rate\":\"0.4\",\"lami_uv_pgs\":\"2\",\"lami_uv_item\":\"Lami.\",\"lami_uv_rate_per\":\"inch_sq\",\"spot-uv_inp js-disabled\":\"x\",\"spot-uv_sel\":\"None\",\"folding_rate\":\"250\",\"folding_pgs\":\"4\",\"folding_item\":\"Folding\",\"folding_rate_per\":\"1000\",\"punch_inp js-disabled\":\"x\",\"punch_sel\":\"None\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"1\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',0.00,0.00,0.00,0),(13,30,152,'multi_sheet',0,'2022-03-01 12:52:00','','',1500,0,0,'[{\"quantity_a\":\"1500\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"paper_sel\":\"\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"3\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"24\",\"inp_dtp\":\"250\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"2\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]',0.00,0.00,0.00,0),(14,55,4,'multi_sheet',0,'2022-03-02 17:33:00','','',1500,0,0,'[{\"quantity_a\":\"1500\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"\",\"print_calculation_every\":\"\"},{\"paper_sel\":\"4666\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"3\",\"inp_finish_size_format\":\"24\",\"inp_total_pgs\":\"24\",\"inp_dtp\":\"250\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"2\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"lami_uv_rate\":\"0.25\",\"lami_uv_pgs\":\"16\",\"lami_uv_item\":\"Lami.\",\"lami_uv_rate_per\":\"inch_sq\",\"spot-uv_inp\":\"1.25\",\"spot-uv_sel\":\"Spot UV\",\"folding_rate\":\"350\",\"folding_pgs\":\"4\",\"folding_item\":\"Folding\",\"folding_rate_per\":\"1000\",\"punch_inp\":\"1200\",\"punch_sel\":\"Punch Die\",\"inp_staple\":\"0.9\",\"inp_hidden_expense\":\"3\",\"profit_inp\":\"25\",\"profit_type\":\"percernt\"}]',0.00,0.00,0.00,0),(15,55,5,'multi_sheet',0,'2022-03-02 17:51:00','','',1500,0,0,'[{\"quantity_a\":\"1500\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"paper_sel\":\"4666\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"3\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"24\",\"inp_dtp\":\"250\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"2\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"lami_uv_rate\":\"0.25\",\"lami_uv_pgs\":\"16\",\"lami_uv_item\":\"Lami.\",\"lami_uv_rate_per\":\"inch_sq\",\"spot-uv_inp\":\"1.25\",\"spot-uv_sel\":\"Spot UV\",\"folding_rate\":\"350\",\"folding_pgs\":\"4\",\"folding_item\":\"Folding\",\"folding_rate_per\":\"1000\",\"punch_inp\":\"1200\",\"punch_sel\":\"Punch Die\",\"inp_staple\":\"0.9\",\"inp_hidden_expense\":\"3\",\"profit_inp\":\"25\",\"profit_type\":\"percernt\"}]',28067.63,0.00,0.00,0),(16,55,6,'book',0,'2022-03-03 10:35:00','','',12000,0,0,'[{\"quantity_a\":\"12000\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"4665\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"paper_cost_sel\":\"kg\",\"inp_paper_cost\":\"80\",\"inp_wastage\":\"1\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"4\",\"dtp_select\":\"Page\",\"margin-adjust\":\"250\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"lami_uv_item\":\"Lami.\",\"lami_uv_rate_per\":\"inch_sq\",\"lami_uv_rate\":\"0.25\",\"lami_uv_pgs\":\"2\",\"spot-uv_sel\":\"Spot UV\",\"spot-uv_inp\":\"1.25\",\"folding_item\":\"Folding\",\"folding_rate_per\":\"1000\",\"folding_rate\":\"350\",\"folding_pgs\":\"4\",\"punch_sel\":\"Punch Die\",\"punch_inp\":\"1200\",\"inp_staple\":\"12.25\",\"inp_hidden_expense\":\"1.75\",\"profit_type\":\"percernt\",\"profit_inp\":\"10\"},{\"sel_paper\":\"\",\"width\":\"23\",\"height\":\"30\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"1\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"16\",\"margin-adjust\":\"35\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"2\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"disabled\":\"\"}]',0.00,0.00,0.00,0),(17,55,7,'book',0,'2022-03-03 12:35:00','','',12000,0,0,'[{\"quantity_a\":\"12000\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"4665\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"paper_cost_sel\":\"kg\",\"inp_paper_cost\":\"80\",\"inp_wastage\":\"1\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"4\",\"dtp_select\":\"Page\",\"inp_dtp\":\"250\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"lami_uv_item\":\"Lami.\",\"lami_uv_rate_per\":\"inch_sq\",\"lami_uv_rate\":\"0.25\",\"lami_uv_pgs\":\"2\",\"spot-uv_sel\":\"Spot UV\",\"spot-uv_inp\":\"1.25\",\"folding_item\":\"Folding\",\"folding_rate_per\":\"1000\",\"folding_rate\":\"350\",\"folding_pgs\":\"4\",\"punch_sel\":\"Punch Die\",\"punch_inp\":\"1200\",\"inp_staple\":\"12.25\",\"inp_hidden_expense\":\"1.75\",\"profit_type\":\"percernt\",\"profit_inp\":\"10\"},{\"sel_paper\":\"\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"1\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"16\",\"inp_dtp\":\"35\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"2\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"disabled\":\"\"}]',0.00,0.00,0.00,0),(18,55,8,'stationery',0,'2022-03-04 08:45:00','','',0,0,0,'[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"3000\",\"print_calculation_every\":\"500\"},{\"paper_desc_amount\":\"3.2\",\"paper_desc_sel\":\"\",\"inp_wastage\":\"1\",\"inp_copies_set\":\"2\",\"inp_sets_book\":\"100\",\"sel_finish_cut_format\":\"1\\/8\",\"margin-adjust js-disabled\":\"x\",\"dtp_select\":\"None\",\"inp_ups_in_plate\":\"2\",\"sel_plate_master\":\"Double\",\"sel_num_colors\":\"1\",\"inp_plate_master_cost_each\":\"40\",\"inp_print_rate\":\"50\",\"inp_binding_type\":\"14\",\"sel_binding_type\":\"Top Cover Paper\",\"inp_numbing\":\"20\",\"inp_hidden_expense\":\"2.5\",\"profit_inp\":\"20\",\"profit_type\":\"percernt\"},{\"paper_desc_amount\":\"2.750\",\"paper_desc_sel\":\"1\",\"disabled\":\"\"}]',0.00,0.00,0.00,0),(19,55,9,'stationery',0,'2022-03-04 11:15:00','','',50,0,0,'[{\"quantity_a\":\"50\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"3000\",\"print_calculation_every\":\"500\"},{\"paper_desc_amount\":\"3.2\",\"paper_desc_sel\":\"\",\"inp_wastage\":\"1\",\"inp_copies_set\":\"2\",\"inp_sets_book\":\"100\",\"inp_finish_size_format\":\"8\",\"margin-adjust\":\"\",\"dtp_select\":\"None\",\"inp_ups_in_plate\":\"2\",\"sel_plate_master\":\"2\",\"sel_num_colors\":\"1\",\"inp_plate_master_cost_each\":\"40\",\"inp_print_rate\":\"50\",\"inp_binding_type\":\"14\",\"sel_binding_type\":\"Top Cover Paper\",\"inp_numbing\":\"20\",\"inp_hidden_expense\":\"2.5\",\"profit_inp\":\"20\",\"profit_type\":\"percernt\"},{\"paper_desc_amount\":\"2.750\",\"paper_desc_sel\":\"1\",\"disabled\":\"\"}]',4927.30,282.90,282.90,0),(20,55,10,'box',0,'2022-03-04 13:50:00','','',42000,0,0,'[{\"quantity_a\":\"42000\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"\",\"print_calculation_every\":\"\"},{\"sel_paper\":\"\",\"width\":\"36\",\"height\":\"46\",\"inp_paper_gsm\":\"300\",\"inp_paper_cost\":\"52\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"5\",\"inp_finish_size_format\":\"8\",\"inp_dtp\":\"2000\",\"dtp_select\":\"Lot\",\"inp_ups_in_plate\":\"4\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"500\",\"inp_min_print_rate\":\"400\",\"inp_balance_qty\":\"250\",\"met_uv_rate\":\"0.3\",\"met_uv_item\":\"Lami.\",\"met_uv_rate_per\":\"inch_sq\",\"coating_rate\":\"0.1\",\"coating_item\":\"UV-Coat\",\"coating_rate_per\":\"inch_sq\",\"blanket_inp\":\"1200\",\"blanket_sel\":\"Amnt\",\"spot-uv_inp\":\"1.25\",\"spot-uv_sel\":\"Spot UV\",\"punch_inp\":\"450\",\"punch_sel\":\"1000\",\"inp_punch_die_cost\":\"2200\",\"inp_sorting\":\"50\",\"inp_hidden_expense\":\"100\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',0.00,0.00,0.00,0),(21,55,11,'box',0,'2022-03-04 15:44:00','','',42000,0,0,'[{\"quantity_a\":\"42000\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"36\",\"height\":\"46\",\"inp_paper_gsm\":\"300\",\"inp_paper_cost\":\"52\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"5\",\"inp_finish_size_format\":\"8\",\"inp_dtp\":\"2000\",\"dtp_select\":\"Lot\",\"inp_ups_in_plate\":\"4\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"500\",\"inp_min_print_rate\":\"400\",\"inp_balance_qty\":\"250\",\"lami_uv_rate\":\"0.3\",\"lami_uv_item\":\"Met-Pet\",\"lami_uv_rate_per\":\"inch_sq\",\"coating_rate\":\"0.1\",\"coating_item\":\"UV-Coat\",\"coating_rate_per\":\"inch_sq\",\"blanket_inp\":\"1200\",\"blanket_sel\":\"Amnt\",\"spot-uv_inp\":\"1.25\",\"spot-uv_sel\":\"Spot UV\",\"punch_inp\":\"450\",\"punch_sel\":\"1000\",\"inp_punch_die_cost\":\"2200\",\"inp_sorting\":\"50\",\"inp_pasting\":\"100\",\"inp_hidden_expense\":\"100\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',225446.70,12320.00,12320.00,0),(22,55,12,'box',0,'2022-03-07 17:21:00','','',42000,0,0,'[{\"quantity_a\":\"42000\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"36\",\"height\":\"46\",\"inp_paper_gsm\":\"300\",\"inp_paper_cost\":\"52\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"5\",\"sel_wastage\":\"Per_cent\",\"inp_finish_size_format\":\"8\",\"inp_dtp\":\"2000\",\"dtp_select\":\"Lot\",\"inp_ups_in_plate\":\"4\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"500\",\"inp_min_print_rate\":\"400\",\"inp_balance_qty\":\"250\",\"lami_uv_rate\":\"0.3\",\"lami_uv_item\":\"Met-Pet\",\"lami_uv_rate_per\":\"inch_sq\",\"coating_rate\":\"0.1\",\"coating_item\":\"UV-Coat\",\"coating_rate_per\":\"inch_sq\",\"blanket_inp\":\"1200\",\"blanket_sel\":\"Amnt\",\"spot-uv_inp\":\"1.25\",\"spot-uv_sel\":\"Spot UV\",\"punch_inp\":\"450\",\"punch_sel\":\"1000\",\"inp_punch_die_cost\":\"2200\",\"inp_sorting\":\"50\",\"inp_pasting\":\"100\",\"inp_hidden_expense\":\"3.5\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',236820.37,9900.00,9900.00,0),(23,2,44,'single_sheet',3529,'2022-03-08 12:56:00','Election Handbills BJP','Posters in 120 GSM Art paper in four color printing in Crown 20\"x 30\" size',10000,20000,20000,'[{\"quantity_a\":\"10000\",\"quantity_b\":\"20000\",\"quantity_c\":\"20000\",\"job_ref\":\"Election Handbills BJP\",\"pdf_desc\":\"Posters in 120 GSM Art paper in four color printing in Crown 20\\\"x 30\\\" size\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"128\",\"width\":\"20\",\"height\":\"30\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"50\",\"sel_wastage\":\"Sheet\",\"inp_finish_size_format\":\"8\",\"sel_print_sides\":\"2\",\"inp_dtp\":\"1500\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"4\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"100\",\"inp_hidden_expense\":\"1\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',13369.26,21182.09,21182.09,0),(24,2,45,'stationery',3529,'2022-03-08 13:24:00','Bill Book in Triplicate 1/4','Bill Books - Triplicate - Each Book Of 50 Sets - Demy 1/8 Size - Two color Printing - Fadak (Pakka) Binding with Numbering',25,40,15,'[{\"quantity_a\":\"25\",\"quantity_b\":\"40\",\"quantity_c\":\"15\",\"job_ref\":\"Bill Book in Triplicate 1\\/4\",\"pdf_desc\":\"Bill Books - Triplicate - Each Book Of 50 Sets - Demy 1\\/8 Size - Two color Printing - Fadak (Pakka) Binding with Numbering\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"500\"},{\"paper_desc_amount\":\"3.25\",\"paper_desc_sel\":\"11\",\"inp_wastage\":\"10\",\"sel_wastage\":\"Sheet\",\"inp_copies_set\":\"2\",\"inp_sets_book\":\"100\",\"inp_finish_size_format\":\"4\",\"inp_dtp\":\"150\",\"dtp_select\":\"Lot\",\"inp_ups_in_plate\":\"1\",\"sel_plate_master\":\"2\",\"sel_num_colors\":\"1\",\"inp_plate_master_cost_each\":\"40\",\"inp_print_rate\":\"80\",\"inp_staple\":\"14 \",\"sel_binding_type\":\"Pad Bound\",\"inp_numbing\":\"20\",\"inp_hidden_expense\":\"2\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"},{\"paper_desc_amount\":\"2.75\",\"paper_desc_sel\":\"13\",\"disabled\":\"\"}]',5308.00,8225.00,3332.00,0),(25,2,46,'multi_sheet',3529,'2022-03-08 15:39:00','Product Catalogue 24 Pages + Title ','Paper: 130 GSM Art Paper 24 Pages – Outer 250 GSM Art Card\nPrinting: F/C  24+4 Pages Title\nCoating: 26 Pages (Inside + 2 Title Inner) UV Coating\nLamination: 2 Outer Title with SPOT UV\nBinding: Loop Stapled ',2500,5000,6500,'[{\"quantity_a\":\"2500\",\"quantity_b\":\"5000\",\"quantity_c\":\"6500\",\"job_ref\":\"Product Catalogue 24 Pages + Title \",\"pdf_desc\":\"Paper: 130 GSM Art Paper 24 Pages \\u2013 Outer 250 GSM Art Card\\nPrinting: F\\/C  24+4 Pages Title\\nCoating: 26 Pages (Inside + 2 Title Inner) UV Coating\\nLamination: 2 Outer Title with SPOT UV\\nBinding: Loop Stapled \",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"paper_sel\":\"3532\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"95\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"3\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"20\",\"inp_dtp\":\"150\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"lami_uv_rate\":\"0.18\",\"lami_uv_pgs\":\"22\",\"lami_uv_item\":\"UV\",\"lami_uv_rate_per\":\"inch_sq\",\"spot-uv_inp js-disabled\":\"x\",\"spot-uv_sel\":\"None\",\"folding_rate\":\"350\",\"folding_pgs\":\"4\",\"folding_item\":\"Punch\'g\",\"folding_rate_per\":\"1000\",\"punch_inp\":\"1200\",\"punch_sel\":\"Punch Die\",\"inp_staple\":\"0.90\",\"inp_hidden_expense\":\"3\",\"profit_inp\":\"15\",\"profit_type\":\"percernt\"},{\"paper_sel\":\"3533\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"300\",\"inp_paper_cost\":\"95\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"3\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"4\",\"inp_dtp\":\"1000\",\"dtp_select\":\"Lot\",\"inp_pages_in_plate_sig\":\"4\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"lami_uv_rate\":\"0.30\",\"lami_uv_pgs\":\"2\",\"lami_uv_item\":\"Lami.\",\"lami_uv_rate_per\":\"inch_sq\",\"spot-uv_inp\":\"1.25\",\"spot-uv_sel\":\"Spot UV\",\"folding_rate\":\"350\",\"folding_pgs\":\"4\",\"folding_item\":\"Punch\'g\",\"folding_rate_per\":\"1000\",\"punch_inp js-disabled\":\"x\",\"punch_sel\":\"None\",\"disabled\":\"\"}]',94061.00,159695.00,202484.00,0),(27,2,48,'box',4376,'2022-03-09 08:03:00','BOX TESTING FOR DINESH','Injection Box in 350 GSM Duplex ~ F/C Printing with Met-Pet Lamination and UV Drip Off.',50000,85000,100000,'[{\"quantity_a\":\"50000\",\"quantity_b\":\"85000\",\"quantity_c\":\"100000\",\"job_ref\":\"BOX TESTING FOR DINESH\",\"pdf_desc\":\"Injection Box in 350 GSM Duplex ~ F\\/C Printing with Met-Pet Lamination and UV Drip Off.\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"129\",\"width\":\"31.5\",\"height\":\"41.5\",\"inp_paper_gsm\":\"350\",\"inp_paper_cost\":\"60\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"0\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"16\",\"inp_dtp\":\"1500\",\"dtp_select\":\"Lot\",\"inp_ups_in_plate\":\"8\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"500\",\"inp_min_print_rate\":\"350\",\"inp_balance_qty\":\"225\",\"lami_uv_rate\":\"0.60\",\"lami_uv_item\":\"Met-Pet\",\"lami_uv_rate_per\":\"inch_sq\",\"coating_rate\":\"0.55\",\"coating_item\":\"UV-Coat\",\"coating_rate_per\":\"inch_sq\",\"blanket_inp\":\"2200\",\"blanket_sel\":\"Amnt\",\"spot-uv_inp\":\"0.50\",\"spot-uv_sel\":\"Spot UV\",\"inp_punch_die_cost\":\"4200\",\"punch_inp\":\"650\",\"punch_sel\":\"1000\",\"inp_sorting\":\"40\",\"inp_pasting\":\"80\",\"inp_hidden_expense\":\"3\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\"}]',173077.00,284691.00,333012.00,0),(28,2,49,'calendar',3529,'2022-03-10 10:53:00','TEST FILE FOR DINESH CALENDAR','Day-Date 12 Sheets\' Wall Calendar. \n17\"x27\" 1/2 (Little < 13.5\"x17\") Size with Back Side PANCHANG Printing. Overprinting of  250 Calendar in 1 Colours.',10000,0,0,'[{\"quantity_a\":\"10000\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"TEST FILE FOR DINESH CALENDAR\",\"pdf_desc\":\"Day-Date 12 Sheets\' Wall Calendar. \\n17\\\"x27\\\" 1\\/2 (Little < 13.5\\\"x17\\\") Size with Back Side PANCHANG Printing. Overprinting of  250 Calendar in 1 Colours.\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"3530\",\"width\":\"17\",\"height\":\"27\",\"inp_paper_gsm\":\"80\",\"inp_paper_cost\":\"70\",\"paper_cost_sel\":\"kg\",\"inp_wastage js-disabled\":\"x\",\"sel_wastage\":\"None\",\"inp_finish_size_format\":\"2\",\"sel_sheets_in_calendar\":\"12\",\"inp_dtp\":\"1500\",\"dtp_select\":\"Lot\",\"sel_num_colors_front\":\"1\",\"inp_months_in_plat\":\"2\",\"sel_num_colors_back\":\"1\",\"inp_plate_cost\":\"350\",\"inp_min_print_rate\":\"250\",\"inp_bal_print_rate\":\"125\",\"inp_tinning\":\"1.15\",\"inp_hidden_expense\":\"2\",\"profit_inp\":\"10\",\"profit_type\":\"percernt\",\"inp_over_print_qty\":\"215\",\"sel_over_print_colors\":\"2\",\"over_print_dtp_val\":\"200\",\"over_print_dtp_select\":\"Lot\"}]',148608.00,1815.00,0.00,0),(29,2,50,'book',4376,'2022-03-15 10:13:00','3 Differrant Prints/Papers For Inside Pages','Book Size 18x23 1/8 Size Little < 5.75\"x9. 160 Pages in CW 70 GSM Paper 1/C & 80 Pages in 2/C Printing, 32 Pgs in Art Paper 4/C Prtg. Title 300 GSM Art Card Outer/Inner 4 Pgs in F/C Prtg & Outer UV Coating. Title with SPOT UV. Perfect Bound..',3500,4000,6500,'[{\"quantity_a\":\"3500\",\"quantity_b\":\"4000\",\"quantity_c\":\"6500\",\"job_ref\":\"3 Differrant Prints\\/Papers For Inside Pages\",\"pdf_desc\":\"Book Size 18x23 1\\/8 Size Little < 5.75\\\"x9. 160 Pages in CW 70 GSM Paper 1\\/C & 80 Pages in 2\\/C Printing, 32 Pgs in Art Paper 4\\/C Prtg. Title 300 GSM Art Card Outer\\/Inner 4 Pgs in F\\/C Prtg & Outer UV Coating. Title with SPOT UV. Perfect Bound..\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"3533\",\"width\":\"25\",\"height\":\"36\",\"inp_paper_gsm\":\"300\",\"paper_cost_sel\":\"kg\",\"inp_paper_cost\":\"1\",\"sel_wastage\":\"Percent\",\"inp_wastage\":\"3\",\"inp_finish_size_format\":\"16\",\"inp_total_pgs\":\"4\",\"dtp_select\":\"Lot\",\"inp_dtp\":\"750\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"2\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"lami_uv_item\":\"UV\",\"lami_uv_rate_per\":\"inch_sq\",\"lami_uv_rate\":\"0.18\",\"lami_uv_pgs\":\"2\",\"spot-uv_sel\":\"Spot UV\",\"spot-uv_inp\":\"1.75\",\"folding_item\":\"Punch\'g\",\"folding_rate_per\":\"1000\",\"folding_rate\":\"350\",\"folding_pgs\":\"8\",\"punch_sel\":\"Punch Die\",\"punch_inp\":\"600\",\"inp_staple\":\"9.61\",\"inp_hidden_expense\":\"2\",\"profit_type\":\"percernt\",\"profit_inp\":\"10\"},{\"book_size\":\"2\",\"book_manual\":\"1.25\",\"book_perfect\":\"4.00\",\"book_case\":\"20.00\",\"bind_total_pgs\":\"272\",\"bind_sheet_sig\":\"16\",\"bind_folding\":\"250\",\"bind_collating\":\"80\",\"bind_stapling\":\"500\",\"bind_sewing\":\"350\"},{\"sel_paper\":\"3530\",\"width\":\"18\",\"height\":\"23\",\"inp_paper_gsm\":\"70\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"2\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"160\",\"inp_dtp\":\"40\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"125\",\"inp_balance_qty\":\"125\",\"disabled\":\"\"},{\"sel_paper\":\"3530\",\"width\":\"18\",\"height\":\"23\",\"inp_paper_gsm\":\"70\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"2\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"80\",\"inp_dtp\":\"40\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"2\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"125\",\"inp_balance_qty\":\"125\",\"disabled\":\"\"},{\"sel_paper\":\"3532\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"2\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"16\",\"inp_total_pgs\":\"32\",\"inp_dtp\":\"100\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"disabled\":\"\"}]',120555.00,127255.00,187006.00,0),(30,2,51,'book',3529,'2022-03-15 12:10:00','3 Differrant Prints/Papers For Inside Pages','Book Size 18x23 1/8 Size Little < 5.75\"x9. 160 Pages in CW 70 GSM Paper 1/C & 80 Pages in 2/C Printing, 32 Pgs in Art Paper 4/C Prtg. Title 300 GSM Art Card Outer/Inner 4 Pgs in F/C Prtg & Outer UV Coating. Title with SPOT UV. Perfect Bound..',1500,5000,6500,'[{\"quantity_a\":\"1500\",\"quantity_b\":\"5000\",\"quantity_c\":\"6500\",\"job_ref\":\"3 Differrant Prints\\/Papers For Inside Pages\",\"pdf_desc\":\"Book Size 18x23 1\\/8 Size Little < 5.75\\\"x9. 160 Pages in CW 70 GSM Paper 1\\/C & 80 Pages in 2\\/C Printing, 32 Pgs in Art Paper 4\\/C Prtg. Title 300 GSM Art Card Outer\\/Inner 4 Pgs in F\\/C Prtg & Outer UV Coating. Title with SPOT UV. Perfect Bound..\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"3533\",\"width\":\"25\",\"height\":\"36\",\"inp_paper_gsm\":\"300\",\"paper_cost_sel\":\"kg\",\"inp_paper_cost\":\"1\",\"sel_wastage\":\"Percent\",\"inp_wastage\":\"3\",\"inp_finish_size_format\":\"16\",\"inp_total_pgs\":\"4\",\"dtp_select\":\"Lot\",\"inp_dtp\":\"750\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"2\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"lami_uv_item\":\"Drip-Off\",\"lami_uv_rate_per\":\"inch_sq\",\"lami_uv_rate\":\"0.50\",\"lami_uv_pgs\":\"2\",\"spot-uv_sel\":\"Spot UV\",\"spot-uv_inp\":\"1.75\",\"folding_item\":\"Punch\'g\",\"folding_rate_per\":\"1000\",\"folding_rate\":\"350\",\"folding_pgs\":\"8\",\"punch_sel\":\"Punch Die\",\"punch_inp\":\"600\",\"inp_staple\":\"9.61\",\"inp_hidden_expense\":\"2\",\"profit_type\":\"percernt\",\"profit_inp\":\"10\"},{\"book_size\":\"2\",\"book_manual\":\"1.25\",\"book_perfect\":\"4.00\",\"book_case\":\"20.00\",\"bind_total_pgs\":\"272\",\"bind_sheet_sig\":\"16\",\"bind_folding\":\"250\",\"bind_collating\":\"80\",\"bind_stapling\":\"500\",\"bind_sewing\":\"350\"},{\"sel_paper\":\"3530\",\"width\":\"18\",\"height\":\"23\",\"inp_paper_gsm\":\"70\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"2\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"160\",\"inp_dtp\":\"40\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"125\",\"inp_balance_qty\":\"125\",\"disabled\":\"\"},{\"sel_paper\":\"3530\",\"width\":\"18\",\"height\":\"23\",\"inp_paper_gsm\":\"70\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"2\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"80\",\"inp_dtp\":\"40\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"2\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"125\",\"inp_balance_qty\":\"125\",\"disabled\":\"\"},{\"sel_paper\":\"3532\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"2\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"16\",\"inp_total_pgs\":\"32\",\"inp_dtp\":\"100\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"disabled\":\"\"}]',76692.00,151256.00,189239.00,0),(31,2,52,'single_sheet',4376,'2022-03-16 17:34:00','Chunav Patrika 1/8 Size F/C','Election Posters in 15\"x 20\" Size, 130 GSM Art Paper - Single Side Four Colour Printing.\n',12000,22000,35000,'[{\"quantity_a\":\"12000\",\"quantity_b\":\"22000\",\"quantity_c\":\"35000\",\"job_ref\":\"Chunav Patrika 1\\/8 Size F\\/C\",\"pdf_desc\":\"Election Posters in 15\\\"x 20\\\" Size, 130 GSM Art Paper - Single Side Four Colour Printing.\\n\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"3532\",\"width\":\"30\",\"height\":\"40\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"80\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"3\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"4\",\"sel_print_sides\":\"1\",\"inp_dtp\":\"500\",\"dtp_select\":\"Lot\",\"inp_pages_in_plate_sig\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"175\",\"inp_min_print_rate\":\"125\",\"inp_balance_qty\":\"100\",\"inp_hidden_expense\":\"2\",\"profit_inp\":\"25\",\"profit_type\":\"percernt\"}]',39499.00,71033.00,112028.00,0),(32,2,53,'stationery',3529,'2022-03-16 18:39:00','Bill Books in Triplicate 1/8','Bill Books - Triplicate - Each Book Of 50 Sets - Demy 1/4 Size - Two color Printing - Fadak (Pakka) Binding with Numbering',40,60,80,'[{\"quantity_a\":\"40\",\"quantity_b\":\"60\",\"quantity_c\":\"80\",\"job_ref\":\"Bill Books in Triplicate 1\\/8\",\"pdf_desc\":\"Bill Books - Triplicate - Each Book Of 50 Sets - Demy 1\\/4 Size - Two color Printing - Fadak (Pakka) Binding with Numbering\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"paper_desc_amount\":\"3.25\",\"paper_desc_sel\":\"11\",\"inp_wastage\":\"10\",\"sel_wastage\":\"Sheet\",\"inp_copies_set\":\"3\",\"inp_sets_book\":\"50\",\"inp_finish_size_format\":\"4\",\"inp_dtp\":\"150\",\"dtp_select\":\"Lot\",\"inp_ups_in_plate\":\"1\",\"sel_plate_master\":\"2\",\"sel_num_colors\":\"2\",\"inp_plate_master_cost_each\":\"60\",\"inp_print_rate\":\"80\",\"inp_staple\":\"20\",\"sel_binding_type\":\"Hard Bound\",\"inp_numbing\":\"20\",\"inp_hidden_expense\":\"2\",\"profit_inp\":\"25\",\"profit_type\":\"percernt\"},{\"paper_desc_amount\":\"1.45\",\"paper_desc_sel\":\"14\",\"disabled\":\"\"},{\"paper_desc_amount\":\"0.95\",\"paper_desc_sel\":\"18\",\"disabled\":\"\"}]',5956.00,8675.00,11191.00,0),(33,2,54,'book',4376,'2022-03-16 20:49:00','Dinesh Book Test Demy 1/8 Size Book','Book Size 18x23 1/8 Size Little < 5.75\"x9. 160 Pages in CW 70 GSM Paper 1/C & 80 Pages in 2/C Printing, 32 Pgs in Art Paper 4/C Prtg. Title 300 GSM Art Card Outer/Inner 4 Pgs in F/C Prtg & Outer UV Coating. Title with SPOT UV. Perfect Bound..',3500,4000,6500,'[{\"quantity_a\":\"3500\",\"quantity_b\":\"4000\",\"quantity_c\":\"6500\",\"job_ref\":\"Dinesh Book Test Demy 1\\/8 Size Book\",\"pdf_desc\":\"Book Size 18x23 1\\/8 Size Little < 5.75\\\"x9. 160 Pages in CW 70 GSM Paper 1\\/C & 80 Pages in 2\\/C Printing, 32 Pgs in Art Paper 4\\/C Prtg. Title 300 GSM Art Card Outer\\/Inner 4 Pgs in F\\/C Prtg & Outer UV Coating. Title with SPOT UV. Perfect Bound..\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"3533\",\"width\":\"25\",\"height\":\"36\",\"inp_paper_gsm\":\"300\",\"paper_cost_sel\":\"kg\",\"inp_paper_cost\":\"1\",\"sel_wastage\":\"Percent\",\"inp_wastage\":\"0\",\"inp_finish_size_format\":\"16\",\"inp_total_pgs\":\"4\",\"dtp_select\":\"Lot\",\"inp_dtp\":\"750\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"2\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"lami_uv_item\":\"Lami.\",\"lami_uv_rate_per\":\"inch_sq\",\"lami_uv_rate\":\"0.23\",\"lami_uv_pgs\":\"2\",\"spot-uv_sel\":\"Spot UV\",\"spot-uv_inp\":\"1.75\",\"folding_item\":\"Punch\'g\",\"folding_rate_per\":\"1000\",\"folding_rate\":\"350\",\"folding_pgs\":\"8\",\"punch_sel\":\"Punch Die\",\"punch_inp\":\"600\",\"inp_staple\":\"9.61\",\"inp_hidden_expense\":\"2\",\"profit_type\":\"percernt\",\"profit_inp\":\"10\"},{\"book_size\":\"2\",\"book_manual\":\"1.25\",\"book_perfect\":\"4.00\",\"book_case\":\"20.00\",\"bind_total_pgs\":\"272\",\"bind_sheet_sig\":\"16\",\"bind_folding\":\"250\",\"bind_collating\":\"80\",\"bind_stapling\":\"500\",\"bind_sewing\":\"350\"},{\"sel_paper\":\"3530\",\"width\":\"18\",\"height\":\"23\",\"inp_paper_gsm\":\"70\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"0\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"160\",\"inp_dtp\":\"40\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"1\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"100\",\"inp_balance_qty\":\"100\",\"disabled\":\"\"},{\"sel_paper\":\"3530\",\"width\":\"18\",\"height\":\"23\",\"inp_paper_gsm\":\"70\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"0\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"8\",\"inp_total_pgs\":\"80\",\"inp_dtp\":\"40\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"2\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"100\",\"inp_balance_qty\":\"100\",\"disabled\":\"\"},{\"sel_paper\":\"3532\",\"width\":\"23\",\"height\":\"36\",\"inp_paper_gsm\":\"130\",\"inp_paper_cost\":\"1\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"0\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"16\",\"inp_total_pgs\":\"32\",\"inp_dtp\":\"100\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"8\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"4\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"disabled\":\"\"}]',116258.00,122984.00,179507.00,0);
/*!40000 ALTER TABLE `quotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_nb4h0p6txrmfc0xbrd1kglp9t` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_USER'),(2,'ROLE_PM'),(3,'ROLE_ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen_defaults`
--

DROP TABLE IF EXISTS `screen_defaults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `screen_defaults` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `module` set('stationery','single_sheet','multi_sheet','book','calendar','box','binding') NOT NULL,
  `inputs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen_defaults`
--

LOCK TABLES `screen_defaults` WRITE;
/*!40000 ALTER TABLE `screen_defaults` DISABLE KEYS */;
INSERT INTO `screen_defaults` VALUES (1,55,'single_sheet','[{\"quantity_a\":\"10\",\"quantity_b\":\"20\",\"quantity_c\":\"20\",\"job_ref\":\"test\",\"pdf_desc\":\"thdt\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"80\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"sel_print_sides\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]'),(2,55,'stationery','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"3000\",\"print_calculation_every\":\"500\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"inp_wastage\":\"80\",\"inp_copies_set\":\"\",\"inp_sets_book\":\"\",\"sel_finish_cut_format\":\"\",\"margin-adjust\":\"\",\"dtp_select\":\"\",\"inp_ups_in_plate\":\"\",\"sel_plate_master\":\"\",\"sel_num_colors\":\"\",\"inp_plate_master_cost_each\":\"\",\"inp_print_rate\":\"\",\"inp_binding_type\":\"\",\"sel_binding_type\":\"\",\"inp_numbing\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"},{\"paper_desc_amount\":\"1.250\",\"paper_desc_sel\":\"1\",\"disabled\":\"\"}]'),(3,55,'multi_sheet','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"},{\"paper_sel\":\"4666\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"80\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_total_pgs\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"},{\"paper_sel\":\"4665\",\"width\":\"\",\"height\":\"11\",\"inp_paper_gsm\":\"20\",\"inp_paper_cost\":\"0\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"10\",\"inp_finish_size_format\":\"10\",\"inp_total_pgs\":\"10\",\"inp_dtp\":\"10\",\"dtp_select\":\"None\",\"inp_pages_in_plate_sig\":\"10\",\"inp_ups_in_plate\":\"10\",\"sel_num_colors\":\"0\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"disabled\":\"\"},{\"paper_sel\":\"\",\"width\":\"\",\"height\":\"11\",\"inp_paper_gsm\":\"20\",\"inp_paper_cost\":\"5\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"5\",\"inp_finish_size_format\":\"5\",\"inp_total_pgs\":\"5\",\"inp_dtp\":\"5\",\"dtp_select\":\"Page\",\"inp_pages_in_plate_sig\":\"5\",\"inp_ups_in_plate\":\"5\",\"sel_num_colors\":\"2\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"disabled\":\"\"}]'),(4,55,'calendar','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"}]'),(5,55,'book','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"},{\"sel_paper\":\"4665\",\"width\":\"10\",\"height\":\"20\",\"inp_paper_gsm\":\"80\",\"paper_cost_sel\":\"\",\"inp_paper_cost\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"2\",\"inp_total_pgs\":\"\",\"dtp_select\":\"\",\"margin-adjust\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"lami_uv_item\":\"Lami.\",\"lami_uv_rate_per\":\"inch_sq\",\"lami_uv_rate\":\"10\",\"lami_uv_pgs\":\"20\",\"spot-uv_sel\":\"\",\"spot-uv_inp\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"punch_sel\":\"\",\"punch_inp\":\"\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"\",\"profit_type\":\"\",\"profit_inp\":\"\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"11\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_total_pgs\":\"\",\"margin-adjust\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"disabled\":\"\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"11\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_total_pgs\":\"\",\"margin-adjust\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"disabled\":\"\"}]'),(6,55,'box','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"}]'),(7,18,'stationery','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"inp_wastage\":\"\",\"inp_copies_set\":\"\",\"inp_sets_book\":\"\",\"sel_finish_cut_format\":\"\",\"margin-adjust\":\"\",\"dtp_select\":\"\",\"inp_ups_in_plate\":\"\",\"sel_plate_master\":\"\",\"sel_num_colors\":\"\",\"inp_plate_master_cost_each\":\"\",\"inp_print_rate\":\"\",\"inp_binding_type\":\"\",\"sel_binding_type\":\"\",\"inp_numbing\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"},{\"paper_desc_amount\":\"50\",\"paper_desc_sel\":\"\",\"disabled\":\"\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"disabled\":\"\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"disabled\":\"\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"disabled\":\"\"}]'),(8,18,'multi_sheet','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"},{\"paper_sel\":\"3015\",\"width\":\"10\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_total_pgs\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"},{\"paper_sel\":\"3341\",\"width\":\"\",\"height\":\"\",\"undefined\":\"\",\"paper_cost_sel\":\"kg\",\"dtp_select\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"disabled\":\"\"},{\"paper_sel\":\"\",\"width\":\"\",\"height\":\"\",\"undefined\":\"\",\"paper_cost_sel\":\"\",\"dtp_select\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"disabled\":\"\"},{\"paper_sel\":\"\",\"width\":\"\",\"height\":\"\",\"undefined\":\"\",\"paper_cost_sel\":\"\",\"dtp_select\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"disabled\":\"\"}]'),(9,18,'book','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"},{\"sel_paper\":\"3341\",\"width\":\"20\",\"height\":\"10\",\"inp_paper_gsm\":\"10\",\"inp_paper_cost\":\"10\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"10\",\"inp_finish_size_format\":\"10\",\"inp_total_pgs\":\"10\",\"margin-adjust\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"disabled\":\"\"},{\"undefined\":\"\",\"width\":\"30\",\"height\":\"\",\"paper_cost_sel\":\"\",\"margin-adjust\":\"\",\"dtp_select\":\"\",\"disabled\":\"\"},{\"undefined\":\"\",\"width\":\"\",\"height\":\"\",\"paper_cost_sel\":\"kg\",\"margin-adjust\":\"\",\"dtp_select\":\"\",\"disabled\":\"\"},{\"undefined\":\"\",\"width\":\"30\",\"height\":\"\",\"paper_cost_sel\":\"\",\"margin-adjust\":\"\",\"dtp_select\":\"None\",\"disabled\":\"\"},{\"undefined\":\"\",\"width\":\"30\",\"height\":\"20\",\"paper_cost_sel\":\"kg\",\"margin-adjust\":\"10\",\"dtp_select\":\"Page\",\"disabled\":\"\"}]'),(10,18,'single_sheet','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"\",\"print_calculation_every\":\"\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"80\",\"inp_paper_gsm\":\"20\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"sel_print_sides\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]'),(11,18,'calendar','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"},{\"sel_paper\":\"3341\",\"width\":\"50\",\"height\":\"10\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"sel_sheets_in_calendar\":\"2\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"sel_num_colors_front\":\"\",\"inp_months_in_plat\":\"\",\"sel_num_colors_back\":\"\",\"inp_plate_cost_per_plate\":\"\",\"inp_min_print_rate\":\"\",\"inp_bal_print_rate\":\"\",\"inp_tinning\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\",\"inp_over_print_qty\":\"\",\"sel_over_print_colors\":\"\",\"over_print_dtp_val\":\"\",\"over_print_dtp_select\":\"\"}]'),(12,18,'box','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\"},{\"sel_paper\":\"1777\",\"width\":\"10\",\"height\":\"20\",\"inp_paper_gsm\":\"80\",\"inp_paper_cost\":\"10\",\"paper_cost_sel\":\"kg\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"met_uv_rate\":\"\",\"met_uv_item\":\"\",\"met_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]'),(13,30,'single_sheet','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"sel_print_sides\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]'),(14,30,'box','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"met_uv_rate\":\"\",\"met_uv_item\":\"\",\"met_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]'),(15,30,'multi_sheet','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"paper_sel\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_total_pgs\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"spot-uv_inp\":\"\",\"spot-uv_sel\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\"}]'),(16,2,'single_sheet','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"sel_wastage\":\"\",\"inp_finish_size_format\":\"\",\"sel_print_sides\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"175\",\"inp_min_print_rate\":\"125\",\"inp_balance_qty\":\"100\",\"inp_hidden_expense\":\"2\",\"profit_inp\":\"25\",\"profit_type\":\"percernt\"}]'),(17,2,'calendar','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"sel_wastage\":\"\",\"inp_finish_size_format\":\"\",\"sel_sheets_in_calendar\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"sel_num_colors_front\":\"\",\"inp_months_in_plat\":\"\",\"sel_num_colors_back\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_bal_print_rate\":\"\",\"inp_tinning\":\"\",\"inp_hidden_expense\":\"\",\"profit_inp\":\"\",\"profit_type\":\"\",\"inp_over_print_qty\":\"\",\"sel_over_print_colors\":\"\",\"over_print_dtp_val\":\"\",\"over_print_dtp_select\":\"\"}]'),(18,2,'book','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"paper_cost_sel\":\"\",\"inp_paper_cost\":\"\",\"sel_wastage\":\"\",\"inp_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_total_pgs\":\"4\",\"dtp_select\":\"\",\"inp_dtp\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"lami_uv_rate\":\"\",\"lami_uv_pgs\":\"\",\"spot-uv_sel\":\"\",\"spot-uv_inp\":\"\",\"folding_item\":\"\",\"folding_rate_per\":\"\",\"folding_rate\":\"\",\"folding_pgs\":\"\",\"punch_sel\":\"\",\"punch_inp\":\"\",\"inp_staple\":\"\",\"inp_hidden_expense\":\"\",\"profit_type\":\"\",\"profit_inp\":\"\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"\",\"sel_wastage\":\"\",\"inp_finish_size_format\":\"\",\"inp_total_pgs\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_pages_in_plate_sig\":\"\",\"inp_ups_in_plate\":\"1\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"\",\"inp_min_print_rate\":\"\",\"inp_balance_qty\":\"\",\"disabled\":\"\"}]'),(19,55,'binding','{\"book_size\":\"\",\"book_manual\":\"\",\"book_perfect\":\"\",\"book_case\":\"\",\"bind_total_pgs\":\"0\",\"bind_sheet_sig\":\"100\",\"bind_folding\":\"\",\"bind_collating\":\"\",\"bind_stapling\":\"\",\"bind_sewing\":\"\"}'),(20,2,'binding','{\"book_size\":\"\",\"book_manual\":\"\",\"book_perfect\":\"\",\"book_case\":\"\",\"bind_total_pgs\":\"0\",\"bind_sheet_sig\":\"\",\"bind_folding\":\"250\",\"bind_collating\":\"80\",\"bind_stapling\":\"500\",\"bind_sewing\":\"350\"}'),(21,2,'box','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"sel_paper\":\"\",\"width\":\"\",\"height\":\"\",\"inp_paper_gsm\":\"\",\"inp_paper_cost\":\"\",\"paper_cost_sel\":\"\",\"inp_wastage\":\"3\",\"sel_wastage\":\"Percent\",\"inp_finish_size_format\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_ups_in_plate\":\"\",\"sel_num_colors\":\"\",\"inp_plate_cost\":\"300\",\"inp_min_print_rate\":\"250\",\"inp_balance_qty\":\"150\",\"lami_uv_rate\":\"\",\"lami_uv_item\":\"\",\"lami_uv_rate_per\":\"\",\"coating_rate\":\"\",\"coating_item\":\"\",\"coating_rate_per\":\"\",\"blanket_inp\":\"\",\"blanket_sel\":\"\",\"spot-uv_inp js-disabled\":\"\",\"spot-uv_sel\":\"\",\"inp_punch_die_cost\":\"\",\"punch_inp\":\"\",\"punch_sel\":\"\",\"inp_sorting\":\"\",\"inp_pasting\":\"\",\"inp_hidden_expense\":\"3\",\"profit_inp\":\"15\",\"profit_type\":\"percernt\"}]'),(22,2,'stationery','[{\"quantity_a\":\"\",\"quantity_b\":\"\",\"quantity_c\":\"\",\"job_ref\":\"\",\"pdf_desc\":\"\",\"min_print_charges\":\"1000\",\"print_calculation_every\":\"1000\"},{\"paper_desc_amount\":\"\",\"paper_desc_sel\":\"\",\"inp_wastage js-disabled\":\"\",\"sel_wastage\":\"\",\"inp_copies_set\":\"\",\"inp_sets_book\":\"\",\"inp_finish_size_format\":\"\",\"inp_dtp\":\"\",\"dtp_select\":\"\",\"inp_ups_in_plate\":\"\",\"sel_plate_master\":\"\",\"sel_num_colors\":\"\",\"inp_plate_master_cost_each\":\"60\",\"inp_print_rate\":\"80\",\"inp_staple\":\"\",\"sel_binding_type\":\"\",\"inp_numbing\":\"20\",\"inp_hidden_expense\":\"2\",\"profit_inp\":\"25\",\"profit_type\":\"percernt\"}]');
/*!40000 ALTER TABLE `screen_defaults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stationery_paper_library`
--

DROP TABLE IF EXISTS `stationery_paper_library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stationery_paper_library` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `paper_description` varchar(255) NOT NULL,
  `paper_cost` decimal(10,2) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stationery_paper_library`
--

LOCK TABLES `stationery_paper_library` WRITE;
/*!40000 ALTER TABLE `stationery_paper_library` DISABLE KEYS */;
INSERT INTO `stationery_paper_library` VALUES (1,'tent',1.25,55),(2,'test',100.00,18),(3,'Executive Bond 80 GSM ',2.35,30),(4,'Colour Imported 70 GSM',2.75,30),(5,'Colour Regular ',1.15,30),(6,'White Maplitho 70 GSM ',1.35,30),(7,'White Duplicate Thin ',0.92,30),(8,'White Cream Wove 58 GSM 6.9 Kg ',1.12,30),(9,'Creamwove Sirpur 7.7 Kg ',1.23,30),(10,'White Rough Dark',0.72,30),(11,'Sunlit Bond',2.15,2),(12,'White Sirpur Creamwove',1.60,2),(13,'Super White Sunshine',1.95,2),(14,'Sirpur Colour Pink',1.45,2),(15,'White Duplicate',1.25,2),(16,'Sirpur Colour Blue',1.45,2),(17,'Sirpur Colour Green',1.45,2),(18,'White Rough Gujarat Mill',0.95,2);
/*!40000 ALTER TABLE `stationery_paper_library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permissions`
--

DROP TABLE IF EXISTS `user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permissions` (
  `id` bigint(20) NOT NULL,
  `pid` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permissions`
--

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (0,1),(2,3),(3,1),(10,1),(11,1),(13,1),(18,1),(27,1),(28,1),(30,1),(31,1),(37,1),(38,1),(39,1),(40,1),(41,1),(55,3),(57,1),(58,1),(59,1),(60,1),(61,1),(62,1),(63,1),(64,1),(65,1),(66,1),(67,1),(68,1),(69,1),(70,1),(71,1),(72,1),(73,1),(74,1),(75,1),(76,1),(77,1),(78,1),(79,1),(80,1),(81,1),(82,1),(83,1),(85,1);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_date` datetime DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `quote_number_counter` int(11) NOT NULL DEFAULT 0,
  `account_status` varchar(255) DEFAULT NULL,
  `promo_code_status` varchar(255) DEFAULT NULL,
  `max_sessions` int(11) NOT NULL DEFAULT 1,
  `enc_pass` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `address1` text NOT NULL,
  `address2` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `signup_ip` varchar(255) NOT NULL,
  `preferences` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=86 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,2,'2020-07-19 10:55:23','admin@gmail.com','admin','admin','9510201024',NULL,54,'confirmed',NULL,0,'$2y$10$h5IIUQwIFtnSNFJnJ9LTHuItZutjffpNBl0fl6gDoufD9YLN8iLiq','','','','','','{\"cost_summary_show\":\"show\",\"paper_size_units\":\"inches\",\"popup_language\":\"english\",\"minimums\":{\"lamination_100\":\"0.25\",\"lamination_min\":\"300\",\"folding_1000\":\"225\",\"folding_min\":\"500\",\"embossing_each\":\"0.75\",\"embossing_min\":\"500\",\"drip_off_100\":\"0.60\",\"drip_off_min\":\"1000\",\"creasing_1000\":\"350\",\"creasing_min\":\"300\",\"spot_each\":\"1.25\",\"spot_min\":\"1000\",\"aqeous_100\":\"0.13\",\"aqeous_min\":\"300\",\"scoring_1000\":\"120\",\"scoring_min\":\"300\",\"foil_each\":\"1.25\",\"foil_min\":\"1000\",\"uv_flood_100\":\"0.30\",\"uv_flood_min\":\"300\",\"varnish_100\":\"0.12\",\"varnish_min\":\"300\",\"met_100\":\"0.75\",\"met_min\":\"1500\",\"blister_100\":\"0.85\",\"blister_min\":\"2000\"}}'),(3,0,'2020-07-19 11:01:51','bhavik@gmail.com','BHAVIK','bhavik','9376325326',NULL,363,'',NULL,0,'','','','','','',NULL),(71,1,'2021-06-18 07:40:18','sumantandukar26@gmail.com','Suman','sumantandukar26@gmail.com','977','Tandukar',0,'confirmed',NULL,1,'$2y$10$Y9ciclO3ByFQ23Rt9trvD.8wN5rjD9Bwznse6TJC/ENilb3x126bm','Gauri Shankar Offset Press','','','Kathmandu','45.123.222.218',NULL),(10,2,'2020-08-02 09:15:37','anil.h.desai@gmail.com','Anil',NULL,'9974087411','Desai',19,'confirmed',NULL,0,'$2y$10$7jZ7FVXjJ85wYccT7i3L/uC2CvlmqidDdzyUzUrWHPqOiIR6ePr2m','','','','','',NULL),(11,1,'2020-08-03 06:14:10','shreejiprintersbrd@gmail.com','Mehul',NULL,'9825040527','Gandhi',0,'confirmed',NULL,0,'','','','','','',NULL),(18,1,'2020-09-21 09:10:44','gayatrioffset.in@gmail.com','Gopal',NULL,'8401890170','Patel',161,'confirmed',NULL,0,'','','AG-49, RBG Complex,','Bahucharaji Road, Karelibag,','Vadodara-390018','',NULL),(79,1,'2021-07-04 12:50:36','chaitanyakpr@gmail.com','Chaitanya','chaitanyakpr@gmail.com','8527414414','Kapoor',0,'confirmed',NULL,1,'$2y$10$49FqxG1RDoSWYTmQsUGvVuiZFvEy0xz8Fekmagt.f3rTp7cYBnA/K','Kapco','Indl Area','','Delhi','171.78.234.71',NULL),(30,1,'2020-11-20 10:41:39','alpsj@jesuits.net','Anand ',NULL,'9428076572','Press',152,'confirmed',NULL,0,'','','','','','',NULL),(61,1,'2021-06-08 21:48:19','chandkaleshwar@gmail.com','Kaleshwar','chandkaleshwar@gmail.com','6799338803','Chand',0,'confirmed',NULL,1,'$2y$10$/a1LIV3ENeJg6IanGhsDBeaBK3JN.JCNW3blI95kJ6F.0vGF.RvTi','Cyber Pacific','1','2','2','27.123.136.224',NULL),(39,0,'2021-04-14 13:33:58','adarshoffset1988@gmail.com','Manudev',NULL,'7417148331','Varma',1,'confirmed',NULL,0,'','','','','','',NULL),(70,1,'2021-06-17 16:52:55','swarbhanu5@gmail.com','Swarbhanu','swarbhanu5@gmail.com','9864010336','Ghatak',1,'confirmed',NULL,1,'$2y$10$y9Yr8lgHgwjR4i51ankkh.GbwjqseobZwWLSbdfX740y4wiPslXfC','','Hotel Broad View, MLN Road','Panbazar','Guwahati','49.37.38.216',NULL),(58,1,'2021-06-08 11:46:39','support@cyberpacificfj.com','Kaleshwar','support@cyberpacificfj.com','6798454803','Chand',0,'confirmed',NULL,1,'$2y$10$spfZDtBGzZs6S7fWO137MeA01QdXWbPjx61jCJYz.FQkPUt0FjWSK','Cyber Pacific','1','2','2','27.123.136.224',NULL),(72,1,'2021-06-19 04:45:13','sunmarkprinters@gmail.com','Arun Chandar','sunmarkprinters@gmail.com','9790679644','Chandar',0,'confirmed',NULL,1,'$2y$10$9MHtP73X0ZwnwNsHzXfrwe0fNnMmIALkSKPXF42BxdDbXVfBn9Dly','SunMark','22, east pattamar lane','','Madurai','223.178.96.214',NULL),(55,2,'2021-06-04 12:28:41','chandkaleshwar21@gmail.com','Kaleshwar','chandkaleshwar21@gmail.com','6798792954','Chand',12,'confirmed',NULL,1,'$2y$10$WDHOXsufeGhGKHYcEpcQGOyugxzoC6IZTCkL.2HRC9803b0Q0aqcq','Cyber Pacific','1','2','2','27.123.137.216',NULL),(73,1,'2021-06-19 11:44:40','printshopnagar@gmail.com','Kiran','printshopnagar@gmail.com','9923399388','Lakhara',1,'confirmed',NULL,1,'$2y$10$c5hQJFvQPUkJZ5f9EFT69O./DFEq2dVUDl/vhWRJi0EynvxjDhSUe','Printshop','H.No.7543','Behind Old District Court','Ahmednagar','122.169.24.108',NULL),(75,1,'2021-06-20 13:53:37','kuppunagarajan@gmail.com','Kuppu','kuppunagarajan@gmail.com','9944471800','NAGARAJAN',0,'confirmed',NULL,1,'$2y$10$btlLhXxLViJu4LLeZVWFwu0DDVCyshxD9yTX9NO0QYg.7yEKGeU8e','MOTHYS PRINTOGRAPH','No.5 Prasanna Colony 6 th Street, Avaniyapuram,','','Madurai','49.205.80.74',NULL),(76,1,'2021-06-20 16:43:18','msuhail239@gmail.com','Muhammad ','msuhail239@gmail.com','923008666239','suhail',0,'confirmed',NULL,1,'$2y$10$FoS6cyLXP9M8obHLJGAkR.EgnOMDyEbblBKRZNlkKNewhjaetT14a','Colour club printer ','Madni street no 1 Abdullahpur','','FAISALABAD','101.50.69.188',NULL),(77,1,'2021-06-21 10:54:47','chamadproduct@gmail.com','Vivek','chamadproduct@gmail.com','7597694496','Agrawal',0,'confirmed',NULL,1,'$2y$10$VnUL3Tc4/JuhBYVEJ7SnLeWBYA7u.jd4uYx4yEtYKiqziNd5YKNi2','Chamad prints','','','Bharatpur','106.198.226.207',NULL),(83,1,'2021-09-09 08:28:41','aqibdae@gmail.com','Muhammad','aqibdae@gmail.com','3450915556','Aqib',0,'confirmed',NULL,1,'$2y$10$crh8fuGWNZkDvBZOUTLXOORg7SlWcU2xjNIk4Xv56fqA6uJi2ybO2','printopress','','','','203.215.160.164',NULL),(84,1,NULL,'test@example.com','test','test@example.com','8792954',NULL,0,'confirmed',NULL,1,'','','','','','',NULL),(85,0,'2022-03-23 17:10:01','test2@example.com','test','test2@example.com','8792955','test',0,'pending',NULL,1,'0','test','test','test','test','210.7.29.204',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-24 12:38:03
