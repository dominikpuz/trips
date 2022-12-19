import {TripHistory} from "./trip-history.model";

export interface User {
  id: string;
  name: string;
  tripHistory: TripHistory[];
}
