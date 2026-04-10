// Re-export runtime types from backend.ts (enums are runtime values)
export {
  AlertType,
  ResourceType,
  Severity,
  WeatherCondition,
} from "../backend";

// Frontend-only types
export interface AlertRecord {
  id: bigint;
  alertType: import("../backend").AlertType;
  title: string;
  affectedArea: string;
  recommendedActions: string[];
  affectedPopulation: bigint;
  severity: import("../backend").Severity;
  issuedAt: bigint;
  location: string;
}

export interface ResourceRecord {
  id: bigint;
  lat: number;
  lng: number;
  name: string;
  distanceKm: number;
  resourceType: import("../backend").ResourceType;
  address: string;
  hoursOfOperation: string;
  phone: string;
}

export interface WeatherForecast {
  time: string;
  condition: import("../backend").WeatherCondition;
}

export interface WeatherData {
  temperature: bigint;
  windSpeed: bigint;
  humidity: bigint;
  forecast: WeatherForecast[];
  location: string;
  condition: import("../backend").WeatherCondition;
}

export interface ContactSubmission {
  id: bigint;
  name: string;
  submittedAt: bigint;
  email: string;
  message: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  label: string;
}
