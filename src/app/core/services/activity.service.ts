import { Injectable } from "@angular/core";
import { JsonApiService } from "./json-api.service";
import { Observable } from "rxjs";

@Injectable()
export class ActivityService {
    constructor(private jsonApiService:JsonApiService) {
    }

}