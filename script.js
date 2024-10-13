"use strict"; 

const d = document;


$btnCalcular.addEventListener("click", e=>{
    e.preventDefault();
    let $num = d.getElementById("entrada-decimal").value;
    let $numBinario = d.getElementById("entrada-binaria");
    let $numBinarioDos = d.getElementById("entrada-binaria-dos"); 
    let signoNumero = "";
    let parteDecimalBinaria = $num;
    let mantista= $num;
    let parteEnteraBinaria = "";
    let parteEnteraBinariaSinUno = "";
    let temporal= ""; 
    let exponente = "";

    if($num ==0) {
        signoNumero = "00000000000000000000000000000000";
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
        
        
        while(mantista >0) {
            let residuo = mantista%2; 
            parteEnteraBinaria += residuo.toString();
            mantista = Math.trunc(mantista/2);
        }
        parteEnteraBinaria = invertirCadena(parteEnteraBinaria);

        parteEnteraBinariaSinUno = parteEnteraBinaria.slice(1);

        mantista = parseInt($num)

        parteDecimalBinaria -= mantista;

        let contador = 0;
        while(contador != 30) {
            temporal+= parseInt(parteDecimalBinaria * 2);
            parteDecimalBinaria = parteDecimalBinaria*2 - parseInt(parteDecimalBinaria*2);
            contador++;
        }
        parteDecimalBinaria = temporal; 

        contador = 0;
        while(contador!= ((parteEnteraBinaria.toString()).length - 1)) {
            contador ++;
        }

        let numero = 127 + contador;

        while(numero >0) {
            let residuo = numero%2; 
            exponente += residuo.toString();
            numero = Math.trunc(numero/2);
        }

        exponente = $num >1 ? invertirCadena(exponente) : "0" +invertirCadena(exponente);

    }
    
    $numBinario.value = (signoNumero + exponente + 
        parteEnteraBinariaSinUno + parteDecimalBinaria).slice(0, 32);

    $numBinarioDos.value = $numBinario.value.slice(0,1) + " " + $numBinario.value.slice(1, 5)+
         " " + $numBinario.value.slice(5, 9) + " " + $numBinario.value.slice(9, 12) + " " +
         $numBinario.value.slice(12, 16) + " " + $numBinario.value.slice(16, 20) + " " +
         $numBinario.value.slice(20, 24) + " " + $numBinario.value.slice(24, 28) + " " +
         $numBinario.value.slice(28, 32);
})

function invertirCadena(cadena) {
    return cadena.split("").reverse().join("");
}




