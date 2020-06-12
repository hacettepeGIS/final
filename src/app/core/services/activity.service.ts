import { Injectable } from "@angular/core";
import { JsonApiService } from "./json-api.service";
import { GeoJSON } from 'leaflet';
import { BehaviorSubject } from "rxjs";

const defaultIp = {
    ip: "0.0.0.0"
}
@Injectable()
export class ActivityService {
    //public ip$ = new BehaviorSubject({...defaultIp});; 

    constructor(private jsonApiService:JsonApiService) {
        //this.jsonApiService.getOutSide("https://jsonip.com/").subscribe(this.ip$)
    }

    getIp(){
        return this.jsonApiService.getOutSide("https://jsonip.com/")
    }

    saveActivity(activity:GeoJSON){
        return this.jsonApiService.post("activities",activity)
    }

    getActivities(query){
        query=query ? query : {}
        return this.jsonApiService.get("activities?filter="+JSON.stringify(query))
    }


  convertMsToDateString(milliseconds:number) {
    milliseconds=milliseconds% (1000*60*60*24);
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    return h + ':' + m + ':' + s;
  }
}