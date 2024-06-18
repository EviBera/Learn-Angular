import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormControlsComponent } from './template-form-controls.component';

describe('TemplateFormControlsComponent', () => {
  let component: TemplateFormControlsComponent;
  let fixture: ComponentFixture<TemplateFormControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateFormControlsComponent]
    });
    fixture = TestBed.createComponent(TemplateFormControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
