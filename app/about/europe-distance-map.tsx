"use client";

import { useMemo, useState } from "react";

type MapPoint = {
  id: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
};

const origin = {
  country: "North Macedonia",
  city: "Skopje",
  lat: 41.9981,
  lon: 21.4254,
  x: 57,
  y: 56,
};

const destinations: MapPoint[] = [
  { id: "de", country: "Germany", city: "Munich", lat: 48.1374, lon: 11.5755, x: 41, y: 30 },
  { id: "at", country: "Austria", city: "Vienna", lat: 48.2082, lon: 16.3738, x: 47, y: 27 },
  { id: "ch", country: "Switzerland", city: "Zurich", lat: 47.3769, lon: 8.5417, x: 35, y: 36 },
  { id: "it", country: "Italy", city: "Milan", lat: 45.4642, lon: 9.19, x: 34, y: 42 },
  { id: "fr", country: "France", city: "Paris", lat: 48.8566, lon: 2.3522, x: 25, y: 28 },
  { id: "be", country: "Belgium", city: "Brussels", lat: 50.8503, lon: 4.3517, x: 29, y: 24 },
  { id: "nl", country: "Netherlands", city: "Amsterdam", lat: 52.3676, lon: 4.9041, x: 32, y: 20 },
  { id: "cz", country: "Czechia", city: "Prague", lat: 50.0755, lon: 14.4378, x: 41, y: 24 },
  { id: "pl", country: "Poland", city: "Warsaw", lat: 52.2297, lon: 21.0122, x: 56, y: 19 },
  { id: "hu", country: "Hungary", city: "Budapest", lat: 47.4979, lon: 19.0402, x: 51, y: 31 },
  { id: "ro", country: "Romania", city: "Bucharest", lat: 44.4268, lon: 26.1025, x: 66, y: 37 },
  { id: "gr", country: "Greece", city: "Athens", lat: 37.9838, lon: 23.7275, x: 63, y: 63 },
];

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthKm * c;
}

export default function EuropeDistanceMap() {
  const markets = useMemo(
    () =>
      destinations.map((point) => ({
        ...point,
        distanceKm: Math.round(haversineKm(origin.lat, origin.lon, point.lat, point.lon)),
      })),
    []
  );

  const [selectedId, setSelectedId] = useState(markets[0]?.id ?? "de");
  const selected = markets.find((item) => item.id === selectedId) ?? markets[0];

  return (
    <div className="geo-map-card">
      <div className="geo-map-head">
        <span className="nw-section-tag">LOCATION</span>
        <div>
          <strong>SKOPJE → EUROPE</strong>
          <p>Interactive distance view from North Macedonia to key European market hubs.</p>
        </div>
      </div>

      <div className="geo-map-board">
        <svg className="geo-map-svg" viewBox="0 0 1000 720" aria-label="Interactive Europe logistics distance map">
          <defs>
            <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(196,154,81,.18)" />
              <stop offset="100%" stopColor="rgba(196,154,81,.95)" />
            </linearGradient>
            <radialGradient id="landFill" cx="50%" cy="45%" r="70%">
              <stop offset="0%" stopColor="#183227" />
              <stop offset="100%" stopColor="#0c1d16" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width="1000" height="720" rx="32" fill="#091611" />

          <g className="geo-map-gridlines" stroke="rgba(255,255,255,.04)">
            {Array.from({ length: 7 }).map((_, index) => (
              <line key={`h-${index}`} x1="70" y1={110 + index * 80} x2="930" y2={110 + index * 80} />
            ))}
            {Array.from({ length: 9 }).map((_, index) => (
              <line key={`v-${index}`} x1={110 + index * 90} y1="80" x2={110 + index * 90} y2="640" />
            ))}
          </g>

          <g className="geo-map-land" fill="url(#landFill)" stroke="rgba(196,154,81,.16)" strokeWidth="2">
            <path d="M171 424l-44-44 13-72 60-39 65 16 48-21 95 29 86-9 73 18 88 67 16 56-41 54-60 16-47 46-68-11-54 29-74-15-46 29-60-8-37-41-35 3-53-21-25-57z" />
            <path d="M368 455l27 18 18 64 41 66 43 16 12-20-34-47-17-52-24-51z" />
            <path d="M265 203l27-57 43-39 44 27 4 54-31 35-53 14z" />
            <path d="M734 178l54-41 46 15 8 51-31 39-51-14z" />
            <path d="M605 497l23 36 40 11 10-20-31-32z" />
            <path d="M245 222l32 18-11 36-40-5-6-26z" />
          </g>

          <g className="geo-routes">
            {markets.map((market) => {
              const x2 = market.x * 10;
              const y2 = market.y * 7.2;
              const x1 = origin.x * 10;
              const y1 = origin.y * 7.2;
              return (
                <line
                  key={`route-${market.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className={`geo-route ${selectedId === market.id ? "is-selected" : ""}`}
                />
              );
            })}
          </g>

          <g className="geo-origin-mark">
            <circle cx={origin.x * 10} cy={origin.y * 7.2} r="18" fill="rgba(196,154,81,.12)" />
            <circle cx={origin.x * 10} cy={origin.y * 7.2} r="8" fill="#c49a51" />
            <circle cx={origin.x * 10} cy={origin.y * 7.2} r="4" fill="#fff9ee" />
            <text x={origin.x * 10 + 20} y={origin.y * 7.2 - 16} fill="#fff7ea">North Macedonia</text>
            <text x={origin.x * 10 + 20} y={origin.y * 7.2 + 6} fill="rgba(255,255,255,.55)">Skopje hub</text>
          </g>

          <g>
            {markets.map((market) => {
              const x = market.x * 10;
              const y = market.y * 7.2;
              const selectedClass = selectedId === market.id ? "is-selected" : "";
              return (
                <g
                  key={market.id}
                  className={`geo-map-point ${selectedClass}`}
                  onClick={() => setSelectedId(market.id)}
                >
                  <circle className="geo-point-pulse" cx={x} cy={y} r="13" />
                  <circle className="geo-point-dot" cx={x} cy={y} r="5.2" />
                  <text x={x + 14} y={y - 10}>{market.country}</text>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="geo-map-meta">
          <div>
            <span>Selected destination</span>
            <strong>{selected.country}</strong>
            <p>{selected.city}</p>
          </div>
          <div className="geo-map-km">
            <span>Approx. distance</span>
            <strong>{selected.distanceKm.toLocaleString()} km</strong>
            <small>Reference from Skopje, North Macedonia</small>
          </div>
        </div>

        <div className="geo-market-list" aria-label="European destinations">
          {markets.map((market) => (
            <button
              key={market.id}
              type="button"
              className={selectedId === market.id ? "is-selected" : ""}
              onClick={() => setSelectedId(market.id)}
            >
              <span>{market.country}</span>
              <strong>{market.distanceKm} km</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
