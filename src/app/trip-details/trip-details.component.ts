import {Component, OnInit} from '@angular/core';
import {Trip} from "../models/trip.model";
import {ParseTripsService} from "../services/parse-trips.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {CartService} from "../services/cart.service";
import {CurrencyService} from "../services/currency.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Opinion} from "../models/opinion.model";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  public trip!: Trip;
  public form: FormGroup;
  public opinions!: Opinion[];
  public alreadyCommented: boolean = true;
  public alreadyTookPlace!: boolean;
  public curDate!: Date;
  public banned!: boolean;
  public isBought!: boolean;
  public user!: User;

  constructor(private ParseTripService: ParseTripsService, private route: ActivatedRoute,
              private CartService: CartService, public CurrencyService: CurrencyService,
              private formBuilder: FormBuilder,
              private AuthService: AuthService) {
    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required],
      opinion: ['', Validators.required],
      date: ''
    });
  }

  public getDate(date: string) {
    return new Date(date);
  }

  ngOnInit() {
    this.curDate = new Date();
    this.route.params.subscribe(params => {
      this.ParseTripService.getTripById(params['id']).snapshotChanges().pipe(map((changes: any) => {
        return {id: changes.payload.key, ...changes.payload.val()};
      })).subscribe((trip: Trip) => {
        this.alreadyTookPlace = this.curDate.getTime() > this.getDate(trip.endDate).getTime();
        this.trip = trip;
        this.trip.tmpAmount = 0;
        this.AuthService.getUserObservable().subscribe((user: any) => {
          this.user = user;
          this.banned = user.banned;
          if (!user.banned) {
            this.ParseTripService.isBought(user.id, trip.id).subscribe(r => {
              this.isBought = r != null;
              if (this.isBought) {
                this.ParseTripService.getComment(user.id, trip.id).subscribe(result => {
                  this.alreadyCommented = result != null;
                });
              }
            });
          }
        });
        this.ParseTripService.getOpinions(trip.id).snapshotChanges().pipe(map((changes: any) => {
          return changes.map((opinion: any) => ({... opinion.payload.val()}))
        })).subscribe((opinions: Opinion[]) => {
          this.opinions = opinions;
        });
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
      if ((!this.alreadyCommented && this.alreadyTookPlace ) || this.user.roles.manager) {
        const opinion: Opinion = {
          username: this.form.value.username,
          name: this.form.value.name,
          opinion: this.form.value.opinion,
          date: this.form.value.date,
          rating: this.form.value.rating,
        }
        this.ParseTripService.commentOnTrip(opinion, this.trip.id, this.AuthService.getUser().id);
        this.form.reset();
      }
    }
  }

}
