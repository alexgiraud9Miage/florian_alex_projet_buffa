import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSongsOfAllAlbumsOfEminemComponent } from './all-songs-of-all-albums-of-eminem.component';

describe('AllSongsOfAllAlbumsOfEminemComponent', () => {
  let component: AllSongsOfAllAlbumsOfEminemComponent;
  let fixture: ComponentFixture<AllSongsOfAllAlbumsOfEminemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSongsOfAllAlbumsOfEminemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSongsOfAllAlbumsOfEminemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
