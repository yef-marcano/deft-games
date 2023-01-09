<?php


class ControladorCotizaciones {
     
    public function index(){

    /*=============== 
    Defino la tabla de la base de datos a usar pasandole el nombre al nodelo de index
    ===============*/

        $cursos=ModeloCotizaciones::index("cotizaciones");


        $json = array(
            "detalle" => $cursos
        );

        echo json_encode($json,true);
        return;

    }
    public function show($id){

        $cursos=ModeloCotizaciones::show("cotizaciones", $id);

        $json = array(
            "status" => 200,
            "detalle" => $cursos
        );

        echo json_encode($json,true);
        return;

    }
}