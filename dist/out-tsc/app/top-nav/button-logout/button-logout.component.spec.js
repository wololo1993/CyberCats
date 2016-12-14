import { async, TestBed } from '@angular/core/testing';
import { ButtonLogoutComponent } from './button-logout.component';
describe('ButtonLogoutComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ButtonLogoutComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ButtonLogoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/janspliethoff/checkProject/src/app/top-nav/button-logout/button-logout.component.spec.js.map