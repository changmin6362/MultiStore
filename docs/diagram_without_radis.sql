-- 기존 테이블 제거 (역순으로 제거 - 외래키 제약조건 고려)
DROP TABLE IF EXISTS `search_analytics`;
DROP TABLE IF EXISTS `sales_statistics`;
DROP TABLE IF EXISTS `inquiry`;
DROP TABLE IF EXISTS `review_summary`;
DROP TABLE IF EXISTS `review`;
DROP TABLE IF EXISTS `delivery_policy`;
DROP TABLE IF EXISTS `delivery`;
DROP TABLE IF EXISTS `refund_log`;
DROP TABLE IF EXISTS `refund`;
DROP TABLE IF EXISTS `payment_log`;
DROP TABLE IF EXISTS `payment`;
DROP TABLE IF EXISTS `payment_method`;
DROP TABLE IF EXISTS `order_item`;
DROP TABLE IF EXISTS `merchant_notification`;
DROP TABLE IF EXISTS `user_coupon`;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS `discount_product`;
DROP TABLE IF EXISTS `discount`;
DROP TABLE IF EXISTS `product_image`;
DROP TABLE IF EXISTS `product_option`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `coupon`;
DROP TABLE IF EXISTS `store`;
DROP TABLE IF EXISTS `merchant`;
DROP TABLE IF EXISTS `role_permission`;
DROP TABLE IF EXISTS `permission`;
DROP TABLE IF EXISTS `user_role`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `user_address`;
DROP TABLE IF EXISTS `user_profile`;
DROP TABLE IF EXISTS `user`;

-- 테이블 생성
CREATE TABLE `user` (
  `user_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `email_address` varchar(255) UNIQUE NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `nick_name` varchar(12) UNIQUE NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL
);

CREATE TABLE `user_profile` (
  `user_id` bigint PRIMARY KEY,
  `first_name` varchar(3) NOT NULL,
  `last_name` varchar(3) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` varchar(1) NOT NULL COMMENT 'M: 남성, F: 여성',
  `profile_image_url` varchar(255) NOT NULL
);

CREATE TABLE `user_address` (
  `address_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `postal_code` varchar(5) NOT NULL,
  `address_default` varchar(200) NOT NULL,
  `address_detail` varchar(100) NOT NULL,
  `is_default` boolean NOT NULL,
  `recipient_name` varchar(6) NOT NULL,
  `recipient_phone` varchar(13) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL
);

CREATE TABLE `user_role` (
  `user_id` bigint NOT NULL,
  `role_id` integer NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`)
);

CREATE TABLE `role` (
  `role_id` integer PRIMARY KEY AUTO_INCREMENT,
  `role_name` varchar(30) UNIQUE NOT NULL,
  `role_description` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
);

CREATE TABLE `role_permission` (
  `role_id` integer NOT NULL,
  `permission_id` integer NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`)
);

CREATE TABLE `permission` (
  `permission_id` integer PRIMARY KEY AUTO_INCREMENT,
  `permission_name` varchar(30) UNIQUE NOT NULL,
  `permission_description` varchar(200) NOT NULL,
  `resource_type` varchar(50) NOT NULL,
  `action_type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
);

CREATE TABLE `merchant` (
  `merchant_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `business_registration_number` varchar(12) UNIQUE NOT NULL,
  `telecom_sales_number` varchar(50) UNIQUE NOT NULL,
  `business_name` varchar(20) NOT NULL,
  `business_address` varchar(255) NOT NULL,
  `postal_code` varchar(5) NOT NULL,
  `customer_service_phone` varchar(15) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `representative_name` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL
);

CREATE TABLE `merchant_notification` (
  `notification_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `merchant_id` bigint NOT NULL,
  `notification_type` varchar(20) NOT NULL,
  `related_order_number` varchar(16) NULL,
  `related_product_id` bigint NULL,
  `is_processed` boolean NOT NULL,
  `created_at` timestamp NOT NULL,
  `processed_at` timestamp NULL
);

