import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projects } from '../interfaces/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private _url = "/assets/projects/projects.json";

  constructor(private http: HttpClient) { }

  getDescription(): Observable<projects[]>{
    return this.http.get<projects[]>(this._url);
  }
}
