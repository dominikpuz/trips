import {Component, OnInit} from '@angular/core';
import {Trip} from "../models/trip.model";
import {ParseTripsService} from "../services/parse-trips.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {CartService} from "../services/cart.service";
import {CurrencyService} from "../services/currency.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Opinion} from "../models/opinion.model";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  public trip!: Trip;
  public form: FormGroup;
  public opinions: Opinion[];

  constructor(private ParseTripService: ParseTripsService, private route: ActivatedRoute,
              private CartService: CartService, public CurrencyService: CurrencyService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required],
      opinion: ['', Validators.required],
      date: ''
    });
    this.opinions = new Array;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ParseTripService.getTripById(params['id']).snapshotChanges().pipe(map((changes: any) => {
        return {id: changes.payload.key, ...changes.payload.val()};
      })).subscribe((trip: Trip) => {
        this.trip = trip;
        this.trip.tmpAmount = 0;
      });
    });
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

  onSubmit() {
    if (this.form.valid && this.form.value.opinion.length > 50 && this.form.value.opinion.length < 500) {
      this.opinions.push({
        username: this.form.value.username,
        name: this.form.value.name,
        opinion: this.form.value.opinion,
        date: this.form.value.date,
        rating: this.form.value.rating
      });
      this.form.reset();
    }
  }

}
