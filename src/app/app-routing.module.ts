import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamsComponent } from './teams/teams.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TeamMemberComponent } from './teams/team-member/team-member.component';
import { DemoComponent } from './demo/demo.component';
import { SponsorComponent } from './sponsor/sponsor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
  },    
  {
    path: 'about-igem',
    component: AboutComponent,
  },
  {
    path: 'our-projects',
    component: ProjectsComponent,
  },
  {
    path: 'our-teams',
    component: TeamsComponent,
  },
  {
    path: 'team-members',
    component: TeamMemberComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path:'demo',
    component: DemoComponent
  },
  {
    path:'sponsor',
    component: SponsorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
