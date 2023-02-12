<?php


class ControladorSalas
{

    public function index()
    {


        /*=============== 
        Defino la tabla de la base de datos a usar pasandole el nombre al nodelo de index
        ===============*/
        $usuarios = ModelosJuegos::index("salas", null);


            $json = array(
                "status" => 200,
                "total_registros" => count($usuarios),
                "detalle" => $usuarios
            );
            echo json_encode($json, true);
            return;

    }
    
    public function JuegosGuardados($idjuegador)
    {


        /*=============== 
        Defino la tabla de la base de datos a usar pasandole el nombre al nodelo de index
        ===============*/
        $usuarios = ModelosJuegos::index("jugador_game_guardados", $idjuegador);


            $json = array(
                "status" => 200,
                "total_registros" => count($usuarios),
                "detalle" => $usuarios
            );
            echo json_encode($json, true);
            return;

    }

    public function login($datos)
    {




        /*=============================================
        Validar email
        =============================================*/
        if (isset($datos["correo"]) && !preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $datos["correo"])) {

            $json = array(
                "status" => 404,
                "detalle" => "error en el correo electronico"
            );
            echo json_encode($json, true);
            return;
        }



        $data = array(
            "correo" => $datos["correo"],
            "password" => $datos["password"]
        );


        /*=============== 
        Defino la tabla de la base de datos a usar pasandole el nombre al nodelo de index
        ===============*/

        $usuarios = ModelosUsuarios::login("usuarios", $data);

