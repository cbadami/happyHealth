--- Happy Health Database Creation

UNLOCK TABLES;
DROP DATABASE IF EXISTS happyHealth;
CREATE DATABASE happyHealth;
USE happyHealth;


--
-- ********************************** Table structure for table userTbl *****************************
--
DROP TABLE IF EXISTS userTbl;
CREATE TABLE userTbl (
  userId int AUTO_INCREMENT,
  userName varchar(12) DEFAULT NULL,
  password varchar(25) DEFAULT NULL,
  admin varchar(3) DEFAULT NULL,
  email varchar(25) DEFAULT NULL,
  fullName varchar(25) DEFAULT NULL,
  gender varchar(12) DEFAULT NULL,
  dateOfBirth varchar(12) DEFAULT NULL,
  age int DEFAULT 0,
  currentWeight int DEFAULT 0,
  desiredWeight int DEFAULT 0,
  height int DEFAULT 0,
  averageActivityLevel varchar(25) DEFAULT NULL,
  country varchar(25) DEFAULT NULL,
  state varchar(25) DEFAULT NULL,
  PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table userTbl
--

INSERT INTO userTbl (userName,password,admin,email,fullName,gender,dateOfBirth,age,currentWeight,desiredWeight,
height,averageActivityLevel, country,state) VALUES 
('James234','Bond12345','No','james234@gmail.com','James Bond','Male','10/04/1993',29,136,134,66,'Sedentary','United States','Missouri'),
('William','William123','Yes','William123@gmail.com','William Shakespeare','Male','11/24/1994',26,112,110,68,'Lightly Active','India','Telangana'),
('John234','John234','No','John234@gmail.com','John Daniel','Male','9/4/1995',31,125,128,61,'Moderatley Active','Canada','Alberta'),
('Robert123','Robert123','No','Robert123@gmail.com','Robert Cart','Male','10/04/1996',27,134,138,66,'Very Active','United States','Arizona'),
('Michael','Micky','No','Micky@gmail.com','Michael Jackson','Male','01/12/1997',25,102,108,67,'Sedentary','India','Andhra Pradesh'),
('David','Davidbhai','No','Davidbhai@gmail.com','David Warner','Male','12/6/1991',34,142,131,62,'Lightly Active','Canada','Manitoba'),
('Richard','Richard456','No','Richard456@gmail.com','Richard Hoot','Male','11/04/1999',28,123,129,63,'Moderatley Active','United States','Kansas'),
('Joseph','Joseph123','No','Joseph123@gmail.com','Joseph Thompson','Male','08/23/1995',29,101,93,67,'Very Active','India','Maharastra'),
('Thomas','Thomasedison','No','Thomasedison@gmail.com','Thomas Edison','Male','10/12/1986',25,131,121,64,'Sedentary','Canada','Nova Scotia'),
('harish24680','harish1234','Yes','harish24680@gmail.com','harish thadka','male','11/04/1995',28,100,120,60,'Sedentary','India','Telangana');


--
-- ********************************** Table structure for table groupTbl *************************
--

DROP TABLE IF EXISTS groupTbl;
CREATE TABLE groupTbl (
  groupId int AUTO_INCREMENT,
  groupName varchar(25) DEFAULT NULL,
  creator varchar(25) DEFAULT NULL,
  createdDate varchar(12) DEFAULT NULL,
  PRIMARY KEY (groupId)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Sets the start number 1001 for group Table:
ALTER TABLE groupTbl AUTO_INCREMENT=1001;

--
-- Dumping data for table group
--

INSERT INTO groupTbl (groupName,creator,createdDate) VALUES 
('Avengers','William','10/20/2020'),
('Champions','William','11/22/2020'),
('Crew','William','10/23/2020'),
('Bosses','William','10/24/2020'),
('Force','William','9/20/2020'),
('Hustle','William','6/04/2020'),
('Icons','William','10/20/2020'),
('Legends','William','10/28/2020'),
('Masters','William','10/30/2020'),
('Avengers2','William','11/28/2020');



--
-- ********************************** Table structure for table groupmemberTbl *************************
--

DROP TABLE IF EXISTS groupmemberTbl;
CREATE TABLE groupmemberTbl (
  userId int NOT NULL,
  joinedDate varchar(12) DEFAULT NULL,
  groupId int NOT NULL,
  PRIMARY KEY (userId,groupId),
  FOREIGN KEY (userId) REFERENCES userTbl(userId),
  FOREIGN KEY (groupId) REFERENCES groupTbl(groupId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table groupmemberTbl
--

INSERT INTO groupmemberTbl VALUES 
(1,'11/24/2020',1004),
(2,'10/24/2020',1004),
(3,'10/24/2020',1004),
(3,'10/24/2018',1003),
(1,'10/24/2019',1003),
(4,'09/24/2019',1003),
(5,'11/24/2019',1001),
(6,'11/24/2020',1001),
(7,'11/24/2020',1006),
(8,'11/24/2020',1006),
(9,'11/24/2020',1002),
(10,'11/24/2020',1010),
(10,'11/24/2020',1004);


--
-- ********************************** Table structure for table challengeTbl *************************
--

DROP TABLE IF EXISTS challengeTbl;
CREATE TABLE challengeTbl (
  challengeId int AUTO_INCREMENT,
  challengeName varchar(25) DEFAULT NULL,
  creator varchar(12) DEFAULT NULL,
  createdDate varchar(12) DEFAULT NULL,
  PRIMARY KEY (ChallengeId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Sets the start number 1001 for challenge Table:
ALTER TABLE challengeTbl AUTO_INCREMENT=2001;

--
-- Dumping data for table challengeTbl
--

INSERT INTO challengeTbl (challengeName,creator,createdDate) VALUES 
('Steps','William','9/21/2020'),
('Calorie','William','9/21/2020'),
('Weight','Christopher','9/21/2020'),
('Diet','William','9/21/2020'),
('Protein','Christopher','9/21/2020'),
('Hydration','William','9/21/2020');



--
-- ********************************** Table structure for table userMetricsTbl *************************
--

DROP TABLE IF EXISTS userMetricsTbl;
CREATE TABLE userMetricsTbl (
  userId int NOT NULL,
  date varchar(12) NOT NULL,
  stepCount int DEFAULT 0,
  stepGoal int DEFAULT 0,
  sleepHours int DEFAULT 0,
  sleepGoal int DEFAULT 0,
  meTime int DEFAULT 0,
  meTimeGoal int DEFAULT 0,
  water int DEFAULT 0,
  waterGoal int DEFAULT 0,
  fruits int DEFAULT 0,
  fruitGoal int DEFAULT 0,
  veggies int DEFAULT 0,
  veggieGoal int DEFAULT 0,
  PRIMARY KEY (userId,date),
  FOREIGN KEY (userId) REFERENCES userTbl(userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table userMetricsTbl
--

INSERT INTO userMetricsTbl VALUES 
(1,'12/20/2020',1000,2000,5,10,6,10,6,8,6,8,5,10),
(2,'12/20/2020',1200,2000,7,10,8,10,5,8,6,8,9,10),
(3,'12/20/2020',1100,2000,4,10,4,10,6,8,8,8,10,10),
(4,'12/20/2020',1500,2000,10,10,6,10,9,8,10,8,3,10),
(5,'12/20/2020',1900,2000,12,10,5,10,8,12,8,12,5,10),
(6,'12/20/2020',1500,2000,6,10,9,10,5,8,5,8,10,10),
(7,'12/20/2020',1700,2000,8,10,5,10,8,8,9,8,9,10),
(8,'12/20/2020',600,2000,9,10,7,10,4,8,7,8,11,10),
(9,'12/20/2020',1500,2000,5,10,8,10,7,8,5,8,6,10),
(10,'12/20/2020',800,2000,10,10,5,10,7,8,7,8,8,10);




