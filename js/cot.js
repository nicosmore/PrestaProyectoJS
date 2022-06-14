/* const monedas=[
    {id:0, nombre: 'PesoUru', compra:1, venta: 1, img:""},
    {id:1, nombre: 'Dolar', compra:39.6, venta: 42.1, img:'usa'},
    {id:2, nombre: 'Libra', compra:48, venta:54.2, img:'uk'},    
    {id:3, nombre: 'Real', compra:7.7, venta: 9.4, img:'brasil'},
    {id:4, nombre: 'Euro', compra:41.8, venta: 46.2, img:"ue"}
] */
const contenedorMonedas = document.querySelector("#Moneda");
const conversorMonedas = document.querySelector("#Convertor")

//precargar contenido
document.addEventListener('DOMContentLoaded', ()=>{
    datosMonedasJson();
    
})
//Agrego fetch
const datosMonedasJson = ()=>{
    fetch("data/datoMoneda.json")
    .then((moneda)=>{
        return moneda.json();
    })
    .then((dato)=>{
        mostrarMonedas(dato);        
    })
}

function mostrarMonedas(idMoneda){

    for (const moneda of idMoneda) {
        
       moneda.id != 0 && divParaMonedas(moneda);    //  AND    
        
    }
}

function divParaMonedas(mon){

    const divMoneda = document.createElement('div');
    divMoneda.classList.add(mon.img, 'cajaMoneda');               
            
    const nombreMoneda = document.createElement('h4');
    nombreMoneda.classList.add();
    nombreMoneda.textContent = mon.nombre;

    const valorCompra= document.createElement('p');
    valorCompra.classList.add('fuenteMoneda');
    valorCompra.textContent = "Compra: " + mon.compra;

    const valorVenta= document.createElement('p');
    valorVenta.classList.add('fuenteMoneda');
    valorVenta.textContent = "Venta: " + mon.venta;

    divMoneda.appendChild(nombreMoneda);
    divMoneda.appendChild(valorCompra);
    divMoneda.appendChild(valorVenta);

    contenedorMonedas.appendChild(divMoneda);

}

//Funcion para detener recarga y poder mostrar conversion 
const formulario = document.querySelector('#Form');
formulario.addEventListener('submit', function(evt){
    evt.preventDefault();
    datosConversionJson();    
    
})
//Agrego fetch
const datosConversionJson = ()=>{
    fetch("data/datoMoneda.json")
    .then((moneda)=>{
        return moneda.json();
    })
    .then((dato)=>{
        mostrarConversion(dato);        
    })
}

 function mostrarConversion(monedas){ 
     
    
    
    let monto = parseFloat(document.querySelector('#montoCotizar').value);
    let tipoMonto = document.querySelector('#tipoMonto').value;
    let tipoCambio = document.querySelector('#tipoCambio').value;

    let monedaMonto = monedas.find(moneda=>moneda.id==tipoMonto);
    let monedaCambio = monedas.find(moneda=>moneda.id==tipoCambio);
    let resultado="";  

    conversorMonedas.innerHTML="";
    
    if (tipoMonto=="Tipo Moneda" || tipoCambio =="Convertir a..." ){

        const nombreConversion = document.createElement('p');
        nombreConversion.classList.add("fuenteConver");
        nombreConversion.textContent = "Falta ingresar dato";
        conversorMonedas.appendChild(nombreConversion);
    }
    else if (monedaMonto.compra<monedaCambio.compra){

        resultado = (monto*monedaMonto.compra)/monedaCambio.compra;
        console.log(monedaCambio)
        console.log(monedaCambio.compra)

        const nombreConversion = document.createElement('p');
        nombreConversion.classList.add("fuenteConver");
        nombreConversion.textContent = "El monto es $ "+resultado.toFixed(2);
        conversorMonedas.appendChild(nombreConversion);
    }
    else if (monedaMonto.compra>monedaCambio.compra){
        
        resultado = monto*(monedaMonto.compra/monedaCambio.compra);
        const nombreConversion = document.createElement('p');
        nombreConversion.classList.add("fuenteConver");
        nombreConversion.textContent = "El monto es $ "+resultado.toFixed(2);        
        conversorMonedas.appendChild(nombreConversion);
    }
    else{
        const nombreConversion = document.createElement('p');
        nombreConversion.classList.add("fuenteConver");
        nombreConversion.textContent = "El monto es $ "+monto;
        conversorMonedas.appendChild(nombreConversion);
    }   
}

