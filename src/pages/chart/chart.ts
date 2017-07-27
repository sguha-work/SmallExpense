import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Expense } from './../../services/expense.service';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {
  //@ViewChild('barCanvas') barCanvas;
 
  barChart: any;
  constructor(public navCtrl: NavController,private expense: Expense) {
  }

  displayWeeklyChart() {
    this.expense.getTotalExpenseOfLast7DaysDatewise().then((response) => {
      if(response.length !== 0) {
        let labels = [];
        let data = [];
        for(let index in response) {
          labels.push(response[index].date);
          data.push(parseInt(response[index].expense));
        }
        this.barChart = new Chart($("canvas")[0], {
            type: 'bar',
            scaleFontColor: 'black',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Expense',
                    backgroundColor: "green",
                    data: data
                }]
            },
              options: {
                scaleFontColor: 'black',
                responsive: true,
                scales: {
                    xAxes: [{ 
                        ticks: {
                          fontColor: "black", // this here
                        },
                    }],
                    yAxes: [{
                        ticks: {
                          fontColor: "black", // this here
                        },  
                    }],
                }
              }
        });
      } else {
        alert("No data to display chart");  
      }
    }, () => {
      alert("get data error");
    });
  }
  
}
