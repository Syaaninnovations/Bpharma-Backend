-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2025 at 04:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pharma`
--

-- --------------------------------------------------------

--
-- Table structure for table `claims`
--

CREATE TABLE `claims` (
  `claim_id` int(11) NOT NULL,
  `requested_emp_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `distributor_id` int(11) NOT NULL,
  `requested_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `claims`
--

INSERT INTO `claims` (`claim_id`, `requested_emp_id`, `created_by`, `created_on`, `distributor_id`, `requested_date`) VALUES
(1, 2, 1, '2025-01-02 12:26:28', 1, '2024-01-02 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `claim_log`
--

CREATE TABLE `claim_log` (
  `claim_log_id` int(11) NOT NULL,
  `claim_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `free_qty` int(11) DEFAULT 0,
  `total_qty` int(11) DEFAULT 0,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `requested_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `claim_log`
--

INSERT INTO `claim_log` (`claim_log_id`, `claim_id`, `product_id`, `free_qty`, `total_qty`, `created_on`, `created_by`, `updated_on`, `updated_by`, `remarks`, `status_id`, `requested_date`) VALUES
(1, 1, 1, 5, 5, '2025-01-08 04:44:39', 1, '2025-01-08 04:46:30', 1, 'Remark Data Update', 1, '2024-01-02');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` int(11) NOT NULL,
  `country_code` varchar(255) NOT NULL,
  `country_name` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`country_id`, `country_code`, `country_name`, `created_on`, `created_by`, `createdAt`, `updatedAt`) VALUES
(3, 'IN', 'India', '2024-12-27 17:06:48', 1, '2024-12-27 17:06:48', '2024-12-27 17:06:48');

-- --------------------------------------------------------

--
-- Table structure for table `distributor`
--

