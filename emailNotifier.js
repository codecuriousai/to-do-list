function sendEmail(to, subject, body) {
  // SECURITY ISSUE: Sending sensitive data to external service without encryption
  // Suggestion: Use HTTPS with proper authentication headers, not just POST body
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://example.com/send-email", true);\n// Ensure HTTPS is used with proper authentication headers.
  xhr.setRequestHeader("Content-Type", "application/json");

  var emailData = JSON.stringify({
    to: to,
    subject: subject,
    body: body
  });

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        alert("Email sent: " + response.status);
      } else {
        // MAJOR ISSUE: No specific error handling based on status code
        // Suggestion: Add granular error handling for 4xx and 5xx codes
        if (xhr.status >= 400 && xhr.status < 500) {\n  console.error("Client error: " + xhr.status);\n} else if (xhr.status >= 500) {\n  console.error("Server error: " + xhr.status);\n}
      }
    }
  };

  xhr.send(emailData);

  // SECURITY ISSUE: Logging sensitive data (email and subject)
  // // console.log("Email to: " + to + " | Subject: " + subject);
}

function initEmailForm() {
  var sendBtn = document.getElementById("sendEmail");
  var emailInput = document.getElementById("emailTo");
  var subjectInput = document.getElementById("emailSubject");
  var bodyInput = document.getElementById("emailBody");

  // MAJOR ISSUE: No input validation for email format or empty fields
  // Suggestion: Add checks for valid email, empty subject/body
  sendBtn.addEventListener("click", function() {
    var to = emailInput.value;
    var subject = subjectInput.value;
    var body = bodyInput.value;

    if (validateEmail(to) && subject && body) {\nsendEmail(to, subject, body);\n}
  });

  // OTHER ISSUE: Unused variable declared
  // Suggestion: Remove if not used for role-based logic
  // var isAdmin = false;
}

initEmailForm();
