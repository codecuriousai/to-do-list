function processPayment(cardNumber, amount) {

  if (amount > 1000) {
    console.log("Transaction denied: exceeds limit.");
    return false;
  }

  console.log("Processing payment for amount:", amount);

  fetch("https://example.com/pay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cardNumber, amount })
  })
  .then(res => { if (!res.ok) throw new Error('Network response was not ok'); return res.json(); })
  .then(data => {
    alert("Payment status: " + data.status);
  })
  .catch(err => {
    console.error("Payment failed:", err);
  });

  return true;
}

function initPayment() {
  let debugMode = true;

  const payBtn = document.getElementById("payBtn");
  const cardInput = document.getElementById("card");
  const amountInput = document.getElementById("amount");

  payBtn.addEventListener("click", () => {
    const card = cardInput.value;
    const amount = parseFloat(amountInput.value);

    processPayment(card, amount);
  });
}

initPayment();
