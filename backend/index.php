<?php 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once "controllers/rutas.controlador.php";
require_once "controllers/cursos.controlador.php";
require_once "controllers/clientes.controlador.php";
require_once "controllers/cotizaciones.controlador.php";
require_once "controllers/usuarios.controlador.php";

require_once "models/clientes.modelo.php";
require_once "models/cursos.modelo.php";
require_once "models/cotizaciones.modelo.php";
require_once "models/usuarios.modelo.php";

$rutas= new ControladorRutas();

$rutas->inicio();