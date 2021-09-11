import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy{
public teamList: Array<any>;
subscriptions: Array<any> = [];
  constructor(private TeamService: TeamService) { }

  ngOnInit(): void {
    this.getTeamList()
  }

  ngOnDestroy(): void{
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getTeamList(): void{
    this.subscriptions.push(this.TeamService.getDescription().subscribe(
      (response: any) => {
        
          this.teamList = response.map(
            eachItem => {
              eachItem.newLink = decodeURI(eachItem.routePath);
              return eachItem;
            }
          )
      }
  ));
  }

}
