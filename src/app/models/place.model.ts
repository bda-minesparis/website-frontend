export class Place {
    public event_id : number;
    login : string;
    size : number  
    status: number;
    payed: boolean;
    points : number;
    contributor : boolean;

    constructor(data: any | undefined) {
        this.event_id = data.event_id || undefined;
        this.login = data.login || undefined;
        this.size = data.size || undefined;
        this.status = data.status || undefined;
        this.points = data.points || undefined;
        this.contributor = data.contributor || undefined;
        this.payed = data.payed || undefined;
    }
}  