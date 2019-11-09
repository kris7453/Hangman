-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2017 at 03:06 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wisielec`
--

-- --------------------------------------------------------

--
-- Table structure for table `passwords`
--

CREATE TABLE `passwords` (
  `id` int(11) NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `passwords`
--

INSERT INTO `passwords` (`id`, `password`) VALUES
(3, 'Poprawiony test'),
(6, 'ąćęłńóżź'),
(18, 'asdfgh'),
(20, 'Nowe'),
(21, 'asdfghjk');

-- --------------------------------------------------------

--
-- Table structure for table `scores_board`
--

CREATE TABLE `scores_board` (
  `id` int(11) NOT NULL,
  `user_name` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `scores` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Dumping data for table `scores_board`
--

INSERT INTO `scores_board` (`id`, `user_name`, `scores`) VALUES
(5, 'kris', 40);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `passwords`
--
ALTER TABLE `passwords`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `scores_board`
--
ALTER TABLE `scores_board`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `passwords`
--
ALTER TABLE `passwords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `scores_board`
--
ALTER TABLE `scores_board`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
