//get token from localStorage
var tokenJSON = localStorage.getItem('token');
var token = JSON.parse(tokenJSON);
var student = getStudent();
var avatars = getAvatars();
var chapters = getChapters();
var chapterillustrations = getChapterillustrations();
var avatarSelected ="";

$(document).ready(function () {
  setTimeout(function () {
    init()
  }, 200);
});

function init() {
  load();
  foerderPlaneInit();
  changeContent("deleteProfile");
  //changeOnChapter(0, true);
  dynamischeBilderDropdown();
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
      })

      for (var i = 0; i < response.length; i++) {
        $("#todo_liste").append("<div class='bubble inline'>" +
          "<div class='right'>" + "<img src=" + "images/achievedCompetences-inactive.png" + ">" + "</div>" +
          "<div class='left'>" + "<p>" + response[i].studentText + "</p>" + "</div>" +
          "</div>");
      }
    })
  } else {

    document.getElementById("body1").style.backgroundColor = chapters[chapterId - 1].weakcolor;
    if (chapterId < 10) {
      document.getElementById("flagImg").src = "images/chapter0" + chapterId + "/littleChapterFlag.png";
    } else {
      document.getElementById("flagImg").src = "images/chapter" + chapterId + "/littleChapterFlag.png";
    }

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
      })

      for (var i = 0; i < response.length; i++) {
        $("#todo_liste").append("<div class='bubble'>" +"<div>"+
          "<div class='right'>" + "<img src=" + "images/achievedCompetences-inactive.png" + ">" + "</div>" +
          "<div class='left'>" + "<p>" + response[i].studentText + "</p>" +
          "</div>" +
          "</div>"+
          "<p id='bubbleNumber'>"+ response[i].number +"</p>"+
          "</div>");
      }
    })

  }


  /*

   document.getElementById("todo_liste").innerHTML = "";


   for(var i = 0; i < studentcompetence.length; i++){
   $( "#todo_liste" ).append( "<div class='bubbles' background-image:'images/contentTextBubble.png'>" +
   studentcompetence[i].studentText+
   +"</div>");
   }*/

}
function getFoerderplan(planId) {
  changeContent("comp");
  document.getElementById("body1").style.backgroundColor = "#8da6d6";
  setTimeout(function () {
    getFoerderplanDelayed(planId)
  }, 200);
}
function getFoerderplanDelayed(planId) {


  console.log("planId: "+planId)

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/educationalPlan/:" + planId,
    "method": "GET",
    "headers": {
      "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFuIn0.OzWf9avXr61RUJDZT8lSdjxoBDMLMerXIuZGcwIPjUE",
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
          "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFuIn0.OzWf9avXr61RUJDZT8lSdjxoBDMLMerXIuZGcwIPjUE",
        }
      }

      $.ajax(settings).done(function (foerderplanTitel) {


        for (var j = 0; j < foerderplan[0].competences.length; j++) {

          var _id = foerderplan[0].competences[j].competenceId;

          $("#todo_liste").append(
            "<div class='bubble'>" +
            "<div id='infoDiv' class='right'>" + "<div class='infoBubble'" + ">" +
            foerderplanTitel[planId].name +"<br>"+
            foerderplan[0].competences[j].note +
            "</div>" + "</div>" +
            "<div class='left'>" +
            "<div class='right bubbleImg'>" +
            "<img src=" + "images/achievedCompetences-inactive.png" + ">" +
            "</div>" +
            "<div class='left'>" +
            "<p>" + competences[_id].studentText + "</p>" + "" +
            "<p>" + competences[_id].number + "</p>" +
            "</div>" +
            "</div>" +
            "</div>");

          $(".bubbleImg").parent().parent().children('#infoDiv').hide();

          $(".bubbleImg").hover(
            function () {
              $(this).parent().parent().children('#infoDiv').show();
            },
            function () {
              $(this).parent().parent().children('#infoDiv').hide();
            }
          );
        }
      });
    });
  });
}


function foerderPlaneInit() {

  //document.getElementById("#dropdown-plan").innerHTML="";


  //$('#dropdown-plan').load('#foerderplanTemplate');

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
  /*
   var sheet = document.createElement('style')
   sheet.innerHTML =
   ".open #button-student {content:url(\""
   +avatars[(student.avatarId)].avatarUrl +"\")}"
   +".open #dropdown-school {content:url(\""
   +student.school.imageUrl+"\")}"
   +".open .classesButton {content:url(\""
   +student.studyGroups.imageUrl +"\")}";


   document.body.appendChild(sheet);*/
}

function changeContent(content) {

  if (content == "comp") {
    $("#fenster").load("parts.html #competenzContent")
  }
  else if (content == "deleteProfile") {
    $("#fenster").load("parts.html #profileDeleteContent")
  }
  else if (content == "avatarChange") {
    avatarSelected = "";
    $("#fenster").load("parts.html #avatarContent")
  }
  else if (content == "pwChange"){
    $("#fenster").load("parts.html #passwordChangeContent")

  }
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

function deleteProfile(){

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
    console.log("DELETET",response);
  });
}

function selectAvatar(avatarID) {
  avatarSelected = avatarID;
  console.log($("#avatarBilder"));
  var avi = $("#avatarBilder").children();
  console.log(avi[avatarID]);
}

function changeAvatar(){


  if(avatarSelected == ""){
    alert("None Selected");
  }

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/avatar/:"+avatarSelected,
    "method": "PUT",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {
    console.log("AvatarChanged",response);
  });

  avatarSelected="";

  document.getElementById("avatarImgInactive").src = (avatars[student.avatarId].avatarInactiveUrl).substring(1);
  document.getElementById("avatarImgBig").src = (avatars[student.avatarId].avatarBigUrl).substring(1);


}


