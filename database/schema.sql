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
  UNIQUE (`username`),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'workouts'
--
-- ---

DROP TABLE IF EXISTS `workouts`;

CREATE TABLE `workouts` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_ID` INTEGER NULL DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `category` VARCHAR(50) NULL DEFAULT NULL,
  UNIQUE (`name`),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'exercises'
--
-- ---

DROP TABLE IF EXISTS `exercises`;

CREATE TABLE `exercises` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `workout_ID` INTEGER NULL DEFAULT NULL,
  `group` INTEGER NULL DEFAULT NULL,
  `set` INTEGER NULL DEFAULT NULL,
  `weight` DECIMAL NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `workouts` ADD FOREIGN KEY (user_ID) REFERENCES `users` (`id`);
ALTER TABLE `exercises` ADD FOREIGN KEY (workout_ID) REFERENCES `workouts` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `workouts` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `exercises` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`hashpw`) VALUES
-- ('','','');
-- INSERT INTO `workouts` (`id`,`user_ID`,`name`,`category`) VALUES
-- ('','','','');
-- INSERT INTO `exercises` (`id`,`workout_ID`,`group`,`set`,`weight`,`date`) VALUES
-- ('','','','','','');
