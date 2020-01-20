import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistMostBandGraduableComponent } from './artist-most-band-graduable.component';

describe('ArtistMostBandGraduableComponent', () => {
  let component: ArtistMostBandGraduableComponent;
  let fixture: ComponentFixture<ArtistMostBandGraduableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistMostBandGraduableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistMostBandGraduableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
