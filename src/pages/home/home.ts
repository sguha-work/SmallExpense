import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { FileHandeler } from './../../services/filehandeler.service';
import { TagService } from './../../services/tag.service';
import { NumberService } from './../../services/number.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements AfterViewInit {

  //private tagService: TagService;
  public tagData: any;
  public numberData: any;
  private model: any;
  constructor(public navCtrl: NavController, private tagService: TagService, private numberService: NumberService, private file: FileHandeler) {
    this.loadTags();
    this.loadNumbers();
    this.model = {
      reason:"",
      amount: "",
      description: "",
      time: ""
    };
  }

  private loadNumbers() {
    this.numberService.getNumberData().then((data)=>{
      this.numberData = data;
    },()=>{
      alert("error occured")
    });
  }

  private loadTags(): void {
    this.tagService.getTagData().then((data)=>{
      this.tagData = data;
    }, ()=>{
      alert("Error occured");
    }); 
  }

  private checkAndPrepareDescription(): void {
    if(this.model.reason!=="" && this.model.amount !== "") {
      let date = Date();
      this.model.description = "Spent Rs "+this.model.amount+" in " + this.model.reason + " on " + date;
      this.model.time = Date.now();
    }
  }

  

  public tagClicked(event): void {
    $("ion-item[data-item='tag']").removeClass('active');
    $(event.currentTarget).addClass('active');
    this.model.reason =  $(event.currentTarget).text().trim();
    this.checkAndPrepareDescription();
  }

  public numberClicked(): void {
    if(this.model.amount === "") {
      this.model.amount = 0;
    }
    this.model.amount = (this.model.amount*10)+parseInt($(event.currentTarget).text());
    this.checkAndPrepareDescription();
  }

  public resetInputs(): void {
    this.model.amount = "";
    $("ion-item[data-item='tag']").removeClass('active');
    this.model.reason = "";
    this.model.description = "";
  }

  public submitInput() {
    // alert("submitting");
    // this.file.createDir(this.file.dataDirectory, "SmallExpenseTracker", false).then(()=>{
    //   alert("success directory");
    //   this.file.writeFile(this.file.dataDirectory+"/SmallExpenseTracker", "hello.txt", "hello").then(() => {
    //     alert("success file");
    //     this.file.readAsText(this.file.dataDirectory+"/SmallExpenseTracker", "hello.txt").then((data) =>{
    //       alert(data);
    //     }, () => {
    //       alert("failed to read");
    //     });
    //   }, ()=>{
    //     alert("failed file");
    //   })
    // }, ()=> {
    //   alert("error directory");
    // });
    this.file.writeFile(this.file.getCurrentDataFileName(), JSON.stringify(this.model), "data").then((res) => {
      if(res) {
        alert("Succesfully submitted data");
      } else {
        alert("Data writing failed");
      }
      
    }, () => {
      alert("Data submit failed");
    });
    
  }

  ngAfterViewInit() {
    
  }
}
