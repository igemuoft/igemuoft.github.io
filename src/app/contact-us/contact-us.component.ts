import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  myForm = new FormGroup({
    myName: new FormControl(),
    myEmail: new FormControl(),
    mySubject: new FormControl(),
    myMessage: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

}
