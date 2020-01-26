import { Component, OnInit, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: 'app-all-songs-of-all-albums-of-eminem',
  templateUrl: './all-songs-of-all-albums-of-eminem.component.html',
  styleUrls: ['./all-songs-of-all-albums-of-eminem.component.css']
})
export class AllSongsOfAllAlbumsOfEminemComponent implements OnInit {
  @Input() allSongsOfAllAlbumsOfEminem : Promise<any>;
  chart;
  networkSeries;
  nameOfArtist = "Akon";

  constructor() { }

  ngOnInit() {
    this.chart = am4core.create("chartdivAllSongsOfAllAlbumsOfEminem", am4plugins_forceDirected.ForceDirectedTree);
    this.networkSeries = this.chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
    
    var artistsList = [];
        var albumsList = [];
        var nameArtist = "";
        var fetchVariable = "http://wasabi.i3s.unice.fr/api/v1/artist_all/name/";
        fetchVariable += this.nameOfArtist;

        fetch(fetchVariable).then(results => {
                return results.json();
        }).then(originalData => {
                nameArtist = originalData.name;
                let albums = originalData["albums"];
                return albums;
        }).then(albums => {
                for(var i = 0; i < albums.length; i++) {
                        var nameAlbum = albums[i].title;
                        if (nameAlbum == "Other Songs"){
                                break;
                        }
                        var songs = [];
                        for(var j = 0; j<albums[i].songs.length; j++){
                                var songTitle = albums[i].songs[j].title;
                                //console.log("Nom song : " + songTitle)
                                songs.push({name: songTitle, value: 10});
                        }
                        albumsList.push({name: nameAlbum, children: songs});
                }
                artistsList.push({name: nameArtist, children: albumsList});
                //console.log(artistsList);
                this.updateCharts(artistsList);
        });
  }

  updateCharts(artistsList){
    //console.log("artist list : " + artistsList)
    this.chart.data = artistsList;
    //console.log("Here : " + this.chart.data)
    this.drawChart(artistsList);
  }

  onNameChange(event) {
    console.log(this.nameOfArtist)
    this.updateChartsTwo(event.target.value);
  }

  updateChartsTwo(newText){
        var artistsList = [];
        var albumsList = [];
        var nameArtist = "";
        var fetchVariable = "http://wasabi.i3s.unice.fr/api/v1/artist_all/name/";
        fetchVariable += newText;

        fetch(fetchVariable).then(results => {
                return results.json();
        }).then(originalData => {
                        nameArtist = originalData.name;
                let albums = originalData["albums"];
                return albums;
        }).then(albums => {
                for(var i = 0; i < albums.length; i++) {
                        var nameAlbum = albums[i].title;
                        if (nameAlbum == "Other Songs"){
                                break;
                        }
                        var songs = [];
                        for(var j = 0; j<albums[i].songs.length; j++){
                                var songTitle = albums[i].songs[j].title;
                                //console.log("Nom song : " + songTitle)
                                songs.push({name: songTitle, value: 10});
                        }
                        albumsList.push({name: nameAlbum, children: songs});
                }
                artistsList.push({name: nameArtist, children: albumsList});
                //console.log(artistsList);
                this.chart.data = artistsList;
        });

  }



  drawChart(data){
  this.networkSeries.dataFields.value = "value";
  this.networkSeries.dataFields.name = "name";
  this.networkSeries.dataFields.children = "children";
  this.networkSeries.nodes.template.tooltipText = "{name}:{value}";
  this.networkSeries.nodes.template.fillOpacity = 1;
  this.networkSeries.manyBodyStrength = -10;
  this.networkSeries.links.template.strength = 0.9;
  this.networkSeries.minRadius = am4core.percent(1);

  this.networkSeries.maxLevels = 2;
  this.networkSeries.nodes.template.label.text = "{name}"
  this.networkSeries.fontSize = 12;

  this.networkSeries.nodes.template.label.hideOversized = true;
  this.networkSeries.nodes.template.label.truncate = true;     

  }
}
