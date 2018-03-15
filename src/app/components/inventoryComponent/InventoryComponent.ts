import {Component, OnInit} from '@angular/core';
import {Hotel} from '../../models/Hotel';

import {HotelService} from '../../services/HotelService';
import { SearchComponent } from '../searchComponent/SearchComponent';

@Component({
  selector: 'inventory-list',
  inputs: ['hotelList'],
  templateUrl: './InventoryComponent.html',
  styleUrls: ['./InventoryComponent.scss']
})

export class InventoryComponent implements OnInit {
  hotelList: Hotel[];

  constructor(public hotelService: HotelService) {
  }

  ngOnInit(): void {
    this.hotelService.getHotels({}).map((res) => res.json()).subscribe(
      data => { this.setData(data) },
      err => console.error(err),
      () => console.log('done')
    );
  }

  onSearchNotify(searchData):void {
    this.hotelService.getHotels(searchData).map((res) => res.json()).subscribe(
      data => { this.setData(data) },
      err => console.error(err),
      () => console.log('done')
    );
  }

  setData (data): void {
    this.hotelList = data;
    console.log(this.hotelList);
  }  
}
