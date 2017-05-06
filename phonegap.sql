-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2015 at 10:41 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `phonegap`
--

-- --------------------------------------------------------

--
-- Table structure for table `logindetails`
--

CREATE TABLE `logindetails` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(25) NOT NULL,
  `LastName` varchar(25) NOT NULL,
  `DateofBirth` date NOT NULL,
  `Age` int(3) NOT NULL,
  `Role` varchar(20) NOT NULL,
  `EmailAddress` varchar(25) NOT NULL,
  `Password` varchar(25) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `EmailAddress` (`EmailAddress`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `logindetails`
--

INSERT INTO `logindetails` (`UserID`, `FirstName`, `LastName`, `DateofBirth`, `Age`, `Role`, `EmailAddress`, `Password`) VALUES
(1, 'Emanuel', 'Wilson', '1990-07-22', 26, 'Admin', 'Eman@yahoo.com', '123456'),
(2, 'hardik', 'bakari', '1980-05-22', 26, 'User', 'hardik.ab20@yahoo.com', '123456'),
(3, 'Hardik', 'Bakari', '1989-01-22', 27, 'Admin', 'hardy@yahoo.com', '123456'),
(4, 'Hayat', 'Bain', '1985-05-22', 26, 'User', 'Hayat@ymail.com', '123456'),
(5, 'Hetal', 'Patel', '1995-05-20', 20, 'User', 'Hetal@gmail.com', '123456'),
(6, 'Jay', 'Patel', '1990-02-25', 25, 'User', 'jay@ymail.com', '123456'),
(7, 'MIta', 'Raman', '1980-05-07', 35, 'Admin', 'Mita@ymail.com', '123456'),
(8, 'Rahul', 'Tailor', '1995-05-25', 20, 'User', 'Rahul@gmail.com', '123456'),
(9, 'Roy', 'Patel', '1985-07-08', 30, 'User', 'Roy@gmail.com', '123456'),
(10, 'Ram', 'Pitora', '1980-06-23', 30, 'Admin', 'Ram@yahoo.com', '123456');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
