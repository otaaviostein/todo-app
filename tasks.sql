-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 02-Set-2020 às 17:31
-- Versão do servidor: 10.1.37-MariaDB
-- versão do PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasks`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tasks`
--

CREATE TABLE `tasks` (
  `taskId` int(10) NOT NULL,
  `taskUserId` int(10) NOT NULL,
  `taskName` varchar(255) COLLATE utf8_bin NOT NULL,
  `taskCreatedDate` date NOT NULL,
  `taskDueDate` date NOT NULL,
  `taskStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Extraindo dados da tabela `tasks`
--

INSERT INTO `tasks` (`taskId`, `taskUserId`, `taskName`, `taskCreatedDate`, `taskDueDate`, `taskStatus`) VALUES
(10, 1, 'teste', '2020-01-01', '2020-01-01', 1),
(11, 1, 'Inspired With Autumn', '0000-00-00', '0000-00-00', 1),
(12, 2, 'Tirar o coco do cachorro', '2020-08-30', '2020-09-01', 0),
(13, 2, 'Tirar o coco do cachorro', '2020-08-30', '2020-09-01', 0),
(14, 2, 'Tirar o lixo', '2020-08-30', '2020-09-01', 0),
(15, 2, 'Tirar o lixo', '2020-08-30', '2020-09-01', 0),
(16, 2, 'Tirar o lixo', '2020-08-30', '2020-09-01', 0),
(17, 2, 'Tirar o lixo123123', '2020-08-30', '2020-09-01', 0),
(18, 2, 'Tirar o lixo', '2020-08-30', '2020-09-01', 0),
(19, 2, 'Tirar o lixo', '2020-08-30', '2020-09-01', 0),
(20, 2, 'Tirar o lixo', '2020-08-30', '2020-09-01', 0),
(21, 2, 'Tirar o lixo', '2020-08-30', '2020-09-01', 0),
(22, 2, 'Tirar o lixo', '2020-08-30', '2020-09-01', 0),
(23, 2, 'Tirar o lixo2', '2020-08-30', '2020-09-01', 1),
(26, 2, 'Tirar o lixo1', '2020-08-30', '2020-09-01', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `userId` int(10) UNSIGNED NOT NULL,
  `userName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `userEmail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `userPassword` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`userId`, `userName`, `userEmail`, `userPassword`) VALUES
(1, 'Fulado', 'fulano@teste.com', '698dc19d489c4e4db73e28a713eab07b'),
(2, 'OTAVIO', 'otavio.stein@gmail.com', 'dd9e2080ceebd0ac714c47d0f8a6c934'),
(3, 'Teste', 'teste@teste.com', '698dc19d489c4e4db73e28a713eab07b'),
(6, 'Teste', 'teste1@teste.com', '698dc19d489c4e4db73e28a713eab07b'),
(7, 'otaaviostein', 'otavio.stein@totvs.com.br', 'dd9e2080ceebd0ac714c47d0f8a6c934');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `users_email_unique` (`userEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
