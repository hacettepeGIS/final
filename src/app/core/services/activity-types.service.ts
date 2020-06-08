import { Injectable } from "@angular/core";
import { JsonApiService } from "./json-api.service";
import { Observable } from "rxjs";

@Injectable()
export class ActivityTypesService {
    constructor(private jsonApiService:JsonApiService) {
    }

    getTypes():Observable<any>{
        return this.jsonApiService.get('activity-types');
    }
}