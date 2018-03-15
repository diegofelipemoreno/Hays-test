export class Hotel {
  constructor(public id: string,public name: string,public stars: number,public price: number,public image: string,public amenities: string[] ) {
  	this.id = id;
  	this.name = name;
  	this.stars = stars;
  	this.price = price;
  	this.image = image;
  	this.amenities = amenities;
  }
}

