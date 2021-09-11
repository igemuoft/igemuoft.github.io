import { Component,OnInit} from '@angular/core';

class TypeWriter {
  txtElement: any;
  words: string[];
  wordIndex: number;
  txt: string;
  wait: number;
  isDeleting: boolean;
  
  constructor(txtElement, words, wait = "2000") {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
  }
  type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
      if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
      let typeSpeed = 200;
      if (this.isDeleting) {
          typeSpeed /= 2;
      }
      if (!this.isDeleting && this.txt === fullTxt) {
          typeSpeed = this.wait;
          this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.wordIndex++;
          typeSpeed = 400;
      }
      setTimeout(() => this.type(), typeSpeed);
  }
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


 

  slides = [
    {img: "../../assets/Sponsors/biozone.jpeg"},
    {img:"../../assets/Sponsors/CAGEF.png"},
    {img:"../../assets/Sponsors/CSB.png"},
    {img:"../../assets/Sponsors/DSIF.png"},
    {img:"../../assets/Sponsors/EEB.jpeg"},
    {img:"../../assets/Sponsors/genscript.png"},
    {img:"../../assets/Sponsors/HMB.png"},
    {img:"../../assets/Sponsors/IBBME.png"},
    {img:"../../assets/Sponsors/Medicine_By_Design.png"},
    {img:"../../assets/Sponsors/pioreactor.png"},
    {img:"../../assets/Sponsors/shell.png"},
    {img:"../../assets/Sponsors/skule-alumni.png"},
    {img:"../../assets/Sponsors/SKULE.png"},
    {img:"../../assets/Sponsors/SnapGene.png"},
    {img:"../../assets/Sponsors/UC.png"},
    {img:"../../assets/Sponsors/UofT_Eng.png"},
    {img:"../../assets/Sponsors/UofT_Med.png"}
  ];


slideConfig = {
  "slidesToShow": 3,
  "slidesToScroll": 3,
  "dots": true,
  "infinite": true,
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 1650
};

  constructor(
  ) {

  }



  ngOnInit(): void {
  }

  ngAfterViewInit(){
    document.addEventListener('DOMContentLoaded', this.init);
  }


  init(){
    const txtElement = document.querySelector('.txt-type');
    const words = ["engineer protein.","recycle plastics.","clean earth."];
    const wait = "2000";
    new TypeWriter(txtElement, words, wait);
  }
}
