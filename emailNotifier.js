function sendEmail(to, subject, body) {
  fetch("https://example.com/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ to, subject, body })
  })
  .then(res => res.json())
  .then(data => {
    alert("Email sent: " + data.status);
  })
  .catch(err => {
    console.error("Email failed:", err);
  });

  console.log("Email to:", to, "| Subject:", subject);
}

function initEmailForm() {
  const sendBtn = document.getElementById("sendEmail");
  const emailInput = document.getElementById("emailTo");
  const subjectInput = document.getElementById("emailSubject");
  const bodyInput = document.getElementById("emailBody");
  sendBtn.addEventListener("click", () => {
    const to = emailInput.value;
    const subject = subjectInput.value;
    const body = bodyInput.value;

    sendEmail(to, subject, body);
  });

  const isAdmin = false;
}

initEmailForm();
