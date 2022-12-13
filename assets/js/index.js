const currency = document.querySelector("#currency")
const button = document.querySelector(".btn")
const moneyOut = document.querySelector("#moneyOut")
const moneyOut2 = document.querySelector("#moneyOut2")
const moneyIn = document.querySelector("#moneyIn")

moneyIn.valor = ""

const getPrice = async () => {
  try {
    const responseDolar = await fetch("https://mindicador.cl/api/dolar");
    const responseEuro = await fetch("https://mindicador.cl/api/euro");

    if ((responseDolar.status == 200) && (responseEuro.status == 200)) {
      const arrayCurrencyDolar = await responseDolar.json();
      const arrayCurrencyEuro = await responseEuro.json();

      lastDolar = arrayCurrencyDolar.serie[0].valor
      lastEuro = arrayCurrencyEuro.serie[0].valor

      button.addEventListener("click", () => {
        if (moneyIn.value > 0) {
          if (currency.value == "Dolar") {
            moneyOut2.innerHTML = `CLP$${moneyIn.value} = US$${((moneyIn.value / lastDolar))}`
            moneyIn.value = ""

          }
          else if (currency.value == "Euro") {
            moneyOut2.innerHTML = `CLP$${moneyIn.value} = EU€${((moneyIn.value / lastEuro))}`
            moneyIn.value = ""
          }
        }
        else {
          alert("Ingrese un valor válido")
        }
      })
    }
    else {
      throw "err";
    }
  } catch (err) {
    console.log("catch", err)
    alert("Error")
  }
}
getPrice();
