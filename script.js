let apiKey = "d2929029d4610deaa4c34a07";
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const resetBtn = document.getElementById("reset");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convert = document.getElementById("convert-button");

const resetPage = ()=>{
    amount.value = "";
    result.innerHTML = "";
}

resetBtn.addEventListener('click', resetPage);

//create dropdown form currency array
currencies.forEach((currency)=>{
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    fromDropDown.appendChild(option);
});

currencies.forEach((currency)=>{
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    toDropDown.appendChild(option);
});

//setting the default value
fromDropDown.value = "USD";
toDropDown.value = "INR";

const convertCurrency = ()=>{
    const fromCurrency = fromDropDown.value;    
    const toCurrency = toDropDown.value;  
    const amtValue = amount.value;  

    if(amtValue.length != 0) {
        fetch(api)
        .then((response)=> response.json())
        .then((data)=>{
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency]; 
            
            const convertedAmt = (amtValue / fromExchangeRate) * toExchangeRate;
            result.innerHTML = `${amtValue} ${fromCurrency} = ${convertedAmt.toFixed(2)} ${toCurrency}`
        });
    } else {
        alert("Please fill the amount!")
    }
}


convert.addEventListener('click',convertCurrency);
window.addEventListener('load',convertCurrency);