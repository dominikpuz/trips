import {Trip} from "./trip.model";

export interface Cart {
  reservedTrips: Trip[];
  reservedTripsTotal: number;
  totalCost: number;
}
