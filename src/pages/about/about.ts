import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage  implements AfterViewInit {

  public model: any;
  constructor(public navCtrl: NavController) {
    
    
  }
  ngAfterViewInit() {
   
  }
  
}
