import { Injectable } from '@angular/core';
import {Trip} from "../models/trip.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";


@Injectable({
  providedIn: 'root'
})
export class ParseTripsService {

  private dbRef;

  constructor(private db: AngularFireDatabase ) {
    this.dbRef = db.list('trips');
  }

  public getTrips() {
    return this.dbRef;
  }

  public getTripById(id: string) {
    return this.db.object('trips/' + id);
  }

  public updateTrip(trip: Trip) {
    const data = {
      name: trip.name,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      unitPrice: trip.unitPrice,
      currParticipants: trip.currParticipants,
      maxParticipants: trip.maxParticipants,
      description: trip.description,
      image: trip.image,
      rating: trip.rating
    }
    return this.dbRef.set(trip.id, data);
  }

  public addTrip(trip: Trip) {
    const data = {
      name: trip.name,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      unitPrice: trip.unitPrice,
      currParticipants: trip.currParticipants,
      maxParticipants: trip.maxParticipants,
      description: trip.description,
      image: trip.image,
      rating: trip.rating
    }
    return this.dbRef.push(data);
  }

  public deleteTrip(trip: Trip) {
    this.dbRef.remove(trip.id);
  }
}
