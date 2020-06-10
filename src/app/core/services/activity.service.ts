import { Injectable } from "@angular/core";
import { JsonApiService } from "./json-api.service";
import { GeoJSON } from 'leaflet';
import { BehaviorSubject } from "rxjs";

const defaultIp = {
    ip: "0.0.0.0"
}
@Injectable()
export class ActivityService {
    public ip$ = new BehaviorSubject({...defaultIp});; 

    constructor(private jsonApiService:JsonApiService) {
        this.jsonApiService.getOutSide("https://jsonip.com/").subscribe(this.ip$)
    }

    saveActivity(activity:GeoJSON){
        return this.jsonApiService.post("activities",activity)
    }

    getActivities(query){
        query=query ? query : {}
        return this.jsonApiService.get("activities?filter="+JSON.stringify(query))
    }
}