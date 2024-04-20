export class EntityTask{
    constructor(title, status, date){
        this.id = Date.now();
        this.title = title;
        this.status = status;
        this.date = date;
    }
}