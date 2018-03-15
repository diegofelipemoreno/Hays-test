import {Component, OnInit} from '@angular/core';
import {Hotel} from '../../models/Hotel';

@Component({
  selector: 'hotel-row',
  inputs: ['hotel', 'stars'],
  templateUrl: './InventoryRowcomponent.html',
  styleUrls: ['./InventoryRowcomponent.scss']
})

export class InventoryRowComponent implements OnInit {
  hotel: Hotel;
  stars: any;

  constructor() {
    this.stars = [];
  }

  ngOnInit(): void {
    this.setArrayFromStars();
  }

  setArrayFromStars(): void {
    let i,
        starsHotel = this.hotel.stars;

    for (i = 0; i < starsHotel; i++) {
      this.stars.push(i);
    }
  }
}
