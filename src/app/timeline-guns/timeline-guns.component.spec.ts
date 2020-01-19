import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineGunsComponent } from './timeline-guns.component';

describe('TimelineGunsComponent', () => {
  let component: TimelineGunsComponent;
  let fixture: ComponentFixture<TimelineGunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineGunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineGunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
