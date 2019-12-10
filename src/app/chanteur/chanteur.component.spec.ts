import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChanteurComponent } from './chanteur.component';

describe('ChanteurComponent', () => {
  let component: ChanteurComponent;
  let fixture: ComponentFixture<ChanteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
