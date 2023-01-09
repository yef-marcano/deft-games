<?php

class ControladorClientes
{
    public function create($datos)
    {


        /*=============================================
		Validar nombre
		=============================================*/
        if (isset($datos["nombre"]) && !preg_match('/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/', $datos["nombre"])) {

            $json = array(
                "status" => 404,
                "detalle" => "error solo se permiten letras en el nombre"
            );
            echo json_encode($json, true);
            return;
        }
        /*=============================================
          Validar apellido
          =============================================*/
        if (isset($datos["apellido"]) && !preg_match('/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/', $datos["apellido"])) {

            $json = array(
                "status" => 404,
                "detalle" => "error solo se permiten letras en apellido"
            );
            echo json_encode($json, true);
            return;
        }
        /*=============================================
        Validar email
        =============================================*/
        if (isset($datos["email"]) && !preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $datos["email"])) {

            $json = array(
                "status" => 404,
                "detalle" => "error en el email"
            );
            echo json_encode($json, true);
            return;
        }
        /*=============================================
        Validar que el mail no este repetido
        =============================================*/

        $clientes = ModelosClientes::index("clientes");

        foreach ($clientes as $key => $value) {
            if ($value["email"] == $datos["email"]) {
                $json = array(
                    "status" => 404,
                    "detalle" => "email repetido"
                );
                echo json_encode($json, true);
                return;
            }
        }

        /*=============================================
        Generar credenciales del cliente
        =============================================*/
        // Al final va el hash para encryptar
        // Generamos cadena, quitamos el $
        $id_cliente = str_replace("$", "d", crypt($datos["nombre"] . $datos["apellido"] . $datos["email"], '$2a$07$afartwetsdAD52356FEDGsfhsd$'));
        // echo "<pre>"; print_r($id_cliente); echo "</pre>";
        // Generamos cadena, quitamos el $
        $llave_cliente = str_replace("$", "d", crypt($datos["email"] . $datos["apellido"] . $datos["nombre"], '$2a$07$afartwetsdAD52356FEDGsfhsd$'));
        // echo "<pre>"; print_r($llave_cliente); echo "</pre>";
        $datos = array(
            "nombre" => $datos["nombre"],
            "apellido" => $datos["apellido"],
            "email" => $datos["email"],
            "id_cliente" => $id_cliente,
            "llave_cliente" => $llave_cliente,
            "create" => date('Y-m-d h:i:s'),
            "update" => date('Y-m-d h:i:s')
        );

        $create = ModelosClientes::create("clientes", $datos);
        if ($create == "ok") {
            $json = array(
                "status" => 200,
                "detalle" => "se genero las credenciales",
                "id_cliente" => $id_cliente,
                "llave_cliente" => $llave_cliente
            );
            echo json_encode($json, true);
            return;
        }
    }
}
