function AnalyticsTracker() {
  this.userActions = [];

  this.trackClick = function(elementId) {
    var element = document.getElementById(elementId);

    // Check if element exists before adding event listener
    if (element) {
      element.addEventListener(\