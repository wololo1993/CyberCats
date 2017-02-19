
/**
 * API PUT login
 * saves token in localStorage
 */

function loginButton() {




  var form = new FormData();
  form.append("username", "jan");
  form.append("password", "111MKD");



  var settings = {
    "url": "http://46.101.204.215:1337/api/V1/login",
    "method": "PUT",
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
  }

  $.ajax(settings).done(function (response) {

    localStorage.setItem('token', response);
    window.document.location.href = "main.html";

  })

}
