import {Injectable} from '@angular/core';
@Injectable()
export class Common{
    public convertTimeStampToTime(timeStamp: string): string {
        let date = new Date(parseInt(timeStamp));
        let hours = date.getHours();
        let hoursString: string;
        if(hours>12) {
        hours = hours-12;
        hoursString =" PM"
        } else {
        hoursString =" AM"
        }
        let minutes = "0" + date.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + hoursString;
        return formattedTime;
    }

    public prepareArrayFromRawData(rawData: string): any {
      let data = JSON.parse(rawData);
      let keys = Object.keys(data);
      let dataArray = [];
      for(let index in keys) {
        data[keys[index]].time = this.convertTimeStampToTime(data[keys[index]].time);
        dataArray.push(data[keys[index]]);
      }
      return dataArray;
    }
}