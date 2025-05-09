-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2025 a las 20:20:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `servicio_tecnico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2025_04_09_180537_create_personal_access_tokens_table', 1),
(4, '2025_04_09_180737_create_users_table', 1),
(5, '2025_04_09_181054_create_servicios_table', 1),
(6, '2025_04_09_184219_create_sessions_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 4, 'auth_token', '3b41b7f5427d5f38ba1606a7399ad3d9460768670531745e3f18228fa701d847', '[\"*\"]', NULL, NULL, '2025-04-10 05:51:22', '2025-04-10 05:51:22'),
(73, 'App\\Models\\User', 14, 'auth_token', 'e469ffd1532cbf3babd843c0e9f8d833b0c784de5448c906f23bbe8fc3501741', '[\"*\"]', NULL, NULL, '2025-04-23 06:18:44', '2025-04-23 06:18:44'),
(74, 'App\\Models\\User', 1, 'api-token', '9de38e8108f3c1f6f33126ce2b44ad562f4733abc892f763f9f9c183cf13c801', '[\"*\"]', NULL, NULL, '2025-04-23 06:18:57', '2025-04-23 06:18:57'),
(75, 'App\\Models\\User', 10, 'api-token', '7f791d95da01bfbb81128286bb0cd507a39df321d2f0f4b2aee2f52cd934cfd1', '[\"*\"]', '2025-04-23 06:20:30', NULL, '2025-04-23 06:19:20', '2025-04-23 06:20:30'),
(76, 'App\\Models\\User', 15, 'auth_token', '0e35d5206c8f6e431cc357e4b57b9128f9ef731bc62407a6d738d8a69cf3d9e3', '[\"*\"]', NULL, NULL, '2025-04-23 06:21:45', '2025-04-23 06:21:45'),
(80, 'App\\Models\\User', 10, 'api-token', '9f16f52e49f453db4ec98ede909885456f4763d473641c39a9f5298704f70ff8', '[\"*\"]', NULL, NULL, '2025-04-24 05:42:31', '2025-04-24 05:42:31'),
(81, 'App\\Models\\User', 10, 'api-token', '9e5b18e6221f5c886076e8e738c2180e2068b9463a400043aded7a1136f01a23', '[\"*\"]', NULL, NULL, '2025-04-24 05:42:56', '2025-04-24 05:42:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cliente_id` bigint(20) UNSIGNED NOT NULL,
  `tecnico_id` bigint(20) UNSIGNED DEFAULT NULL,
  `tipo_equipo` varchar(255) NOT NULL,
  `marca` varchar(255) NOT NULL,
  `modelo` varchar(255) NOT NULL,
  `descripcion_problema` text NOT NULL,
  `estado` enum('pendiente','en_proceso','completado','cancelado') NOT NULL DEFAULT 'pendiente',
  `diagnostico` text DEFAULT NULL,
  `solucion` text DEFAULT NULL,
  `costo` decimal(8,2) DEFAULT NULL,
  `fecha_solicitud` date NOT NULL,
  `fecha_atendido` date DEFAULT NULL,
  `fecha_completado` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `cliente_id`, `tecnico_id`, `tipo_equipo`, `marca`, `modelo`, `descripcion_problema`, `estado`, `diagnostico`, `solucion`, `costo`, `fecha_solicitud`, `fecha_atendido`, `fecha_completado`, `created_at`, `updated_at`) VALUES
