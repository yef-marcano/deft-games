<?php
require_once "./config/connect.php";

class ModelosClientes{

        static public function index($tabla){
            $stmt=Conexion::conectar()->prepare("SELECT * FROM $tabla ");
            $stmt->execute();
            return $stmt->fetchALL();
            $stmt->close();
            $stmt=null;
        }
        
        static public function create($tabla,$datos){
            
            $stmt=Conexion::conectar()->prepare("INSERT INTO $tabla(nombre, apellido, email, id_cliente, llave_secreta, created_at, updated_at) VALUES (:nombre, :apellido, :email, :id_cliente, :llave_secreta, :created_at, :updated_at)");
            
            $stmt->bindParam(":nombre", $datos["nombre"], PDO::PARAM_STR);
            $stmt->bindParam(":apellido", $datos["apellido"], PDO::PARAM_STR);
            $stmt->bindParam(":email", $datos["email"], PDO::PARAM_STR);
            $stmt->bindParam(":id_cliente", $datos["id_cliente"], PDO::PARAM_STR);
            $stmt->bindParam(":llave_secreta", $datos["llave_cliente"], PDO::PARAM_STR);
            $stmt->bindParam(":created_at", $datos["create"], PDO::PARAM_STR);
            $stmt->bindParam(":updated_at", $datos["update"], PDO::PARAM_STR);
            
            
            if($stmt->execute()){

                return "ok";



            }else{

                print_r(Conexion::conectar()->errorInfo());
                // return;

            }
            $stmt-> close();
            $stmt=null;
        }
}