/*
Partendo dall'esercizio di qualche giorno fa, ristrutturiamo la logica in modo da recuperare i dati da un form.
Una volta effettuati i nostri calcoli stampiamo i dati del biglietto in pagina. Quando tutto funziona, ci dedichiamo alla parte HTML/CSS.
Quali campi inserire nel form:
Una casella di testo per il form del passeggero
Una casella numerica per i km
Una tendina per selezionare la fascia d'età (Maggiorenne, Minorenne, Over65)
NON E' NECESSARIA ALCUNA VALIDAZIONE
Come calcolare  il prezzo:
il prezzo del biglietto è definito in base ai km (0.21 € al km)
va applicato uno sconto del 20% per i minorenni
va applicato uno sconto del 40% per gli over 65.
L'output del prezzo finale va messo fuori in forma umana (con massimo due decimali,
Cosa stampare sul biglietto:
Nome passeggero
Codice treno (inseriamo una stringa a caso, per ora)
Numero carrozza (randomizziamo una carrozza da 1 a 12)
Prezzo (stampato con due decimali)
Tariffa applicata all'utente (Tariffa minori, Tariffa ordinaria, Tariffa Over65)
Per la parte grafica
Facciamola solo se tutto il resto della logica è funzionante, vi allego uno screen dell'esercizio fatto in classe senza stile e una da prendere come esempio per la parte visiva. Sentitevi liberi di personalizzare ulteriormente la grafica se vi va.
Bonus
Nascondiamo la sezione del biglietto se non è ancora stato generato il biglietto stesso.
Aggiungiamo una funzione che ci permetta di resettare i campi del form ai valori originali.
*/

/*
1- prendere i riferimenti dal DOM
2- impostare evento click su button
3- recuperare i valori dagli input/select
4- calcolare prezzo biglietto ordinario
5- applicare sconto del 20% se minorenne o 40% se over65
6- arrotondare prezzo finale del biglietto
7- stampare dati su html
*/

// variabili riferimento form
var userName = document.getElementById("name");
var km = document.getElementById("km");
var userAge = document.getElementById("age");
var button = document.getElementById("button");
var reset = document.getElementById("reset-button");

// variabili alert
var alert = document.getElementById("alert");

// variabili riferimento biglietto
var ticketSection = document.getElementById("ticket-section");
var passName = document.getElementById("pass-name");
var discountElement = document.getElementById("discount-element");
var car = document.getElementById("car");
var trainCode = document.getElementById("train-code");
var ticketPrice = document.getElementById("ticket-price");

// aggiungere evento al click di button
button.addEventListener("click", function () {

    // recuperare valori dagli input/select
    var userNameValue = userName.value;
    var kmValue = km.value;
    var userAgeValue = userAge.value;

    // validazione dati input
    if (!userNameValue || userNameValue.trim() === "" || !isNaN(userNameValue) || !kmValue || isNaN(kmValue) || parseInt(kmValue) < 10) {
        alert.classList.remove("hidden");
    } else {

        alert.classList.add("hidden");

        // calcolo prezzo biglietto ordinario
        var price = kmValue * 0.21;
        var discount = "Tariffa ordinaria";

        // sconto 20% se minorenne
        if (userAgeValue === "min") {
            price *= 0.8;
            discount = "Tariffa minori";
        }

        // sconto 40% se over65
        if (userAgeValue === "over65") {
            price *= 0.6;
            discount = "Tariffa Over65";
        }

        // arrotondamento a 2 cifre prezzo finale
        price = "Euro " + price.toFixed(2);

        // stampa dati su pagina HTML
        passName.innerHTML = userNameValue.toUpperCase();
        discountElement.innerHTML = discount;
        car.innerHTML = Math.floor(Math.random() * 12) + 1;
        trainCode.innerHTML = Math.floor(Math.random() * (100000 - 90000)) + 90000; //Math.floor(Math.random() * (max(escluso) - min)) + min
        ticketPrice.innerHTML = price;

        // visualizzare biglietto su pagina
        ticketSection.classList.remove("hidden");
    }
})

// aggiungere evento al click di reset-button
reset.addEventListener("click", function () {
    // reset alert
    alert.classList.add("hidden");

    // reset valori form
    userName.value = "";
    km.value = "10";
    userAge.value = "maj"

    // reset valori biglietto
    var ticketElements = document.getElementsByClassName("ticket-info");

    for (var i = 0; i < ticketElements.length; i++) {
        ticketElements[i].innerHTML = "";
    }

    // nascondo biglietto svuotato da tutto
    ticketSection.classList.add("hidden");
})