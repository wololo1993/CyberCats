//get token from localStorage
var tokenJSON = localStorage.getItem('token');
var token = JSON.parse(tokenJSON);
var student = getStudent();
var avatars = getAvatars();
var chapters = getChapters();
var chapterillustrations = getChapterillustrations();
var avatarSelected = "";
var benutzername = "";
var scrollDivID = 0;

$(document).ready(function () {
  getFoerderPlaene();

  setTimeout(function () {
    init()
  }, 500);
});

function init() {
  console.log()
  meldungWeg();
  load();
  foerderPlaneInit();
  initScrollButtons();
  changeContent("comp");
  setTimeout(function () {
    dynamischeBilderDropdown();
    makeBubble("blads", "asd", "images/logo.png", "images/logo.png", "asd", "asd", 1);
  }, 200);

  document.getElementById("body1").style.backgroundColor = "#FFF";
}

function load() {

//Writes information in main.html

  // student Button
  document.getElementById("avatarImgInactive").src = (avatars[student.avatarId].avatarInactiveUrl).substring(1);
  document.getElementById("avatarImgBig").src = (avatars[student.avatarId].avatarBigUrl).substring(1);
  document.getElementById("studentName").innerHTML = student.forename + "<br>" + student.surname;
  // school Button

  document.getElementById("schoolImgInactive").src = (student.school.imageUrlInactive).substring(1);
  document.getElementById("schoolImgBig").src = (student.school.imageUrlBig).substring(1);

  document.getElementById("schoolName").innerHTML = "<p>" + getSchoolname(student.school.name) + "</p>";
  document.getElementById("schoolAdress").innerHTML = "<p>" +
    (student.school.address).replace(", ", "<br>") + "<br>" +
    student.school.country + "<br>" +
    "<br>" +
    student.school.email + "<br>" +
    student.school.telefon +
    "</p>";
  // studyGroup Button
  document.getElementById("studyGroupImgInactive").src = (student.studyGroups.imageUrlInactive).substring(1);
  document.getElementById("studyGroupImgBig").src = (student.studyGroups.imageUrlBig).substring(1);
  document.getElementById("studyGroupName").innerHTML = "<p>KLASSE<br>" + student.studyGroups.class + "</p>";
  document.getElementById("formteacher").innerHTML = " <p>KLASSENLEHRER*IN <br>" + student.formteacher + "</p>";


}

/**
 * API GET student
 * writes in student
 */
function getStudent() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/student",
    "method": "GET",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {
    //console.log(response.avatarId);
    student = response;
  });

}

/**
 * API GET avatar
 * writes in avatar
 */
function getAvatars() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/avatar",
    "method": "GET",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {
    avatars = response;
  });
}

function getChapters() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/chapter",
    "method": "GET",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {
    chapters = response;
  });
}

function getChapterillustrations() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/chapterillustrations/",
    "method": "GET",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {
    chapterillustrations = response;
  });
}


/**
 * replaces "-" in schoolName with "-<br>"
 *
 * @param schoolName string
 * @returns string
 */
function getSchoolname(schoolName) {
  return schoolName.replace("-", "-<br>")
}

function changeOnChapter(chapterId, achieved) {
  changeContent("comp");
  setTimeout(function () {
    changeOnChapterDelayed(chapterId, achieved)
  }, 200);
}

