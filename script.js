"use strict"; 

const d = document;

let $btnCalcular = d.getElementById("btn-calcular");
let $btnDarkLight = d.getElementById("btn-darkLight");

$btnCalcular.addEventListener("click", e=>{
    e.preventDefault();
    let $num = d.getElementById("entrada-decimal").value;
    let $numBinario = d.getElementById("entrada-binaria");
    let numBinario = "";

    if($num ==0) {
        numBinario = "00000000000000000000000000000000";
    } else if($num <0){
        numBinario += "1";
    }else {
        numBinario+="0";
    }
    
    $numBinario.value = numBinario;
})

const lightMode = ()=>{
    $btnDarkLight.innerHTML = `<i class="bi bi-moon-fill"></i>`;
 }

 const darkMode =()=>{
    $btnDarkLight.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`;
 }


$btnDarkLight.addEventListener("click", (e)=>{
    if($btnDarkLight.innerHTML === `<i class="bi bi-moon-fill"></i>`) {
        darkMode();
    }else {
        lightMode();
    }
});