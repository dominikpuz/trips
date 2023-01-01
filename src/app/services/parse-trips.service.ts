import { Injectable } from '@angular/core';
import {Trip} from "../models/trip.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Opinion} from "../models/opinion.model";


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
    return this.db.database.ref('trips/').child(trip.id).set(data);
  }

  public updateTripByKey(key: string, value: any, id: string) {
    return this.db.database.ref('trips').child(id).child(key).set(value);
  }

  public isBought(uid: string, tripId: string) {
    return this.db.object('trip-history/' + uid + '/' + tripId).valueChanges();
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
    this.db.database.ref('trips/' + trip.id).remove();
  }

  public getComment(uid: string, tripId: string) {
    return this.db.object('opinions/' + tripId + '/' + uid).valueChanges();
  }

  public commentOnTrip(opinion: Opinion, tripId: string, uid: string) {
    return this.db.object('opinions/' + tripId + '/' + uid).set(opinion);
  }

  public getOpinions(tripId: string) {
    return this.db.list('opinions/' + tripId);
  }
}
