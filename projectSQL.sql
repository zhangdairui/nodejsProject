/*
 Navicat Premium Data Transfer

 Source Server         : NFCshopping
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : localhost:3306
 Source Schema         : cs631

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 22/12/2020 23:40:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Cart
-- ----------------------------
DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
  `person_id` char(64) NOT NULL,
  `inventory_id` char(64) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`,`person_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Cart
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Config
-- ----------------------------
DROP TABLE IF EXISTS `Config`;
CREATE TABLE `Config` (
  `id` char(64) NOT NULL,
  `value` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Config
-- ----------------------------
BEGIN;
INSERT INTO `Config` VALUES ('service_fee_kilogram', 1.2);
INSERT INTO `Config` VALUES ('service_fee_square_meter', 0.9);
INSERT INTO `Config` VALUES ('service_shipping_fee', 10);
COMMIT;

-- ----------------------------
-- Table structure for Inventory
-- ----------------------------
DROP TABLE IF EXISTS `Inventory`;
CREATE TABLE `Inventory` (
  `id` char(64) NOT NULL,
  `name` char(64) DEFAULT NULL,
  `type` char(32) DEFAULT NULL,
  `status` char(32) DEFAULT NULL,
  `length` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `warehouse_id` char(64) DEFAULT NULL,
  `seller_id` char(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Inventory
-- ----------------------------
BEGIN;
INSERT INTO `Inventory` VALUES ('000000', 'gloves', 'type1', 'sold', NULL, NULL, NULL, NULL, 10, NULL, 'd5550168-3620-11eb-960c-acde48001122');
INSERT INTO `Inventory` VALUES ('19689387492387042', 'cup', NULL, 'store', 2, 2, 3, 3, 3, 'New Jersey Warehouse', 'd5550168-3620-11eb-960c-acde48001122');
INSERT INTO `Inventory` VALUES ('21113423', 'mask', 'type1', 'sold', 2, 2, 2, 2, 10, 'weser', '9d048180-3625-11eb-b9e2-acde48001122');
INSERT INTO `Inventory` VALUES ('324234', 'catfood', NULL, 'sold', NULL, NULL, NULL, NULL, 20, NULL, '9d048180-3625-11eb-b9e2-acde48001122');
INSERT INTO `Inventory` VALUES ('600b033d-e176-5acf-8ac4-8799a42e4832', 'water bottle', 'Other', 'sell', 0.5, 0.4, 1, 0.8, 10, 'New York Warehouse', '8948c6f4-3e1a-11eb-a1f5-acde48001122');
INSERT INTO `Inventory` VALUES ('7697987', 'phone', NULL, 'store', 1, 1, 1, 1, 100, NULL, NULL);
INSERT INTO `Inventory` VALUES ('873187409384092834', 'computer', NULL, 'store', 5, 5, 5, 5, 200, 'New York Warehouse', 'd5550168-3620-11eb-960c-acde48001122');
INSERT INTO `Inventory` VALUES ('f8e47b0e-0b22-5404-8cb8-e6030700c1e7', 'medical mask', 'PPE', 'sold', 1, 1, 1, 1, 100, 'New York Warehouse', '8948c6f4-3e1a-11eb-a1f5-acde48001122');
COMMIT;

-- ----------------------------
-- Table structure for Invoice
-- ----------------------------
DROP TABLE IF EXISTS `Invoice`;
CREATE TABLE `Invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` char(255) DEFAULT NULL,
  `employee_id` char(64) DEFAULT NULL,
  `seller_id` char(64) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `history_balance` double(11,0) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Invoice
-- ----------------------------
BEGIN;
INSERT INTO `Invoice` VALUES (1, '22', NULL, NULL, -1, NULL, '2020-12-13 23:53:49');
INSERT INTO `Invoice` VALUES (2, '2', NULL, NULL, -1, NULL, '2020-12-13 23:55:41');
INSERT INTO `Invoice` VALUES (3, '2', NULL, NULL, -1, NULL, '2020-12-13 23:57:41');
INSERT INTO `Invoice` VALUES (4, 'wwww', '6750c66c-bdc4-4db4-9476-8817b88bd037', '9d048180-3625-11eb-b9e2-acde48001122', -50, NULL, '2020-12-14 00:19:14');
INSERT INTO `Invoice` VALUES (5, 'ddd', '6750c66c-bdc4-4db4-9476-8817b88bd037', 'd5550168-3620-11eb-960c-acde48001122', -2, 30, '2020-12-14 00:21:08');
INSERT INTO `Invoice` VALUES (6, 'w', '6750c66c-bdc4-4db4-9476-8817b88bd037', '663475f4-264f-4c75-bb2a-1b0ce4d2fcd0', -20, 100, '2020-12-14 00:26:54');
INSERT INTO `Invoice` VALUES (7, 'test', '6750c66c-bdc4-4db4-9476-8817b88bd037', '9d048180-3625-11eb-b9e2-acde48001122', -55, 555, '2020-12-14 00:37:34');
INSERT INTO `Invoice` VALUES (8, 'fee', '6750c66c-bdc4-4db4-9476-8817b88bd037', '775c6876-2874-403d-9f11-b0ab27e0f2ca', -50, 400, '2020-12-14 02:24:47');
INSERT INTO `Invoice` VALUES (9, 'wwww', '6750c66c-bdc4-4db4-9476-8817b88bd037', '54044e8d-e535-4394-bdfd-608736796385', -10, 90, '2020-12-14 02:31:58');
INSERT INTO `Invoice` VALUES (10, 'www', '6750c66c-bdc4-4db4-9476-8817b88bd037', '0f780bd6-d7e2-4d77-9e9c-057057a1de1a', -2, 50, '2020-12-14 02:35:46');
INSERT INTO `Invoice` VALUES (11, 'test', '6750c66c-bdc4-4db4-9476-8817b88bd037', '0b12ba2a-3c0d-4fea-9cd4-01cb9de77616', -1, 10, '2020-12-14 02:39:13');
INSERT INTO `Invoice` VALUES (12, 'ssssdddssaa', '6750c66c-bdc4-4db4-9476-8817b88bd037', '8948c6f4-3e1a-11eb-a1f5-acde48001122', -1, 0, '2020-12-14 22:52:37');
INSERT INTO `Invoice` VALUES (13, 'description here', '6750c66c-bdc4-4db4-9476-8817b88bd037', '0f780bd6-d7e2-4d77-9e9c-057057a1de1a', -15, 48, '2020-12-15 16:53:06');
INSERT INTO `Invoice` VALUES (14, 'User Top Up', NULL, '8948c6f4-3e1a-11eb-a1f5-acde48001122', 10, -1, '2020-12-15 20:50:32');
COMMIT;

-- ----------------------------
-- Table structure for Location
-- ----------------------------
DROP TABLE IF EXISTS `Location`;
CREATE TABLE `Location` (
  `id` char(64) NOT NULL,
  `inventory_id` char(64) DEFAULT NULL,
  `warehouse_name` char(64) DEFAULT NULL,
  `room_number` int(11) DEFAULT NULL,
  `shelf_number` int(11) DEFAULT NULL,
  `length` double DEFAULT NULL,
  `width` double DEFAULT NULL,
  `height` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `layer_key` (`warehouse_name`,`room_number`,`shelf_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Location
-- ----------------------------
BEGIN;
INSERT INTO `Location` VALUES ('1', NULL, 'New York Warehouse', 2, 2, 2, 3, 4);
INSERT INTO `Location` VALUES ('2', '600b033d-e176-5acf-8ac4-8799a42e4832', 'New York Warehouse', 3, 3, 3, 4, 3);
INSERT INTO `Location` VALUES ('3', '19689387492387042', 'New Jersey Warehouse', 4, 4, 4, 6, 4);
INSERT INTO `Location` VALUES ('4', NULL, 'New Jersey Warehouse', 201, 13, 2, 2, 2);
INSERT INTO `Location` VALUES ('5', NULL, 'New Jersey Warehouse', 202, 15, 2, 2, 2);
INSERT INTO `Location` VALUES ('6', NULL, 'New Jersey Warehouse', 203, 16, 2, 2, 2);
COMMIT;

-- ----------------------------
-- Table structure for Order
-- ----------------------------
DROP TABLE IF EXISTS `Order`;
CREATE TABLE `Order` (
  `order_id` char(64) NOT NULL,
  `user_id` char(64) DEFAULT NULL,
  `order_type` char(32) DEFAULT NULL,
  `payment_method` char(32) DEFAULT NULL,
  `manager_id` char(64) DEFAULT NULL,
  `order_status` char(64) DEFAULT NULL,
  `fee` double DEFAULT NULL,
  `address` text,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Order
-- ----------------------------
BEGIN;
INSERT INTO `Order` VALUES ('12132314', 'd5550168-3620-11eb-960c-acde48001122', 'seller_order', 'paypal', '72921503-1834-4bf9-9419-f89e2360225b', 'order_completed', 100, 'sssss', '2020-12-15 16:49:55');
INSERT INTO `Order` VALUES ('328961d8-3e1b-11eb-a1f5-acde48001122', '8948c6f4-3e1a-11eb-a1f5-acde48001122', 'seller_order', 'paypal', NULL, 'order_completed', 10, '{\"address\": \"1790 Findley Dr\", \"country\": \"United States\", \"state\": \"California\", \"zip\": \"95035\"}', '2020-12-14 22:49:17');
INSERT INTO `Order` VALUES ('34b8f730-3eec-11eb-91e3-acde48001122', '8948c6f4-3e1a-11eb-a1f5-acde48001122', 'seller_order', 'paypal', NULL, 'order_completed', 11.14, '{\"address\": \"1234 Main Street\", \"country\": \"United States\", \"state\": \"California\", \"zip\": \"11740\"}', '2020-12-15 23:55:46');
INSERT INTO `Order` VALUES ('45e5c563-196e-45da-b4d6-a2111ca6e523', '122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer_order', 'paypal', NULL, 'order_created', 30, 'www', '2020-12-14 00:45:34');
INSERT INTO `Order` VALUES ('5b5af353-6b51-47e9-b490-952a0f96f341', '122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer_order', 'paypal', NULL, 'order_created', 40, '3', '2020-12-14 00:45:40');
INSERT INTO `Order` VALUES ('651be375-b3fe-44c1-a644-147e18031330', '122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer_order', 'paypal', NULL, 'order_created', 45, '222', '2020-12-14 00:45:45');
INSERT INTO `Order` VALUES ('6979870809878708', '123444344', 'seller_order', 'cash', '56aebed0-35ee-11eb-a9af-acde48001122', 'order_completed', 100, NULL, '2020-12-14 02:20:48');
INSERT INTO `Order` VALUES ('6fcba166-231e-4955-b03f-68b20e58a8f8', '122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer_order', 'cash', NULL, 'order_completed', 30, 'w', '2020-12-14 00:45:49');
INSERT INTO `Order` VALUES ('a47566c5-fec8-4e34-9312-7f4cbf005ae7', '122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer_order', 'balance', NULL, 'order_created', 30, '2222', '2020-12-14 00:45:54');
INSERT INTO `Order` VALUES ('bcdeadd5-cc0d-4ba1-9b1c-fd024805a35b', 'f06cb8fd-3dc2-4b21-8abc-e95ead26e0c4', 'buyer_order', 'paypal', NULL, 'order_created', 25, 'newyork city', '2020-12-14 16:39:28');
INSERT INTO `Order` VALUES ('ce50419b-1702-471d-ae36-05d8033deeba', 'f06cb8fd-3dc2-4b21-8abc-e95ead26e0c4', 'buyer_order', 'paypal', NULL, 'order_created', 45, 'melonsoda\'s big house', '2020-12-14 16:35:44');
INSERT INTO `Order` VALUES ('d8633783-5b41-48c1-b4c2-17cfef9dd2eb', '122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer_order', 'paypal', NULL, 'order_created', 25, 'New Jersey Institude University', '2020-12-15 16:38:07');
INSERT INTO `Order` VALUES ('fa2ca542-2964-42fd-9091-955ccd287495', '122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer_order', 'paypal', NULL, 'order_created', 45, '123 new york st, new york, ny 10018', '2020-12-17 03:02:06');
INSERT INTO `Order` VALUES ('ff52036d-86be-4f86-ab1d-ea5cd2457e26', '122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer_order', 'paypal', NULL, 'order_created', 115, '4defdsfsdfs', '2020-12-14 22:50:53');
COMMIT;

-- ----------------------------
-- Table structure for Order_Inventory
-- ----------------------------
DROP TABLE IF EXISTS `Order_Inventory`;
CREATE TABLE `Order_Inventory` (
  `order_id` char(64) NOT NULL,
  `inventory_id` char(64) NOT NULL,
  PRIMARY KEY (`order_id`,`inventory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Order_Inventory
-- ----------------------------
BEGIN;
INSERT INTO `Order_Inventory` VALUES ('0939a71a-9e8e-4fe8-8f04-4ebaefa54494', '21113423');
INSERT INTO `Order_Inventory` VALUES ('0939a71a-9e8e-4fe8-8f04-4ebaefa54494', '324234');
INSERT INTO `Order_Inventory` VALUES ('12132314', '19689387492387042');
INSERT INTO `Order_Inventory` VALUES ('12132314', '873187409384092834');
INSERT INTO `Order_Inventory` VALUES ('328961d8-3e1b-11eb-a1f5-acde48001122', 'f8e47b0e-0b22-5404-8cb8-e6030700c1e7');
INSERT INTO `Order_Inventory` VALUES ('34392894-b2b7-4ed5-90dd-43111272b824', '21113423');
INSERT INTO `Order_Inventory` VALUES ('34392894-b2b7-4ed5-90dd-43111272b824', '324234');
INSERT INTO `Order_Inventory` VALUES ('34b8f730-3eec-11eb-91e3-acde48001122', '600b033d-e176-5acf-8ac4-8799a42e4832');
INSERT INTO `Order_Inventory` VALUES ('45e5c563-196e-45da-b4d6-a2111ca6e523', '000000');
INSERT INTO `Order_Inventory` VALUES ('6979870809878708', '7697987');
INSERT INTO `Order_Inventory` VALUES ('7bcec195-9ca4-435d-8755-fd432b34e9d2', '000000');
INSERT INTO `Order_Inventory` VALUES ('7bcec195-9ca4-435d-8755-fd432b34e9d2', '21113423');
INSERT INTO `Order_Inventory` VALUES ('7bcec195-9ca4-435d-8755-fd432b34e9d2', '324234');
INSERT INTO `Order_Inventory` VALUES ('a47566c5-fec8-4e34-9312-7f4cbf005ae7', '000000');
INSERT INTO `Order_Inventory` VALUES ('bcdeadd5-cc0d-4ba1-9b1c-fd024805a35b', '21113423');
INSERT INTO `Order_Inventory` VALUES ('c5af6ef5-835e-4ce8-9a1a-aa3eed59fb85', '000000');
INSERT INTO `Order_Inventory` VALUES ('c5af6ef5-835e-4ce8-9a1a-aa3eed59fb85', '21113423');
INSERT INTO `Order_Inventory` VALUES ('ce50419b-1702-471d-ae36-05d8033deeba', '21113423');
INSERT INTO `Order_Inventory` VALUES ('ce50419b-1702-471d-ae36-05d8033deeba', '324234');
INSERT INTO `Order_Inventory` VALUES ('d8633783-5b41-48c1-b4c2-17cfef9dd2eb', '21113423');
INSERT INTO `Order_Inventory` VALUES ('ebd58c01-b102-40a5-b5c7-bc1bcf07f472', '21113423');
INSERT INTO `Order_Inventory` VALUES ('ebd58c01-b102-40a5-b5c7-bc1bcf07f472', '324234');
INSERT INTO `Order_Inventory` VALUES ('f9b436f2-002b-4883-b7ce-d48ec908a64f', '21113423');
INSERT INTO `Order_Inventory` VALUES ('f9b436f2-002b-4883-b7ce-d48ec908a64f', '324234');
INSERT INTO `Order_Inventory` VALUES ('fa2ca542-2964-42fd-9091-955ccd287495', '000000');
INSERT INTO `Order_Inventory` VALUES ('fa2ca542-2964-42fd-9091-955ccd287495', '324234');
INSERT INTO `Order_Inventory` VALUES ('ff52036d-86be-4f86-ab1d-ea5cd2457e26', 'f8e47b0e-0b22-5404-8cb8-e6030700c1e7');
COMMIT;

-- ----------------------------
-- Table structure for Order_Tracking
-- ----------------------------
DROP TABLE IF EXISTS `Order_Tracking`;
CREATE TABLE `Order_Tracking` (
  `order_id` char(64) NOT NULL,
  `location` char(64) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Order_Tracking
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Person
-- ----------------------------
DROP TABLE IF EXISTS `Person`;
CREATE TABLE `Person` (
  `person_id` char(64) NOT NULL,
  `type` char(32) DEFAULT NULL,
  `position` char(32) DEFAULT NULL,
  `balance` double(11,0) DEFAULT '0',
  `mail` char(64) DEFAULT NULL,
  `name` char(64) DEFAULT NULL,
  `password` char(64) DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  UNIQUE KEY `layer_key` (`mail`,`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Person
-- ----------------------------
BEGIN;
INSERT INTO `Person` VALUES ('07c33efa-3dd1-11eb-9699-acde48001122', 'seller', 'loyal customer', 0, 'emoqian@gmail.com', 'emoseller', '123');
INSERT INTO `Person` VALUES ('0b12ba2a-3c0d-4fea-9cd4-01cb9de77616', 'seller', 'licensed customer', 9, 'customer11@hwwwhh.com', 'test customer', '123');
INSERT INTO `Person` VALUES ('0f780bd6-d7e2-4d77-9e9c-057057a1de1a', 'seller', 'licensed customer', 33, 'dairui@1234.com', 'Dairui', '123');
INSERT INTO `Person` VALUES ('122a572a-841d-4fc9-ae2c-6f7cd4c6dcf6', 'buyer', NULL, 0, 'emoqian00@gmail.com', 'emo12', '123');
INSERT INTO `Person` VALUES ('1d048180-3625-11eb-b9e2-acde48001122', 'buyer', NULL, 0, 'buyer_a_@cs631njit.me', 'leo', '123');
INSERT INTO `Person` VALUES ('2d048180-3625-11eb-b9e2-acde48001122', 'buyer', NULL, 0, 'buyer_b_@cs631njit.me', 'john', '123');
INSERT INTO `Person` VALUES ('54044e8d-e535-4394-bdfd-608736796385', 'seller', 'licensed customer', 80, 'tom@ija.com', 'Tom', '123');
INSERT INTO `Person` VALUES ('56aebed0-35ee-11eb-a9af-acde48001122', 'manager', 'regular employees', 0, 'manager_a_@cs631njit.me', 'simon', '123');
INSERT INTO `Person` VALUES ('663475f4-264f-4c75-bb2a-1b0ce4d2fcd0', 'seller', 'licensed customer', 80, 'abwwwcabc@njit.edu', 'ABC Company', '123');
INSERT INTO `Person` VALUES ('6750c66c-bdc4-4db4-9476-8817b88bd037', 'manager', 'admin', 0, 'dz9@njit.edu', 'emoManager', '123');
INSERT INTO `Person` VALUES ('72921503-1834-4bf9-9419-f89e2360225b', 'manager', NULL, 0, '464042992@qq.com', 'emo', '123');
INSERT INTO `Person` VALUES ('775c6876-2874-403d-9f11-b0ab27e0f2ca', 'seller', 'loyal customer', 350, 'mary@111.com', 'Mary', '123');
INSERT INTO `Person` VALUES ('8948c6f4-3e1a-11eb-a1f5-acde48001122', 'seller', 'licensed customer', 9, 'weixin@gmail.com', 'weiseller', '123');
INSERT INTO `Person` VALUES ('94c5d57a-4f8e-4da3-ab3c-1480db148031', 'manager', 'CEO', 0, 'melonsoda@cool.com', 'melon soda', 'lzp19921013');
INSERT INTO `Person` VALUES ('9d048180-3625-11eb-b9e2-acde48001122', 'seller', 'loyal customer', 500, 'seller_b_@cs631njit.me', 'wendy', '123');
INSERT INTO `Person` VALUES ('a8064f9c-3dea-11eb-a1f5-acde48001122', 'seller', 'loyal customer', 0, 'melonsoda@gmail.com', 'melonsoda', 'lzp19921013');
INSERT INTO `Person` VALUES ('d5550168-3620-11eb-960c-acde48001122', 'seller', 'licensed customer', 30, 'seller_a_@cs631njit.me', 'peter', '123');
INSERT INTO `Person` VALUES ('f06cb8fd-3dc2-4b21-8abc-e95ead26e0c4', 'buyer', NULL, 0, 'melonsoda@cool.com', NULL, 'lzp19921013');
COMMIT;

-- ----------------------------
-- Table structure for Warehouse
-- ----------------------------
DROP TABLE IF EXISTS `Warehouse`;
CREATE TABLE `Warehouse` (
  `name` char(64) NOT NULL,
  `status` char(10) DEFAULT NULL,
  PRIMARY KEY (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of Warehouse
-- ----------------------------
BEGIN;
INSERT INTO `Warehouse` VALUES ('New Jersey Warehouse', 'full');
INSERT INTO `Warehouse` VALUES ('New York Warehouse', 'empty');
COMMIT;

-- ----------------------------
-- View structure for products
-- ----------------------------
DROP VIEW IF EXISTS `products`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `products` AS select `inventory`.`name` AS `productName`,`inventory`.`price` AS `price` from `inventory`;

SET FOREIGN_KEY_CHECKS = 1;
