import { async, TestBed } from '@angular/core/testing';
import { LeftBodyComponent } from './left-body.component';
describe('LeftBodyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LeftBodyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LeftBodyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=/Users/janspliethoff/checkProject/src/app/body/left-body/left-body.component.spec.js.map