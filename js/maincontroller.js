//get token from localStorage
var tokenJSON = localStorage.getItem('token');
var token = JSON.parse(tokenJSON);
var student = getStudent();
var avatars = getAvatars();
var chapters = getChapters();
var chapterillustrations = getChapterillustrations();
var studentcompetenceNachChapter = [[]];
var studentcompetence = getStudentcompetence();


$(document).ready(function () {
  load();
  foerderPlaneInit();
  changeOnChapter(0,true);
  dynamischeBilderDropdown();

});

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

function getStudentcompetence() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://46.101.204.215:1337/api/V1/studentcompetence",
    "method": "GET",
    "headers": {
      "authorization": token.token,
    }
  }

  $.ajax(settings).done(function (response) {
    studentcompetence = response;


    response.sort(function (a, b) {
      return (a.fromDate - b.fromDate);

    })

    /*
     studentcompetenceNachChapter = []


     console.log(studentcompetence[0]);

     for(var i = 0; i < 16; i++){
     studentcompetenceNachChapter[i] = [];
     }

     for (var i = 0; i < response.length; i++) {
     (studentcompetenceNachChapter[(studentcompetence[i].chapterId)]).push(studentcompetence[i]);
     }
     for (var i = 0; i < studentcompetenceNachChapter.length;i++){
     (studentcompetenceNachChapter[i]).sort(function (a, b) {
     return a.number - b.number;
     })
     }*/
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
  if (chapterId != 0) {
    document.getElementById("body1").style.backgroundColor = chapters[chapterId - 1].weakcolor;
    if (chapterId < 10) {
      document.getElementById("flagImg").src = "images/chapter0" + chapterId + "/littleChapterFlag.png";
    } else {
      document.getElementById("flagImg").src = "images/chapter" + chapterId + "/littleChapterFlag.png";
    }
  }
  document.getElementById("todo_liste").innerHTML = "";

  if (chapterId == 0) {

    console.log()

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
            "<div class='right'>" +"<img src=" + "images/achievedCompetences-inactive.png" + ">" + "</div>" +
          "<div class='left'>" + "<p>" + response[i].studentText + "</p>" + "</div>"+
          "</div>");
      }
    })
  } else {
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
        $("#todo_liste").append("<div class='bubble'>" +
          "<div class='right'>" +"<img src=" + "images/achievedCompetences-inactive.png" + ">" + "</div>" +
        "<div class='left'>" + "<p>" + response[i].studentText + "</p>" + "</div>"+
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

function getFoerderplan(planId){

  console.log(planId)

}

function foerderPlaneInit(){

  //document.getElementById("#dropdown-plan").innerHTML="";


  $('#dropdown-plan').load('parts.html #foerderplanTemplate');

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

    console.log("versuch blubb")

    for(var i = 0; i < response.length; i++){
      $("#dropdown-plan").append(
      "<li onclick='"+ "getFoerderplan(" +i+ ")" + "'><a> " + response[i].name+"</a></li>"
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


