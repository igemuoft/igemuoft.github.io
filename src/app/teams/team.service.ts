import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { teams } from '../interfaces/teams';
import { Observable } from 'rxjs/internal/Observable';
import { member } from '../interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private _url = "/assets/teams/team.json";
  private _url1 = "/assets/teams/wet_lab_member.json"
  private _url2 = "/assets/teams/dry_lab_member.json"
  private _url3 = "/assets/teams/business_and_ethics_member.json"
  private _url4 = "/assets/teams/web_and_graphics_member.json"
  private _url5 = "/assets/teams/executives_member.json"

  constructor(private http: HttpClient) { }

  getDescription(): Observable<teams[]>{
    return this.http.get<teams[]>(this._url);
  }

  getWebLab(): Observable<member[]>{
    return this.http.get<member[]>(this._url1);
  }

  getDryLab(): Observable<member[]>{
    return this.http.get<member[]>(this._url2);
  }

  getBusinessandEthics(): Observable<member[]>{
    return this.http.get<member[]>(this._url3);
  }

  getWebandGraphics(): Observable<member[]>{
    return this.http.get<member[]>(this._url4);
  }

  getExecutives(): Observable<member[]>{
    return this.http.get<member[]>(this._url5);
  }

}
