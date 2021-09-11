import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { MemberDetailComponent } from '../member-detail/member-detail.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
  drylabList: any;
  wetLabList: any;
  businessAndEthicsList: any;
  webAndGraphicsList: any;
  executivesList: any;

  subscriptions: Array<any> = [];

  ngOnDestroy(): void{
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  constructor(private TeamService: TeamService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getWebLab();
    this.getDryLab();
    this.getBusinessandEthics();
    this.getWebandGraphics();
    this.getExecutivesList();
  }

  getWebLab(): void{
    this.subscriptions.push(this.TeamService.getWebLab().subscribe(
      (response: any) => {
          this.wetLabList = response;
      }
  ));
  }

  getDryLab(): void{
    this.subscriptions.push(this.TeamService.getDryLab().subscribe(
      (response: any) => {
          this.drylabList = response;
      }
  ));
  }

  getBusinessandEthics(): void{
    this.subscriptions.push(this.TeamService.getBusinessandEthics().subscribe(
      (response: any) => {
          this.businessAndEthicsList = response;
      }
  ));
  }

  getWebandGraphics(): void{
    this.subscriptions.push(this.TeamService.getWebandGraphics().subscribe(
      (response: any) => {
          this.webAndGraphicsList = response;
      }
  ));
  }

  getExecutivesList(): void{
    this.subscriptions.push(this.TeamService.getExecutives().subscribe(
      (response: any) => {
          this.executivesList = response;
      }
  ));
  }

  getMemberDetail(departmentId: number, memberId: number): void {
    const dialogRef = this.dialog.open(MemberDetailComponent, {
      width: '1000px',
      height: '600px',
      data: {deId: departmentId, memId: memberId}
    });
  }
}
