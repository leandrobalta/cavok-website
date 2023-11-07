export interface SearchTravelRequest {
    adults: number;
    cabin: string;
    children: number;
    departureDate: string;
    searchType?: string;
    originAirport: string;
    destinationAirport: string;
  }

export interface SearchTravelResponse {
    success: boolean;
    data: any;
    message?: string;
}

export interface Travel {
  milesPrice: number;
  fees: number;
  company: string;
  seat: string;
  stops: number;
  duration: number;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  bagCount: number;
  suitcaseCount: number;
  tripNumber: string;
  connections: Connection[];
}

export interface Connection {
  originAirport: string;
  destinationAirport: string;
  originCity: string;
  destinationCity: string;
  departureTime: string;
  departureDate: string;
  arrivalTime: string;
  arrivalDate: string;
  duration: number;
  company: string;
  seat: string;
  tripNumber: string;
}