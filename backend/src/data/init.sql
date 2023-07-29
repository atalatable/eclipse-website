-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;


-- ---
-- Table 'members'
-- 
-- ---

DROP TABLE IF EXISTS `members`;
		
CREATE TABLE `members` (
  `id` INTEGER AUTO_INCREMENT,
  `id_lineups` INTEGER,
  `name` VARCHAR(40) DEFAULT "",
  `role` VARCHAR(40) DEFAULT "",
  `imageUrl` VARCHAR(256) DEFAULT "",
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'news'
-- 
-- ---

DROP TABLE IF EXISTS `news`;
		
CREATE TABLE `news` (
  `id` INTEGER AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(400) DEFAULT "",
  `content` TEXT NOT NULL,
  `imageUrl` VARCHAR(256) DEFAULT "",
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'socials'
-- 
-- ---

DROP TABLE IF EXISTS `socials`;
		
CREATE TABLE `socials` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `link` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'lineups'
-- 
-- ---

DROP TABLE IF EXISTS `lineups`;
		
CREATE TABLE `lineups` (
  `id` INTEGER AUTO_INCREMENT,
  `name` VARCHAR(30),
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `members` ADD FOREIGN KEY (id_lineups) REFERENCES `lineups` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `lineups` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `members` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `news` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `socials` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `lineups` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `members` (`id`,`id_lineups`,`name`,`role`,`imageUrl`) VALUES
-- ('','','','','');
-- INSERT INTO `news` (`id`,`title`,`description`,`content`,`imageUrl`,`date`) VALUES
-- ('','','','','','');
-- INSERT INTO `socials` (`id`,`name`,`link`) VALUES
-- ('','','');