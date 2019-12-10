import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistMostAlbumComponent } from './artist-most-album.component';

describe('ArtistMostAlbumComponent', () => {
  let component: ArtistMostAlbumComponent;
  let fixture: ComponentFixture<ArtistMostAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistMostAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistMostAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