CREATE TABLE `store` (
  `store_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `merchant_id` bigint NOT NULL,
  `store_name` varchar(30) UNIQUE NOT NULL,
  `store_description` varchar(200) NOT NULL,
  `logo_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL
);

CREATE TABLE `coupon` (
  `coupon_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `store_id` bigint NOT NULL,
  `coupon_name` varchar(30) NOT NULL,
  `discount_type` varchar(20) NOT NULL COMMENT 'PERCENTAGE: 퍼센트 할인, FIXED_AMOUNT: 정액 할인',
  `discount_value` decimal(10,2) NOT NULL COMMENT '할인율(%) 또는 할인 금액',
  `min_order_amount` decimal(10,2) NULL,
  `max_discount_value` decimal(10,2) NULL
);

CREATE TABLE `user_coupon` (
  `user_coupon_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `coupon_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `issued_at` timestamp NOT NULL,
  `expired_at` timestamp NOT NULL,
  `used_order_number` varchar(16) NULL
);

CREATE TABLE `category` (
  `category_id` integer PRIMARY KEY AUTO_INCREMENT,
  `parent_category_id` integer NULL,
  `store_id` bigint NOT NULL,
  `depth` integer NOT NULL,
  `category_name` varchar(30) NOT NULL
);

CREATE TABLE `product` (
  `product_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `category_id` integer NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `product_description_json` varchar(255) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL
);

CREATE TABLE `product_option` (
  `option_id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `option_name` varchar(30) NOT NULL,
  `additional_price` decimal(10,2) NOT NULL
);

CREATE TABLE `product_image` (
  `image_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `sort_order` integer NOT NULL
);

CREATE TABLE `discount` (
  `discount_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `store_id` bigint NOT NULL,
  `discount_name` varchar(30) NOT NULL,
  `discount_type` varchar(20) NOT NULL COMMENT 'PERCENTAGE: 퍼센트 할인, FIXED_AMOUNT: 정액 할인',
  `discount_value` decimal(10,2) NOT NULL COMMENT '할인율(%) 또는 할인 금액',
  `max_discount_amount` decimal(10,2) NULL,
  `start_date` timestamp NOT NULL,
  `end_date` timestamp NOT NULL,
  `is_active` boolean NOT NULL DEFAULT true,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL
);

CREATE TABLE `discount_product` (
  `discount_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`discount_id`, `product_id`)
);

CREATE TABLE `order` (
  `order_number` varchar(16) PRIMARY KEY,
  `user_id` bigint NOT NULL,
  `store_id` bigint NOT NULL,
  `total_product_amount` decimal(10,2) NOT NULL,
  `total_delivery_fee` decimal(10,2) NOT NULL,
  `coupon_discount` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '쿠폰 할인 금액',
  `product_discount` decimal(10,2) NOT NULL DEFAULT 0 COMMENT '상품 할인 금액',
  `final_payment_amount` decimal(10,2) NOT NULL,
  `ordered_at` timestamp NOT NULL
);

CREATE TABLE `order_item` (
  `order_item_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `order_number` varchar(16) NOT NULL,
  `product_id` bigint NOT NULL,
  `option_id` integer NOT NULL,
  `product_name_snapshot` varchar(30) NOT NULL,
  `option_name_snapshot` varchar(30) NOT NULL,
  `quantity` integer NOT NULL,
  `unit_price` decimal(10,2) NOT NULL COMMENT '옵션 포함 단가',
  `total_price` decimal(10,2) NOT NULL
);

CREATE TABLE `payment` (
  `payment_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `related_order_number` varchar(16) NOT NULL,
  `user_id` bigint NOT NULL,
  `payment_method_id` integer NOT NULL,
  `payment_method_type_snapshot` varchar(20) NOT NULL,
  `card_number_masked_snapshot` varchar(19) NULL,
  `card_company_name_snapshot` varchar(30) NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `payment_status` varchar(20) NOT NULL COMMENT 'PENDING: 대기중, COMPLETED: 완료, FAILED: 실패, CANCELLED: 취소',
  `requested_at` timestamp NOT NULL,
  `completed_at` timestamp NULL
);

