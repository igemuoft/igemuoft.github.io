import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectsService } from './projects.service';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit,OnDestroy {

  public projectList: Array<any>;
subscriptions: Array<any> = [];
  constructor(private ProjectsService: ProjectsService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getProjectList()
  }

  projectDetail(id: number): void{
    const dialogRef = this.dialog.open(ProjectDetailComponent, {
      width: '1200px',
      height: '800px',
      data: {projectId: id}
    });
  }

  ngOnDestroy(): void{
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getProjectList(): void{
    this.subscriptions.push(this.ProjectsService.getDescription().subscribe(
      (response: any) => {
          this.projectList = response;
      }
  ));
  }
}
