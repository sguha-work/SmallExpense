import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

import { TagService } from './../../services/tag.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements AfterViewInit {

  private tagService: TagService;

  
  constructor(public navCtrl: NavController) {
    this.tagService = new TagService();
  }

  private loadTags() {
    this.tagService.getTagData().then((data)=>{
      console.log(data);
    }, ()=>{
      alert("Erro occured");
    });
  }

  ngAfterViewInit() {
    this.loadTags();
  }
}
