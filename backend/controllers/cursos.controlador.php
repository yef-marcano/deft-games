<?php


class ControladorCursos {
     
    public function index($pagina){


    $clientes = ModelosClientes::index("clientes");

    /*=============== 
    varlidar usuario para peticion
    ===============*/

    if(isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
        
        foreach ($clientes as $key => $value) {
            if (base64_decode($_SERVER['PHP_AUTH_USER'].":".$_SERVER['PHP_AUTH_PW']) == 
            base64_decode($value["id_cliente"].":".$value["llave_secreta"]) ) {
                
                if ($pagina != null ) {

                    $cantidad = 10;

                    $desde = ($pagina-1)*$cantidad;

                    // Paginacion 
                    $cursos=ModelosCursos::index("cursos","clientes", $cantidad, $desde);


                    $json = array(
                        "status" => 200,
                        "total_registros" => count($cursos),
                        "detalle" => $cursos
                    );
                
                    echo json_encode($json,true);
                    return;


                } else {
                 
                /*=============== 
                Defino la tabla de la base de datos a usar pasandole el nombre al nodelo de index
                ===============*/
                    $cursos=ModelosCursos::index("cursos","clientes", null, null);

                    $json = array(
                        "status" => 200,
                        "total_registros" => count($cursos),
                        "detalle" => $cursos
                    );
                
                    echo json_encode($json,true);
                    return;

                }
                


            }
            # code...
        }
        

        
    }
    


    }
    public function create($data){

        $clientes = ModelosClientes::index("clientes");
            /*=============== 
            varlidar usuario para peticion
            ===============*/

        if(isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
            foreach ($clientes as $key => $value) {
                   /*=============== 
                    varlidar usuario y password concatenados y con una encriptacion
                    ===============*/
                if (base64_decode($_SERVER['PHP_AUTH_USER'].":".$_SERVER['PHP_AUTH_PW']) == 
                    base64_decode($value["id_cliente"].":".$value["llave_secreta"]) ) {
                    /*=============== 
                    varlidar datos
                    ===============*/
                


                    foreach ($data as $key => $valueData) {

           
                        if (isset($valueData) && !preg_match('/^[(\\)\\=\\&\\$\\;\\-\\_\\*\\"\\<\\>\\?\\¿\\!\\¡\\:\\,\\.\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/', $valueData)) {
                            
                            $json = array(
                                "status"=> 404,
                                "detalle" => "Error en el campo".$key
                            );
                            echo json_encode($json,true);
                            return;


                        }


                    }
                    


                    /*=============== 
                    varlidar datos
                    ===============*/




                    $cursos = ModelosCursos::index("cursos","clientes", null, null);

                    foreach ($cursos as $key => $valueCursos) {
                        # code...
                        if ($valueCursos->titulo == $data["titulo"]) {
                            
                            $json = array(
                                "status"=> 404,
                                "detalle" => "el titulo ya existe"
                            );
                            # code...
                            echo json_encode($json, true);
                            return;

                        } 
                        if ($valueCursos->descripcion == $data["descripcion"]) {
                            # code...
                            $json = array(
                                "status"=> 404,
                                "detalle" => "la descripcion ya existe"
                            );
                            # code...
                            echo json_encode($json, true);
                            return;
                        }

                    }
                    
                    /* Enviar datos al modelo si todo esta bien*/


                     $datos = array(
                        "titulo" => $data["titulo"],
                        "descripcion" => $data["descripcion"],
                        "instructor" => $data["instructor"],
                        "imagen" => $data["imagen"],
                        "precio" => $data["precio"],
                        "id_creador" => $value["id"],
                        "created_at" => date('Y-m-d h:i:s'),
                        "updated_at" => date('Y-m-d h:i:s')
                    );



                    $create = ModelosCursos::create("cursos", $datos);

                    if ($create == "ok") {
                        # code...
                            # code...
                            $json = array(
                                "status"=> 200,
                                "detalle" => "registro exitodo, se guardo correctamente"
                            );
                            # code...
                            echo json_encode($json, true);
                            return;
                    }



                }
            }
        }

    }
    public function show($id){
    
        $clientes = ModelosClientes::index("clientes");
        /*=============== 
        varlidar usuario para peticion
        ===============*/

        if(isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
            foreach ($clientes as $key => $value) {
                /*=============== 
                    varlidar usuario y password concatenados y con una encriptacion
                    ===============*/
                if (base64_decode($_SERVER['PHP_AUTH_USER'].":".$_SERVER['PHP_AUTH_PW']) == 
                    base64_decode($value["id_cliente"].":".$value["llave_secreta"]) ) {
           

                        $cursos=ModelosCursos::show("cursos", "clientes", $id);

                        // si esta vacio no muestro nada
                        if(!empty($cursos)){
                            
                            $json = array(
                                "status" => 200,
                                "detalle" => $cursos
                            );
                            
                            echo json_encode($json,true);
                            return;
                        } else {
                            $json = array(
                                "status" => 404,
                                "total de registros" => 0,
                                "detalle" => "no hay cursos con ese numero"
                            );
                            
                            echo json_encode($json,true);
                            return;

                        }


                
                }
            }
        }


    }    
    public function update($id, $datos){

        $clientes = ModelosClientes::index("clientes");
        /*=============== 
        varlidar usuario para peticion
        ===============*/

        if(isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
            foreach ($clientes as $key => $valueCliente) {
                /*=============== 
                    varlidar usuario y password concatenados y con una encriptacion
                    ===============*/
                if (base64_decode($_SERVER['PHP_AUTH_USER'].":".$_SERVER['PHP_AUTH_PW']) == 
                    base64_decode($valueCliente["id_cliente"].":".$valueCliente["llave_secreta"]) ) {

                    /*=============== 
                    varlidar que no manden datos raros
                    ===============*/
                        foreach ($datos as $key => $valueDatos) {
                            # code...
                            if (isset($valueDatos) && !preg_match('/^[(\\)\\=\\&\\$\\;\\-\\_\\*\\"\\<\\>\\?\\¿\\!\\¡\\:\\,\\.\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/', $valueDatos)) {
                                        
                                $json = array(
                                    "status"=> 404,
                                    "detalle" => "Error en el campo".$key
                            );
                            echo json_encode($json,true);
                            return;

                        }
                    /*=============== 
                    varlidar id del creador
                    ===============*/
                    $cursos = ModelosCursos::show("cursos", "clientes",$id);


                    /*
                    echo $id;
                    return;*/


                    foreach ($cursos as $key => $valueCursos) {
                        # busco todos los creadores y valido con el id del cliente enviado buscado en la db
                        if ($valueCursos->id_creador == $valueCliente["id"]) {

                            

                            # code...
                    /*=============== 
                    si todo es correcto voy a pasar los datos al modelo
                    ===============*/
                            $datos = array(
                                'id' => $id,
                                'titulo' => $datos["titulo"],
                                'descripcion' => $datos["descripcion"],
                                'instructor' => $datos["instructor"],
                                'imagen' => $datos["imagen"],
                                'precio' => $datos["precio"],
                                'update_at' => date('Y-m-d h:i:s')
                            );

                            $update = ModelosCursos::update("cursos",$datos);

                            if($update == "ok"){
                                    
                                $json = array(
                                    "status"=> 200,
                                    "detalle" => "actualizacion exitosa, se actualizo correctamente"
                                );
                                # code...
                                echo json_encode($json, true);
                                return;


                            } else{

                                $json = array(
                                    "status"=> 404,
                                    "detalle" => "no esta autorizado para modificar este curso"
                                );
                                # code...
                                echo json_encode($json, true);
                                return;
                            
                            
                            }

                        }

                    }

                }

                
                }
            }
        }
        /*$json = array(
            "detalle" => "este curso actualizado..".$id
        );
        
        echo json_encode($json,true);
        return;*/

    }
    public function delete($id){

        $clientes = ModelosClientes::index("clientes");
        /*=============== 
        varlidar usuario para peticion
        ===============*/

        if(isset($_SERVER['PHP_AUTH_USER']) && isset($_SERVER['PHP_AUTH_PW'])) {
            foreach ($clientes as $key => $valueCliente) {
                /*=============== 
                    varlidar usuario y password concatenados y con una encriptacion
                    ===============*/
                if (base64_decode($_SERVER['PHP_AUTH_USER'].":".$_SERVER['PHP_AUTH_PW']) == 
                    base64_decode($valueCliente["id_cliente"].":".$valueCliente["llave_secreta"]) ) {


                        $cursos = ModelosCursos::show("cursos", "clientes",$id);



                        foreach ($cursos as $key => $valueCurso) {
                            # code...
                            if($valueCurso->id_creador == $valueCliente["id"] ){

                                $deletecursos = ModelosCursos::delete("cursos",$id);

                                if($deletecursos == "ok"){
                                    $json = array(
                                        "status"=> 200,
                                        "detalle" => "Se elimino el curso correctamente"
                                    );
                                    # code...
                                    echo json_encode($json, true);
                                    return;
                                }
                            }
                        }

                        /*$json = array(
                            "detalle" => "estas eliminando el curso ..".$id
                        );
                        
                        echo json_encode($json,true);
                        return;*/
                        
                }
            }
        }




    }
}