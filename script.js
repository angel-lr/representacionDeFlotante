"use strict"; 

const d = document;

let $btnCalcular = d.getElementById("btn-calcular");

$btnCalcular.addEventListener("click", e=>{
    e.preventDefault();
    /*Variables parte binaria final --------------------*/
    let $num = d.getElementById("entrada-decimal").value;
    let $numBinario = d.getElementById("entrada-binaria");
    let $numBinarioDos = d.getElementById("entrada-binaria-dos"); 
    let signoNumero = "", parteDecimalBinaria = $num;
    let mantista= $num,  parteEnteraBinaria = "";
    let parteEnteraBinariaSinUno = "", temporal= "", exponente = "";
    /*Variables parte entera -----------------------------*/
    let $parteEnteraResultado = d.getElementById("parte-entera-resultado");
    $parteEnteraResultado.textContent = "Resultado : ";
    let $tBody = d.querySelector(".table-parte-entera-body");
    $tBody.replaceChildren();
    let datosParteEntera = [];
    /*Variables parte decimal------------------------------ */
    let $parteFraccionariaResultado = d.getElementById("parte-fraccionaria-resultado");
    $parteFraccionariaResultado.textContent = "Resultado : ";
    let $tBodyFraccionaria = d.querySelector(".table-parte-fraccionaria-body");
    $tBodyFraccionaria.replaceChildren();
    let datosParteFraccionaria = [];
    /*Exponente------------------- */
    let $exponenteResultado = d.getElementById("exponente-resultado");
    $exponenteResultado.textContent = "Resultado : "
    let $tBodyExponente = d.querySelector(".table-exponente-body");
    $tBodyExponente.replaceChildren();
    let datosExponente = [];

    //chequeo del signo o si es cero----------------------------------
    if($num ==0) {
        signoNumero = "00000000000000000000000000000000";
        $parteEnteraResultado.textContent += signoNumero.slice(0, 1);
    } else{
        if ($num <0) {
            signoNumero += "1";
            $num = (parseFloat($num) * -1).toString();
            parteDecimalBinaria = $num;
            mantista= $num;
        }else {
            signoNumero+="0";
        }
        
        

        mantista = parseInt($num)
        
        //parte entera-----------------------------------------
        while(mantista >0) {
            datosParteEntera.push(mantista, "2", Math.trunc(mantista/2).toString(), mantista%2)
            agregarFila($tBody, datosParteEntera); 
        
            let residuo = mantista%2; 
            parteEnteraBinaria += residuo.toString();
            mantista = Math.trunc(mantista/2);

            datosParteEntera= []
        }
        parteEnteraBinaria = invertirCadena(parteEnteraBinaria);

        $parteEnteraResultado.textContent += parteEnteraBinaria;

        parteEnteraBinariaSinUno = parteEnteraBinaria.slice(1);

        // parte decimal -------------------------------
        mantista = parseInt($num)

        parteDecimalBinaria -= mantista;

        let contador = 0;
        while(contador != 25) {
            datosParteFraccionaria.push(parteDecimalBinaria, "2", parteDecimalBinaria*2, parseInt(parteDecimalBinaria*2))

            agregarFila($tBodyFraccionaria, datosParteFraccionaria)

            temporal+= parseInt(parteDecimalBinaria * 2);
            parteDecimalBinaria = parteDecimalBinaria*2 - parseInt(parteDecimalBinaria*2);
            contador++;

            datosParteFraccionaria = [];
        }
        parteDecimalBinaria = temporal; 

        $parteFraccionariaResultado.textContent +=parteDecimalBinaria;

        maxCaracteresEnCelda();
        //exponente----------------------------------

        contador = 0;
        while(contador!= ((parteEnteraBinaria.toString()).length - 1)) {
            contador ++;
        }

        

        let numero = 127 + contador;

        datosExponente.push(`127 + ${contador} = ${127+contador}`);
        agregarFila($tBodyExponente, datosExponente)
        datosExponente = [];

        while(numero >0) {
            let residuo = numero%2; 
            exponente += residuo.toString();
            numero = Math.trunc(numero/2);
        }

        exponente = $num >1 ? invertirCadena(exponente) : "0" +invertirCadena(exponente);

        $exponenteResultado.textContent += exponente;

    }
    
    //formateo del resultado------------------------------------
    $numBinario.value = (signoNumero + exponente + 
        parteEnteraBinariaSinUno + parteDecimalBinaria).slice(0, 32);

    $numBinarioDos.value = $numBinario.value.slice(0,1) + " " + $numBinario.value.slice(1, 5)+
         " " + $numBinario.value.slice(5, 9) + " " + $numBinario.value.slice(9, 12) + " " +
         $numBinario.value.slice(12, 16) + " " + $numBinario.value.slice(16, 20) + " " +
         $numBinario.value.slice(20, 24) + " " + $numBinario.value.slice(24, 28) + " " +
         $numBinario.value.slice(28, 32);
    
})

function maxCaracteresEnCelda() {
    const $tBodies = document.querySelectorAll('.table-parte-fraccionaria tbody');

    $tBodies.forEach($tBody => {
        const $celdas = $tBody.querySelectorAll('td');
        
        $celdas.forEach(celda => {
            const texto = celda.textContent;
            if (texto.length > 10) {
                celda.textContent = texto.slice(0, 10);
            }
        });
    });
}

function agregarFila(tbody, datos) {
    const fila = document.createElement('tr');
    
    
    datos.forEach(dato => {
      const celda = document.createElement('td');
      celda.textContent = dato; 
      fila.appendChild(celda); 
    });
    
    
    tbody.appendChild(fila);
}



function invertirCadena(cadena) {
    return cadena.split("").reverse().join("");
}




