import {TripHistory} from "./trip-history.model";
import {Roles} from "./roles.model";

export interface User {
  id: string;
  name: string;
  roles: Roles;
  email: string;
  banned?: boolean;
  tripHistory?: TripHistory[];
}
