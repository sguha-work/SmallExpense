import * as $ from 'jquery';

export interface Tag {
    name: string;
    icon: string;
}
export class TagService {

    public tags: Array<Tag>;

    constructor() {
        this.tags = [];
    }
    public getTagData() :Promise<Tag[]> {
        let promise: Promise<Tag[]>;
        promise = new Promise((resolve, reject)=>{
            $.ajax({
                url: "data/tag.data.json",
                success: (data) => {
                    this.tags = data;
                    resolve(this.tags);
                },
                error: () => {
                    reject();
                }
            });
        });
        return promise;
    }
}