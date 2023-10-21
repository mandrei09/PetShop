export class Location {
    id : number;
    state : string;
    city : string;
    address : string;

    constructor(id: number, state: string, 
        city: string, address: string) {
        this.id = id;
        this.state = state;
        this.city = city;
        this.address = address;
      }
}
