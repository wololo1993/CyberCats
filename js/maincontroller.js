//get token from localStorage
var tokenJSON = localStorage.getItem('token');
var token = JSON.parse(tokenJSON);
var student = getStudent();
var avatars = getAvatars();
var chapters = getChapters();
var avatarSelected = "";
var scrollDivID = 0;

/**
 * wird ausgeführt wenn document ready und lässt dann alles initalisieren, zieht vorher noch die förderplan daten
 * in den local Storage wartet auch wegen obiger funktionsaufrufe noch 200ms ansonsten sind daten der API noch nicht da
 * die ind die HTML geladen werden sollten
 */
$(document).ready(function () {
  getFoerderPlaene();

  setTimeout(function () {
    init()
  }, 200);
});

/**
 * initalisiert das ganze
 */
function init() {
  meldungWeg();
  load();
  foerderPlaneInit();
  initScrollButtons();
  setTimeout(function () {
    dynamischeBilderDropdown();
    changeOnChapter(0, true);
  }, 100);

  document.getElementById("body1").style.backgroundColor = "#FFF";
}

//läd gespeicherte informationen aus init in die HTML/CSS daten
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
/**
 * speichert Chapters ab um zB die farben zu bekommen
 */
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


/**
 * replaces "-" in schoolName with "-<br>"
 *
 * @param schoolName string
 * @returns string
 */
function getSchoolname(schoolName) {
  return schoolName.replace("-", "-<br>")
}

/**
 * ruft changeOnChapterDelayed 200ms später auf damit bis dahin der HTML content geladen hat
 * @param chapterId
 * @param achieved
 */
function changeOnChapter(chapterId, achieved) {
  changeContent("comp");
  setTimeout(function () {
    changeOnChapterDelayed(chapterId, achieved)
  }, 200);
}
/**
 * Läd je nach chapter die jeweiligen Bubbles
 * bei chapter 0 werden alle geladen,
 *
 * @param chapterId
 * @param achieved
 */
