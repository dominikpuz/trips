import {Component, OnInit} from '@angular/core';
import {Trip} from "../models/trip.model";
import {CartService} from "../services/cart.service";
import {CurrencyService} from "../services/currency.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public trips!: Trip[];

  constructor(private router: Router , public CartService: CartService, public CurrencyService: CurrencyService) {

  }

  ngOnInit() {
    this.trips = this.CartService.getReservedTrips();
  }

  public buyTrip(trip: Trip) {
    this.trips = this.CartService.buyTrip(trip);
    this.router.navigateByUrl('/trip-history');

  }

  public addToCart(trip: Trip) {
    trip.tmpAmount++;
    this.CartService.addToCartEvent(trip);
  }

  public removeFromCart(trip: Trip) {
    trip.tmpAmount--;
    this.CartService.removeFromCartEvent(trip);
  }

}
