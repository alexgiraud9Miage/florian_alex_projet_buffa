import { Component, OnInit, Input } from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";




@Component({
  selector: 'app-timeline-guns',
  templateUrl: './timeline-guns.component.html',
  styleUrls: ['./timeline-guns.component.css']
})
export class TimelineGunsComponent implements OnInit {
  @Input() timelineGuns : Promise<any>;
  chart;
  series;
  dateAxis;
  categoryAxis;


  constructor() { }

  ngOnInit() {
    am4core.useTheme(am4themes_animated);
    let colorSet = new am4core.ColorSet();
    
  }

  methodeCreateChart(){
    

    this.chart = am4core.create("chartdivTimelineGuns", am4plugins_timeline.CurveChart);
    this.categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
    this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());

    this.series = this.chart.series.push(new am4plugins_timeline.CurveLineSeries());

    this.chart.curveContainer.padding(0, 100, 0, 120);
    this.chart.maskBullets = false;
    var colorSet = new am4core.ColorSet();

    var albumsList = [];
    fetch("https://wasabi.i3s.unice.fr/api/v1/artist_all/name/Guns%20N'%20Roses").then(results=>{
      return results.json();
    }).then(originalData=>{
      var albums = originalData["albums"];
      return albums;
    }).then(albums=>{
      for(var i = 0; i < albums.length; i++){
        var nameAlbum = albums[i].title;
        var dateAlbum = albums[i].publicationDate;
      }
      albumsList.push({category: "", year:dateAlbum, size:7, text: nameAlbum });
    })

    this.chart.data = albumsList;
    this.drawChart();
  }

  drawChart(){
    console.log(this.chart.data);
    this.chart.dateFormatter.inputDateFormat = "yyyy";

    this.chart.fontSize = 11;
    this.chart.tooltipContainer.fontSize = 11;

    this.categoryAxis.dataFields.category = "category";
    this.categoryAxis.renderer.grid.template.disabled = true;

    
    this.dateAxis.renderer.points = [{ x: -400, y: 0 }, { x: 0, y: 50 }, { x: 400, y: 0 }]
    this.dateAxis.renderer.polyspline.tensionX = 0.8;
    this.dateAxis.renderer.grid.template.disabled = true;
    this.dateAxis.renderer.line.strokeDasharray = "1,4";
    this.dateAxis.baseInterval = {period:"day", count:1};
    this.dateAxis.renderer.labels.template.disabled = true;

    this.series.strokeOpacity = 0;
    this.series.dataFields.dateX = "year";
    this.series.dataFields.categoryY = "category";
    this.series.dataFields.value = "size";
    this.series.baseAxis = this.categoryAxis;
    
    var interfaceColors = new am4core.InterfaceColorSet();
    this.series.tooltip.pointerOrientation = "down";

    var distance = 100;
    var angle = 60;

    var bullet = this.series.bullets.push(new am4charts.Bullet());

    var line = bullet.createChild(am4core.Line);
    line.adapter.add("stroke", function(fill, target) {
      if (target.dataItem) {
        return this.chart.colors.getIndex(target.dataItem.index)
      }
    });
    
    line.x1 = 0;
    line.y1 = 0;
    line.y2 = 0;
    line.x2 = distance - 10;
    line.strokeDasharray = "1,3";
    
    var circle = bullet.createChild(am4core.Circle);
    circle.radius = 30;
    circle.fillOpacity = 1;
    circle.strokeOpacity = 0;
    var circleHoverState = circle.states.create("hover");
    circleHoverState.properties.scale = 1.3;
    
    this.series.heatRules.push({ target: circle, min: 20, max: 50, property: "radius" });
    circle.adapter.add("fill", function(fill, target) {
      if (target.dataItem) {
        return this.chart.colors.getIndex(target.dataItem.index)
      }
    });
    circle.tooltipText = "{text}: {value}";
    circle.adapter.add("tooltipY", function(tooltipY, target){
      return -target.pixelRadius - 4;
    });

    var yearLabel = bullet.createChild(am4core.Label);
    yearLabel.text = "{year}";
    yearLabel.strokeOpacity = 0;
    yearLabel.fill = am4core.color("#fff");
    yearLabel.horizontalCenter = "middle";
    yearLabel.verticalCenter = "middle";
    yearLabel.interactionsEnabled = false;

    var label = bullet.createChild(am4core.Label);
    label.propertyFields.text = "text";
    label.strokeOpacity = 0;
    label.horizontalCenter = "right";
    label.verticalCenter = "middle";

    label.adapter.add("opacity", function(opacity, target) {
      if(target.dataItem){
        var index = target.dataItem.index;
        var line = target.parent.children.getIndex(0);

        if (index % 2 == 0) {
          target.y = -distance * am4core.math.sin(-angle);
          target.x = -distance * am4core.math.cos(-angle);
          line.rotation = -angle - 180;
          target.rotation = -angle;
        }
        else {
          target.y = -distance * am4core.math.sin(angle);
          target.x = -distance * am4core.math.cos(angle);
          line.rotation = angle - 180;
          target.rotation = angle;
        }
      }
      return 1;
    });

    var outerCircle = bullet.createChild(am4core.Circle);
    outerCircle.radius = 30;
    outerCircle.fillOpacity = 0;
    outerCircle.strokeOpacity = 0;
    outerCircle.strokeDasharray = "1,3";

    var hoverState = outerCircle.states.create("hover");
    hoverState.properties.strokeOpacity = 0.8;
    hoverState.properties.scale = 1.5;

    outerCircle.events.on("over", function(event){
      var circle = event.target.parent.children.getIndex(1);
      circle.isHover = true;
      event.target.stroke = circle.fill;
      event.target.radius = circle.pixelRadius;
      event.target.animate({property: "rotation", from: 0, to: 360}, 4000, am4core.ease.sinInOut);
    });

    outerCircle.events.on("out", function(event){
      var circle = event.target.parent.children.getIndex(1);
      circle.isHover = false;
    });

    this.chart.scrollbarX = new am4core.Scrollbar();
    this.chart.scrollbarX.opacity = 0.5;
    this.chart.scrollbarX.width = am4core.percent(50);
    this.chart.scrollbarX.align = "center";

  }

}
