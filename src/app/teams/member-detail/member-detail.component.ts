import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MemberDetailService } from './member-detail.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

 
  subscriptions: Array<any> = [];
  member: any;
  hasGithub: boolean = false;
  hasInstagram: boolean = false;
  hasLinkedIn: boolean = false;
  hasBehance: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private MemberDetailService: MemberDetailService) { }

  ngOnInit(): void {
    this.getMemberInfo(this.data.deId, this.data.memId)
  }

  getMemberInfo(departmentId: number, memberId: number): void {
    this.subscriptions.push(this.MemberDetailService.getSpecificMember(departmentId).subscribe(
      (response: any) => {
        if(response){
          var newArray = response.filter(function (el) {
            return el.id === memberId
          });
            this.member = newArray[0];
            console.log(this.member);
            if(this.member.social_media.filter(function(str){
              return str.contains("linkedin")
            }))
            if(this.member.social_media.includes("github")){
              this.hasGithub = true;
            }
            if(this.member.social_media.includes("linkedin")){
              console.log("yah!")
              this.hasLinkedIn = true;
            }
            if(this.member.social_media.includes("instagram")){
              this.hasInstagram = true;
            }
            if(this.member.social_media.includes("behance")){
              this.hasBehance = true;
            }
        }

         
      }
  ));
  }


}
