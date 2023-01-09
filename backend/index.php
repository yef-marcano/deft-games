<?php 
require_once "controllers/rutas.controlador.php";
require_once "controllers/cursos.controlador.php";
require_once "controllers/clientes.controlador.php";
require_once "controllers/cotizaciones.controlador.php";

require_once "models/clientes.modelo.php";
require_once "models/cursos.modelo.php";
require_once "models/cotizaciones.modelo.php";

$rutas= new ControladorRutas();

$rutas->inicio();