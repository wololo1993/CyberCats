import { async, TestBed } from '@angular/core/testing';
import { ButtonPlanComponent } from './button-plan.component';
describe('ButtonPlanComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ButtonPlanComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ButtonPlanComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/janspliethoff/checkProject/src/app/top-nav/button-plan/button-plan.component.spec.js.map