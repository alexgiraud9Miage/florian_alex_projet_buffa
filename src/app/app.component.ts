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
  artistWithMostAlbum;
  allSongsOfAllAlbumsOfEminem;

  ngOnInit(): void {  
    this.getMostBands();
    this.getArtistsWithMostAlbum();
    this.getAllSongsOfAllAlbumsOfEminem();
  }

  getArtistsWithMostAlbum() {
    this.artistWithMostAlbum = this.chanteurService.getArtistsWithMostAlbum();
  }

  getMostBands() {
    this.chanteursMostBands = this.chanteurService.getMostBands();
  }

  getAllSongsOfAllAlbumsOfEminem(){
    this.allSongsOfAllAlbumsOfEminem = this.chanteurService.getAllSongsOfAllAlbumsOfEminem();
  }
}
