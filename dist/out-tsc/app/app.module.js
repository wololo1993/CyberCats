var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BodyComponent } from './body/body.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { LeftBodyComponent } from './body/left-body/left-body.component';
import { RightBodyComponent } from './body/right-body/right-body.component';
import { MiddleBodyComponent } from './body/middle-body/middle-body.component';
import { ButtonOverviewComponent } from './top-nav/button-overview/button-overview.component';
import { ButtonPlanComponent } from './top-nav/button-plan/button-plan.component';
import { ButtonCompetencesComponent } from './top-nav/button-competences/button-competences.component';
import { ButtonLogoutComponent } from './top-nav/button-logout/button-logout.component';
import { ButtonHelpComponent } from './top-nav/button-help/button-help.component';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                TopNavComponent,
                BodyComponent,
                BottomNavComponent,
                LeftBodyComponent,
                RightBodyComponent,
                MiddleBodyComponent,
                ButtonOverviewComponent,
                ButtonPlanComponent,
                ButtonCompetencesComponent,
                ButtonLogoutComponent,
                ButtonHelpComponent,
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule,
                AlertModule
            ],
            providers: [],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/janspliethoff/checkProject/src/app/app.module.js.map