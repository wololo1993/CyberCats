import { async, TestBed } from '@angular/core/testing';
import { ButtonCompetencesComponent } from './button-competences.component';
describe('ButtonCompetencesComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ButtonCompetencesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ButtonCompetencesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/janspliethoff/checkProject/src/app/top-nav/button-competences/button-competences.component.spec.js.map