import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopProgramComponent } from './stop-program.component';

describe('StopProgramComponent', () => {
  let component: StopProgramComponent;
  let fixture: ComponentFixture<StopProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
