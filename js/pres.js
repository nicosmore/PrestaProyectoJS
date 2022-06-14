const formPrestamo = document.querySelector("#FormPres");
formPrestamo.addEventListener('submit', function(evt){
evt.preventDefault();
muestroPrestamo();
})

const formConsulta = document.querySelector("#FormSolicitud");
formConsulta.addEventListener('submit', function(evt){
evt.preventDefault();
muestroConsulta();

})
const contenedorConsulta = document.querySelector("#muestro");


function muestroPrestamo(){

    //veoPrestamo.innerHTML="";    
    montoPres = document.querySelector("#MontoPres").value;
    cuotas = document.querySelector("#Cuotas").value;   
    let prestamo = calculoCuotas(montoPres ,cuotas);
        
    Swal.fire({
        confirmButtonColor: '#007e33',
        confirmButtonText: 'Solicitar Prestamo',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText:'Regresar',        
        title: "El prestamo solicitado es de " + cuotas + " cuotas " + "de $"+ prestamo,
      })
      .then((result) => {
        if (result.isConfirmed) {
          modal.showModal();
          const btnCerrar = document.querySelector("#botonCerrar");
          btnCerrar.addEventListener("click",()=>{
              modal.close();
          })
          FormModal.addEventListener('submit', function(evt){
            evt.preventDefault();
            guardarDatos();
            modal.close();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'ENVIADO',
                text:'NOS CONTACTAREMOS A LA BREVEDAD',
                showConfirmButton: false,
                timer: 3000
              })
          })
        }        
    })
    
    function guardarDatos(){
       
        let datosArray = JSON.parse(localStorage.getItem("datosPersona")) || [];
               
        
        const datos = {
            nombre: document.querySelector("#name").value,
            apellido: document.querySelector("#lastName").value,
            ci: document.querySelector("#Ci").value,
            ingresos: document.querySelector("#Ingreso").value,
            mail: document.querySelector("#exampleFormControlInput1"),
            montoPrestamo : montoPres,
            abonoCuota: prestamo,
            cantidadCuotas : cuotas,   
        };        
        datosArray.push(datos)        
        localStorage.clear("datosPersona");        
        let datosJSON = JSON.stringify(datosArray);
        localStorage.setItem("datosPersona", datosJSON);       
    }
    

}

function calculoCuotas(monto, cuotas){
    const impuesto = 1.25;
    return Math.ceil((monto/cuotas) * impuesto);    
}

function muestroConsulta(){    
    documento = document.querySelector("#docConsulta").value;
    const datoGuardado = JSON.parse(localStorage.getItem("datosPersona"));      
    const cantidad=Object.keys(datoGuardado).length;    
    contenedorConsulta.innerHTML="";   
    i=0;
    for (const cliente of datoGuardado) {
        i++;
        console.log(i)
        if (documento == cliente.ci){
            divConsulta(cliente);
        }
        else if (i === cantidad){
            
            const noDato = document.createElement('p');
            noDato.classList.add('contenedorRespuesta');
            noDato.textContent = "No hay Solicitud para el documento: "+documento;

            contenedorConsulta.appendChild(noDato); }
        else {

            continue                   
        }
        
        
        }
        
        
    }
    function divConsulta(cli){
        
        const divCon = document.createElement('div');
        divCon.classList.add('contenedorConsulta');

        const nombreCli = document.createElement('p');
        nombreCli.classList.add("separadorP2");
        nombreCli.textContent = "Cliente: "+cli.nombre + " "+ cli.apellido

        const documentoCli = document.createElement('p');
        documentoCli.classList.add("separadorP1");
        documentoCli.textContent = "Documento: "+ cli.ci;

        const montoCli = document.createElement('p');
        montoCli.classList.add("separadorP2");
        montoCli.textContent = "Monto: "+cli.montoPrestamo;

        const montoCuotas = document.createElement('p');
        montoCuotas.classList.add("separadorP1");
        montoCuotas.textContent = cli.cantidadCuotas +" cuotas de $ "+cli.abonoCuota

        divCon.appendChild(nombreCli);
        divCon.appendChild(documentoCli);
        divCon.appendChild(montoCli);
        divCon.appendChild(montoCuotas);

        contenedorConsulta.appendChild(divCon);
        
    }
    

     
           
        
        
        


   /*  

    modalConsulta.showModal();
    btnCerrar.addEventListener("click",()=>{
        modal.close();
    }) */

function divPrestamo(cliente){    
        
            const divPrestamo = document.createElement('div');
            divPrestamo.classList.add();               
            
            const cli = document.createElement('h4');
            cli.classList.add();
            cli.textContent = "Cliente: " + cliente.nombre + " "+ cliente.apellido;
            
            const info = document.createElement('h4');
            info.classList.add();
            info.textContent = "El prestamos solicitado es de " + cliente.cuotas + " cuotas " + "de $"+ cliente.montoPres ;
    
            divPrestamo.appendChild(cli);
            divPrestamo.appendChild(info);
    
            veoPrestamo.appendChild(divPrestamo);
            console.log(datoGuardado)
    }
        

const veoPrestamo = document.querySelector("#muestro")