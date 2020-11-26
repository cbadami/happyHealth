-- database creation
DROP DATABASE IF EXISTS happyhealth;
CREATE DATABASE happyhealth;
USE happyhealth;


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `UserId` int NOT NULL,
  `Username` varchar(12) DEFAULT NULL,
  `Password` varchar(25) DEFAULT NULL,
  `Admin` varchar(5) DEFAULT NULL,
  `Email` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;

INSERT INTO `user` VALUES (1,'James234','Bond12345','No','james234@gmail.com'),(2,'William','William123','Yes','William123@gmail.com'),(3,'John234','John234','No','John234@gmail.com'),(4,'Robert123','Robert123','No','Robert123@gmail.com'),(5,'Michael','Micky','No','Micky@gmail.com'),(6,'David','Davidbhai','No','Davidbhai@gmail.com'),(7,'Richard','Richard456','No','Richard456@gmail.com'),(8,'Joseph','Joseph123','No','Joseph123@gmail.com'),(9,'Thomas','Thomasedison','No','Thomasedison@gmail.com'),(10,'amanda','amanda12345','No','amandabynes@gmail.com');

UNLOCK TABLES;


--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;

CREATE TABLE `profile` (
  `UserId` int NOT NULL,
  `Username` varchar(12) DEFAULT NULL,
  `FullName` varchar(25) DEFAULT NULL,
  `Gender` varchar(12) DEFAULT NULL,
  `DateOfBirth` varchar(12) DEFAULT NULL,
  `Age` int NOT NULL,
  `Email` varchar(25) DEFAULT NULL,
  `CurrentWeight` int NOT NULL,
  `DesriredWeight` int NOT NULL,
  `Height` int NOT NULL,
  `averageActivityLevel` varchar(25) DEFAULT NULL,
  `Country` varchar(25) DEFAULT NULL,
  `State` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `Age_index` (`Age`),
  KEY `CurrentWeight_index` (`CurrentWeight`),
  KEY `DesriredWeight_index` (`DesriredWeight`),
  KEY `Height_index` (`Height`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;

INSERT INTO `profile` VALUES (1,'James234','James Bond','Male','10/04/1993',29,'james234@gmail.com',136,134,66,'Sedentary','United States','Missouri'),(2,'William','William Shakespeare','Male','11/24/1994',26,'William123@gmail.com',112,110,68,'Lightly Active','India','Telangan'),(3,'John234','John Daniel','Male','9/4/1995',31,'John234@gmail.com',125,128,61,'Moderatley Active','Canada','Alberta'),(4,'Robert123','Robert Cart','Male','10/04/1996',27,'Robert123@gmail.com',134,138,66,'Very Active','United States','Arizona'),(5,'Michael','Michael Jackson','Male','01/12/1997',25,'Micky@gmail.com',102,108,67,'Sedentary','India','Andhra Pradesh'),(6,'David','David Warner','Male','12/6/1991',34,'Davidbhai@gmail.com',142,131,62,'Lightly Active','Canada','Manitoba'),(7,'Richard','Richard Hoot','Male','11/04/1999',28,'Richard456@gmail.com',123,129,63,'Moderatley Active','United States','Kansas'),(8,'Joseph','Joseph Thompson','Male','08/23/1995',29,'Joseph123@gmail.com',101,93,67,'Very Active','India','Maharastra'),(9,'Thomas','Thomas Edison','Male','10/12/1986',25,'Thomasedison@gmail.com',131,121,64,'Sedentary','Canada','Nova Scotia'),(10,'amanda','bynes','Female','11/11/1993',28,'amandabynes@gmail.com',100,120,60,'Sedentary','United States','Texas');

UNLOCK TABLES;



--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;

CREATE TABLE `group` (
  `GroupId` int NOT NULL,
  `GroupName` varchar(25) DEFAULT NULL,
  `Creator` varchar(25) DEFAULT NULL,
  `CreatedDate` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`GroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;

INSERT INTO `group` VALUES (1001,'Avengers','William','10/20/2020'),(1002,'Champions','William','11/22/2020'),(1003,'Crew','William','10/23/2020'),(1004,'Bosses','William','10/24/2020'),(1005,'Force','William','9/20/2020'),(1006,'Hustle','William','6/04/2020'),(1007,'Icons','William','10/20/2020'),(1008,'Legends','William','10/28/2020'),(1009,'Masters','William','10/30/2020');

UNLOCK TABLES;



--
-- Table structure for table `groupmember`
--

DROP TABLE IF EXISTS `groupmember`;

CREATE TABLE `groupmember` (
  `UserId` int NOT NULL,
  `Username` varchar(25) DEFAULT NULL,
  `JoinedDate` varchar(12) DEFAULT NULL,
  `GroupId` int NOT NULL,
  PRIMARY KEY (`UserId`),
  KEY `GroupId_index` (`GroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `groupmember`
--

LOCK TABLES `groupmember` WRITE;

INSERT INTO `groupmember` VALUES (1,'James234','11/24/2020',1004),(2,'William','10/24/2020',1004),(3,'John234','10/24/2022',1003),(4,'Robert123','09/24/2023',1003),(5,'Michael','11/24/2024',1001),(6,'David','11/24/2025',1001),(7,'Richard','11/24/2026',1006),(8,'Joseph','11/24/2027',1006),(9,'Thomas','11/24/2028',1002);

UNLOCK TABLES;


--
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;

CREATE TABLE `challenge` (
  `ChallengeId` int NOT NULL,
  `ChallengeName` varchar(25) DEFAULT NULL,
  `Creator` varchar(12) DEFAULT NULL,
  `CreatedDate` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`ChallengeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;

INSERT INTO `challenge` VALUES (2001,'Steps','William','9/21/2020'),(2002,'Calorie','William','9/21/2020'),(2003,'Weight','Christopher','9/21/2020'),(2004,'Diet','William','9/21/2020'),(2005,'Protein','Christopher','9/21/2020'),(2006,'Hydration','William','9/21/2020');

UNLOCK TABLES;


--
-- Table structure for table `stepcount`
--

DROP TABLE IF EXISTS `stepcount`;

CREATE TABLE `stepcount` (
  `UserId` int NOT NULL,
  `StepCount` int NOT NULL,
  `Goal` int NOT NULL,
  `Date` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `StepCount_index` (`StepCount`),
  KEY `Goal_index` (`Goal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `stepcount`
--

LOCK TABLES `stepcount` WRITE;

INSERT INTO `stepcount` VALUES (1,1100,2000,'11/07/2020'),(2,1200,2000,'11/07/2020'),(3,1300,2000,'11/07/2020'),(4,1400,2000,'11/07/2020'),(5,1500,2000,'11/07/2020'),(6,1600,2000,'11/07/2020'),(7,1700,2000,'11/07/2020'),(8,1800,2000,'11/07/2020'),(9,1900,2000,'11/07/2020');

UNLOCK TABLES;


--
-- Table structure for table `sleepcount`
--

DROP TABLE IF EXISTS `sleepcount`;
CREATE TABLE `sleepcount` (
  `UserId` int NOT NULL,
  `SleepCount` int NOT NULL,
  `Goal` int NOT NULL,
  `Date` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `SleepCount_index` (`SleepCount`),
  KEY `Goal_index` (`Goal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Dumping data for table `sleepcount`
--

LOCK TABLES `sleepcount` WRITE;

INSERT INTO `sleepcount` VALUES (1,5,8,'11/07/2020'),(2,6,8,'11/07/2020'),(3,7,8,'11/07/2020'),(4,8,8,'11/07/2020'),(5,9,8,'11/07/2020'),(6,10,8,'11/07/2020'),(7,11,8,'11/07/2020'),(8,12,8,'11/07/2020'),(9,13,8,'11/07/2020');

UNLOCK TABLES;

--
-- Table structure for table `trackmecount`
--

DROP TABLE IF EXISTS `trackmecount`;
CREATE TABLE `trackmecount` (
  `UserId` int NOT NULL,
  `TrackTime` int NOT NULL,
  `Goal` int NOT NULL,
  `Date` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `TrackTime_index` (`TrackTime`),
  KEY `Goal_index` (`Goal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `trackmecount`
--

LOCK TABLES `trackmecount` WRITE;
INSERT INTO `trackmecount` VALUES (1,6,10,'11/07/2020'),(2,7,10,'11/07/2020'),(3,8,10,'11/07/2020'),(4,9,10,'11/07/2020'),(5,10,10,'11/07/2020'),(6,3,10,'11/07/2020'),(7,4,10,'11/07/2020'),(8,5,10,'11/07/2020'),(9,6,10,'11/07/2020');
UNLOCK TABLES;

--
-- Table structure for table `watercount`
--

DROP TABLE IF EXISTS `watercount`;
CREATE TABLE `watercount` (
  `UserId` int NOT NULL,
  `GlassCount` int NOT NULL,
  `Goal` int NOT NULL,
  `Date` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `GlassCount_index` (`GlassCount`),
  KEY `Goal_index` (`Goal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `watercount`
--

LOCK TABLES `watercount` WRITE;
INSERT INTO `watercount` VALUES (1,1,8,'11/07/2020'),(2,2,8,'11/07/2020'),(3,3,8,'11/07/2020'),(4,4,8,'11/07/2020'),(5,5,8,'11/07/2020'),(6,6,8,'11/07/2020'),(7,7,8,'11/07/2020'),(8,8,8,'11/07/2020'),(9,9,8,'11/07/2020');
UNLOCK TABLES;

--
-- Table structure for table `fruitscount`
--

DROP TABLE IF EXISTS `fruitscount`;
CREATE TABLE `fruitscount` (
  `UserId` int NOT NULL,
  `NoOfFruits` int NOT NULL,
  `Goal` int NOT NULL,
  `Date` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `NoOfFruits_index` (`NoOfFruits`),
  KEY `Goal_index` (`Goal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fruitscount`
--

LOCK TABLES `fruitscount` WRITE;
INSERT INTO `fruitscount` VALUES (1,6,8,'11/07/2020'),(2,7,8,'11/07/2020'),(3,8,8,'11/07/2020'),(4,9,8,'11/07/2020'),(5,10,8,'11/07/2020'),(6,3,8,'11/07/2020'),(7,4,8,'11/07/2020'),(8,5,8,'11/07/2020'),(9,6,8,'11/07/2020');
UNLOCK TABLES;
--
-- Table structure for table `vegetablecount`
--

DROP TABLE IF EXISTS `vegetablecount`;
CREATE TABLE `vegetablecount` (
  `UserId` int NOT NULL,
  `NoOfVegetables` int NOT NULL,
  `Goal` int NOT NULL,
  `Date` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  KEY `NoOfVegetables_index` (`NoOfVegetables`),
  KEY `Goal_index` (`Goal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vegetablecount`
--

LOCK TABLES `vegetablecount` WRITE;
INSERT INTO `vegetablecount` VALUES (1,6,8,'11/07/2020'),(2,7,8,'11/07/2020'),(3,8,8,'11/07/2020'),(4,9,8,'11/07/2020'),(5,10,8,'11/07/2020'),(6,3,8,'11/07/2020'),(7,4,8,'11/07/2020'),(8,5,8,'11/07/2020'),(9,6,8,'11/07/2020');
UNLOCK TABLES;