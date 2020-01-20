import { Component } from '@angular/core';
import { ChanteurService } from './chanteur.service'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private chanteurService: ChanteurService) {
    
  }

  title = 'angular-projet-wasabi';
  chanteursMostBands;
  chanteursMostBandsGraduable;
  artistWithMostAlbum;
  allSongsOfAllAlbumsOfEminem;
  
  nbMostBandsGraduable = 5;

  ngOnInit(): void {  
    this.getMostBands();
    this.getMostBandsGraduable(this.nbMostBandsGraduable);
    this.getArtistsWithMostAlbum();
    this.getAllSongsOfAllAlbumsOfEminem();
  }

  getArtistsWithMostAlbum() {
    this.artistWithMostAlbum = this.chanteurService.getArtistsWithMostAlbum();
  }

  getMostBands() {
    this.chanteursMostBands = this.chanteurService.getMostBands();
  }
  
  getMostBandsGraduable(limitNumber) {
    this.chanteurService.getMostBandsGraduable(limitNumber).subscribe((result : any)=>
      this.chanteursMostBandsGraduable = result
    );
  }

  getAllSongsOfAllAlbumsOfEminem(){
    this.allSongsOfAllAlbumsOfEminem = this.chanteurService.getAllSongsOfAllAlbumsOfEminem();
  }

  
}
