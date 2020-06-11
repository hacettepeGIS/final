import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { ActivityService } from '@app/core/services';
import _ from 'lodash';
import { CalendarWidgetComponent } from '@app/shared/calendar/calendar-widget/calendar-widget.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  @ViewChild('calendar', { }) calendar:CalendarWidgetComponent;

  ip:string
  ipList=[]
  selectOptions={
    placeholder:"Please select a ip address...",
    allowClear: true
  }

  events=[]
  activity={}

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
    }).subscribe((resp)=>{
      this.ipList = _(resp)
            .groupBy(x => x.ip)
            .map((value, key) => ({ id: key, text: key }))
            .value();

     if(this.ipList.length>0){
      this.ip = this.ipList[0]
      this.fetchCalenderActivities()
     }

    },(err)=>alert(err))
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
        "duration": true
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
          distance:event['distance']
        });
      }
      this.calendar.reRender()
    },(err)=>alert(err))
  }

  onEventClicked(event){
    //activityTypeId
    this.activity['title']=event.title
    this.activity['elapsedTime']=this.activityService.convertMsToDateString(event.duration)
    this.activity['activityDate']= new Date(event.time).toLocaleDateString()
    this.activity['totalDistance']= event.distance
    this.activity['type']= event.activityTypeId == 1 ? "Walking" : "Running"
    
  }

  calculatePace({rTime,  rDistancePerMi}) {
    let distance = rDistancePerMi;
    let time =  rTime;
    let avgPace = time / distance;
    return avgPace;
  }
}
