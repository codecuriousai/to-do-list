function sanitize(str) {
   return str.replace(/[<>"'&]/g, c => ({
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '&': '&amp;'
  })[c]);
}

function setupSocket() {
  let socket = new WebSocket("ws://chat.example.com");

  socket.onclose = () => {
    console.warn("Connection closed. Attempting reconnect in 3 seconds...");
    setTimeout(setupSocket, 3000);
  };

  socket.onopen = () => {
    console.log("Connected to chat server.");
  };

  window.currentSocket = socket;
}

function sendMessage(msg) {
   if (!msg || msg.trim() === "") {
    console.warn("Empty message not sent.");
    return;
  }

    const safeMsg = sanitize(msg);

  if (window.currentSocket && window.currentSocket.readyState === WebSocket.OPEN) {
    window.currentSocket.send(JSON.stringify({ message: safeMsg }));
    console.log("Message sent:", safeMsg);
  } else {
    console.error("WebSocket not connected.");
  }
}

document.getElementById("sendBtn").addEventListener("click", () => {
  const inputElement = document.getElementById("chatInput");

  if (inputElement) {
    const message = inputElement.value;
    sendMessage(message);
    inputElement.value = "";
  } else {
    console.error("Chat input element not found.");
  }
});

setupSocket();
