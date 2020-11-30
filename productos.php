<?php
require_once 'clases/productos.class.php';


$_productos = new productos;

if($_SERVER['REQUEST_METHOD']=="GET"){
   

if (isset($_GET['id'])){
$productosid=$_GET['id'];
$datosProductos = $_productos->obtenerProductos($productosid);
header("Content-Type: application/json");
echo json_encode($datosProductos);
http_response_code(200);
} else {
    header("Content-Type: application/json");
    $listaProductos = $_productos->listaProductos();
    echo json_encode($listaProductos);}
    http_response_code(200);


}else if($_SERVER['REQUEST_METHOD']=="POST"){
   $postBody = file_get_contents("php://input");
   $resp = $_productos -> post($postBody);
  
    

}else if($_SERVER['REQUEST_METHOD']=="PUT"){

$postBody = file_get_contents("php://input");
$datosArray = $_productos->put($postBody);


}else if($_SERVER['REQUEST_METHOD']=="DELETE"){

    $postBody = file_get_contents("php://input");
    $datosArray = $_productos->delete($postBody);
}
    
?>