let userActions = [];

function trackClick(elementId) {
  const element = document.getElementById(elementId);

  element.addEventListener("click", () => {
    const timestamp = new Date().toISOString();
    userActions.push({ elementId, timestamp });

    fetch("http://insecure-analytics.example.com/track", {
      method: "POST",
      body: JSON.stringify({ elementId, timestamp }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("Tracked click on:", elementId);
  });
}

function reportAllActions() {
  const report = JSON.parse(JSON.stringify(userActions)); // Performance warning for large data

  console.log("Sending report:", report);
}

function initTracking() {
  let version = "1.0";

  trackClick("btnSubmit");
  trackClick("btnCancel");
}

initTracking();
