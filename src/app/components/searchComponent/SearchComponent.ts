import {Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl  } from '@angular/forms';

@Component({
  selector: 'search-component',
  outputs:['searchQuery', 'searchForm', 'stars'],
  templateUrl: './SearchComponent.html',
  styleUrls: ['./SearchComponent.scss']
})
export class SearchComponent {
  searchQuery: EventEmitter<any>;
  searchForm: FormGroup;
  stars: FormGroup;

  constructor() {
    this.searchQuery = new EventEmitter();
    this.searchForm = new FormGroup({
        hotel: new FormControl(''),
        allstars: new FormControl(false)
    });
    this.stars = new FormGroup({
        star1: new FormControl(false),
        star2: new FormControl(false),
        star3: new FormControl(false),
        star4: new FormControl(false),
        star5: new FormControl(false),
    })
  }

  search(): boolean {
    let searchObject;

    searchObject = Object.assign(this.searchForm.value, this.stars.value);
    this.searchQuery.emit(searchObject);
    return false;
  }

  allStarsEvent(): void {
    Object.keys(this.stars.value).forEach(elem => {

        if (this.searchForm.value.allstars) {
          this.stars.value[elem] = true;
        } 
    });
  }
}