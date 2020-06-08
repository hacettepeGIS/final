import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, Injector, EmbeddedViewRef, DoCheck, OnDestroy } from '@angular/core';
import { tileLayer, latLng, icon, marker, MapOptions, LatLng } from 'leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { ActivityTypesService, NotificationService } from '@app/core/services';
import {antPath} from 'leaflet-ant-path';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit,AfterViewInit,DoCheck,OnDestroy {
  totalDistance = 0.00000;
  elapsedTime=0
  componentRef: any;
  subscription: any;

  @ViewChild('leaflet', { read: LeafletDirective }) leaflet:LeafletDirective;
  options:MapOptions={}
  layers: any[];

  activityTypes=[]
  selectedActivity=0;
  eventsData: any = [{
    lat: 39.920763,
    lng: 32.854061,
    iconURL: 'assets/img/0.png'
  }];
  antPath;

  constructor(private resolver: ComponentFactoryResolver, 
              private inj: Injector,
              private activityTypesService:ActivityTypesService,
              private notificationService:NotificationService) { }

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
  }

  id = navigator.geolocation.watchPosition((position) => {
    (<LatLng>this.options.center).lat = this.eventsData[0].lat = position.coords.latitude;
    (<LatLng>this.options.center).lng = this.eventsData[0].lng = position.coords.longitude;

    this.leaflet.map.panTo(this.options.center)
    
    if(this.antPath && this.isStartVisible==false){
      this.leaflet.map.removeLayer(this.antPath)
      this.antPath._path.push([position.coords.latitude,position.coords.longitude])
      this.leaflet.map.addLayer(this.antPath)
    }

    this.showEvents()
  },(err) => {
      // if (err.code == 1) {
      //   alert("Error: Access is denied!");
      // } else if (err.code == 2) {
      //   alert("Error: Position is unavailable!");
      // }
    }, { timeout: 5000 })


  isStartVisible:boolean=true;
  isStopVisible:boolean=false;
  isSaveVisible:boolean=false;
  isDiscardVisible:boolean=false;
  isActivitySelectVisible:boolean=true;

  start(){
    this.elapsedTime=0
    this.totalDistance=0
    this.isActivitySelectVisible=false;
    this.isStartVisible=false;
    this.isStopVisible=true;

    this.antPath._path=[];

    this.notificationService.smallBox({
      title: "START!",
      content: "Your activity started!",
      color: "#739E73",
      iconSmall: "fa fa-flag-checkered fa-2x fadeInRight animated",
      timeout: 5000
    })
  }

  stop(){
    this.isStopVisible=false;
    this.isSaveVisible=true;
    this.isDiscardVisible=true;

    this.notificationService.smallBox({
      title: "FINISH!",
      content: "Current activity finished!",
      color: "#296191",
      iconSmall: "fa fa-trophy fa-2x fadeInRight animated",
      timeout: 5000
    })
  }

  save(){
    this.isSaveVisible=false;
    this.isDiscardVisible=false;
    this.isStartVisible=true;
    this.isActivitySelectVisible=true;
    this.antPath._path=[];

    this.notificationService.smallBox({
      title: "SAVED!",
      content: "Activity has saved successfully!",
      color: "#739E73",
      iconSmall: "fa fa-save fa-2x fadeInRight animated",
      timeout: 5000
    })
  }

  discard(){
    this.isSaveVisible=false;
    this.isDiscardVisible=false;
    this.isStartVisible=true;
    this.isActivitySelectVisible=true;

    this.antPath._path=[];

    this.notificationService.smartMessageBox({
      title: "Smart Alert!",
      content: "This is a confirmation box. Can be programmed for button callback",
      buttons: '[No][Yes]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "Yes") {

        this.notificationService.smallBox({
          title: "Callback function",
          content: "<i class='fa fa-clock-o'></i> <i>You pressed Yes...</i>",
          color: "#C46A69",
          iconSmall: "fa fa-check fa-2x fadeInRight animated",
          timeout: 4000
        });
      }
    });
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

    if(this.isStopVisible)
      this.calculateTotalDistance()
  }

  ngAfterViewInit() {
    this.antPath = antPath([[]], {color: 'blue', weight: 4, opacity: 0.6, reverse: false,}).addTo(this.leaflet.map);
      // ant_path.toGeoJSON()
  }

  ngDoCheck() {
    if (this.componentRef) {
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    navigator.geolocation.clearWatch(this.id);
    if (this.componentRef) {
      this.subscription.unsubscribe();
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  calculateTotalDistance(){
    // Calculating the distance of the polyline
    var tempLatLng = null;
    $.each(this.antPath._path, function(i, latlng){
        latlng =new LatLng(latlng[0],latlng[1])
        if(tempLatLng == null){
            tempLatLng = latlng;
            return;
        }

        this.totalDistance += tempLatLng.distanceTo(latlng);
        tempLatLng = latlng;
    });
  }
}
