function uploadFile(file) {
  const reader = new FileReader();
  
  reader.onload = function () {
    document.getElementById("preview").innerHTML = reader.result;
  };

  reader.readAsText(file);
}

document.getElementById("fileInput").addEventListener("change", function (e) {
  uploadFile(e.target.files[0]);
});

function initUploader() {
  document.getElementById("fileInput").disabled = false;
}
