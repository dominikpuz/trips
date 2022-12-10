import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Trip} from "../models/trip.model";
import {CartService} from "../services/cart.service";
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {

  @Input() trip!: Trip;
  @Input() trips!: Trip[];

  @Output() removeEvent: EventEmitter<Trip> = new EventEmitter<Trip>();

  constructor(private CartService: CartService, public CurrencyService: CurrencyService) { }

  ngOnInit():void {
  }

  public addToCart() {
    this.trip.tmpAmount++;
    this.trip.currParticipants++;
    this.CartService.addToCartEvent(this.trip);
  }

  public removeFromCart() {
    this.trip.tmpAmount--;
    this.trip.currParticipants--;
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

  public removeTrip() {
    this.removeEvent.emit(this.trip);
  }

}