function changeOnChapterDelayed(chapterId, achieved) {

  document.getElementById("todo_liste").innerHTML = "";
  var chapterURL = "";
  if (chapterId == 0) {
    document.getElementById("body1").style.backgroundColor = "#8da6d6";


    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://46.101.204.215:1337/api/V1/studentcompetence?checked=true",
      "method": "GET",
      "headers": {
        "authorization": token.token,
      }
    }

    $.ajax(settings).done(function (response) {
      response.sort(function (a, b) {
        return (a.fromDate - b.fromDate);
      });

      for (var i = 0; i < response.length; i++) {

        makeBubble("Erreicht am:", response[i].fromDate, "images/achievedCompetences-active.png", "images/achievedCompetences-inactive.png",
          response[i].studentText, response[i].number, i);

      }
    })
  } else {

    document.getElementById("body1").style.backgroundColor = chapters[chapterId - 1].weakcolor;
    if (chapterId < 10) {
      document.getElementById("flagImg").src = "images/chapter0" + chapterId + "/littleChapterFlag.png";
      chapterURL = "chapter0" + chapterId;
    } else {
      chapterURL = "chapter" + chapterId;
    }

    document.getElementById("flagImg").src = "images/" + chapterURL + "/littleChapterFlag.png";
    document.getElementById("scrollUp").src = "images/" + chapterURL + "/scrollUp.png";
    document.getElementById("scrollDown").src = "images/" + chapterURL + "/scrollDown.png";


    var achivedYN = (achieved) ? "true" : "false";

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://46.101.204.215:1337/api/V1/studentcompetence?checked=" + achivedYN + "&chapterId=" + chapterId,
      "method": "GET",
      "headers": {
        "authorization": token.token,
      }
    }

    $.ajax(settings).done(function (response) {
      response.sort(function (a, b) {
        return (a.fromDate - b.fromDate);
      });

      for (var i = 0; i < response.length; i++) {
        console.log(i);

        var bubbleTitel = "Erreicht am:";
        var bubbleText = response[i].fromDate;
        var imgActive = (response[i].checked.valueOf().toLocaleString().localeCompare("true".toLocaleString())) ? "images/" + chapterURL + "/competenceUndone.png" : "images/" + chapterURL + "/competenceDone.png";
        var imgInActive = (response[i].checked.valueOf().toLocaleString().localeCompare("true".toLocaleString())) ? "images/" + chapterURL + "/competenceUndone.png" : "images/" + chapterURL + "/competenceDone.png";

        var compInEDPlan = checkIfFoerderplan(response[i]);

         if (compInEDPlan != null) {

           console.log(compInEDPlan);

           bubbleTitel = compInEDPlan.bubbleInfoTitel;
           bubbleText = compInEDPlan.bubbleInfoNote;
           imgActive = "images/educationalPlan-active.png";
           imgInActive = "images/educationalPlan-inactive.png";
         }


        makeBubble(bubbleTitel, bubbleText, imgActive, imgInActive, response[i].studentText, response[i].number, i)
      }
    });
  }
  scrollDivID = 0;
  initScrollButtons();
}

function waitOnAnswer(foerderplanVonCompetence, bubbleTitel, bubbleText, imgActive, imgInActive, studText, Number, i) {


  if (foerderplanVonCompetence != null) {
    bubbleTitel = foerderplanVonCompetence[1];
    bubbleText = foerderplanVonCompetence[0];
    imgActive = "images/educationalPlan-active.png";
    imgInActive = "images/educationalPlan-inactive.png";
  }
  makeBubble(bubbleTitel, bubbleText, imgActive, imgInActive, studText, Number, i);
}

function getFoerderplan(planId) {
  changeContent("comp");
  document.getElementById("body1").style.backgroundColor = "#8da6d6";
  setTimeout(function () {
    getFoerderplanDelayed(planId)
  }, 200);
}
function getFoerderplanDelayed(planId) {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/educationalPlan/:" + planId,
    "method": "GET",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (foerderplan) {

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://46.101.204.215:1337/api/V1/studentcompetence",
      "method": "GET",
      "headers": {
        "authorization": token.token,
      }
    }

    $.ajax(settings).done(function (competences) {

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://46.101.204.215:1337/api/V1/educationalPlan",
        "method": "GET",
        "headers": {
          "authorization": token.token,
        }
      }

      $.ajax(settings).done(function (foerderplanTitel) {


        for (var j = 0; j < foerderplan[0].competences.length; j++) {

          var _id = foerderplan[0].competences[j].competenceId;

          makeBubble(foerderplanTitel[planId].name, foerderplan[0].competences[j].note, "images/educationalPlan-active.png"
            , "images/educationalPlan-inactive.png", competences[_id].studentText, competences[_id].number, _id);
        }
      });
    });
  });
  scrollDivID = 0;
  initScrollButtons();
}


