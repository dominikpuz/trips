import { Component } from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public menu = false;

  constructor(public CurrencyService: CurrencyService, public CartService: CartService) {
  }

  public toggleMenu(): void {
    if (this.menu == false) {this.menu = true;}
    else {this.menu = false;}
  }

}
