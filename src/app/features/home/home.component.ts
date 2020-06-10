import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ActivityService } from '@app/core/services';
import _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  ip:string
  ipList=[]
  selectOptions={
    placeholder:"Please select a ip address...",
    allowClear: true
  }

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: L.latLng(46.879966, -121.726909)
  };

  constructor(private activityService:ActivityService) {}

  ngOnInit() {
    this.activityService.getActivities({
      "fields": {
        "ip": true
      }
    }
    ).subscribe((resp)=>{
      this.ipList = _(resp)
            .groupBy(x => x.ip)
            .map((value, key) => ({ id: key, text: key }))
            .value();

     if(this.ipList.length>0)
       this.ip = this.ipList[0]
    },(err)=>alert(err))



    // this.activityService.getActivities({
    //     "where": {
    //       "ip": this.activityService.ip$.value.ip
    //     },
    //     "fields": {
    //       "id": true,
    //       "ip": true,
    //       "name": true,
    //       "activityTypeId": true,
    //       "geometry": true,
    //       "time": true
    //     }
    //   }
    //   ).subscribe((resp)=>alert(JSON.stringify(resp)),(err)=>alert(err))

    //   this.ip = this.activityService.ip$.value.ip

  }
  events=[{
    "id": "544c4183be624ef013bb00a1",
    "title": "Smartadmin Open Day",
    "start": new Date(),
    "end": new Date(),
    "className": ["event", "bg-color-darken"]
}]
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
        "time": true
      }
    }).subscribe((resp)=>alert(JSON.stringify(resp)),(err)=>alert(err))
  }

}

