function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var descripcion = document.getElementById("Input3").value;
    var departamento = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var producto = {
            id, //matricula:id    id:id
            nombre,//nombre:nombre
            descripcion,//descripcion
            departamento,//departamento
        }

        var lista_productos=JSON.parse(localStorage.getItem("Productos"));

        if(lista_productos==null)
        { 
            var lista_productos = [];
        }
        
        const existe = lista_productos.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_productos=lista_productos.filter(producto=>producto.id!=id);

            }
                
            lista_productos.push(producto);
            var temporal = lista_productos.sort((a,b) => a.id-b.id);
            localStorage.setItem("Productos", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de producto","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_productos = JSON.parse(localStorage.getItem("Productos"));
    
     
    if(lista_productos)
    {
        lista_productos.forEach((producto)=>printRow(producto));
    }
}


function printRow(producto){
    
    if(producto!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = producto.id;
        cell2.innerHTML = producto.nombre; 
        cell3.innerHTML = producto.descripcion;
        cell4.innerHTML = producto.departamento; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${producto.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+producto.id+')">Modificar</button>';
    }
}

function deleteR(id){
    const lista_productos = JSON.parse(localStorage.getItem("Productos"));
    var temporal=lista_productos.filter(producto=>producto.id!=id);
    localStorage.setItem("Productos", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("Productos");
    }
  
    read();
    
}

function seekR(id){

    const lista_productos = JSON.parse(localStorage.getItem("Productos"));
    var producto=lista_productos.filter(producto=>producto.id==id);
    //console.log(producto[0]);
    updateR(producto[0]);
}

function updateR(producto){
    if(producto!=null)
    {
        document.getElementById("Input1").value=producto.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=producto.nombre;
        document.getElementById("Input3").value=producto.descripcion;
        document.getElementById("Input4").value=producto.departamento;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;
  
    const lista_productos = JSON.parse(localStorage.getItem("Productos"));
    var productosC=lista_productos.filter(producto=>producto.departamento==c);
    if(productosC)
    {
        productosC.forEach((producto)=>printRowQ(producto));
    }
    //console.log(alumnosC)

}


function printRowQ(producto){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = producto.id;
    cell2.innerHTML = producto.nombre; 
    cell3.innerHTML = producto.descripcion;
    cell4.innerHTML = producto.departamento; 
   
}