-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2024 a las 01:33:23
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
-- Base de datos: `electromovil`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `IDAdministrador` int(50) NOT NULL,
  `NombresAdministrador` varchar(45) DEFAULT NULL,
  `EstadoAdministrador` varchar(45) DEFAULT NULL,
  `ContraseñaAdministrador` varchar(45) DEFAULT NULL,
  `CargoAdministrador` varchar(45) DEFAULT NULL,
  `TelefonoAdministrador` int(15) DEFAULT NULL,
  `NivelDeAccesoAdministrador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacionservicio`
--

CREATE TABLE `calificacionservicio` (
  `idcalificacionservicio` int(11) NOT NULL,
  `PuntuacionCalificacionServicio` varchar(45) DEFAULT NULL,
  `ReseñaCalificacionServicio` varchar(45) DEFAULT NULL,
  `FechaHoraCalificacionServicio` varchar(45) DEFAULT NULL,
  `IDOrdenDeTrabajo` int(11) DEFAULT NULL,
  `calificacionserviciocol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idcliente` int(11) NOT NULL,
  `NombresCliente` varchar(50) DEFAULT NULL,
  `CorreoCliente` varchar(45) DEFAULT NULL,
  `Passwordcliente` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idcliente`, `NombresCliente`, `CorreoCliente`, `Passwordcliente`) VALUES
(1, 'Juan Pablo Ballen Gonzalez', 'juanpoxc@gmail.com', '$2y$10$n4YEehHDsfp780y5VUfHdu3jjGLJjIb9TiqBOLGv11uVOqWkYV/eG'),
(3, 'jonathan', 'jonathan@gmail.com', '$2y$10$ALAB5pVvYPcrTq2I9vUwBuEZ1Nmvgd8jivIUJATNfRQQcaLQjkUoi'),
(4, 'pedro', 'pedro@gmail.com', '$2y$10$2XbD9gw7VDe7up0zpHZZ7.qu0m7xsi2vLcaQ9P1QQLVrqOaNqwlcq'),
(6, 'pepito', 'pepito@gmail.com', '*A4B6157319038724E3560894F7F932C8886EBFCF');

DELETE FROM cliente WHERE idcliente=6;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `electrodomestico`
--

CREATE TABLE `electrodomestico` (
  `idelectrodomestico` int(11) NOT NULL,
  `TipoElectrodomestico` varchar(45) DEFAULT NULL,
  `MarcaElectrodomestico` varchar(45) DEFAULT NULL,
  `ModeloElectrodomestico` varchar(45) DEFAULT NULL,
  `DescripcionDañoElectrodomestico` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `electrodomestico_solicituddeservicio`
--

CREATE TABLE `electrodomestico_solicituddeservicio` (
  `idelectrodomestico_solicituddeservicio` int(11) NOT NULL,
  `IDElectrodomestico` int(11) DEFAULT NULL,
  `IDSolicitudDeServicio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idfactura` int(11) NOT NULL,
  `FechaHoraEmisionFactura` varchar(45) DEFAULT NULL,
  `IDOrdenDePago` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `garantia`
--

CREATE TABLE `garantia` (
  `idgarantia` int(11) NOT NULL,
  `FechaInicioGarantia` varchar(45) DEFAULT NULL,
  `FechaFinalizacionGarantia` varchar(45) DEFAULT NULL,
  `DescripcionGarantia` varchar(45) DEFAULT NULL,
  `ProcedimientoGarantia` varchar(45) DEFAULT NULL,
  `EstadoGarantia` varchar(45) DEFAULT NULL,
  `IDFactura` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `niveldeacceso`
--

CREATE TABLE `niveldeacceso` (
  `idniveldeacceso` int(11) NOT NULL,
  `NombreNivelDeAcceso` varchar(45) DEFAULT NULL,
  `DescripcionNivelDeAcceso` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordendepago`
--

CREATE TABLE `ordendepago` (
  `idordendepago` int(11) NOT NULL,
  `FechaEmisionOrdenDePago` datetime DEFAULT NULL,
  `EstadoDePagoOrdenDePago` varchar(50) DEFAULT NULL,
  `MontoTotalOrdenDePago` decimal(10,2) DEFAULT NULL,
  `IDOrdenDeTrabajo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordendetrabajo`
--

CREATE TABLE `ordendetrabajo` (
  `idordendetrabajo` int(11) NOT NULL,
  `UbicacionOrdenDeTrabajo` varchar(255) DEFAULT NULL,
  `FechaHoraInicioOrdenDeTrabajo` datetime DEFAULT NULL,
  `FechaHoraFinalOrdenDeTrabajo` datetime DEFAULT NULL,
  `EstadoOrdenDeTrabajo` varchar(50) DEFAULT NULL,
  `ObservacionesOrdenDeTrabajo` text DEFAULT NULL,
  `IDTecnico` int(11) DEFAULT NULL,
  `IDSolicitudDeServicio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `idpago` int(11) NOT NULL,
  `MontoPago` decimal(10,2) DEFAULT NULL,
  `MetodoPago` varchar(50) DEFAULT NULL,
  `FechaHoraPago` datetime DEFAULT NULL,
  `IDOrdenDePago` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicituddeservicio`
--

CREATE TABLE `solicituddeservicio` (
  `idsolicituddeservicio` int(11) NOT NULL,
  `EstadoSolicitudDeServicio` varchar(50) DEFAULT NULL,
  `FechaHoraSolicitudDeServicio` datetime DEFAULT NULL,
  `IDAdministrador` int(11) DEFAULT NULL,
  `idtecnico` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnico`
--

CREATE TABLE `tecnico` (
  `idtecnico` int(50) NOT NULL,
  `NombresTecnico` varchar(255) DEFAULT NULL,
  `CorreoTecnico` varchar(255) DEFAULT NULL,
  `PassworddTecnico` varchar(255) DEFAULT NULL,
  `TelefonoTecnico` varchar(15) DEFAULT NULL,
  `EstadoTecnico` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodeservicio_solicituddeservicio`
--

CREATE TABLE `tipodeservicio_solicituddeservicio` (
  `idtipodeservicio_solicituddeservicio` int(11) NOT NULL,
  `IDTipoDeServicio` int(11) DEFAULT NULL,
  `IDSolicitudDeServicio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_de_servicio`
--

CREATE TABLE `tipo_de_servicio` (
  `idtipodeservicio` int(11) NOT NULL,
  `NombreTipoDeServicio` varchar(255) DEFAULT NULL,
  `DescripcionTipoDeServicio` text DEFAULT NULL,
  `CostoTipoDeServicio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`IDAdministrador`),
  ADD KEY `NivelDeAccesoAdministrador_idx` (`NivelDeAccesoAdministrador`);

--
-- Indices de la tabla `calificacionservicio`
--
ALTER TABLE `calificacionservicio`
  ADD PRIMARY KEY (`idcalificacionservicio`),
  ADD KEY `IDOrdenDeTrabajo_idx` (`calificacionserviciocol`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idcliente`);

--
-- Indices de la tabla `electrodomestico`
--
ALTER TABLE `electrodomestico`
  ADD PRIMARY KEY (`idelectrodomestico`);

--
-- Indices de la tabla `electrodomestico_solicituddeservicio`
--
ALTER TABLE `electrodomestico_solicituddeservicio`
  ADD PRIMARY KEY (`idelectrodomestico_solicituddeservicio`),
  ADD KEY `IDElectrodomestico_idx` (`IDElectrodomestico`),
  ADD KEY `IDSolicitudDeServicio_idx` (`IDSolicitudDeServicio`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idfactura`),
  ADD KEY `IDOrdenDePago_idx` (`IDOrdenDePago`);

--
-- Indices de la tabla `garantia`
--
ALTER TABLE `garantia`
  ADD PRIMARY KEY (`idgarantia`),
  ADD KEY `IDFactura_idx` (`IDFactura`);

--
-- Indices de la tabla `niveldeacceso`
--
ALTER TABLE `niveldeacceso`
  ADD PRIMARY KEY (`idniveldeacceso`);

--
-- Indices de la tabla `ordendepago`
--
ALTER TABLE `ordendepago`
  ADD PRIMARY KEY (`idordendepago`),
  ADD KEY `IDOrdenDeTrabajo` (`IDOrdenDeTrabajo`);

--
-- Indices de la tabla `ordendetrabajo`
--
ALTER TABLE `ordendetrabajo`
  ADD PRIMARY KEY (`idordendetrabajo`),
  ADD KEY `IDTecnico` (`IDTecnico`),
  ADD KEY `IDSolicitudDeServicio` (`IDSolicitudDeServicio`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idpago`),
  ADD KEY `IDOrdenDePago` (`IDOrdenDePago`);

--
-- Indices de la tabla `solicituddeservicio`
--
ALTER TABLE `solicituddeservicio`
  ADD PRIMARY KEY (`idsolicituddeservicio`),
  ADD KEY `fk_tecnico` (`idtecnico`),
  ADD KEY `fk_administrador` (`IDAdministrador`);

--
-- Indices de la tabla `tecnico`
--
ALTER TABLE `tecnico`
  ADD PRIMARY KEY (`idtecnico`);

--
-- Indices de la tabla `tipodeservicio_solicituddeservicio`
--
ALTER TABLE `tipodeservicio_solicituddeservicio`
  ADD PRIMARY KEY (`idtipodeservicio_solicituddeservicio`),
  ADD KEY `IDTipoDeServicio` (`IDTipoDeServicio`),
  ADD KEY `IDSolicitudDeServicio` (`IDSolicitudDeServicio`);

--
-- Indices de la tabla `tipo_de_servicio`
--
ALTER TABLE `tipo_de_servicio`
  ADD PRIMARY KEY (`idtipodeservicio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `IDAdministrador` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idcliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ordendepago`
--
ALTER TABLE `ordendepago`
  MODIFY `idordendepago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ordendetrabajo`
--
ALTER TABLE `ordendetrabajo`
  MODIFY `idordendetrabajo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idpago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicituddeservicio`
--
ALTER TABLE `solicituddeservicio`
  MODIFY `idsolicituddeservicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tecnico`
--
ALTER TABLE `tecnico`
  MODIFY `idtecnico` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipodeservicio_solicituddeservicio`
--
ALTER TABLE `tipodeservicio_solicituddeservicio`
  MODIFY `idtipodeservicio_solicituddeservicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_de_servicio`
--
ALTER TABLE `tipo_de_servicio`
  MODIFY `idtipodeservicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `NivelDeAccesoAdministrador` FOREIGN KEY (`NivelDeAccesoAdministrador`) REFERENCES `niveldeacceso` (`idniveldeacceso`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `calificacionservicio`
--
ALTER TABLE `calificacionservicio`
  ADD CONSTRAINT `IDOrdenDeTrabajo` FOREIGN KEY (`calificacionserviciocol`) REFERENCES `ordendetrabajo` (`idordendetrabajo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `electrodomestico_solicituddeservicio`
--
ALTER TABLE `electrodomestico_solicituddeservicio`
  ADD CONSTRAINT `IDElectrodomestico` FOREIGN KEY (`IDElectrodomestico`) REFERENCES `electrodomestico` (`idelectrodomestico`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `IDSolicitudDeServicio` FOREIGN KEY (`IDSolicitudDeServicio`) REFERENCES `solicituddeservicio` (`idsolicituddeservicio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `IDOrdenDePago` FOREIGN KEY (`IDOrdenDePago`) REFERENCES `ordendepago` (`idordendepago`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `garantia`
--
ALTER TABLE `garantia`
  ADD CONSTRAINT `IDFactura` FOREIGN KEY (`IDFactura`) REFERENCES `factura` (`idfactura`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ordendepago`
--
ALTER TABLE `ordendepago`
  ADD CONSTRAINT `ordendepago_ibfk_1` FOREIGN KEY (`IDOrdenDeTrabajo`) REFERENCES `ordendetrabajo` (`idordendetrabajo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ordendetrabajo`
--
ALTER TABLE `ordendetrabajo`
  ADD CONSTRAINT `ordendetrabajo_ibfk_1` FOREIGN KEY (`IDTecnico`) REFERENCES `tecnico` (`idtecnico`) ON DELETE CASCADE,
  ADD CONSTRAINT `ordendetrabajo_ibfk_2` FOREIGN KEY (`IDSolicitudDeServicio`) REFERENCES `solicituddeservicio` (`idsolicituddeservicio`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`IDOrdenDePago`) REFERENCES `ordendepago` (`idordendepago`) ON DELETE CASCADE;

--
-- Filtros para la tabla `solicituddeservicio`
--
ALTER TABLE `solicituddeservicio`
  ADD CONSTRAINT `fk_administrador` FOREIGN KEY (`IDAdministrador`) REFERENCES `administrador` (`IDAdministrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tecnico` FOREIGN KEY (`idtecnico`) REFERENCES `tecnico` (`idtecnico`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tipodeservicio_solicituddeservicio`
--
ALTER TABLE `tipodeservicio_solicituddeservicio`
  ADD CONSTRAINT `tipodeservicio_solicituddeservicio_ibfk_1` FOREIGN KEY (`IDTipoDeServicio`) REFERENCES `tipo_de_servicio` (`idtipodeservicio`) ON DELETE CASCADE,
  ADD CONSTRAINT `tipodeservicio_solicituddeservicio_ibfk_2` FOREIGN KEY (`IDSolicitudDeServicio`) REFERENCES `solicituddeservicio` (`idsolicituddeservicio`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
