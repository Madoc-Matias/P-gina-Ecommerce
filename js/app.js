//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//crear una funcion para todos los eventos que vamos tener con eventlistener





cargarEventListeners(); 
function cargarEventListeners(){
    //cuando se presiona boton agregar al carrito 
    listaCursos.addEventListener('click', agregarCurso);



    //eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    
    
    
    
    //vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //resetea el arreglo 
        
        limpiarHTML();
    })

 
}

//funciones
function agregarCurso(e){
    e.preventDefault(); // crea un vinculo y luego hace que no se vaya para arriba




    if(e.target.classList.contains('agregar-carrito'))
    {
        const curso = e.target.parentElement.parentElement; // primer parent element es para acceder al padre, y el segundo es para seleccionar un elemento dentro del padre, en este caso la foto
        leerDatosCurso(curso);

    }
}

//eliminar curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');


        
        //elimina del arreglo articulosCarrito por el detaid
        articulosCarrito = articulosCarrito.filter
        (curso => curso.id !== cursoId);

        carritoHTML(); //iterar sobre el carrito y mostrar su html
    }
}


//leer el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
    // crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisar si un elemento existe en el carrito, si existe no lo agregamos, solo actualizamos la cantidad


    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos cantidad
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso;
            }
        })// .map crea un nuevo arreglo
        articulosCarrito = [...cursos];

    
    }else{
        //agregar curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    //agregar elementos al arreglo del carrito
    
    console.log(articulosCarrito);
    carritoHTML()

}

//mostrar el carrito de compras en el html, esta funcion se va a encargar de generar el html basado en el arreglo articulosCarrito
function carritoHTML(){

    limpiarHTML();
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}"width=100>



        </td>

        <td>
        ${curso.titulo}

        </td>

        <td>
        ${curso.precio}


        </td>
        <td>
        ${curso.cantidad}


        </td>

        <td>
        <a href= "#"  class="borrar-curso" data-id= "${curso.id}">X</a>


        </td>
        
        `;

        //agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row); 
    })
}

//eliminar los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}