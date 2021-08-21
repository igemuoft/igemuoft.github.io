import { Component, OnInit } from '@angular/core';
import { DemoService } from './demo.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  public aboutList2: Array<any>;
  subscriptions: Array<any> = [];
  constructor(private DemoService: DemoService) { }

  ngOnInit(): void {
    this.getAbout2List();
  }

  ngOnDestroy(): void{
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getAbout2List(): void{
    this.subscriptions.push(this.DemoService.getDescription2().subscribe(
      (response: any) => {
          this.aboutList2 = response;
      }
  ));
  }

}
