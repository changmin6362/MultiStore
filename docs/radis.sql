CREATE TABLE `user_session` (
  `session_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `access_token` text NOT NULL,
  `refresh_token` text NOT NULL,
  `expired_at` timestamp NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `device_info` text NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
);


CREATE TABLE `inventory` (
  `inventory_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `option_id` integer NOT NULL,
  `quantity` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
);

CREATE TABLE `cart` (
  `cart_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `option_id` integer NOT NULL,
  `quantity` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
);


CREATE TABLE `product_view_history` (
  `product_view_history_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `viewed_at` timestamp NOT NULL
);

ALTER TABLE `user_session` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `inventory` ADD FOREIGN KEY (`option_id`) REFERENCES `product_option` (`option_id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`option_id`) REFERENCES `product_option` (`option_id`);

ALTER TABLE `product_view_history` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `product_view_history` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
