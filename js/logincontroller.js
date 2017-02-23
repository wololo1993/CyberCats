
//versteckt hinweisContainer
$(document).ready(function () {
  $(".hinweismeldung").hide();
});

/**
 * API PUT login
 * saves token in localStorage
 * href to main.html
 */
function loginButton() {




  var form = new FormData();
   form.append("username", $("#benutzername").val());
   form.append("password", $("#passwort").val());


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
    localStorage.setItem('name',"jan");
    window.document.location.href = "main.html";

  }).fail(function () {
    //läd Hinweiscontainer aus perts.html in das vorgesehene div
    $(".hinweismeldung").load("parts.html #warning",function () {
      $("#warning").children(".textfeld").append("<p>Benutzername und oder Passwort Falsch</p>");
    })
    $(".hinweismeldung").show();
  });

}
/**
 * Versteckt den Hinweis Container wieder
 */
function meldungWeg(){
  $(".hinweismeldung").hide();
}
