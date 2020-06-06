import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909)
  };
  
  layersControl = {
    baseLayers: {
      'Open Street Map': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }),
      'Transport': L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }),
      'Landscape': L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }), 
      'Outdoors': L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }), 
      'Transport Dark': L.tileLayer('https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }), 
      'Spinal Map': L.tileLayer('https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }), 
      'Pioneer': L.tileLayer('https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }), 
      'Mobile Atlas': L.tileLayer('https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }), 
      'Neighbourhood': L.tileLayer('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=c0ac24eb615e4c72b536cc9512d19cb5', { maxZoom: 18, attribution: '...' }) 
    },
    overlays: {
      'Big Circle': L.circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': L.polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {


  }

}
