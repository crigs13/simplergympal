CREATE DATABASE IF NOT EXISTS gympal;

USE gympal;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(24) NULL DEFAULT NULL,
  `hashpw` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'exercises'
--
-- ---

DROP TABLE IF EXISTS `exercises`;

CREATE TABLE `exercises` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_ID` INTEGER NULL DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `category` VARCHAR(50) NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `notes` VARCHAR(255) NULL DEFAULT NULL,
  `location` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'sets'
--
-- ---

DROP TABLE IF EXISTS `sets`;

CREATE TABLE `sets` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `exercise_ID` INTEGER NULL DEFAULT NULL,
  `setNumber` INTEGER NULL DEFAULT NULL,
  `weight` DECIMAL NULL DEFAULT NULL,
  `reps` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `exercises` ADD FOREIGN KEY (user_ID) REFERENCES `users` (`id`);
ALTER TABLE `sets` ADD FOREIGN KEY (exercise_ID) REFERENCES `exercises` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `exercises` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `sets` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`hashpw`) VALUES
-- ('','','');
-- INSERT INTO `exercises` (`id`,`user_ID`,`name`,`category`,`date`,`notes`,`location`) VALUES
-- ('','','','','','','');
-- INSERT INTO `sets` (`id`,`exercise_ID`,`setNumber`,`weight`,`reps`) VALUES
-- ('','','','','');