CREATE TABLE `payment_method` (
  `payment_method_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `payment_method_type` varchar(20) NOT NULL COMMENT 'CREDIT_CARD: 신용카드, DEBIT_CARD: 체크카드, KAKAO_PAY: 카카오페이, NAVER_PAY 네이버페이, TOSS_PAY 토스페이',
  `pg_provider_code` varchar(20) NOT NULL,
  `pg_token` text NOT NULL,
  `card_number_masked` varchar(19) NOT NULL,
  `card_company_name` varchar(30) NOT NULL,
  `expiry_date` timestamp NOT NULL,
  `is_default` boolean NOT NULL,
  `created_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL
);

CREATE TABLE `payment_log` (
  `payment_log_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `payment_id` bigint NOT NULL,
  `external_transaction_id` varchar(20) NOT NULL,
  `processing_status` varchar(20) NOT NULL,
  `pg_response_code` varchar(10) NOT NULL,
  `response_message` text NULL,
  `transaction_date` timestamp NOT NULL
);

CREATE TABLE `refund` (
  `refund_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `payment_id` bigint NOT NULL,
  `refund_amount` decimal(10,2) NOT NULL,
  `refund_reason` varchar(20) NOT NULL,
  `refund_status` varchar(20) NOT NULL COMMENT 'REQUESTED: 요청됨, PROCESSING: 처리중, COMPLETED: 완료, FAILED: 실패',

  `requested_at` timestamp NOT NULL,
  `completed_at` timestamp NULL
);

CREATE TABLE `refund_log` (
  `refund_log_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `refund_id` bigint NOT NULL,
  `external_transaction_id` text NOT NULL,
  `processing_status` varchar(20) NOT NULL,
  `pg_response_code` varchar(10) NOT NULL,
  `response_message` text NULL,
  `transaction_at` timestamp NOT NULL
);

CREATE TABLE `delivery` (
  `delivery_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `order_number` varchar(16) NOT NULL,
  `address_id` bigint NOT NULL,
  `postal_code_snapshot` varchar(5) NOT NULL,
  `address_default_snapshot` varchar(200) NOT NULL,
  `address_detail_snapshot` varchar(100) NOT NULL,
  `recipient_name` varchar(6) NOT NULL,
  `recipient_phone` varchar(13) NOT NULL,
  `courier_code` varchar(10) NOT NULL,
  `tracking_number` varchar(20) NULL,
  `delivery_memo` text NULL,
  `delivery_status` varchar(20) NOT NULL COMMENT 'PREPARING: 배송 준비중, IN_TRANSIT: 배송중, OUT_FOR_DELIVERY: 배송 출발, DELIVERED: 배송 완료, FAILED: 배송 실패',
  `updated_at` timestamp NOT NULL
);

CREATE TABLE `delivery_policy` (
  `policy_id` integer PRIMARY KEY AUTO_INCREMENT,
  `store_id` bigint NOT NULL,
  `policy_name` varchar(30) NOT NULL,
  `base_delivery_fee` decimal(10,2) NOT NULL,
  `free_delivery_threshold` decimal(10,2) NULL COMMENT 'NULL이면 무료배송 없음, 값이 있으면 해당 금액 이상 구매 시 무료배송',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL
);

CREATE TABLE `review` (
  `review_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `option_id` integer NOT NULL,
  `order_number` varchar(16) NOT NULL,
  `user_id` bigint NOT NULL,
  `rating` integer NOT NULL COMMENT '1~5점',
  `content` text NOT NULL,
  `helpful_count` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `deleted_at` timestamp NULL
);

CREATE TABLE `review_summary` (
  `review_summary_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `total_review_count` integer NOT NULL,
  `average_rating` decimal(10,2) NOT NULL,
  `rating_1_count` integer NOT NULL,
  `rating_2_count` integer NOT NULL,
  `rating_3_count` integer NOT NULL,
  `rating_4_count` integer NOT NULL,
  `rating_5_count` integer NOT NULL
);

