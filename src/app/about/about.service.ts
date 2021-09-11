import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { teams } from '../interfaces/teams';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  private _url = "/assets/about/about.json";


  constructor(private http: HttpClient) { }

  getDescription(): Observable<teams[]>{
    return this.http.get<teams[]>(this._url);
  }

 
}
