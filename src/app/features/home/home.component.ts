import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { tileLayer, latLng, icon, marker, MapOptions, LatLng, geoJSON, Point } from 'leaflet';
import { ActivityService } from '@app/core/services';
import _ from 'lodash';
import { CalendarWidgetComponent } from '@app/shared/calendar/calendar-widget/calendar-widget.component';
import {antPath} from 'leaflet-ant-path';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import * as wkt from "wkt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar', { }) calendar:CalendarWidgetComponent;

  ip:string
  ipList=[]
  selectOptions={
    placeholder:"Please select a ip address...",
    allowClear: true
  }

  events=[]
  activity={}

  constructor(private activityService:ActivityService) {}

  ngOnInit() {
    this.activityService.getActivities({
      "fields": {
        "ip": true
      }
    }).subscribe((resp)=>{
      this.ipList = _(resp)
            .groupBy(x => x.ip)
            .map((value, key) => ({ id: key, text: key }))
            .value();

      this.activityService.getIp().subscribe((resp)=>{
        this.ip=resp.ip
        this.fetchCalenderActivities()
      }
      ,(err)=>{
        if(this.ipList.length>0){
          this.ip = this.ipList[0]
          this.fetchCalenderActivities()
         }
      })
    },(err)=>alert(err))
  }

  ngAfterViewInit(){
    this.antPath = antPath([[]], {color: 'blue', weight: 5, reverse: false,}).addTo(this.leaflet.map);
  }

  fetchCalenderActivities(){
    this.activityService.getActivities({
      "order": [
        "time"
      ],
      "where": {
        "ip": this.ip['id']
      },
      "fields": {
        "id": true,
        "name": true,
        "activityTypeId": true,
        "time": true,
        "duration": true,
        "distance":true,
        "geometry":true
      }
    }).subscribe((resp)=>{
      while(this.events.length>0)
        this.events.pop()

      for (const event of resp) {
        let color=""
        // Walking
        if(event.activityTypeId==1){
          color="bg-color-green"
        }
        // Running
        else{
          if(event.duration<30000){
            color="bg-color-orange"
          }
          else if(event.duration<60000){
            color="bg-color-orangeDark"
          }
          else{
            color="bg-color-red"
          }
        }

        let finishTime=new Date(event['time'])
        let startTime=finishTime.getTime()-event['duration']

        this.events.push({
          id: event['id'],
          title: event['name'],
          start:new Date(startTime),
          end:finishTime,
          className:["event", color],
          activityTypeId:event['activityTypeId'],
          time:event['time'],
          duration:event['duration'],
          distance:event['distance'],
          geometry:event['geometry'],
        });
      }
      this.calendar.reRender()
    },(err)=>alert(err))
  }

  onEventClicked(event){
    this.activity['title']=event.title
    this.activity['elapsedTime']=this.activityService.convertMsToDateString(event.duration)
    this.activity['activityDate']= new Date(event.time).toLocaleDateString()
    this.activity['totalDistance']= (Number(event.distance)/1000).toFixed(2) + " km"
    this.activity['type']= event.activityTypeId == 1 ? "Walking" : "Running"
    
    let pace = (event.duration*1000) / Number(event.distance)
    this.activity['pace']= this.activityService.convertMsToDateString(pace)
    this.isInfoShow = true;

    var geometry:any =wkt.parse(event.geometry);

    this.leaflet.map.removeLayer(this.antPath)

    this.antPath._path=[]
    for (const coordinate of geometry.coordinates) {
      this.antPath._path.push([coordinate[1],coordinate[0]])
    }
    this.showMarkers(geometry.coordinates)
    this.leaflet.map.addLayer(this.antPath)

    this.leaflet.map.fitBounds(this.antPath.getBounds(),{
      animate:true,
      maxZoom:25,
      padding:[50, 50]
    });
  }


  showMarkers(coordinates) {
    const markers: any[] = [];
    markers.push(
      marker(
        [coordinates[0][1], coordinates[0][0]],
        {
          icon: icon({
            iconUrl: `assets/img/start.png`, 
            iconSize: [16, 16]
          })
        }
      )
    );

    markers.push(
      marker(
        [coordinates[coordinates.length-1][1], coordinates[coordinates.length-1][0]],
        {
          icon: icon({
            iconUrl: `assets/img/finish.png`, 
            iconSize: [16, 16]
          })
        }
      )
    );

    this.layers = markers;
  }

  isInfoShow = false;

  layers: any[];

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 25, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(39.920763, 32.854061),
  };   

  antPath;
  @ViewChild('leaflet', { read: LeafletDirective }) leaflet:LeafletDirective;

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 30, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
      'Transport': tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }),
      'Landscape': tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }), 
      'Outdoors': tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }), 
      'Transport Dark': tileLayer('https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }), 
      'Spinal Map': tileLayer('https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }), 
      'Pioneer': tileLayer('https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }), 
      'Mobile Atlas': tileLayer('https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }), 
      'Neighbourhood': tileLayer('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 30, attribution: '...' }) 
    }
  }
}
