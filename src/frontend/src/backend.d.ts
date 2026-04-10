import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface ForecastEntry {
    time: string;
    condition: WeatherCondition;
}
export interface Weather {
    temperature: bigint;
    windSpeed: bigint;
    humidity: bigint;
    forecast: Array<ForecastEntry>;
    location: string;
    condition: WeatherCondition;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    submittedAt: Timestamp;
    email: string;
    message: string;
}
export interface Resource {
    id: bigint;
    lat: number;
    lng: number;
    name: string;
    distanceKm: number;
    resourceType: ResourceType;
    address: string;
    hoursOfOperation: string;
    phone: string;
}
export interface Alert {
    id: bigint;
    alertType: AlertType;
    title: string;
    affectedArea: string;
    recommendedActions: Array<string>;
    affectedPopulation: bigint;
    severity: Severity;
    issuedAt: Timestamp;
    location: string;
}
export enum AlertType {
    flood = "flood",
    earthquake = "earthquake",
    storm = "storm",
    cyclone = "cyclone"
}
export enum ResourceType {
    hospital = "hospital",
    fire = "fire",
    supply = "supply",
    shelter = "shelter",
    police = "police"
}
export enum Severity {
    warning = "warning",
    danger = "danger",
    safe = "safe"
}
export enum WeatherCondition {
    cloudy = "cloudy",
    stormy = "stormy",
    sunny = "sunny",
    rainy = "rainy"
}
export interface backendInterface {
    getAlerts(): Promise<Array<Alert>>;
    getAlertsByType(alertType: string): Promise<Array<Alert>>;
    getContacts(): Promise<Array<ContactSubmission>>;
    getResources(): Promise<Array<Resource>>;
    getResourcesByType(resourceType: string): Promise<Array<Resource>>;
    getWeather(): Promise<Weather | null>;
    submitContact(name: string, email: string, message: string): Promise<void>;
}