        if (!count($usuarios) == 0) {

            $json = array(
                "status" => 200,
                "total_registros" => count($usuarios),
                "detalle" => $usuarios
            );

            echo json_encode($json, true);
            return;
        } else {

            $json = array(
                "status" => 404,
                "total_registros" => count($usuarios),
                "detalle" => "Usuario o password invalida"
            );

            echo json_encode($json, true);
            return;
        }
    }


    public function create($datos)
    {

        //print_r($datos);
        //return;

        /*=============================================
        Validar datos correo
        =============================================*/

        /*if (!is_numeric($datos["tipoDocumento"]) || !is_numeric($datos["documento"]) || !is_numeric($datos["estadoCivil"]) || !is_numeric($datos["tipoVivienda"]) || !is_numeric($datos["actividad"]) || !is_numeric($datos["sector"]) || !is_numeric($datos["telefono"]) || !is_numeric($datos["ingresos"]) || !is_numeric($datos["opcion"]) && !is_numeric($datos["TelRef1"]) || !is_numeric($datos["TelRef2"]) || !is_numeric($datos["gastos"]) || !is_numeric($datos["estrato"]) || !is_numeric($datos["cuenta"]) || !is_numeric($datos["TelEmpresa"])) {

            $json = array(
                "status" => 404,
                "detalle" => "error uno de los datos enviados es incorrecto, debe    ser numerico"
            );
            echo json_encode($json, true);
            return;
        }*/


        /*foreach ($datos as $key => $value) {
            if (!isset($value)) {
                $json = array(
                    "status" => 404,
                    "detalle" => "error en el" . $value
                );
                echo json_encode($json, true);
                return;
            }
        }*/




        /*=============== 
        Defino la tabla de la base de datos a usar pasandole el nombre al nodelo de create
        ===============*/
        //print_r($datos);

        $data = array(
            "user1" => $datos["idusuario"],
            "idgame" => $datos["idgame"],
            "price" => $datos["price"]
        );
        //print_r($data);
        //return

        //echo $data;
        //echo "llego";

        //return;



        $juego_guardado = ModelosSalas::create("salas", $data);

        $json = array(
            "status" => 200,
            "usuario" => "Juego agregado con exito",
            "detalle" => $juego_guardado
        );

        echo json_encode($json, true);
        /*
        $usuarios = ModelosSalas::indexCompare("jugador_game_guardados", $data["idgame"]);

        if (count($usuarios) === 0) {

            $juego_guardado = ModelosSalas::create("jugador_game_guardados", $data);

            $json = array(
                "status" => 200,
                "usuario" => "Juego agregado con exito",
                "detalle" => $juego_guardado
            );

            echo json_encode($json, true);
            return;
        } else {

            $json = array(
                "status" => 400,
                "usuario" => "juego guardado previamente existente",
                "detalle" => $usuarios
            );

            echo json_encode($json, true);
            return;
        }*/
    }








    public function update($id, $datos)
    {

        $usuarios = ModelosUsuarios::index("usuarios", $id, $datos);

        if(count($usuarios) == 0){

            $json = array(
                "status" => 404,
                "detalle" => "el usuario no existe",
            );
            echo json_encode($json, true);
            return;

        } else {
            
            /*=============== 
               si todo es correcto voy a pasar los datos al modelo
             ===============*/ 
             
            $correo = !empty($datos['correo']) ? trim($datos['correo']) : $usuarios[0]->email;
            $pass = !empty($datos['pass']) ? trim($datos['pass']) : $usuarios[0]->pass;
            $nombre = !empty($datos['nombre']) ? trim($datos['nombre']) : $usuarios[0]->nombre;
            $apellidos = !empty($datos['apellidos']) ? trim($datos['apellidos']) : $usuarios[0]->apellidos;
            $tipoDocumento = !empty($datos['tipoDocumento']) ? trim($datos['tipoDocumento']) : $usuarios[0]->tipoDocumento;
            $documento = !empty($datos['documento']) ? trim($datos['documento']) : $usuarios[0]->documento;
            $fechaExpedicion = !empty($datos['fechaExpedicion']) ? trim($datos['fechaExpedicion']) : $usuarios[0]->fechaExpedicion;
            $direccion = !empty($datos['direccion']) ? trim($datos['direccion']) : $usuarios[0]->direccion;
            $celular = !empty($datos['celular']) ? trim($datos['celular']) : $usuarios[0]->celular;
            $id = !empty($datos['id']) ? trim($datos['id']) : null;
            

            $data = array(
                'id' => $id,
                "correo" => $correo,
                "pass" => $pass,
                "nombre" => $nombre,
                "apellidos" => $apellidos,
                "tipoDocumento" => $tipoDocumento,
                "documento" => $documento,
                "fechaExpedicion" => $fechaExpedicion,
                "direccion" => $direccion,
                "celular" => $celular,
                "id" => $id
            );

            //echo json_encode($data, true);
            //return;
            
            $usuario_actualizado = ModelosUsuarios::update("usuarios", $id, $data);

            $json = array(
                "status" => 200,
                "usuario" => "usuario actualizado con exito",
                "detalle" => $usuario_actualizado,
            );
            echo json_encode($json, true);
            return;

        }

    }






















    public function recovery($datos)
    {




        /*=============================================
        Validar email
        =============================================*/
        if (isset($datos["correo"]) && !preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $datos["correo"])) {

            $json = array(
                "status" => 404,
                "detalle" => "error en el correo electronico"
            );
            echo json_encode($json, true);
            return;
        }



        $data = array(
            "correo" => $datos["correo"]
        );


        /*=============== 
        Defino la tabla de la base de datos a usar pasandole el nombre al nodelo de index
        ===============*/

        $usuarios = ModelosUsuarios::index("usuarios", $data["correo"]);

        if (!count($usuarios) == 0) {


            /*=============== 
            Si el usuario existe le enviamos un correo
            ===============*/


            /*=============== 
            envio de correo
            ===============*/

            $otherEmail = $usuarios[0]->email;
            $textEmail = "";
            $textEmail = "Su password es: " . "\n"; //name
            $textEmail = $textEmail . $usuarios[0]->pass . "\n"; //correo
            $textEmail = $textEmail . "\n";
            $email = "Info CrediPrestar<info@pressstart.co>";
            $subject = "Recuperar password";
            $comment = "";
            // Send email
            $mail = new corfasMail();
            $mail->sendEmail([$otherEmail], $subject, $textEmail);
            /*=============== 
            envio de correo fin
            ===============*/

            $json = array(
                "status" => 200,
                "id" => $usuarios[0]->id,
                "email" => $usuarios[0]->email,
                "total_registros" => count($usuarios),
                "detalle" => "enviado"
            );

            echo json_encode($json, true);
            return;
        } else {

            $json = array(
                "status" => 404,
                "total_registros" => count($usuarios),
                "detalle" => "El usuario no existe"
            );

            echo json_encode($json, true);
            return;
        }
    }
}
