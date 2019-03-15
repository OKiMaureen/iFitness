import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProgramsComponent } from './current-programs.component';

describe('CurrentProgramsComponent', () => {
  let component: CurrentProgramsComponent;
  let fixture: ComponentFixture<CurrentProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