function changeOnChapterDelayed(chapterId, achieved) {

  document.getElementById("todo_liste").innerHTML = "";
  var chapterURL = "";
  if (chapterId == 0) { //wird nur aufgerufen wenn alle erreichten Kompetenzen gefordert sind
    document.getElementById("body1").style.backgroundColor = "#8da6d6";
    //falsche scroll buttens da keine für alle kompetenzen gegeben
    document.getElementById("scrollUp").src = "images/chapter16/scrollUp.png";
    document.getElementById("scrollDown").src = "images/chapter16/scrollDown.png";

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
      //sortiert nach Datum neuste zuerst
      response.sort(function (a, b) {
        a2 = (a.fromDate).replace("-", "");
        a2 = a2.replace("-", "");
        b2 = (b.fromDate).replace("-", "");
        b2 = b2.replace("-", "");

        return b2 - a2;
      })
      //einfach durch jede Kompetenz durchgehen und jeweils eine bubble dafür erstellen
      for (var i = 0; i < response.length; i++) {

        var chapter = response[i].chapterId;
        var chapterURL = ""

        if (chapter < 10) {
          chapterURL = "chapter0" + chapter;
        } else {
          chapterURL = "chapter" + chapter;
        }

        makeBubble("Erreicht am:", response[i].fromDate, "images/" + chapterURL + "/competenceDone.png", "images/" + chapterURL + "/competenceDone.png",
          response[i].studentText, response[i].number, i);

      }
    })
  } else {
    //wenn spezielles Kapitel geforderd hole flagge / hintergrund des jeweiligen kapitels
    //und erstelle HTTP Request nach kapitel und ob nur erreichte oder alle angezeigt werden sollen

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
      //sortier funktion setzt neustes nach oben und alle nicht erreichten nach unten
      response.sort(function (a, b) {

        if (a.fromDate == null) {
          console.log(a.fromDate)
          a2 = 0;
        } else {
          a2 = (a.fromDate).replace("-", "");
          a2 = a2.replace("-", "");

        }
        if (b.fromDate == null) {
          console.log(b.fromDate)
          b2 = 0;
        } else {
          b2 = (b.fromDate).replace("-", "");
          b2 = b2.replace("-", "");
        }

        console.log(b2 + " - " + a2);
        console.log(b2 - a2);

        return b2 - a2;
      })

      for (var i = 0; i < response.length; i++) {

        var bubbleTitel = "Erreicht am:";
        var bubbleText = response[i].fromDate;
        var imgActive = (response[i].checked.valueOf().toLocaleString().localeCompare("true".toLocaleString())) ? "images/" + chapterURL + "/competenceUndone.png" : "images/" + chapterURL + "/competenceDone.png";
        var imgInActive = (response[i].checked.valueOf().toLocaleString().localeCompare("true".toLocaleString())) ? "images/" + chapterURL + "/competenceUndone.png" : "images/" + chapterURL + "/competenceDone.png";

        // Kompetenz im förderplan ist wenn ja überschreibt es die normalen parameter

        var compInEDPlan = checkIfFoerderplan(response[i]);

        if (compInEDPlan != null) {

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

/**
 * läd den componenten Content
 * ruft getFoerderplanDelayed 200 ms später auf damit HTML content geladen ist
 * und ändert noch die hintergrund farbe
 * @param planId
 */
function getFoerderplan(planId) {
  changeContent("comp");
  document.getElementById("body1").style.backgroundColor = "#8da6d6";
  setTimeout(function () {
    getFoerderplanDelayed(planId)
  }, 200);
}
/**
 * fügt alle competenzen die im jeweiligen förderplan stehen ein
 * @param planId
 */
function getFoerderplanDelayed(planId) {


  //aus string im localStorage mach wieder ein JSON
  var foerderplan = JSON.parse(localStorage.getItem("EDplanNr" + (planId + 1)))
  var foerderplanTitel = JSON.parse(localStorage.getItem("EDPlaene"));

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


    //für jede förderplan competenz passende richtige competenz finden und dann die bubble dazu erstellen
    //wenn Kompetenz erreicht ist wird das Done bildchen des jeweiligen kapitels angezeigt

    for (var j = 0; j < foerderplan[0].competences.length; j++) {

      var _id = foerderplan[0].competences[j].competenceId;

      var chapterURL = "";
      var infoBubbleTitel = foerderplanTitel[planId].name;
      var infoBubbleText = foerderplan[0].competences[j].note;
      var imgActive = "images/educationalPlan-active.png";
      var imgInActive = "images/educationalPlan-inactive.png";


      if (competences[_id].checked) {
        if (competences[_id].chapterId < 10) {
          chapterURL = "chapter0" + competences[_id].chapterId;
        } else {
          chapterURL = "chapter" + competences[_id].chapterId;
        }

        infoBubbleTitel = "Erreicht am:";
        infoBubbleText = competences[_id].fromDate;
        imgActive = "images/" + chapterURL + "/competenceDone.png";
        imgInActive = imgActive;
      }


      makeBubble(infoBubbleTitel, infoBubbleText, imgActive
        , imgInActive, competences[_id].studentText, competences[_id].number, _id);
    }
  });

  scrollDivID = 0;
  initScrollButtons();
}

/**
 * holt sich die förderpläne und fügt sie ins dropdown ein
 */
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

/**
 * erstellt eine neue style datei mit den funktionen die bilder bei aktive zu ändern
 * geht nur hier da URLs ja von API gegeben
 * und fügt es dann an dieses document an.
 */
function dynamischeBilderDropdown() {

  var sheet = document.createElement('style')
  sheet.innerHTML =
    ".open .studentButton {content:url(\"" + avatars[(student.avatarId)].avatarUrl + "\")}" +
    ".open .schoolButton {content:url(\"" + student.school.imageUrl + "\")}" +
    ".open .classesButton {content:url(\"" + student.studyGroups.imageUrl + "\")}";

  document.body.appendChild(sheet);
}
/**
 * switcht je nach content das fenster für die jeweilige seite aus
 * @param content
 */
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
/**
 * löscht local storage prüft ob token noch da ist und leitet auf index.html weiter
 */
function logout() {
  localStorage.clear();
  token = "";

  if (localStorage.getItem(token) == null && token == "") {
    window.document.location.href = "index.html";
  } else {
    alert("logout Fehlgeschlagen")
  }
}
/**
 *  logout nach positivem API Request
 */
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
    logout();
  }).fail(function () {
    $(".hinweismeldung").load("parts.html #warning", function () {
        $("#warning").children(".textfeld").append("Falsches Passwort");
      }
    );
    $(".hinweismeldung").show();
  });
}