CREATE TABLE `inquiry` (
  `inquiry_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `inquiry_detail` text NOT NULL,
  `answer_detail` text NOT NULL,
  `is_public` boolean NOT NULL,
  `created_at` timestamp NOT NULL,
  `answered_at` timestamp NULL
);

CREATE TABLE `sales_statistics` (
  `sales_statistics_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `store_id` bigint NOT NULL,
  `period_type` varchar(20) NOT NULL,
  `statistics_date` timestamp NOT NULL,
  `total_order_count` integer NOT NULL,
  `total_sales_amount` decimal(10,2) NOT NULL,
  `average_order_amount` decimal(10,2) NOT NULL,
  `new_customer_count` integer NOT NULL,
  `returning_customer_count` integer NOT NULL
);

CREATE TABLE `search_analytics` (
  `search_analytics_id` bigint PRIMARY KEY AUTO_INCREMENT,
  `store_id` bigint NOT NULL,
  `search_keyword` text NOT NULL,
  `search_date` date NOT NULL,
  `search_count` integer NOT NULL,
  `result_count` integer NOT NULL,
  `click_count` integer NOT NULL,
  `conversion_count` integer NOT NULL
);



ALTER TABLE `user_profile` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_address` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `role_permission` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

ALTER TABLE `role_permission` ADD FOREIGN KEY (`permission_id`) REFERENCES `permission` (`permission_id`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_role` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

ALTER TABLE `merchant` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `merchant_notification` ADD FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`);

ALTER TABLE `merchant_notification` ADD FOREIGN KEY (`related_order_number`) REFERENCES `order` (`order_number`) ON DELETE SET NULL;

ALTER TABLE `merchant_notification` ADD FOREIGN KEY (`related_product_id`) REFERENCES `product` (`product_id`) ON DELETE SET NULL;

ALTER TABLE `store` ADD FOREIGN KEY (`merchant_id`) REFERENCES `merchant` (`merchant_id`);

ALTER TABLE `coupon` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `user_coupon` ADD FOREIGN KEY (`coupon_id`) REFERENCES `coupon` (`coupon_id`);

ALTER TABLE `user_coupon` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `user_coupon` ADD FOREIGN KEY (`used_order_number`) REFERENCES `order` (`order_number`);

ALTER TABLE `category` ADD FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `category` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `product` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

ALTER TABLE `product_option` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `product_image` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `discount` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `discount_product` ADD FOREIGN KEY (`discount_id`) REFERENCES `discount` (`discount_id`);

ALTER TABLE `discount_product` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `order` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `order` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `order_item` ADD FOREIGN KEY (`order_number`) REFERENCES `order` (`order_number`);

ALTER TABLE `order_item` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `order_item` ADD FOREIGN KEY (`option_id`) REFERENCES `product_option` (`option_id`);

ALTER TABLE `payment` ADD FOREIGN KEY (`related_order_number`) REFERENCES `order` (`order_number`);

ALTER TABLE `payment` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `payment` ADD FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`payment_method_id`);

ALTER TABLE `payment_method` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `payment_log` ADD FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`);

ALTER TABLE `refund` ADD FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`);

ALTER TABLE `refund_log` ADD FOREIGN KEY (`refund_id`) REFERENCES `refund` (`refund_id`);

ALTER TABLE `delivery` ADD FOREIGN KEY (`order_number`) REFERENCES `order` (`order_number`);

ALTER TABLE `delivery` ADD FOREIGN KEY (`address_id`) REFERENCES `user_address` (`address_id`);

ALTER TABLE `delivery_policy` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `review` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `review` ADD FOREIGN KEY (`option_id`) REFERENCES `product_option` (`option_id`);

ALTER TABLE `review` ADD FOREIGN KEY (`order_number`) REFERENCES `order` (`order_number`);

ALTER TABLE `review` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `review_summary` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `inquiry` ADD FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

ALTER TABLE `inquiry` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `sales_statistics` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);

ALTER TABLE `search_analytics` ADD FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`);
