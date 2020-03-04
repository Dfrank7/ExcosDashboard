import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExcoComponent } from './edit-exco.component';

describe('EditExcoComponent', () => {
  let component: EditExcoComponent;
  let fixture: ComponentFixture<EditExcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
