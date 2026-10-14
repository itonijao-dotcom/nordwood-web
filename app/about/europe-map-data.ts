import { Geodesic } from "geographiclib-geodesic";
import data from "./europe-markets.json";

export const ORIGIN = data.origin;
export const EUROPE_BOUNDS: [[number, number], [number, number]] = [[34, -25], [69, 43]];
export const MARKETS = data.destinations.map((destination) => {
  const inverse = Geodesic.WGS84.Inverse(ORIGIN.lat, ORIGIN.lon, destination.lat, destination.lon);
  return { ...destination, distanceMeters: inverse.s12!, distanceKm: Math.round(inverse.s12! / 1000) };
});
export type Market = (typeof MARKETS)[number];
export const formatDistance = (km: number) => new Intl.NumberFormat("en-GB").format(km);
export function getGeodesic(destination: Market) {
  return Geodesic.WGS84.InverseLine(ORIGIN.lat, ORIGIN.lon, destination.lat, destination.lon);
}
export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}
