<?php

class Conexion{
    static public function conectar(){

        $host = 'db5011482015.hosting-data.io';
        $db   = 'dbs9687018';
        $user = 'dbu5479830';
        $pass = 'Joseph26282364';
        $port = "3306";
        $charset = 'utf8mb4';
        
         $link = new PDO("mysql:host=$host;dbname=$db;charset=$charset;port=$port","$user","$pass");
         $link->exec("set names utf8");
         return $link;
    }
}