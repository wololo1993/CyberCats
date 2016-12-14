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

@NgModule({
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
})
export class AppModule { }
