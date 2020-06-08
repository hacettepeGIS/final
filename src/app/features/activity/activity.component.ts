import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, Injector, EmbeddedViewRef, DoCheck, OnDestroy } from '@angular/core';
import { tileLayer, latLng, icon, marker, MapOptions, LatLng } from 'leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { ActivityTypesService } from '@app/core/services';
import {antPath} from 'leaflet-ant-path';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit,AfterViewInit,DoCheck,OnDestroy {

  componentRef: any;
  subscription: any;

  @ViewChild('leaflet', { read: LeafletDirective }) leaflet:LeafletDirective;
  options:MapOptions={}
  layers: any[];

  activityTypes=[]
  selectedActivity=0;
  timeout=5000;
  eventsData: any = [{
    lat: 39.920763,
    lng: 32.854061,
    iconURL: 'assets/img/0.png'
  }];
  antPath;

  constructor(private resolver: ComponentFactoryResolver, 
              private inj: Injector,
              private activityTypesService:ActivityTypesService) { }

  ngOnInit() {

    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 24, attribution: '...' })
      ],
      zoom: 18,
      center: latLng(39.920763, 32.854061),
    };   

    this.activityTypesService.getTypes().subscribe((resp)=>{
      this.activityTypes=resp
      this.selectedActivity=resp[0].id
      this.showEvents()
    },(err)=>{
      alert(`Activity types could not fetch from api service. Error : ${err}`)
    })
   
    navigator.geolocation.getCurrentPosition((position) => {
      (<LatLng>this.options.center).lat = this.eventsData[0].lat = position.coords.latitude;
      (<LatLng>this.options.center).lng = this.eventsData[0].lng = position.coords.longitude;

      this.leaflet.map.panTo(this.options.center)
      
      if(this.antPath){
        this.leaflet.map.removeLayer(this.antPath)
        this.antPath._path.push([position.coords.latitude,position.coords.longitude])
        this.leaflet.map.addLayer(this.antPath)
      }

      this.showEvents()
    },(err) => {
        if (err.code == 1) {
          alert("Error: Access is denied!");
        } else if (err.code == 2) {
          alert("Error: Position is unavailable!");
        }
      }, { timeout: this.timeout })
  }

  showEvents() {

    const markers: any[] = [];

    for (const mapEvent of this.eventsData) {
      markers.push(
        marker(
          [mapEvent.lat, mapEvent.lng],
          {
            icon: icon({
              iconUrl: `assets/img/${this.selectedActivity}.png`, 
              iconSize: [32, 32]
            })
          }
        )
      );
    }

    this.layers = markers;
  }

  ngAfterViewInit() {
    this.antPath = antPath([[39.920763,32.854061]], {color: 'blue', weight: 5, opacity: 0.6, reverse: false,}).addTo(this.leaflet.map);
      // ant_path.toGeoJSON()
  }

  ngDoCheck() {
    if (this.componentRef) {
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.subscription.unsubscribe();
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
