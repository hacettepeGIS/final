import { Injectable } from "@angular/core";
import { JsonApiService } from "./json-api.service";
import { GeoJSON } from 'leaflet';

@Injectable()
export class ActivityService {
    constructor(private jsonApiService:JsonApiService) {
    }

    saveActivity(activity:GeoJSON){
        return this.jsonApiService.post("activities",activity)
    }

    getIp(){
        return this.jsonApiService.getOutSide("https://jsonip.com/")
    }
}