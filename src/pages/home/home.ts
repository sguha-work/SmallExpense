import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements AfterViewInit {

  private loadTags() {
    alert($("button").length);
  }
  constructor(public navCtrl: NavController) {
  }
  ngAfterViewInit() {
    this.loadTags();
  }
}
