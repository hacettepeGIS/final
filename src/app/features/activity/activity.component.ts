import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, Injector, EmbeddedViewRef, DoCheck, OnDestroy } from '@angular/core';
import { tileLayer, latLng, icon, marker, MapOptions, LatLng, GeoJSON } from 'leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { ActivityTypesService, NotificationService, JsonApiService, ActivityService } from '@app/core/services';
import {antPath} from 'leaflet-ant-path';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent implements OnInit,AfterViewInit,DoCheck,OnDestroy {
  totalDistance = 0.00000;
  duration:string='00:00:00'
  componentRef: any;
  subscription: any;

  @ViewChild('leaflet', { read: LeafletDirective }) leaflet:LeafletDirective;
  options:MapOptions={}
  layers: any[];

  activityTypes=[]
  selectedActivity={};
  eventsData: Array<any> = [{
    lat: 39.920763,
    lng: 32.854061,
    time:null
  }];
  antPath;
  ip:string="0.0.0.0"

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

  constructor(private resolver: ComponentFactoryResolver, 
              private inj: Injector,
              private activityService:ActivityService,
              private activityTypesService:ActivityTypesService,
              private notificationService:NotificationService) { }

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 30, attribution: '...' })
      ],
      zoom: 18,
      center: latLng(39.920763, 32.854061),
    };   

    this.activityTypesService.getTypes().subscribe((resp)=>{
      this.activityTypes=resp
      this.selectedActivity=resp[0]
      this.showEvents()
    },(err)=>{
      alert(`Activity types could not fetch from api service. Error : ${err}`)
    })
    this.activityService.ip$.subscribe((resp)=>this.ip=resp.ip);
  }

  id = navigator.geolocation.watchPosition((position) => {
    this.eventsData.push({ lat:position.coords.latitude, lng:position.coords.longitude, time:new Date() });

    (<LatLng>this.options.center).lat = position.coords.latitude;
    (<LatLng>this.options.center).lng = position.coords.longitude;

    this.leaflet.map.panTo(this.options.center)
    
    if(this.antPath){
      this.leaflet.map.removeLayer(this.antPath)
      if(this.isStopVisible==true)
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
    }, { timeout: 5000 })

  isStartVisible:boolean=true;
  isStopVisible:boolean=false;
  isSaveVisible:boolean=false;
  isDiscardVisible:boolean=false;
  isActivitySelectVisible:boolean=true;

  start(){
    this.duration='00:00:00'
    this.totalDistance=0
    this.isActivitySelectVisible=false;
    this.isStartVisible=false;
    this.isStopVisible=true;

    this.antPath._path=[];
  }

  stop(){
    this.isStopVisible=false;
    this.isSaveVisible=true;
    this.isDiscardVisible=true;

    this.notificationService.smallBox({
      title: "FINISH!",
      content: "Current activity finished! Please save your activity.",
      color: "#296191",
      iconSmall: "fa fa-trophy fa-2x fadeInRight animated",
      timeout: 5000
    })
  }

  save(){
    let lastPoint = this.eventsData[this.eventsData.length - 1];
    let hour = lastPoint.time.getHours() 
    let message= hour>5 && hour<11 ? "Morning " :
                 hour>=11 && hour<15 ? "Lunch " :
                 hour>=15 && hour<18 ? "Afternoon " :
                 hour>=18 && hour<22 ? "Evenning " : "Night ";
    message+=this.selectedActivity["name"]

    var activity = this.antPath.toGeoJSON()
    this.notificationService.smartMessageBox({
      title: "Warning",
      content: "Would you like to give a name to your activity?",
      buttons: "[Accept]",
      input: "text",
      placeholder: "Enter your activity name",
      inputValue: message
    }, (ButtonPress, Value) => {
      activity.properties.name=Value
      activity.properties.ip=this.ip
      activity.properties.activityTypeId=this.selectedActivity["id"]
      activity.properties.duration=this.calculateTotalDurationTime()
      activity.properties.distance=this.totalDistance

      this.activityService.saveActivity(activity).subscribe(
        ()=>{
          this.notificationService.smallBox({
            title: "SAVED!",
            content: "Activity has saved successfully!",
            color: "#739E73",
            iconSmall: "fa fa-save fa-2x fadeInRight animated",
            timeout: 5000
          })
  
          this.isSaveVisible=false;
          this.isDiscardVisible=false;
          this.isStartVisible=true;
          this.isActivitySelectVisible=true;
      
          this.antPath._path=[];
          this.totalDistance = 0.00000;
          this.duration ='00:00:00'
        },
        (err)=>this.notificationService.smallBox({
          title: "ERROR!",
          content: err,
          color: "#C46A69",
          iconSmall: "fa fa-bell fa-2x fadeInRight animated",
          timeout: 5000
        })
      );
    });
  }

  discard(){
    this.notificationService.smartMessageBox({
      title: "Warning",
      content: "Are you sure discarding your activity?",
      buttons: '[No][Yes]'
    }, (ButtonPressed) => {
      if (ButtonPressed === "Yes") {
        this.isSaveVisible=false;
        this.isDiscardVisible=false;
        this.isStartVisible=true;
        this.isActivitySelectVisible=true;
        this.totalDistance = 0.00000;
        this.duration ='00:00:00'
    
        this.antPath._path=[];
        this.notificationService.smallBox({
          title: "Info",
          content: "Activity removed successfully",
          color: "#C46A69",
          iconSmall: "fa fa-check fa-2x fadeInRight animated",
          timeout: 4000
        });
      }
    });
  }

  showEvents() {
    const markers: any[] = [];
    let lastPoint = this.eventsData[this.eventsData.length - 1];
    markers.push(
      marker(
        [lastPoint.lat, lastPoint.lng],
        {
          icon: icon({
            iconUrl: `assets/img/${this.selectedActivity["id"]}.png`, 
            iconSize: [32, 32]
          })
        }
      )
    );

    this.layers = markers;

    if(this.isStopVisible==true){
      this.calculateTotalDistance()
      let milliseconds = this.calculateTotalDurationTime()
      this.duration = this.activityService.convertMsToDateString(milliseconds)
    }
  }

  ngAfterViewInit() {
    this.antPath = antPath([[]], {color: 'blue', weight: 5, reverse: false,}).addTo(this.leaflet.map);
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
    var tempLatLng:LatLng = null;
    this.totalDistance = 0.00000;

    this.antPath._path.forEach(position => {
      let latlng=new LatLng(position[0],position[1])
      if(tempLatLng == null){
        tempLatLng = latlng;
        return;
      }
      this.totalDistance += tempLatLng.distanceTo(latlng);
      tempLatLng = latlng;
    });
  }

  calculateTotalDurationTime(){
    let startPoint = this.eventsData.find(x => x.time > 0);
    if(!startPoint)
      return 0
    
    let lastPoint = this.eventsData[this.eventsData.length - 1];
    return lastPoint.time.getTime() - startPoint.time.getTime()
  }
}
