import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, Injector, EmbeddedViewRef } from '@angular/core';
import { tileLayer, latLng, icon, marker, popup } from 'leaflet';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet';
import { timer } from 'rxjs';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html'
})
export class ActivityComponent {
  @ViewChild('leaflet', { read: LeafletDirective }) leaflet;

  data: any;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(0, 0)
  };

  layers: any[];

  eventsData: any = [{
    lat: 0,
    lng: 0,
    iconURL: 'assets/img/runner.ico',
    description: 'Runner'
  }];


  componentRef: any;
  subscription: any;

  constructor(private resolver: ComponentFactoryResolver, private inj: Injector) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.options.center.lat = this.eventsData[0].lat = position.coords.latitude;
      this.options.center.lng = this.eventsData[0].lng = position.coords.longitude;

      this.leaflet.centerChange();     
    },
      (err) => {
        if (err.code == 1) {
          alert("Error: Access is denied!");
        } else if (err.code == 2) {
          alert("Error: Position is unavailable!");
        }
      }, { timeout: 5000 })

    setInterval(() => {
      this.showEvents()
    }, 5000)
  }

  showEvents() {

    const markers: any[] = [];

    for (const mapEvent of this.eventsData) {
      markers.push(
        marker(
          [mapEvent.lat, mapEvent.lng],
          {
            icon: icon({
              iconUrl: mapEvent.iconURL,
              iconSize: [24, 24]
            })
          }
        )
      );
    }

    this.layers = markers;
  }

  ngAfterViewInit() {
    this.leaflet.map
      .on('popupclose', () => {
        this.ngOnDestroy();
      });
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
