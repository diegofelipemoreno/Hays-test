import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
 * Services
 */
import {HOTEL_PROVIDERS} from './services/HotelService';
import {CustExtBrowserXhr} from './services/cust-ext-browser-xhr';

/*
 * Components
 */
import { AppComponent } from './components/appComponent/app.component';
import { HeaderComponent } from './components/headerComponent/headerComponent';
import { InventoryComponent } from './components/inventoryComponent/InventoryComponent';
import { InventoryRowComponent } from './components/inventoryRowComponent/InventoryRowComponent';
import { SearchComponent } from './components/searchComponent/SearchComponent';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InventoryComponent,
    InventoryRowComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [HOTEL_PROVIDERS, CustExtBrowserXhr],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
