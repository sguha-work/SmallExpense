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
  public tagData: any;
  
  constructor(public navCtrl: NavController) {
    this.tagService = new TagService();
    this.loadTags();
  }

  private loadTags() {
    this.tagService.getTagData().then((data)=>{
      this.tagData = data;
    }, ()=>{
      alert("Erro occured");
    });
  }

  ngAfterViewInit() {
    
  }
}
