<?php

require_once "./config/connect.php";
            

class ModeloCotizaciones{

        static public function index($tabla){
            $stmt=Conexion::conectar()->prepare("SELECT
            a.nombre,
            a.fecha,
            
            b.titulo AS'alcance_titulo' , 
            REGEXP_REPLACE(b.descripcion, '<[^>]*>|&nbsp;', '') AS 'alcance_descripcion',
            
            c.titulo AS'proyectos_experiencia',
            c.proyectos AS'proyectos_experiencia',
            c.idioma AS'idioma_experiencia',
            c.descripcion AS'descripcion_experiencia',
            
            d.titulo AS'titulo_presupuesto',
            d.costo AS'costo_presupuesto',
            d.anticipo AS'anticipo_presupuesto',
            d.alpha AS'alpha_presupuesto',
            d.beta AS'beta_presupuesto',
            d.gold AS'gold_presupuesto',
            d.moneda AS'moneda_presupuesto',
            d.iva AS'iva_presupuesto',
            d.text_anticipo AS'texto_anticipo_presupuesto',
            d.text_alpha AS'texto_alpha_presupuesto',
            d.text_beta AS'texto_beta_presupuesto',
            d.text_gold AS'texto_gold_presupuesto',
            
            
            f.titulo AS'titulo_tiempos',
            f.tiempo AS'tiempo_tiempos',
            f.fases AS'fases_tiempos',
            f.unidad AS'unidad_tiempos'
           
            FROM cotizaciones as a 
            LEFT JOIN alcance 
            as b ON a.id_cotizacion = b.id_cotizacion
            LEFT JOIN experiencia 
            as c ON a.id_cotizacion = c.id_cotizacion
            LEFT JOIN presupuesto 
            as d ON a.id_cotizacion = d.id_cotizacion
            LEFT JOIN tiempos 
            as f ON a.id_cotizacion = f.id_cotizacion");


            $stmt->execute();
            return $stmt->fetchALL(PDO::FETCH_CLASS);
            $stmt->close();
            $stmt=null;
        }
        
        static public function show($tabla,$id){
            $stmt=Conexion::conectar()->prepare("SELECT
            a.nombre,
            a.fecha,
            
            b.titulo AS'alcance_titulo' , 
            REGEXP_REPLACE(b.descripcion, '<[^>]*>|&nbsp;', '') AS 'alcance_descripcion',
            
            c.titulo AS'proyectos_experiencia',
            c.proyectos AS'proyectos_experiencia',
            c.idioma AS'idioma_experiencia',
            c.descripcion AS'descripcion_experiencia',
            
            d.titulo AS'titulo_presupuesto',
            d.costo AS'costo_presupuesto',
            d.anticipo AS'anticipo_presupuesto',
            d.alpha AS'alpha_presupuesto',
            d.beta AS'beta_presupuesto',
            d.gold AS'gold_presupuesto',
            d.moneda AS'moneda_presupuesto',
            d.iva AS'iva_presupuesto',
            d.text_anticipo AS'texto_anticipo_presupuesto',
            d.text_alpha AS'texto_alpha_presupuesto',
            d.text_beta AS'texto_beta_presupuesto',
            d.text_gold AS'texto_gold_presupuesto',
            
            
            f.titulo AS'titulo_tiempos',
            f.tiempo AS'tiempo_tiempos',
            f.fases AS'fases_tiempos',
            f.unidad AS'unidad_tiempos'
           
            FROM $tabla as a 
            LEFT JOIN alcance 
            as b ON a.id_cotizacion = b.id_cotizacion
            LEFT JOIN experiencia 
            as c ON a.id_cotizacion = c.id_cotizacion
            LEFT JOIN presupuesto 
            as d ON a.id_cotizacion = d.id_cotizacion
            LEFT JOIN tiempos 
            as f ON a.id_cotizacion = f.id_cotizacion
            WHERE a.id_cotizacion = $id");


            $stmt->execute();
            return $stmt->fetchALL(PDO::FETCH_CLASS);
            $stmt->close();
            $stmt=null;
        }
}