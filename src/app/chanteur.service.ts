import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ChanteurService {
  constructor(private http: HttpClient) {}
 
  private urlMostBands = "https://wasabi.i3s.unice.fr/api/v1/artist/member/count/band?limit=5";
  private urlArtistWithMostAlbum = "https://wasabi.i3s.unice.fr/api/v1/artist/count/album?limit=5";
  private urlAllSongsOfAllAlbumsOfEminem = "https://wasabi.i3s.unice.fr/api/v1/artist_all/name/Eminem";
  private urlTimelineGuns = "https://wasabi.i3s.unice.fr/api/v1/artist_all/name/Guns%20N'%20Roses";
 
  getMostBands(): Promise<any> {
    return this.http.get(this.urlMostBands).toPromise();
  }

  getArtistsWithMostAlbum() : Promise<any> {
    return this.http.get(this.urlArtistWithMostAlbum).toPromise();
  }

  getAllSongsOfAllAlbumsOfEminem() : Promise<any> {
    return this.http.get(this.urlAllSongsOfAllAlbumsOfEminem).toPromise();
  }

  getTimelineGuns() : Promise<any> {
    return this.http.get(this.urlTimelineGuns).toPromise();
  }
}
