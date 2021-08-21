import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { teams } from '../interfaces/teams';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  private _url2 = "/assets/about/about2.json"

  constructor(private http: HttpClient) { }

  getDescription2(): Observable<teams[]>{
    return this.http.get<teams[]>(this._url2);
  }
}
