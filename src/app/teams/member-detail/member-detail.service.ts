import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { member } from 'src/app/interfaces/member';
@Injectable({
  providedIn: 'root'
})
export class MemberDetailService {

  private _url1 = "/assets/teams/wet_lab_member.json"
  private _url2 = "/assets/teams/dry_lab_member.json"
  private _url3 = "/assets/teams/business_and_ethics_member.json"
  private _url4 = "/assets/teams/web_and_graphics_member.json"
  private _url5 = "/assets/teams/executives_member.json"

  constructor(private http: HttpClient) { }

  getSpecificMember(departmentId: number): Observable<member[]>{
    let url = "";
    if(departmentId === 1){
      url = "/assets/teams/wet_lab_member.json";
  }
  if(departmentId === 2){
    url = "/assets/teams/dry_lab_member.json";
}
  if(departmentId === 3){
    url = "/assets/teams/business_and_ethics_member.json";
}
if(departmentId === 4){
  url = "/assets/teams/web_and_graphics_member.json";
}
if(departmentId === 5){
  url = "/assets/teams/executives_member.json";
}
return this.http.get<member[]>(url);
  }
  
}
