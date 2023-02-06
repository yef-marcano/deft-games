<?php
require_once "./config/connect.php";

class ModelosJuegos{


        static public function index($tabla,$dato){
            if($dato == null){
                $stmt=Conexion::conectar()->prepare("SELECT * FROM $tabla");
                $stmt->execute();
                return $stmt->fetchALL(PDO::FETCH_CLASS);
                $stmt->close();
                $stmt=null;

            } else if(is_numeric($dato)) {

                $stmt=Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE id_gameguardado =:id");
                $stmt->bindParam(":id", $dato, PDO::PARAM_STR);
                $stmt->execute();
                return $stmt->fetchALL(PDO::FETCH_CLASS);
                $stmt->close();
                $stmt=null;


            }

        }

        static public function update($tabla,$id,$datos){
            





            
            $stmt=Conexion::conectar()->prepare("UPDATE $tabla SET email=:email,pass=:pass,
            nombre=:nombre,apellidos=:apellidos,celular=:celular        
            WHERE id=:id");
            

            $stmt->bindParam(":email", $datos["correo"], PDO::PARAM_STR);
            $stmt->bindParam(":pass", $datos["pass"], PDO::PARAM_STR);
            $stmt->bindParam(":nombre", $datos["nombre"], PDO::PARAM_STR);
            $stmt->bindParam(":apellidos", $datos["apellidos"], PDO::PARAM_STR);/*
            $stmt->bindParam(":tipoDocumento", $datos["tipoDocumento"], PDO::PARAM_STR);
            $stmt->bindParam(":documento", $datos["documento"], PDO::PARAM_STR);
            $stmt->bindParam(":fechaExpedicion", $datos["fechaExpedicion"], PDO::PARAM_STR);
            $stmt->bindParam(":direccion", $datos["direccion"], PDO::PARAM_STR);*/
            $stmt->bindParam(":celular", $datos["celular"], PDO::PARAM_STR);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            
            
            if($stmt->execute()){

                //return "ok";
                $stmt=Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE id=:id");
                $stmt->bindParam(":id", $id, PDO::PARAM_STR);
                $stmt->execute();
                return $stmt->fetchALL(PDO::FETCH_CLASS);
                $stmt->close();
                $stmt=null;

            }else{

                print_r(Conexion::conectar()->errorInfo());
                return;

            }
            $stmt->close();
            $stmt=null;


            
        }


        static public function login($tabla,$datos){
            
            $stmt=Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE email=:email AND pass=:pass");
            
            $stmt->bindParam(":email", $datos["correo"], PDO::PARAM_STR);
            $stmt->bindParam(":pass", $datos["password"], PDO::PARAM_STR);
            if($stmt->execute()){
                return $stmt->fetchALL(PDO::FETCH_CLASS);
            }else{
                print_r(Conexion::conectar()->errorInfo());
                // return;
            }
            $stmt->close();
            $stmt=null;
        }
        
        static public function create($tabla,$datos){
            

            $stmt=Conexion::conectar()->prepare("INSERT INTO $tabla(email, pass, nombre, apellidos, celular)
             VALUES (:email,:pass,:nombre,:apellidos,:celular)");
            
            $stmt->bindParam(":email", $datos["correo"], PDO::PARAM_STR);
            $stmt->bindParam(":pass", $datos["pass"], PDO::PARAM_STR);
            $stmt->bindParam(":nombre", $datos["nombre"], PDO::PARAM_STR);
            $stmt->bindParam(":apellidos", $datos["apellidos"], PDO::PARAM_STR);/*
            $stmt->bindParam(":tipoDocumento", $datos["tipoDocumento"], PDO::PARAM_STR);
            $stmt->bindParam(":documento", $datos["documento"], PDO::PARAM_STR);
            $stmt->bindParam(":fechaExpedicion", $datos["fechaExpedicion"], PDO::PARAM_STR);
            $stmt->bindParam(":direccion", $datos["direccion"], PDO::PARAM_STR);*/
            $stmt->bindParam(":celular", $datos["celular"], PDO::PARAM_INT);

            if($stmt->execute()){

                $stmt=Conexion::conectar()->prepare("SELECT * FROM $tabla ORDER BY id DESC LIMIT 1");
                $stmt->execute();
                return $stmt->fetchALL(PDO::FETCH_CLASS);
                $stmt->close();
                $stmt=null;


            }else{

                print_r(Conexion::conectar()->errorInfo());
                //return;

            }
            $stmt->close();
            $stmt=null;
        }
}