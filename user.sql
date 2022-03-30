-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 30 mars 2022 à 00:03
-- Version du serveur :  8.0.28-0ubuntu0.20.04.3
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `user`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `pseudo` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mail` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `mail`, `password`) VALUES
(2, 'Cyril', 'cyril.cuvelier@student.junia.com', '$2b$10$ukNX92dsRzcmLgfD7wN/0eI01d350pPSPu2ZlVH5WCl8BBlTQN8jm'),
(4, 'Zoé', 'zoe.desmons@gmail.com', '$2b$10$Nrw0UYKXNM6xn4KEqxv2A.d7xDoipMU9BlEkarH.rfHKZTzuw87Ti'),
(5, 'Paul', 'paul@gmail.com', '$2b$10$/OnH8VrWewQ9h7PW3Qryue40PkuqfORheBVW9otXgBmNRSnVo3MDe'),
(6, 'Dofus', 'dofus@gaming.fr', '$2b$10$S6V1khf3ZEERlMatnPqQSepmBEfl.MM.ylCeaUt2aq9m7abLXNLKO'),
(7, 'Q', 'q@gmail.com', '$2b$10$/pFKI/MBUDdPLqP8gCv5R.SsnAoVmo/WwWvEUmMQY2uQ5Ar/zlbla'),
(8, 'QR', 'q@gmail.comr', '$2b$10$YyRo9nWDTi05qHhLh2GxCuvU.cyqZmLCABAE4RbKkOo5AbHifWx1S');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
