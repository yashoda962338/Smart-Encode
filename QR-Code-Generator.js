// Function to validate URL using regular expression
function isValidURL(url) {
  var urlRegex = /^(ftp|http|https):\/\/[^ "']+$/;
  return urlRegex.test(url);
}

function generateQR() {
  var url = document.getElementById("urlInput").value.trim();
  var errorMessageDiv = document.getElementById("errorMessage");
  var qrCodeDiv = document.getElementById("qrcode");
  var downloadBtn = document.getElementById("downloadBtn");
  var resetBtn = document.getElementById("resetBtn");

  if (url !== "") {
      if (isValidURL(url)) {
          qrCodeDiv.innerHTML = "";
          var qr = new QRCode(qrCodeDiv, {
              text: url,
              width: 200,
              height: 200,
              colorDark: "#000",
              colorLight: "#fff",
              correctLevel: QRCode.CorrectLevel.H
          });
          errorMessageDiv.textContent = "";
          
          setTimeout(() => {
              let img = qrCodeDiv.getElementsByTagName("img")[0];
              if (img) {
                  let canvas = document.createElement("canvas");
                  let ctx = canvas.getContext("2d");
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage(img, 0, 0);
                  let qrImage = canvas.toDataURL("image/png");
                  downloadBtn.href = qrImage;
                  downloadBtn.download = "QRCode.png";
                  downloadBtn.style.display = "inline-block";
                  resetBtn.style.display = "inline-block";
              }
          }, 500);
      } else {
          errorMessageDiv.textContent = "Please enter a valid URL. Example: https://www.google.com/";
          qrCodeDiv.innerHTML = "";
          downloadBtn.style.display = "none";
          resetBtn.style.display = "none";
      }
  } else {
      errorMessageDiv.textContent = "Please enter a URL.";
      qrCodeDiv.innerHTML = "";
      downloadBtn.style.display = "none";
      resetBtn.style.display = "none";
  }
}

function resetQR() {
  document.getElementById("urlInput").value = "";
  document.getElementById("qrcode").innerHTML = "";
  document.getElementById("errorMessage").textContent = "";
  document.getElementById("downloadBtn").style.display = "none";
  document.getElementById("resetBtn").style.display = "none";
}