function foerderPlaneInit() {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/educationalPlan",
    "method": "GET",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {

    for (var i = 0; i < response.length; i++) {
      $("#dropdown-plan").append(
        "<li onclick='" + "getFoerderplan(" + i + ")" + "'><a> " + response[i].name + "</a></li>"
      )
      response[i]
    }
  });
}

function dynamischeBilderDropdown() {

  var sheet = document.createElement('style')
  sheet.innerHTML =
    ".open .studentButton {content:url(\"" + avatars[(student.avatarId)].avatarUrl + "\")}" +
    ".open .schoolButton {content:url(\"" + student.school.imageUrl + "\")}" +
    ".open .classesButton {content:url(\"" + student.studyGroups.imageUrl + "\")}";

  document.body.appendChild(sheet);
}

function changeContent(content) {

  if (content == "comp") {
    $("#fenster").load("parts.html #competenzContent")
  }
  else if (content == "deleteProfile") {
    document.getElementById("body1").style.backgroundColor = "#FFF";

    $("#fenster").load("parts.html #profileDeleteContent")
  }
  else if (content == "avatarChange") {
    document.getElementById("body1").style.backgroundColor = "#FFF";

    avatarSelected = "";
    $("#fenster").load("parts.html #avatarContent")
  }
  else if (content == "pwChange") {
    document.getElementById("body1").style.backgroundColor = "#FFF";
    $("#fenster").load("parts.html #passwordChangeContent")

  }
  setTimeout(function () {
    meldungWeg();
  }, 100);

}

function logout() {
  localStorage.clear();
  token = "";

  if (localStorage.getItem(token) == null && token == "") {
    window.document.location.href = "index.html";
  } else {
    alert("logout Fehlgeschlagen")
  }
}

function deleteProfile() {

// PW kann nicht mitgeschicktwerden ist ja noch nutzlos
  // document.getElementById("#passwordinput").value;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/student",
    "method": "DELETE",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {
    $(".hinweismeldung").load("parts.html #confirmation", function () {
      $("#confirmation").children(".textfeld").append("Profil gelöscht");
    })
    $(".hinweismeldung").show();

  }).fail(function () {
    $(".hinweismeldung").load("parts.html #warning", function () {
        $("#warning").children(".textfeld").append("Falsches Passwort");
      }
    );
    $(".hinweismeldung").show();
  });
}

function selectAvatar(avatarID) {
  avatarSelected = avatarID;
  console.log($("#avatarBilder"));
  var avi = $("#avatarBilder").children();
  console.log(avi[avatarID]);
}

function changeAvatar() {

  if (avatarSelected == "") {
    $(".hinweismeldung").load("parts.html #warning", function () {
      $("#warning").children(".textfeld").append("Kein Avatar gewählt");
    })
    $(".hinweismeldung").show();

  }

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/avatar/:" + avatarSelected,
    "method": "PUT",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {
    $(".hinweismeldung").load("parts.html #confirmation", function () {
      $("#confirmation").children(".textfeld").append("Avatar geändert");
    })
    $(".hinweismeldung").show();

  }).fail(function () {
    $(".hinweismeldung").load("parts.html #warning", function () {
      $("#warning").children(".textfeld").append("Avatar nicht geändert");
    })
    $(".hinweismeldung").show();
  });

  avatarSelected = "";

  load();
}

function getFoerderPlaene() {
  var settingsEDPlan = {
    "async": false,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/educationalPlan",
    "method": "GET",
    "headers": {
      "authorization": token.token,
    }
  }
  $.ajax(settingsEDPlan).done(function (response) {
    localStorage.setItem("EDPlaene",JSON.stringify(response));

    for (var i = 1; i <= response.length; i++) {

      var settingsEDPlaene = {
        "async": false,
        "crossDomain": true,
        "url": "http://46.101.204.215:1337/api/V1/educationalPlan/:" + i,
        "method": "GET",
        "headers": {
          "authorization": token.token,
        }
      }
      $.ajax(settingsEDPlaene).done(function (comp) {
        localStorage.setItem("EDplanNr"+i,JSON.stringify(comp));
      });
    }
  });
}

