<?php

class Conexion{
    static public function conectar(){

        $host = 'localhost';
        $db   = 'deft-game';
        $user = 'root';
        $pass = '123456';
        $port = "3306";
        $charset = 'utf8mb4';
        
         $link = new PDO("mysql:host=$host;dbname=$db;charset=$charset;port=$port","$user","$pass");
         $link->exec("set names utf8");
         return $link;
    }
}