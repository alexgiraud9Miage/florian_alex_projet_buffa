import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from "@angular/forms";
import { ChanteurService } from "./chanteur.service";
import { AppComponent } from './app.component';
import { ChanteurComponent } from './chanteur/chanteur.component';
import { HttpClientModule } from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ArtistMostAlbumComponent } from './artist-most-album/artist-most-album.component';
import { AllSongsOfAllAlbumsOfEminemComponent } from './all-songs-of-all-albums-of-eminem/all-songs-of-all-albums-of-eminem.component';

@NgModule({
  declarations: [
    AppComponent,
    ChanteurComponent,
    ArtistMostAlbumComponent,
    AllSongsOfAllAlbumsOfEminemComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule
  ],
  providers: [ChanteurService],
  bootstrap: [AppComponent]
})
export class AppModule { }
