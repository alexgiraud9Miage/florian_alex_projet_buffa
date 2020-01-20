import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChanteurService {
  constructor(private http: HttpClient) {}
 
  private urlMostBands = "https://wasabi.i3s.unice.fr/api/v1/artist/member/count/band?limit=5";
  private urlMostBandsGraduable = "https://wasabi.i3s.unice.fr/api/v1/artist/member/count/band?limit=";
  private urlArtistWithMostAlbum = "https://wasabi.i3s.unice.fr/api/v1/artist/count/album?limit=5";
  private urlAllSongsOfAllAlbumsOfEminem = "https://wasabi.i3s.unice.fr/api/v1/artist_all/name/Eminem";
 
  getMostBands(): Promise<any> {
    return this.http.get(this.urlMostBands).toPromise();
  }

  getMostBandsGraduable(limitNumber){
    return this.http.get(this.urlMostBandsGraduable + limitNumber);
  }

  getArtistsWithMostAlbum() : Promise<any> {
    return this.http.get(this.urlArtistWithMostAlbum).toPromise();
  }

  getAllSongsOfAllAlbumsOfEminem() : Promise<any> {
    return this.http.get(this.urlAllSongsOfAllAlbumsOfEminem).toPromise();
  }
}
