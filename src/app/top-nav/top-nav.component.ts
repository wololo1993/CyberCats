import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

  OverOverview() {
    var obj = document.getElementById("overview-img");
    if(obj.hasAttribute("src")){console.log("bla")
    }
  }

  blurb(div){
    console.log("Clicked")
    var img = div.firstChild;
    img.arguments.src = img.arguments.src.replace("inactive","activ");
  }

}
