var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
export var TopNavComponent = (function () {
    function TopNavComponent() {
    }
    TopNavComponent.prototype.ngOnInit = function () {
    };
    TopNavComponent.prototype.OverOverview = function () {
        var obj = document.getElementById("overview-img");
        if (obj.hasAttribute("src")) {
            console.log("bla");
        }
    };
    TopNavComponent.prototype.blurb = function (div) {
        console.log("Clicked");
        var img = div.firstChild;
        img.arguments.src = img.arguments.src.replace("inactive", "activ");
    };
    TopNavComponent = __decorate([
        Component({
            selector: 'app-top-nav',
            templateUrl: './top-nav.component.html',
            styleUrls: ['./top-nav.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], TopNavComponent);
    return TopNavComponent;
}());
//# sourceMappingURL=/Users/janspliethoff/checkProject/src/app/top-nav/top-nav.component.js.map