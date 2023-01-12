<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$arrayRutas = explode("/", $_SERVER["REQUEST_URI"]);



if (isset($_GET["pagina"]) && is_numeric($_GET["pagina"])) {
    $cursos = new ControladorCursos();
    $cursos->index($_GET["pagina"]);
} else {





if (count(array_filter($arrayRutas)) == 0) {

    /* Cuando no se hace ninguna peticion a la API respondemos con no entontrado */
    /*echo  "<pre>";
    print_r($arrayRutas);
    echo  "<pre>";*/

    $json = array(
        "detalle" => "no encontrado",
        "ruta" => $_SERVER["REQUEST_URI"]
    );
    echo json_encode($json);

    return;

} else {
    /* ALLOW CORS */
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    /* ALLOW CORS */


/*=============== 
Esto es para las peticiones simples
===============*/

    /* Cuando se pasa un indice a la url verifico la posicion */
    if (count(array_filter($arrayRutas)) == 1) {



                /* peticiones de usuarios*/
                if (array_filter($arrayRutas)[1] == "usuarios") {
                    /*=============== 
                    Tipo GET Consultar todos los usuarios registrados
                    ===============*/
                    if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "GET") {

                        $usuarios = new ControladorUsuarios();
                        $usuarios->index();
                    }
                }

        
                /* peticiones de un usuario*/
                if (array_filter($arrayRutas)[1] == "usuario") {
                    /*=============== 
                    Tipo POST
                    ===============*/
                    if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {

                        if (isset($_POST["correo"]) && isset($_POST["password"])) {

                            /*$data = array(
                                "correo" => $_POST["correo"],
                                "password" => $_POST["password"]

                            );*/

                            // array vacio
                            $datosenviados = array();
                            // realizo un parse para obtener datos de file get content y pasarlos al array
                            parse_str(file_get_contents('php://input'), $datosenviados);

                            $usuario = new ControladorUsuarios();
                            $usuario->login($datosenviados);
                        } else {

                            $json = array(
                                "status" => 404,
                                "detalle" => "no se esta enviando el usuario o password"
                            );
                            echo json_encode($json);

                            return;
                        }
                    }
                }



                /* peticiones registro de usuarios*/
                if (array_filter($arrayRutas)[1] == "registro") {
                    /*=============== 
                    Tipo POST
                    ===============*/
                    if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {

                    
                        // array vacio
                        $datosenviados = array();
                        // realizo un parse para obtener datos de file get content y pasarlos al array
                        parse_str(file_get_contents('php://input'), $datosenviados);

                        $usuarios = new ControladorUsuarios();
                        $usuarios->create($datosenviados);
                    }
                }








        /* peticiones dede cursos*/
        if (array_filter($arrayRutas)[1] == "cotizaciones") {
            /*=============== 
            Tipo POST
            ===============*/
            /*if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {
                $cursos = new ControladorCursos();
                $cursos->create();*/
            
            if(isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "GET"){
                $cursos = new ControladorCotizaciones();
                $cursos->index();
            }
        }
        /* peticiones dede cursos*/


        if (array_filter($arrayRutas)[1] == "cursos") {
            /*=============== 
            Tipo POST
            ===============*/
            if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {

                $data = array(
                    "titulo" => $_POST["titulo"],
                    "descripcion" => $_POST["descripcion"],
                    "instructor" => $_POST["instructor"],
                    "imagen" => $_POST["imagen"],
                    "precio" => $_POST["precio"]

                );
                // echo "<pre>"; print_r($data); echo "<pre>";
                // return;


                $cursos = new ControladorCursos();
                $cursos->create($data);



            } else if(isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "GET"){
                $cursos = new ControladorCursos();
                $cursos->index(null);
            }
        }



        /* peticiones dede clientes*/
        if (array_filter($arrayRutas)[1] == "registro") {
            /*=============== 
            Tipo POST
            ===============*/
            if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "POST") {

                $datos= array("nombre" => $_POST["nombre"],
                "apellido" => $_POST["apellido"],
                "email" => $_POST["email"]);
                
                $clientes = new ControladorClientes();
                $clientes->create($datos);
            }
        }


    } else {

        /*=============== 
        Esto es para las peticiones simples con un parametro 
        ===============*/
        /* capturo la posicion de despues del la peticion ejmplo/1 */
        

            /*=============== #####
            Cursos
            =============== #########*/

        if(array_filter($arrayRutas)[2] == "cursos" && is_numeric(array_filter($arrayRutas)[3]) ) {
            /*=============== 
            Tipo GET
            ===============*/
            if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "GET") {
                $cursos = new ControladorCursos();
                $cursos->show(array_filter($arrayRutas)[3]);
            }
            /*=============== 
            Tipo PUT, subir cosas a la base
            ===============*/
            if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "PUT") {

                // array vacio
                $datos = array();

                // realizo un parse para obtener datos de file get content y pasarlos al array
                parse_str(file_get_contents('php://input'), $datos);

                //echo "<pre>"; print_r($datos); echo "<pre>";


                $cursos = new ControladorCursos();
                $cursos->update(array_filter($arrayRutas)[5], $datos);
            }
            /*=============== 
            Tipo DELETE, subir cosas a la base
            ===============*/
            if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "DELETE") {
                $cursos = new ControladorCursos();
                $cursos->delete(array_filter($arrayRutas)[5]);
            }
        }




            /*=============== #####
            Cotizaciones
            =============== #########*/
        
        if(array_filter($arrayRutas)[2] == "cotizaciones" && is_numeric(array_filter($arrayRutas)[3]) ) {
            /*=============== 
            Tipo GET
            ===============*/
            if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "GET") {
                $cursos = new ControladorCotizaciones();
                $cursos->show(array_filter($arrayRutas)[5]);
            }
        }



    }
}

}