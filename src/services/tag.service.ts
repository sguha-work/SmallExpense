import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
export interface Tag {
    name: string;
    icon: string;
}
@Injectable()
export class TagService {

   constructor(public http: Http) {
   }
    public getTagData() :Promise<Tag[]> {
        var promise = this.http.get("assets/data/tag.data.json").toPromise()
            .then((response) => {
                return response.json() as Tag[];
            })
            .catch(this.errorHandler);
        return promise;    
    }
    private errorHandler(error: any): Promise<any> {
        return Promise.reject(error);
    }
}