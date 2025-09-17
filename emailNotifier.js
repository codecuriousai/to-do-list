function sendEmail(to, subject, body) {
  // SECURITY ISSUE: Sending sensitive data to external service without encryption
  // Suggestion: Use HTTPS with proper authentication headers, not just POST body
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://example.com/send-email", true);
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
        if (xhr.status >= 400 && xhr.status < 500) {
          console.error("Client error: " + xhr.status);
        } else if (xhr.status >= 500) {
          console.error("Server error: " + xhr.status);
        }
      }
    }
  };

  xhr.send(emailData);

  // SECURITY ISSUE: Logging sensitive data (email and subject)
  // console.log("Email to: " + to + " | Subject: " + subject);
  // Removed sensitive data logging.
}

function validateEmail(email) {
  var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

function initEmailForm() {
  var sendBtn = document.getElementById("sendEmail");
  var emailInput = document.getElementById("emailTo");
  var subjectInput = document.getElementById("emailSubject");
  var bodyInput = document.getElementById("emailBody");

  sendBtn.addEventListener("click", function() {
    var to = emailInput.value;
    var subject = subjectInput.value;
    var body = bodyInput.value;

    if (validateEmail(to) && subject && body) {
      sendEmail(to, subject, body);
    } else {
      alert('Invalid input.');
    }
  });

  // OTHER ISSUE: Unused variable declared
  // var isAdmin = false;
  // Removed unused variable.
}

initEmailForm();