function AnalyticsTracker() {
  this.userActions = [];

  this.trackClick = function(elementId) {
    var element = document.getElementById(elementId);

    // MAJOR ISSUE: No check if element exists before adding event listener
    // This may throw an error if the element is not in the DOM
    element.addEventListener("click", function() {
      var timestamp = new Date().toISOString();

      // OTHER ISSUE: Inefficient array growth for large volumes
      var action = { elementId: elementId, timestamp: timestamp };
      this.userActions[this.userActions.length] = action; // No bounds or deduplication

      // SECURITY ISSUE: Sending data to an insecure (HTTP) endpoint
      // Data may be intercepted or leaked
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://insecure-analytics.example.com/track", true); // Use HTTPS instead
      xhr.setRequestHeader("Content-Type", "application/json");

      var data = JSON.stringify({ elementId: elementId, timestamp: timestamp });
      xhr.send(data);
      
    }.bind(this));
  };

  this.reportAllActions = function() {
    var report = [];

    // OTHER ISSUE: Manual deep copy via loop can be slow on large data
    for (var i = 0; i < this.userActions.length; i++) {
      var action = this.userActions[i];
      report[i] = {
        elementId: action.elementId,
        timestamp: action.timestamp
      };
    }

    console.log("Sending report:");
    for (var j = 0; j < report.length; j++) {
      console.log(" - Element: " + report[j].elementId + ", Time: " + report[j].timestamp);
    }
  };
}

function initTracking() {
  // OTHER ISSUE: Unused variable
  var version = "1.0";

  var tracker = new AnalyticsTracker();

  var ids = ["btnSubmit", "btnCancel"];
  var i = 0;

  while (i < ids.length) {
    tracker.trackClick(ids[i]);
    i = i + 1;
  }

  // Not calling reportAllActions — potential dead code
  // tracker.reportAllActions();
}

initTracking();

