import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {config} from '@app/core/smartadmin.config';
import {Observable} from "rxjs";
import { delay, map, catchError } from 'rxjs/operators';


@Injectable()
export class JsonApiService {

  constructor(private http: HttpClient) {}

  public fetch(url): Observable<any>{
    return this.http.get(this.getBaseUrl() + config.API_URL + url)
    .pipe(
      delay(100),
      map((data: any)=>(data.data|| data)),
      catchError(this.handleError)
    )
  }

  public get(url): Observable<any>{
    return this.http.get(this.getRemoteUrl() + url)
    .pipe(
      delay(100),
      map((data: any)=>(data.data|| data)),
      catchError(this.handleError)
    )
  }

  public post(url,data): Observable<any>{
    return this.http.post(this.getRemoteUrl() + url, data)
      .pipe(
        delay(100),
        map((data: any)=>(data.data|| data)),
        catchError(this.handleError)
      )
  }


  private getBaseUrl(){
    return location.protocol + '//' + location.hostname + (location.port ? ':'+location.port : '') + '/'
  }

  private getRemoteUrl(){
    return 'https://final-gmt352-api.herokuapp.com/'
  }

  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}