function checkIfFoerderplan(comp) {
  var foerderPlaene = JSON.parse(localStorage.getItem("EDPlaene"));


  for(var i = 1; i <= foerderPlaene.length; i++){

    var foerderPlanNr = JSON.parse(localStorage.getItem("EDplanNr"+i))


    for(var j = 0; j < foerderPlanNr[0].competences.length; j++){
      if(comp.id == foerderPlanNr[0].competences[j].competenceId){
       return {"bubbleInfoTitel":foerderPlaene[i].name,
       "bubbleInfoNote":foerderPlanNr[0].competences[j].note}
      }
    }
  }
  return null;
}


function makeBubble(foerderplanTitel, foerderplanNote, imgActive, imgInActive, studentText, bubbleNumber, bubbleid) {

  var bubbleID = "bubbleID" + bubbleid;

  $("#todo_liste").append(
    "<div class='bubble' id='bubbleID" + bubbleid + "'>" +
    "<div id='infoDiv' class='right'>" + "<div class='infoBubble'" + ">" +
    "<div class='infoBubbleText'>" +
    foerderplanTitel + "<br>" +
    foerderplanNote +
    "</div>" +
    "</div>" + "</div>" +
    "<div class='left'>" +
    "<div class='right bubbleImgDiv" + bubbleid + "'>" +
    "<img class='bubbleImg'src=" + imgInActive + ">" +
    "</div>" +
    "<div class='left'>" +
    "<p>" + studentText + "</p>" + "" +
    "<p class='number'>" + bubbleNumber + "</p>" +
    "</div>" +
    "</div>" +
    "</div>");

  $(".bubbleImgDiv" + bubbleid).parent().parent().children('#infoDiv').hide();
  $(".bubbleImgDiv" + bubbleid).children('.bubbleImg').attr("src", imgInActive);

  if (foerderplanNote != null && foerderplanNote != "null") {


    $(".bubbleImgDiv" + bubbleid).hover(
      function () {
        $(this).parent().parent().children('#infoDiv').show();
        $(this).children('.bubbleImg').attr("src", imgActive);

      },
      function () {
        $(this).parent().parent().children('#infoDiv').hide();
        $(this).children('.bubbleImg').attr("src", imgInActive);
      }
    );
  }
}

function passwordChange() {
  var benutzername = localStorage.getItem('name');


  var form = new FormData();
  form.append("username", benutzername);
  form.append("password", $("#passwordinputAktuell").val());

  if ($("#passwordinputNeu").val() == $("#passwordinputNeu2").val()) {

    var settings = {
      "url": "http://46.101.204.215:1337/api/V1/login",
      "method": "PUT",
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }
    $.ajax(settings).done(function (token) {

      var token2 = JSON.parse(token);

      var settingsChangePW = {
        "async": true,
        "crossDomain": true,
        "url": "http://46.101.204.215:1337/api/V1/requestPasswordRecovery",
        "method": "PUT",
        "headers": {
          "authorization": token2.token,
        }
      }
      $.ajax(settingsChangePW).done(function (response) {
        $(".hinweismeldung").load("parts.html #confirmation", function () {
          $("#confirmation").children(".textfeld").append("PW geändert");
        })
        $(".hinweismeldung").show();

      }).fail(function () {
        $(".hinweismeldung").load("parts.html #warning", function () {
          $("#warning").children(".textfeld").append("Altes Passwort Falsch");
        })
        $(".hinweismeldung").show();
      });
    });
  } else {
    $(".hinweismeldung").load("parts.html #warning", function () {
      $("#warning").children(".textfeld").append("Passwort Neu stimmt nicht überein")
    })
    $(".hinweismeldung").show();
  }
}

function initScrollButtons() {
  console.log("UP" + scrollDivID);


  $("#scrollUp").click(function () {

    $('#todo_liste').animate({
      scrollTop: $("#bubbleID" + scrollDivID).offset().top
    }, 200);
  });

  $("#scrollDown").click(function () {

    console.log("DOWN" + scrollDivID);

    if (scrollDivID)
      $('#todo_liste').animate({
        scrollTop: $("#bubbleID" + scrollDivID).offset().top
      }, 200);
  });
}

function meldungWeg() {
  $(".hinweismeldung").hide();
}
function countDOWN() {
  scrollDivID--;
}

function countUP() {
  scrollDivID++;

}
