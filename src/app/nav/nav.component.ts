import { Component } from '@angular/core';
import {CurrencyService} from "../services/currency.service";
import {CartService} from "../services/cart.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  public menu = false;

  constructor(public CurrencyService: CurrencyService, public CartService: CartService, public AuthService: AuthService) { }

  public toggleMenu(): void {
    this.menu = !this.menu;
  }

}
