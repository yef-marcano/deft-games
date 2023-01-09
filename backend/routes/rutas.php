<?php

$arrayRutas = explode("/", $_SERVER["REQUEST_URI"]);



if (isset($_GET["pagina"]) && is_numeric($_GET["pagina"])) {
    $cursos = new ControladorCursos();
    $cursos->index($_GET["pagina"]);
} else {





if (count(array_filter($arrayRutas)) == 3) {

    /* Cuando no se hace ninguna peticion a la API respondemos con no entontrado */
    /*echo  "<pre>";
    print_r($arrayRutas);
    echo  "<pre>";*/

    $json = array(
        "detalle" => "no encontrado"
    );
    echo json_encode($json);

    return;

} else {

/*=============== 
Esto es para las peticiones simples
===============*/

    /* Cuando se pasa un indice a la url verifico la posicion */
    if (count(array_filter($arrayRutas)) == 4) {
        /* peticiones dede cursos*/
        if (array_filter($arrayRutas)[4] == "cotizaciones") {
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


        if (array_filter($arrayRutas)[4] == "cursos") {
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
        if (array_filter($arrayRutas)[4] == "registro") {
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

        if(array_filter($arrayRutas)[4] == "cursos" && is_numeric(array_filter($arrayRutas)[5]) ) {
            /*=============== 
            Tipo GET
            ===============*/
            if (isset($_SERVER["REQUEST_METHOD"]) && $_SERVER["REQUEST_METHOD"] == "GET") {
                $cursos = new ControladorCursos();
                $cursos->show(array_filter($arrayRutas)[5]);
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
        
        if(array_filter($arrayRutas)[4] == "cotizaciones" && is_numeric(array_filter($arrayRutas)[5]) ) {
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