<?php
require_once "conexion/conexion.php";


class productos extends conexion {

private $name ="";
private $precio ="";
private $id ="";

    public function listaProductos(){

        $query = "SELECT * from abm";
        $datos = parent::obtenerDatos($query);
        return ($datos);
    }

    public function obtenerProductos($id){
        $query="SELECT * from abm WHERE id = '$id'";
        return parent::obtenerDatos($query);

    }

    public function post($json){
        $datos = json_decode($json,true);
        $this->name = $datos['name'];
        $this->precio = $datos['precio'];
        $res = $this->insertarProducto();
    }

    private function insertarProducto(){
        $query = "INSERT INTO abm (name, precio) VALUE ('". $this->name . "', '".$this->precio."')";
        $resp = parent::nonQuery($query);
        if($resp){
            return $resp;
        }else{
            return 0;
        }
        }

        public function put($json){
            $datos = json_decode($json,true);
            $this->id = $datos['id'];
            $this->name = $datos['name'];
            $this->precio = $datos['precio'];
            $res = $this->modificarProducto();
           
        }

        private function modificarProducto(){
            $query = "UPDATE abm SET name='".$this->name."', precio='".$this->precio."' WHERE id='".$this->id."'";
             $resp = parent::nonQuery($query);
            if($resp >= 1){
                return $resp;
            }else{
                return 0;
            }
            
            }

            public function delete($json){
                $datos = json_decode($json,true);
                $this->id = $datos['id'];
                $res = $this->eliminarProducto();
               
            }

            
    
            private function eliminarProducto(){
                $query = "DELETE FROM abm  WHERE id='".$this->id."'";
                $resp = parent::nonQuery($query);
                if($resp >= 1){
                    return $resp;
                }else{
                    return 0;
                }
              
                
                }

              
             
    }






?>