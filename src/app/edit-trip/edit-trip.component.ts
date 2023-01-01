import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {map} from "rxjs";
import {Trip} from "../models/trip.model";
import {Opinion} from "../models/opinion.model";
import {ParseTripsService} from "../services/parse-trips.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  public trip!: Trip;

  constructor(private ParseTripService: ParseTripsService, private route: ActivatedRoute, private router: Router) {
  }

  public onSubmit() {
    this.ParseTripService.updateTrip(this.trip).then(_ => {
      this.router.navigate(['/trip-manager']);
    });
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
}
