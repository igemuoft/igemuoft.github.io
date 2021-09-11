import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  subscriptions: Array<any> = [];
  project: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private ProjectService: ProjectsService) { }

  ngOnInit(): void {
    this.getProjectInfo(this.data.projectId);
  }

  getProjectInfo(projectId: number){
    this.subscriptions.push(this.ProjectService.getDescription().subscribe(
      (response: any) => {
        if(response){
          var newArray = response.filter(function (el) {
            return el.id === projectId;
          });
          this.project = newArray[0];
          console.log(this.project);
        }
      }
  ));
  }

  ngOnDestroy(): void{
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
