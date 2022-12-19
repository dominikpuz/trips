export interface Trip {
  id: string;
  name:string;
  destination:string;
  startDate:string;
  endDate:string;
  unitPrice: number;
  currParticipants: number;
  maxParticipants: number;
  description: string;
  image: string;
  rating: number;
  tmpAmount: number;
}
