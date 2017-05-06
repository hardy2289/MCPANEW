 CREATE TABLE `users` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `age` varchar(10) NOT NULL,
  `dob` date DEFAULT NULL,
  `role` enum('Admin','Users') NOT NULL DEFAULT 'Users',
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `login` (`password`)
)

CREATE TABLE `claim_records` (
  `claim_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `medi_cost` varchar(20) NOT NULL,
  `surgery_cost` varchar(20) NOT NULL,
  `lab_cost` varchar(20) NOT NULL,
  `extra_cost` varchar(20) NOT NULL,
  `claim_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('Pending','Rejected','Completed') NOT NULL DEFAULT 'Pending',
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`claim_id`),
  KEY `multi` (`user_id`)
) 