import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcosComponent } from './add-excos.component';

describe('AddExcosComponent', () => {
  let component: AddExcosComponent;
  let fixture: ComponentFixture<AddExcosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExcosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExcosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
