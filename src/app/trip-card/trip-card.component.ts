import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from "../models/trip.model";
import {CartService} from "../services/cart.service";
import {CurrencyService} from "../services/currency.service";
import {ParseTripsService} from "../services/parse-trips.service";

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input() trip!: Trip;
  @Input() trips!: Trip[];

  @Output() removeEvent: EventEmitter<Trip> = new EventEmitter<Trip>();

  constructor(private CartService: CartService, public CurrencyService: CurrencyService, private ParseTripsService: ParseTripsService) { }

  ngOnInit():void {
  }

  public addToCart() {
    this.trip.tmpAmount++;
    this.CartService.addToCartEvent(this.trip);
  }

  public removeFromCart() {
    this.trip.tmpAmount--;
    this.CartService.removeFromCartEvent(this.trip);
  }

  public getMaxPrice(): number {
    let maxPrice = this.trip.unitPrice;
    this.trips.forEach((el) => {
      maxPrice = Math.max(maxPrice, el.unitPrice);
    });
    return maxPrice;
  }

  public getMinPrice(): number {
    let minPrice = this.trip.unitPrice;
    this.trips.forEach((el) => {
      minPrice = Math.min(minPrice, el.unitPrice);
    });
    return minPrice;
  }

}
