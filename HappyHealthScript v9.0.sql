-- Happy Health Database Creation

UNLOCK TABLES;
DROP DATABASE IF EXISTS happyHealth;
CREATE DATABASE happyHealth;
USE happyHealth;

-- ********************************** Table structure for table userTbl *****************************
--
DROP TABLE IF EXISTS userTbl;
CREATE TABLE userTbl (
  userId int AUTO_INCREMENT,
  userName varchar(12) DEFAULT NULL UNIQUE,
  password varchar(100) DEFAULT NULL,
  admin varchar(3) DEFAULT NULL,
  email varchar(25) DEFAULT NULL UNIQUE,
  fullName varchar(35) DEFAULT '',
  gender varchar(12) DEFAULT NULL,
  dateOfBirth varchar(12) DEFAULT NULL,
  age int DEFAULT 0,
  currentWeight int DEFAULT 0,
  desiredWeight int DEFAULT 0,
  height int DEFAULT 0,
  country varchar(25) DEFAULT NULL,
  state varchar(25) DEFAULT NULL,
  PRIMARY KEY (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table userTbl
--

INSERT INTO userTbl (userName,password,admin,email,fullName,gender,dateOfBirth,age,currentWeight,desiredWeight,
height,country,state) VALUES 
('James234','$2a$12$iteBZhHvib.4uqRqyV.IIeZekIrfiJeMGbmnNySiawSslkmQm4qAy','No','james234@gmail.com','James Bond','Male','10/4/1993','29','136','134','66','United States','Missouri'),
('William','$2a$12$26RTgB.XNe39rWRIasRx0u0mPzvZP82jZK4cUBkDOFk1kkahJyVvK','Yes','William123@gmail.com','William Shakespeare','Male','11/24/1994','26','112','110','68','India','Telangana'),
('John234','$2a$12$39nHpdZX3zir79zX42yVAOAVwRTfh6P04cF/qzVsxO6F5hDelc/AW','No','John234@gmail.com','John Daniel','Male','9/4/1995','31','125','128','61','Canada','Alberta'),
('srkvodnala','$2a$12$HVvjnfIjMu0TOyV8Q23Vb.8yGebqjtfU5/vBvCykdfBSzH5L7WYxi','No','srkrao547@gmail.com','','NULL','NULL','0','0','0','0','NULL','NULL'),
('cbtest','$2a$12$W64ML.XtQo4whuM4PpfGzu6EIpruYmHN.uj.cAekNifrXnjZeE.LO','No','cbtest@cbtest.com','','NULL','NULL','0','0','0','0','NULL','NULL'),
('navyadev','$2a$12$oRdo2Y65AV7aw7LMrv7q1.awJ3q9RRXR4gXox2j79GMgMOko40ZIe','No','S538339@nwmissouri.edu','Navya Devineni','Female','4/26/1997','23','0','0','0','United States','Missouri');
-- Bond12345
-- William123
-- John2345


--
-- ********************************** Table structure for table groupTbl *************************
--
--
/*
DROP TABLE IF EXISTS groupTbl;
CREATE TABLE groupTbl (
  groupId int AUTO_INCREMENT,
  groupName varchar(25)  UNIQUE DEFAULT NULL,
  creator varchar(25) DEFAULT NULL,
  createdDate varchar(12) DEFAULT NULL,
  PRIMARY KEY (groupId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Sets the start number 1001 for group Table:
ALTER TABLE groupTbl AUTO_INCREMENT=1001;

--
-- Dumping data for table groupm
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
  FOREIGN KEY (groupId) REFERENCES groupTbl(groupId) ON DELETE CASCADE
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

*/



--
-- ********************************** Table structure for table challengeMemberTbl *************************
--

-- DROP TABLE IF EXISTS challengeMemberTbl;
-- CREATE TABLE challengeMemberTbl (
--   userId int NOT NULL,
--   joinedDate varchar(12) DEFAULT NULL,
--   challengeId int NOT NULL,
--   PRIMARY KEY (userId,challengeId),
--   FOREIGN KEY (userId) REFERENCES userTbl(userId),
--   FOREIGN KEY (challengeId) REFERENCES challengeTbl(challengeId) ON DELETE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Dumping data for table challengeMemberTbl
-- --

-- INSERT INTO challengeMemberTbl VALUES
-- (1,'11/24/2020',2001),
-- (2,'10/24/2020',2001),
-- (3,'10/24/2020',2001),
-- (1,'10/24/2018',2002),
-- (2,'10/24/2019',2002),
-- (3,'09/24/2019',2002),
-- (4,'11/24/2019',2002),
-- (5,'11/24/2020',2002),
-- (6,'11/24/2020',2002);

--
-- ********************************** Table structure for table userMetricsTbl *************************
--

DROP TABLE IF EXISTS userMetricsTbl;
CREATE TABLE userMetricsTbl (
  userId int NOT NULL,
  date varchar(12) NOT NULL,
  stepCount Float DEFAULT 0,
  stepGoal Float DEFAULT 0,
  sleepHours Float DEFAULT 0,
  sleepGoal Float DEFAULT 0,
  meTime Float DEFAULT 0,
  meTimeGoal Float DEFAULT 0,
  water Float DEFAULT 0,
  waterGoal Float DEFAULT 0,
  fruits Float DEFAULT 0,
  fruitGoal Float DEFAULT 0,
  veggies Float DEFAULT 0,
  veggieGoal Float DEFAULT 0,
  physicalActivityMinutes Float DEFAULT 0,
  physicalActivityGoal Float DEFAULT 0,
  PRIMARY KEY (userId,date),
  FOREIGN KEY (userId) REFERENCES userTbl(userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table userMetricsTbl
--

INSERT INTO userMetricsTbl VALUES 
(1,'04/05/2021',1000,2000,5,10,6,10,6,8,6,8,5,10,20,20),
(1,'04/06/2021',1000,2000,5,10,6,10,6,8,6,8,5,10,20,20),
(1,'04/07/2021',1000,2000,5,10,6,10,6,8,6,8,5,10,20,20),
(1,'04/08/2021',1001,2001,5,10,6,10,6,8,6,8,5,10,20,20),
(2,'04/05/2021',1200,2000,7,10,8,10,5,8,6,8,9,10,10,20),
(2,'04/06/2021',1200,2000,7,10,8,10,5,8,6,8,9,10,10,20),
(2,'04/07/2021',1200,2000,7,10,8,10,5,8,6,8,9,10,10,20),
(2,'04/08/2021',1201,2001,7,10,8,10,5,8,6,8,9,10,10,20),
(3,'04/05/2021',1100,2000,4,10,4,10,6,8,8,8,10,10,30,30),
(3,'04/06/2021',1100,2000,4,10,4,10,6,8,8,8,10,10,30,30),
(3,'04/07/2021',1100,2000,4,10,4,10,6,8,8,8,10,10,30,30),
(3,'04/08/2021',1101,2001,4,10,4,10,6,8,8,8,10,10,30,30),
(4,'04/05/2021',1500,2000,10,10,6,10,9,8,10,8,3,10,25,25),
(4,'04/06/2021',1500,2000,10,10,6,10,9,8,10,8,3,10,25,25),
(4,'04/07/2021',1500,2000,10,10,6,10,9,8,10,8,3,10,25,25),
(4,'04/08/2021',1501,2001,10,10,6,10,9,8,10,8,3,10,25,25),
(5,'04/05/2021',1900,2000,12,10,5,10,8,12,8,12,5,10,30,30),
(5,'04/06/2021',1900,2000,12,10,5,10,8,12,8,12,5,10,30,30),
(5,'04/07/2021',1900,2000,12,10,5,10,8,12,8,12,5,10,30,30),
(5,'04/08/2021',1901,2001,12,10,5,10,8,12,8,12,5,10,30,30),
(6,'04/05/2021',1500,2000,6,10,9,10,5,8,5,8,10,10,40,40),
(6,'04/06/2021',1500,2000,6,10,9,10,5,8,5,8,10,10,40,40),
(6,'04/07/2021',1500,2000,6,10,9,10,5,8,5,8,10,10,40,40),
(6,'04/08/2021',1501,2001,6,10,9,10,5,8,5,8,10,10,40,40);

--
-- ********************************** Trigger befor insert into usertbl *************************
--
CREATE TRIGGER before_user_update 
    AFTER INSERT ON usertbl
    FOR EACH ROW 
 INSERT INTO usermetricstbl
 SET usermetricstbl.userId = new.userId,
	date = DATE_FORMAT(NOW(), '%m/%d/%Y');


--
-- ********************************** Table structure for table announcementsTbl *************************
--


drop table if exists announcementstbl;
CREATE TABLE announcementsTbl (
  messageId int AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  message varchar(500) DEFAULT NULL,
  userId varchar(500) DEFAULT NULL,
  msgDate varchar(20) DEFAULT NULL ,
  archive boolean default null,
  PRIMARY KEY (messageId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
ALTER TABLE announcementsTbl AUTO_INCREMENT=3001;

INSERT INTO announcementsTbl(title, message, userId, msgDate, archive) VALUES
('Title test','This is message','1,2,3,4,5,6,7,8', '03/12/2021',0),
('Everyone Title','This message for everyone','1,2,3,4,5,6,7,8','03/22/2021',0),
('Hello!','Hello! Welcome to our health based application!','1,2,3,4,5,6,7,8','02/01/2021',1),
('Log Daily Goals','Hey! Kindly update your daily goals for better usage!','1,2,3,4,5,6,7,8','01/21/2021',0),
('Drink Water','It is always good to drink more water during hotter days!','1,2,3,4,5,6,7,8','03/21/2021',0),
('Alpha Release','We are doing our Alpha release in a bit, looking forward to constructive reviews to the development team.','1,2,3,4,5,6,7,8','03/03/2021',1)
;

--
-- ********************************** Table structure for table  challengeTbl  *************************
--



DROP TABLE IF EXISTS challengeTbl;
CREATE TABLE challengeTbl (
  challengeId int AUTO_INCREMENT ,
  challengeName varchar(50) DEFAULT NULL,
  challengeDescription varchar(100) DEFAULT NULL,
  challengeType varchar(200) DEFAULT NULL,
  startDate varchar(14) DEFAULT NULL,
  endDate varchar(14)  DEFAULT NULL,
  PRIMARY KEY (challengeId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Sets the start number 1001 for challenge Table:
ALTER TABLE challengeTbl AUTO_INCREMENT=2001;

--
-- Dumping data for table challengeTbl
--

INSERT INTO
 challengeTbl ( `challengeName`, `challengeDescription`, `challengeType`, `startDate`, `endDate`) VALUES 
('Walk 2000 Steps', 'User needs to walk 2000 steps a day throughout the week', 'Step Count', '09/21/2020','09/28/2020'),
('Only veg', 'User needs to eat only veg', 'Veggies', '01/11/2020','02/11/2020'),
('2 Gallons water', 'User needs to drink 2 gallons of water everyday','Water','01/10/2020', '02/10/2020');


--
-- ********************************** Table structure for table challengemembertbl  *************************
--

DROP TABLE IF exists happyhealth.challengemembertbl;

CREATE TABLE happyhealth.challengemembertbl (
  `invitationId` int NOT NULL AUTO_INCREMENT,
  `challengeId` int NOT NULL,
  `userId` int NOT NULL,
  `joinedDate` varchar(12) DEFAULT NULL,
  `leftDate` varchar(12) DEFAULT NULL,
  `activeUser` boolean DEFAULT NULL,
  `archive` boolean default NULL,
  PRIMARY KEY (`invitationId`),
  FOREIGN KEY (`userId`) REFERENCES `usertbl` (`userId`),
  FOREIGN KEY (`challengeId`) REFERENCES `challengetbl` (`challengeId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE happyhealth.challengemembertbl AUTO_INCREMENT=100;


/* INSERT INTO happyhealth.challengeMemberTbl ( challengeId, userId, joinedDate, leftDate, activeUser , archive ) VALUES
(2001, 1,'11/24/2020', '', 1, 0 ),
(2001, 2,'', '' , 0, 0),
(2002, 2,'10/24/2018', '', 1 , 0),
(2003, 2,'10/24/2020', '10/26/2020', 0, 1),
(2002, 1,'10/24/2018', '', 1 , 0),
(2002, 3,'', '', 0, 0),
(2002, 4,'11/24/2019','',1,0),
(2002, 5,'','',0, 0),
(2002, 6,'11/24/2020', '11/24/2020', 0, 1 ); */


