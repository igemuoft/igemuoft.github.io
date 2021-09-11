import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamsComponent } from './teams/teams.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MenuComponent } from './menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import{MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './footer/footer.component'
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamMemberComponent } from './teams/team-member/team-member.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DemoComponent } from './demo/demo.component';
import { MemberDetailComponent } from './teams/member-detail/member-detail.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    ProjectsComponent,
    TeamsComponent,
    ContactUsComponent,
    MenuComponent,
    FooterComponent,
    TeamMemberComponent,
    ProjectDetailComponent,
    DemoComponent,
    MemberDetailComponent,
    SponsorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
