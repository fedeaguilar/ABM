var productos = [];
var usuarioid;
let dol = 50;

const url = "/abm/productos.php";

function obtenerProductos(){
    axios({
        method:'GET',
        url: url,
        responseType:'json',
    }).then(res=>{
        console.log(res.data);
        this.productos = res.data;
        llenarTabla();
    }).catch(error=>{
        console.log(error);
    });
}

obtenerProductos();

function llenarTabla(){

    document.getElementById("dolar").value = dol;

    document.querySelector('#tabla-producto tbody').innerHTML = "";
    for (let i=0;i<productos.length;i++){
        
        var dolar = productos[i].precio*dol;
        

        document.querySelector('#tabla-producto tbody').innerHTML +=
         
         
        `<tr>
            <td>${productos[i].name}</td>
            <td> $ ${productos[i].precio} </td>
            <td> U$D ${dolar}</td>
            <td><button type="button" onclick="eliminar(${productos[i].id})">X</button></td>
            <td><button type="button" onclick="seleccionar(${productos[i].id})">Editar</button></td>
        </tr>`
      
    }
    }



    function eliminar (id){
        console.log('eliminar el producto ' + id);
    
        axios({
            method:'DELETE',
            url: url + `?id=${id}`,
            resposeType:'json',
        }).then(res=>{
            console.log(res);
            obtenerProductos();
        }).catch(error=>{
            console.error(error);
        
        });
    
    }
    




function guardar(){
    let producto = {
        name: document.getElementById  ('nombre').value,
        precio: document.getElementById('precio').value,
    };
    console.log(producto);
    axios({
        method:'POST',
        url: url ,
        responseType:'json',
        data: producto 
    }).then(res=>{
        console.log(res.data);
        nuevo();
        obtenerProductos();
    }).catch(error=>{
        console.log(error);
    });
}

function nuevo(){
    document.getElementById  ('nombre').value =  null;
    document.getElementById('precio').value =  null;
    document.getElementById('btn-guardar').style.display='inline';
    document.getElementById('btn-actualizar').style.display="none";
}

function actualizar(){

    let producto = {
        name: document.getElementById  ('nombre').value,
        precio: document.getElementById('precio').value,
    };
    console.log(producto);
    axios({
        method:'PUT',
        url: url + `?id${usurioid}`,
        responseType:'json',
        data: producto 
    }).then(res=>{
        console.log(res);
        nuevo();
        obtenerProductos();
    }).catch(error=>{
        console.log(error);
    });
}
   


function seleccionar(id){
    usurioid = id;
    console.log('Se seleciono el elemento' + id);
    axios({
        method:'GET',
        url: url + `?id=${id}`,
        responseType:'json',
    }).then(res=>{
        console.log(res);
        document.getElementById  ('nombre').value =res.data[0].name;
        document.getElementById('precio').value =res.data[0].precio;
        document.getElementById('btn-guardar').style.display='none';
        document.getElementById('btn-actualizar').style.display="inline";
    }).catch(error=>{
        console.log(error);
    });
}


function cambiar(){

    dol = document.getElementById('dolar').value;
    obtenerProductos();

}