(1, 3, NULL, 'lavadora', 'Mabe', 'MOD-4280', 'Hace ruido extraño', 'completado', NULL, NULL, 373.00, '2025-03-14', '2025-03-30', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(2, 3, 2, 'nevera', 'GE', 'MOD-4391', 'No centrifuga', 'pendiente', NULL, NULL, NULL, '2025-03-25', '2025-03-26', '2025-04-06', '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(3, 3, NULL, 'nevera', 'Mabe', 'MOD-7727', 'Hace ruido extraño', 'pendiente', NULL, NULL, NULL, '2025-03-29', '2025-03-29', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(4, 3, NULL, 'lavadora', 'Whirlpool', 'MOD-4860', 'No enfría', 'completado', NULL, NULL, NULL, '2025-03-26', '2025-03-31', '2025-04-09', '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(5, 3, 2, 'lavadora', 'Whirlpool', 'MOD-6203', 'No enciende', 'pendiente', NULL, NULL, 95.00, '2025-03-15', NULL, NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(6, 3, NULL, 'nevera', 'LG', 'MOD-9190', 'Hace ruido extraño', 'completado', NULL, NULL, NULL, '2025-03-23', '2025-03-26', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(7, 3, 2, 'lavadora', 'LG', 'MOD-7208', 'No centrifuga', 'en_proceso', NULL, NULL, 305.00, '2025-03-15', '2025-03-27', '2025-04-09', '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(8, 3, NULL, 'lavadora', 'GE', 'MOD-3688', 'No enfría', 'en_proceso', NULL, NULL, NULL, '2025-03-29', '2025-03-30', '2025-04-05', '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(9, 3, NULL, 'lavadora', 'GE', 'MOD-7327', 'Tiene fugas de agua', 'pendiente', NULL, NULL, 339.00, '2025-03-30', NULL, '2025-04-05', '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(10, 3, 2, 'lavadora', 'Whirlpool', 'MOD-6268', 'No centrifuga', 'en_proceso', NULL, NULL, NULL, '2025-04-04', '2025-03-31', '2025-04-08', '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(11, 3, NULL, 'lavadora', 'Samsung', 'MOD-3438', 'No centrifuga', 'pendiente', NULL, NULL, NULL, '2025-04-06', '2025-03-28', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(12, 3, NULL, 'lavadora', 'LG', 'MOD-5945', 'Hace ruido extraño', 'completado', NULL, NULL, NULL, '2025-03-22', '2025-04-05', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(13, 3, NULL, 'nevera', 'Samsung', 'MOD-6196', 'No enciende', 'en_proceso', NULL, NULL, NULL, '2025-03-14', NULL, NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(14, 3, 2, 'nevera', 'Mabe', 'MOD-2397', 'No enciende', 'completado', NULL, NULL, NULL, '2025-04-02', NULL, '2025-04-07', '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(15, 3, NULL, 'nevera', 'Whirlpool', 'MOD-9864', 'Hace ruido extraño', 'en_proceso', NULL, NULL, 183.00, '2025-03-17', '2025-03-27', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(16, 3, 2, 'nevera', 'Mabe', 'MOD-6627', 'Hace ruido extraño', 'completado', NULL, NULL, NULL, '2025-03-29', NULL, NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(17, 3, NULL, 'lavadora', 'GE', 'MOD-6721', 'Hace ruido extraño', 'pendiente', NULL, NULL, NULL, '2025-03-30', NULL, NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(18, 3, NULL, 'lavadora', 'GE', 'MOD-2741', 'Hace ruido extraño', 'en_proceso', NULL, NULL, 240.00, '2025-03-19', '2025-03-30', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(19, 3, 2, 'nevera', 'GE', 'MOD-7409', 'No enciende', 'pendiente', NULL, NULL, NULL, '2025-03-25', NULL, NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(20, 3, NULL, 'nevera', 'Whirlpool', 'MOD-3486', 'Hace ruido extraño', 'en_proceso', NULL, NULL, NULL, '2025-03-27', NULL, '2025-04-09', '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(21, 6, NULL, 'lavadora', 'Samsung', 'WA1234', 'No centrifuga', 'pendiente', NULL, NULL, NULL, '2025-04-15', NULL, NULL, '2025-04-15 18:31:36', '2025-04-15 18:31:36'),
(22, 6, NULL, 'lavadora', 'LG', 'WA1234', 'No centrifuga', 'pendiente', NULL, NULL, NULL, '2025-04-15', NULL, NULL, '2025-04-15 18:49:35', '2025-04-15 18:49:35'),
(23, 6, NULL, 'lavadora', 'Mabe', 'WA1234', 'No centrifuga', 'pendiente', NULL, NULL, NULL, '2025-04-15', NULL, NULL, '2025-04-15 19:28:29', '2025-04-15 19:28:29'),
(24, 6, NULL, 'lavadora', 'Mabe', 'WA1234', 'No centrifuga', 'pendiente', NULL, NULL, NULL, '2025-04-21', NULL, NULL, '2025-04-22 02:47:54', '2025-04-22 02:47:54'),
(25, 6, NULL, 'lavadora', 'Mabe', 'WA1234', 'No centrifuga', 'pendiente', NULL, NULL, NULL, '2025-04-22', NULL, NULL, '2025-04-22 05:02:20', '2025-04-22 05:02:20'),
(26, 6, NULL, 'lavadora', 'Mabe', 'WA1234', 'no enciende y no funciona el lavado', 'pendiente', NULL, NULL, NULL, '2025-04-22', NULL, NULL, '2025-04-23 04:47:19', '2025-04-23 04:47:19'),
(27, 10, NULL, 'lavadora', 'Mabe', 'WA1234', 'no enciende', 'pendiente', NULL, NULL, NULL, '2025-04-23', NULL, NULL, '2025-04-23 06:20:03', '2025-04-23 06:20:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','tecnico','cliente') NOT NULL DEFAULT 'cliente',
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `phone`, `address`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@electromovil.com', NULL, '$2y$12$4Y4LbWUM800qeuId1toqL.jttbkorzpk2ZzfOWPUpiQoeWSSShITa', 'admin', '3125767402', 'Calle Admin #123', NULL, '2025-04-10 05:47:01', '2025-04-10 05:47:01'),
(2, 'Técnico Uno', 'tecnico@example.com', NULL, '$2y$12$J5svLJEPhLFTNf81cX.nlu4C1EP3YKJdFm6DatyFCEqci7U2cyHPC', 'tecnico', '0987654321', 'Calle Tecnico #456', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(3, 'Cliente Uno', 'cliente@example.com', NULL, '$2y$12$LxFDn/Q2bZEMbx.cUZU15.9vdTYQk8ktuHYtEt1ehV8WMkdR2tvrK', 'cliente', '5555555555', 'Calle Cliente #789', NULL, '2025-04-10 05:47:02', '2025-04-10 05:47:02'),
(4, 'Jonathan Segura', 'segura@gmail.com', NULL, '$2y$12$8LCSpUaWF6cnTKgUldgQa.RhL2na5AE/1r5RUYDcBDsyHWoRcwWuy', 'cliente', '1234567890', 'Dirección del tecnico 123', NULL, '2025-04-10 05:51:22', '2025-04-10 05:51:22'),
(6, 'yuly astrid', 'yuly@gmail.com', NULL, '$2y$12$jm62dtQIMc480mZLiq.Z1.Q33tP7409IrsDSTvD8nJjQjgdA.amsa', 'cliente', '3125747203', 'cr 812', NULL, '2025-04-10 07:03:26', '2025-04-10 07:03:26'),
(7, 'Diader andres', 'diader@gmail.com', NULL, '$2y$12$9QIopMWKiQEDr2C67qe6NeaBLj04pnlL/UKXR6UBLhRGviULKyQqm', 'cliente', '3125747205', 'cr 81 57', NULL, '2025-04-11 04:39:30', '2025-04-11 04:39:30'),
(10, 'Juan Pablo Ballen Gonzalez', 'juanpoxc@gmail.com', NULL, '$2y$12$5eSXUWR94LTFMCmQryBx/Oxq8Y6jqGTYihA1XEGqGMxj4uZ2xC6VW', 'cliente', '000-000-0000', 'Sin dirección', NULL, '2025-04-23 02:12:50', '2025-04-23 02:12:50'),
(11, 'Juan Pablo Ballen Gonzalez', 'juanpablo@gmail.com', NULL, '$2y$12$7ink6zuiS9ASwGpzUvTvf.bO05nKaeuRFIwum/UGKHgk6st6jeQ7C', 'cliente', '000-000-0000', 'Sin dirección', NULL, '2025-04-23 02:13:35', '2025-04-23 02:13:35'),
(12, 'Camila Rodriguez', 'camila@gmail.com', NULL, '$2y$12$zquX0b8KA3kbMAbRwPzm9OiqrYRgQV.RZappHukkzRx2O.6nTPf86', 'cliente', '000-000-0000', 'Sin dirección', NULL, '2025-04-23 02:19:04', '2025-04-23 02:19:04'),
(13, 'Jonathan segura', 'jonathan@gmail.com', NULL, '$2y$12$msVSN359z2OVZcQabXcJ1.PXKGUXqSydTiDlUV2Yej.q.jW497sIm', 'cliente', '000-000-0000', 'Sin dirección', NULL, '2025-04-23 04:22:41', '2025-04-23 04:22:41'),
(14, 'camila electro', 'electro@gmail.com', NULL, '$2y$12$aaMfR5..Ij181VNd0355a.aD5eYl4L4F9msLugfncWEN4LwXgUrwy', 'cliente', '000-000-0000', 'Sin dirección', NULL, '2025-04-23 06:18:44', '2025-04-23 06:18:44'),
(15, 'yuly astrid ballen', 'astrid@gmail.com', NULL, '$2y$12$i/GWVSSY5ogkOrbtAkz4Q.V7MWrh2OHCqNjFRfBkmr/CtBlEWTTJe', 'cliente', '000-000-0000', 'Sin dirección', NULL, '2025-04-23 06:21:45', '2025-04-23 06:21:45');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `servicios_cliente_id_foreign` (`cliente_id`),
  ADD KEY `servicios_tecnico_id_foreign` (`tecnico_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `servicios_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `servicios_tecnico_id_foreign` FOREIGN KEY (`tecnico_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
