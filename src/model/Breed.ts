export class Breed {
    id: string;
    name: string;
    estimatedPrice: number;
  
    constructor(id: string, name: string, estimatedPrice: number) {
      this.id = id;
      this.name = name;
      this.estimatedPrice = estimatedPrice;
    }
  
    static toFirebase(breed: Breed): any {
      return {
        name: breed.name,
        estimatedPrice: breed.estimatedPrice
      };
    }
  
    static fromFirebase(data: any): Breed {
      return new Breed(data.id, data.name, data.estimatedPrice);
    }
  }
  