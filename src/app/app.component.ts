import {Component} from '@angular/core';
import {CartService} from "./services/cart.service";
import {CurrencyService} from "./services/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'trips';

  public formIsOpen: boolean = false;

  constructor(public CartService: CartService, public CurrencyService: CurrencyService) {
  }

  public openForm(): void {
    this.formIsOpen = true;
  }

  public closeForm(value: boolean): void {
    this.formIsOpen = value;
  }

}
