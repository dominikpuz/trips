import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ParseTripsService} from "../services/parse-trips.service";
import {Trip} from "../models/trip.model";

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent implements OnInit{

  @Output() closeFormEvent: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private parseTripsService: ParseTripsService) {
  }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {
    let trip: Trip = {
      name: form.value.name,
      destination: form.value.destination,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      unitPrice: form.value.unitPrice,
      currParticipants: 0,
      maxParticipants: form.value.maxParticipants,
      description: form.value.description,
      image: form.value.image,
      rating: 0,
      tmpAmount: 0
    } as Trip;
    this.parseTripsService.addTrip(trip);
    this.close();
  }

  public close(): void {
    this.closeFormEvent.emit(false);
  }
}