/**
 * wenn auf avatar geklickt wird wird er hier gespeichert
 * @param avatarID
 */
function selectAvatar(avatarID) {
  avatarSelected = avatarID;
}
/**
 * gibt ausgewählten avatar an den server weiter wenn Fehler kommt nen HinweisDiv
 */
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
/**
 * zieht sich schonmal die förderpläne und die förderplankapitel in den local storage
 * damit es nachher nicht zu fehlern kommt
 * vorallem weil in der for schleife ein sync aufruf passieren muss
 */
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
    localStorage.setItem("EDPlaene", JSON.stringify(response));

    for (var i = 1; i <= response.length; i++) {

      var settingsEDPlaene = {
        "async": false,
        "crossDomain": true,
        "url": "http://46.101.204.215:1337/api/V1/educationalPlan/" + i,
        "method": "GET",
        "headers": {
          "authorization": token.token,
        }
      }
      $.ajax(settingsEDPlaene).done(function (comp) {
        localStorage.setItem("EDplanNr" + i, JSON.stringify(comp));
      });
    }
  });
}

/**
 * geht alle spezifischen förderpläne durch um alle ids mit der der übergebenen Kompetenz abzugleichen
 * wenn zutrifft gibt es den Titel des Förderplankapitels mit dem Förderplan note zurück als JSON um so das nochmalige
 * Suchen zu erspaaren {"bubbleInfoTitel":...,"bubbleInfoNote":...}
 * @param comp
 * @returns {*} JSON {"bubbleInfoTitel":...,"bubbleInfoNote":...}
 */
function checkIfFoerderplan(comp) {
  //string zu JSON aus localStorage
  var foerderPlaene = JSON.parse(localStorage.getItem("EDPlaene"));

  //für jeden förderplan
  for (var i = 1; i <= foerderPlaene.length; i++) {
    //same here
    var foerderPlanNr = JSON.parse(localStorage.getItem("EDplanNr" + i))

    //für jede Kompetenz im spezifischen Förderplan
    for (var j = 0; j < foerderPlanNr[0].competences.length; j++) {
      if (comp.id == foerderPlanNr[0].competences[j].competenceId) {

        return {
          "bubbleInfoTitel": foerderPlaene[i - 1].name,
          "bubbleInfoNote": foerderPlanNr[0].competences[j].note
        }
      }
    }
  }
  return null;
}

/**
 * erstellt für die parameter eine Bubble mit Hover Funktion(über IMG)
 *
 * @param foerderplanTitel
 * @param foerderplanNote
 * @param imgActive
 * @param imgInActive
 * @param studentText
 * @param bubbleNumber
 * @param bubbleid
 */
function makeBubble(foerderplanTitel, foerderplanNote, imgActive, imgInActive, studentText, bubbleNumber, bubbleid) {

  var bubbleID = "bubbleID" + bubbleid;
  //erstelle kopmlexes HTML Gebilde

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
  //füge InfoBubble Hide/show ein

  $(".bubbleImgDiv" + bubbleid).parent().parent().children('#infoDiv').hide();
  $(".bubbleImgDiv" + bubbleid).children('.bubbleImg').attr("src", imgInActive);

  //falls aber keine FörderplanNote bzw auch kein Datum Drinsteht gibt es auch keine Hover funktion

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
/**
 * sendet Passwort request
 * da nicht gegeben wie das pw geschickt werden soll und da das PW überhaupt noch keine funktion hat hier weggelassen
 */
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
      //Anzeige von Hinweisen ob geklappt oder nicht
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
/**
 * sollte eigentlich funktionieren wie ich mir das vorstelle
 * und zu dem jeweiligen element scrollen
 */

function initScrollButtons() {


  $("#scrollUp").click(function () {

    $('#todo_liste').animate({
      scrollTop: $("#bubbleID" + scrollDivID).offset().top
    }, 200);
  });

  $("#scrollDown").click(function () {

    if (scrollDivID)
      $('#todo_liste').animate({
        scrollTop: $("#bubbleID" + scrollDivID).offset().top
      }, 200);
  });
}
/**
 * entfernt alle meldungen bz versteckt das div wo sie dann drin stehen

 */
function meldungWeg() {
  $(".hinweismeldung").hide();
}
function countDOWN() {
  scrollDivID--;
}

function countUP() {
  scrollDivID++;

}
