import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProgramsComponent } from './new-programs.component';

describe('NewProgramsComponent', () => {
  let component: NewProgramsComponent;
  let fixture: ComponentFixture<NewProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
