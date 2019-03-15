import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastProgramsComponent } from './past-programs.component';

describe('PastProgramsComponent', () => {
  let component: PastProgramsComponent;
  let fixture: ComponentFixture<PastProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
