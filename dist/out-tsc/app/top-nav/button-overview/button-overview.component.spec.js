import { async, TestBed } from '@angular/core/testing';
import { ButtonOverviewComponent } from './button-overview.component';
describe('ButtonOverviewComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ButtonOverviewComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ButtonOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/janspliethoff/checkProject/src/app/top-nav/button-overview/button-overview.component.spec.js.map