CREATE TABLE `distributor` (
  `distributor_id` int(11) NOT NULL,
  `distributor_name` varchar(255) NOT NULL,
  `distributor_code` varchar(255) DEFAULT NULL,
  `distributor_district_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `created_by` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `address_1` varchar(255) NOT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `distr_phone_number` varchar(255) NOT NULL,
  `distr_email` varchar(255) NOT NULL,
  `emp_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `distributor`
--

INSERT INTO `distributor` (`distributor_id`, `distributor_name`, `distributor_code`, `distributor_district_id`, `is_active`, `created_by`, `created_on`, `updated_by`, `updated_on`, `address_1`, `address_2`, `distr_phone_number`, `distr_email`, `emp_id`) VALUES
(1, 'David Billa Update', 'D-0001', 1, 0, 1, '2024-12-28 14:16:45', 1, '2025-01-02 09:50:23', 'Test Address update', 'Test Address Two update', '9874563211', 'billa1@yopmail.com', 2),
(2, 'Abdur Ravouf', 'D-002', 1, 0, 1, '2024-12-28 15:01:05', 1, '2025-01-02 09:44:04', 'Test Address Abdur', 'Test Address Two Abdur', '9874563277', 'abdur@yopmail.com', 3);

-- --------------------------------------------------------

--
-- Table structure for table `district`
--

CREATE TABLE `district` (
  `district_id` int(11) NOT NULL,
  `district_name` varchar(255) NOT NULL,
  `district_code` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `created_by` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `district`
--

INSERT INTO `district` (`district_id`, `district_name`, `district_code`, `is_active`, `created_by`, `created_on`, `state_id`, `country_id`) VALUES
(1, 'Chennai', 'CH', 0, 1, '2024-12-30 10:58:10', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `emp_id` int(11) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `emp_code` varchar(255) NOT NULL,
  `phone_num` varchar(255) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `district_id` int(11) NOT NULL,
  `distributer_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `status_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`emp_id`, `display_name`, `emp_code`, `phone_num`, `email_id`, `district_id`, `distributer_id`, `first_name`, `last_name`, `is_active`, `status_id`, `created_by`, `created_on`, `updated_by`, `updated_on`) VALUES
(2, 'Employee Update', 'Emp#001', '7412589631', 'firstemp1@yopmail.com', 1, 1, 'First1', 'Employee1', 0, 1, 1, '2024-12-30 12:17:59', 1, '2025-01-02 09:57:17'),
(3, 'Abdur Employee', 'Emp#002', '7412589631', 'abduremployee@yopmail.com', 1, 1, 'Abdur', 'Employee', 0, 1, 1, '2025-01-02 05:25:39', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `expiries`
--

CREATE TABLE `expiries` (
  `expairy_req_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `requested_emp_id` int(11) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `expairy_req_date` datetime NOT NULL,
  `customer_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expiries`
--

INSERT INTO `expiries` (`expairy_req_id`, `product_id`, `requested_emp_id`, `total_qty`, `remarks`, `status`, `created_by`, `created_on`, `updated_by`, `updated_on`, `expairy_req_date`, `customer_name`) VALUES
(1, 1, 2, 11, 'Remark Data Update', 'Test Status Update', 1, '2025-01-02 08:46:44', 1, NULL, '2024-01-01 00:00:00', 'David Billa'),
(2, 1, 2, 10, 'Remark Data', 'Test Status', 1, '2025-01-02 08:43:53', NULL, NULL, '2024-01-02 00:00:00', 'David Billa');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `offer_id` int(11) NOT NULL,
  `requested_emp_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `requested_date` datetime NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_location` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `offer_qty` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`offer_id`, `requested_emp_id`, `created_by`, `created_on`, `requested_date`, `product_id`, `customer_name`, `customer_location`, `qty`, `offer_qty`, `status_id`, `updated_by`, `updated_on`) VALUES
(1, 2, 1, '2025-01-08 05:49:16', '2024-01-02 00:00:00', 1, 'David Billa Update', 'test location Update', 7, 7, 1, 1, '2025-01-08 05:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `batch_no` varchar(255) DEFAULT NULL,
  `near_expiry` tinyint(1) DEFAULT NULL,
  `packing` varchar(255) DEFAULT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_code`, `is_active`, `batch_no`, `near_expiry`, `packing`, `created_on`, `created_by`, `updated_on`, `updated_by`) VALUES
(1, 'Samsung Monitor Update', 'SamsungMonitor#789', 0, 'Batch#700', 0, 'Pack#123', '2025-01-02 06:41:52', 1, '2025-01-02 06:43:19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`, `is_active`, `created_on`, `created_by`, `updated_on`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Superadmin', 0, '2024-12-26 16:20:21', 1, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Admin', 0, '2024-12-26 16:20:21', 1, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'User', 0, '2024-12-26 16:20:21', 1, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Employee', 1, '2024-12-27 06:48:21', 1, '2025-01-02 09:38:13', 1, '2024-12-27 06:48:21', '2025-01-02 09:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `sample_requests`
--

CREATE TABLE `sample_requests` (
  `sample_req_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `requested_emp_id` int(11) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `requested_date` datetime NOT NULL,
  `customer_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sample_requests`
--

INSERT INTO `sample_requests` (`sample_req_id`, `product_id`, `requested_emp_id`, `total_qty`, `remarks`, `status`, `created_by`, `created_on`, `updated_by`, `updated_on`, `requested_date`, `customer_name`) VALUES
(1, 1, 2, 10, 'Remark Test Update', 'Test Status', 1, '2025-01-02 11:41:16', 1, '2025-01-02 11:42:19', '2024-01-02 00:00:00', 'New User');

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `state_id` int(11) NOT NULL,
  `state_code` varchar(255) NOT NULL,
  `state_name` varchar(255) NOT NULL,
  `country_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`state_id`, `state_code`, `state_name`, `country_id`, `created_by`, `created_on`) VALUES
(3, 'PY', 'Pondicherry', 3, 1, '2024-12-27 17:07:45');

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_on` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`status_id`, `status_name`, `is_active`, `created_on`, `created_by`, `updated_on`, `updated_by`, `createdAt`, `updatedAt`) VALUES
(1, 'Active', 0, '2024-12-26 16:20:21', 1, NULL, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Inactive', 0, '2024-12-26 16:20:21', 1, '2024-12-27 07:24:05', 1, '0000-00-00 00:00:00', '2024-12-27 07:24:05'),
(4, 'Resume', 1, '2024-12-27 07:18:19', 1, '2025-01-02 09:30:24', 1, '2024-12-27 07:18:19', '2025-01-02 09:30:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `emp_code` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `status_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `status_date` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `emp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `emp_code`, `user_password`, `status_id`, `is_active`, `created_by`, `created_on`, `status_date`, `updated_by`, `updated_on`, `emp_id`) VALUES
(1, 'SUPER001', '$2a$10$AG652jemaGgfwxAPwMz6iOXK5iFbXHZsJz48BYUSRwjuLDtiWt2p.', 1, 1, 1, '2024-12-26 16:20:21', NULL, NULL, NULL, 0),
(7, 'Emp#001', '$2a$10$fLhNh/inG30sXO.m5PZ5jOyvqnRc.3btDViNUhzXkElAvmY2Cww6G', 1, 1, 1, '2024-12-30 12:17:59', '2024-12-30 12:17:59', NULL, NULL, 2),
(8, 'Emp#002', '$2a$10$nBf6WM0SPKQJ.8cShHy4Uuk1TVT1QbU6T5T3jBc7VwZhEE.ZVphGC', 1, 1, 1, '2025-01-02 05:25:40', '2025-01-02 05:25:40', NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `updated_by` int(11) DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_role_id`, `user_id`, `role_id`, `is_active`, `updated_by`, `updated_on`, `created_by`, `created_on`) VALUES
(1, 7, 5, 1, NULL, NULL, 1, '2024-12-30 12:17:59'),
(2, 8, 5, 1, NULL, NULL, 1, '2025-01-02 05:25:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `claims`
--
ALTER TABLE `claims`
  ADD PRIMARY KEY (`claim_id`),
  ADD KEY `requested_emp_id` (`requested_emp_id`),
  ADD KEY `distributor_id` (`distributor_id`);

--
-- Indexes for table `claim_log`
--
ALTER TABLE `claim_log`
  ADD PRIMARY KEY (`claim_log_id`),
  ADD KEY `claim_id` (`claim_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `distributor`
--
ALTER TABLE `distributor`
  ADD PRIMARY KEY (`distributor_id`),
  ADD KEY `distributor_district_id` (`distributor_district_id`);

--
-- Indexes for table `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`district_id`),
  ADD UNIQUE KEY `district_code` (`district_code`),
  ADD UNIQUE KEY `district_code_2` (`district_code`),
  ADD UNIQUE KEY `district_code_3` (`district_code`),
  ADD UNIQUE KEY `district_code_4` (`district_code`),
  ADD UNIQUE KEY `district_code_5` (`district_code`),
  ADD UNIQUE KEY `district_code_6` (`district_code`),
  ADD UNIQUE KEY `district_code_7` (`district_code`),
  ADD UNIQUE KEY `district_code_8` (`district_code`),
  ADD UNIQUE KEY `district_code_9` (`district_code`),
  ADD UNIQUE KEY `district_code_10` (`district_code`),
  ADD UNIQUE KEY `district_code_11` (`district_code`),
  ADD UNIQUE KEY `district_code_12` (`district_code`),
  ADD UNIQUE KEY `district_code_13` (`district_code`),
  ADD UNIQUE KEY `district_code_14` (`district_code`),
  ADD UNIQUE KEY `district_code_15` (`district_code`),
  ADD UNIQUE KEY `district_code_16` (`district_code`),
  ADD UNIQUE KEY `district_code_17` (`district_code`),
  ADD UNIQUE KEY `district_code_18` (`district_code`),
  ADD UNIQUE KEY `district_code_19` (`district_code`),
  ADD UNIQUE KEY `district_code_20` (`district_code`),
  ADD UNIQUE KEY `district_code_21` (`district_code`),
  ADD UNIQUE KEY `district_code_22` (`district_code`),
  ADD KEY `state_id` (`state_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`emp_id`),
  ADD UNIQUE KEY `emp_code` (`emp_code`),
  ADD UNIQUE KEY `emp_code_2` (`emp_code`),
  ADD UNIQUE KEY `emp_code_3` (`emp_code`),
  ADD UNIQUE KEY `emp_code_4` (`emp_code`),
  ADD UNIQUE KEY `emp_code_5` (`emp_code`),
  ADD UNIQUE KEY `emp_code_6` (`emp_code`),
  ADD UNIQUE KEY `emp_code_7` (`emp_code`),
  ADD UNIQUE KEY `emp_code_8` (`emp_code`),
  ADD UNIQUE KEY `emp_code_9` (`emp_code`),
  ADD UNIQUE KEY `emp_code_10` (`emp_code`),
  ADD UNIQUE KEY `emp_code_11` (`emp_code`),
  ADD UNIQUE KEY `emp_code_12` (`emp_code`),
  ADD KEY `district_id` (`district_id`),
  ADD KEY `distributer_id` (`distributer_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `expiries`
--
ALTER TABLE `expiries`
  ADD PRIMARY KEY (`expairy_req_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `requested_emp_id` (`requested_emp_id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`offer_id`),
  ADD KEY `requested_emp_id` (`requested_emp_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_code` (`product_code`),
  ADD UNIQUE KEY `product_code_2` (`product_code`),
  ADD UNIQUE KEY `product_code_3` (`product_code`),
  ADD UNIQUE KEY `product_code_4` (`product_code`),
  ADD UNIQUE KEY `product_code_5` (`product_code`),
  ADD UNIQUE KEY `product_code_6` (`product_code`),
  ADD UNIQUE KEY `product_code_7` (`product_code`),
  ADD UNIQUE KEY `product_code_8` (`product_code`),
  ADD UNIQUE KEY `product_code_9` (`product_code`),
  ADD UNIQUE KEY `product_code_10` (`product_code`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `sample_requests`
--
ALTER TABLE `sample_requests`
  ADD PRIMARY KEY (`sample_req_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `requested_emp_id` (`requested_emp_id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`state_id`),
  ADD UNIQUE KEY `state_code` (`state_code`),
  ADD UNIQUE KEY `state_code_2` (`state_code`),
  ADD UNIQUE KEY `state_code_3` (`state_code`),
  ADD UNIQUE KEY `state_code_4` (`state_code`),
  ADD UNIQUE KEY `state_code_5` (`state_code`),
  ADD UNIQUE KEY `state_code_6` (`state_code`),
  ADD UNIQUE KEY `state_code_7` (`state_code`),
  ADD UNIQUE KEY `state_code_8` (`state_code`),
  ADD UNIQUE KEY `state_code_9` (`state_code`),
  ADD UNIQUE KEY `state_code_10` (`state_code`),
  ADD UNIQUE KEY `state_code_11` (`state_code`),
  ADD UNIQUE KEY `state_code_12` (`state_code`),
  ADD UNIQUE KEY `state_code_13` (`state_code`),
  ADD UNIQUE KEY `state_code_14` (`state_code`),
  ADD UNIQUE KEY `state_code_15` (`state_code`),
  ADD UNIQUE KEY `state_code_16` (`state_code`),
  ADD UNIQUE KEY `state_code_17` (`state_code`),
  ADD UNIQUE KEY `state_code_18` (`state_code`),
  ADD UNIQUE KEY `state_code_19` (`state_code`),
  ADD UNIQUE KEY `state_code_20` (`state_code`),
  ADD UNIQUE KEY `state_code_21` (`state_code`),
  ADD UNIQUE KEY `state_code_22` (`state_code`),
  ADD UNIQUE KEY `state_code_23` (`state_code`),
  ADD UNIQUE KEY `state_code_24` (`state_code`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_role_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `claims`
--
ALTER TABLE `claims`
  MODIFY `claim_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `claim_log`
--
ALTER TABLE `claim_log`
  MODIFY `claim_log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `distributor`
--
ALTER TABLE `distributor`
  MODIFY `distributor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `district`
--
ALTER TABLE `district`
  MODIFY `district_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `expiries`
--
ALTER TABLE `expiries`
  MODIFY `expairy_req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sample_requests`
--
ALTER TABLE `sample_requests`
  MODIFY `sample_req_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `claims`
--
ALTER TABLE `claims`
  ADD CONSTRAINT `claims_ibfk_5` FOREIGN KEY (`requested_emp_id`) REFERENCES `employees` (`emp_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `claims_ibfk_6` FOREIGN KEY (`distributor_id`) REFERENCES `distributor` (`distributor_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `claim_log`
--
ALTER TABLE `claim_log`
  ADD CONSTRAINT `claim_log_ibfk_4` FOREIGN KEY (`claim_id`) REFERENCES `claims` (`claim_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `claim_log_ibfk_5` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `claim_log_ibfk_6` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`status_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `distributor`
--
ALTER TABLE `distributor`
  ADD CONSTRAINT `distributor_ibfk_1` FOREIGN KEY (`distributor_district_id`) REFERENCES `district` (`district_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `district`
--
ALTER TABLE `district`
  ADD CONSTRAINT `district_ibfk_43` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `district_ibfk_44` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_34` FOREIGN KEY (`district_id`) REFERENCES `district` (`district_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_35` FOREIGN KEY (`distributer_id`) REFERENCES `distributor` (`distributor_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_36` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`status_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `expiries`
--
ALTER TABLE `expiries`
  ADD CONSTRAINT `expiries_ibfk_13` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `expiries_ibfk_14` FOREIGN KEY (`requested_emp_id`) REFERENCES `employees` (`emp_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`requested_emp_id`) REFERENCES `employees` (`emp_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `offers_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `offers_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`status_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `sample_requests`
--
ALTER TABLE `sample_requests`
  ADD CONSTRAINT `sample_requests_ibfk_10` FOREIGN KEY (`requested_emp_id`) REFERENCES `employees` (`emp_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `sample_requests_ibfk_9` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `state`
--
ALTER TABLE `state`
  ADD CONSTRAINT `state_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`status_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_33` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_34` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
