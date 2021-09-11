import { Component, OnInit,OnDestroy } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  public aboutList: Array<any>;
 
subscriptions: Array<any> = [];
  constructor(private AboutService: AboutService) { }

  ngOnInit(): void {
    this.getAboutList();
 
  }

  ngOnDestroy(): void{
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getAboutList(): void{
    this.subscriptions.push(this.AboutService.getDescription().subscribe(
      (response: any) => {
          this.aboutList = response;
      }
  ));
  }



}
