"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import type { FeatureCollection, Polygon, MultiPolygon } from "geojson";
import "leaflet/dist/leaflet.css";
import styles from "./europe-distance-map.module.css";
import { EUROPE_BOUNDS, MARKETS, ORIGIN, formatDistance, getGeodesic, normalizeSearch } from "./europe-map-data";

type CountryProperties = { code: string; name: string; label: [number, number] };
type CountryData = FeatureCollection<Polygon | MultiPolygon, CountryProperties>;
type MapState = {
  map: Leaflet.Map;
  L: typeof Leaflet;
  countries: Map<string, Leaflet.Path>;
  markers: Map<string, Leaflet.Marker>;
  route: Leaflet.Polyline;
  routeBase: Leaflet.Polyline;
  traveler: Leaflet.CircleMarker;
  syncLabels: () => void;
};
const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const microstates = new Set(["AD", "LI", "MC", "SM", "VA"]);
const labelPriority = ["FR", "DE", "ES", "PL", "IT", "SE", "GB", "FI", "NO", "RO", "UA", "TR", "GR", "PT", "IE", "BY", "HU", "CZ", "AT", "CH", "RS", "BG", "HR", "LT", "LV", "EE", "BE", "NL", "DK", "SK", "SI", "AL", "BA", "ME", "XK", "CY", "MD", "RU"];

function countryStyle(code: string, selected: string): Leaflet.PathOptions {
  const origin = code === ORIGIN.code;
  const active = code === selected;
  return {
    color: origin || active ? "#e0bd7d" : "#53695b", weight: origin || active ? 1.35 : 0.8,
    opacity: origin || active ? 1 : 0.7, fillColor: origin ? "#c49a51" : active ? "#8a7544" : "#223c2e",
    fillOpacity: origin ? 0.8 : active ? 0.58 : 0.92, lineJoin: "round",
  };
}
function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function EuropeDistanceMap() {
  const [selectedCode, setSelectedCode] = useState("DE");
  const [selection, setSelection] = useState(0);
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<MapState | null>(null);
  const selectedRef = useRef(selectedCode);
  const frameRef = useRef<number>(0);
  selectedRef.current = selectedCode;
  const selected = MARKETS.find((market) => market.code === selectedCode)!;
  const filtered = useMemo(() => {
    const search = normalizeSearch(query);
    return MARKETS.filter((market) => normalizeSearch(`${market.country} ${market.city} ${market.code} ${market.code === "TR" ? "Turkey" : ""} ${market.code === "GB" ? "UK Britain" : ""}`).includes(search));
  }, [query]);
  const choose = useCallback((code: string, fromMap = false) => {
    if (fromMap) setQuery("");
    setSelectedCode(code);
    setSelection((value) => value + 1);
  }, []);

  useEffect(() => {
    let disposed = false;
    let instance: Leaflet.Map | undefined;
    let observer: ResizeObserver | undefined;
    const controller = new AbortController();
    async function initialize() {
      try {
        const [L, response] = await Promise.all([
          import("leaflet"), fetch(`${publicBase}/maps/europe-countries.geojson`, { signal: controller.signal }),
        ]);
        if (!response.ok) throw new Error("Map data could not be loaded");
        const data: CountryData = await response.json();
        if (disposed || !canvasRef.current) return;
        const map = L.map(canvasRef.current, {
          zoomControl: false, attributionControl: true, scrollWheelZoom: false,
          zoomSnap: 0.1, zoomDelta: 0.5, minZoom: 2, maxZoom: 7,
          maxBounds: [[25, -38], [76, 62]], maxBoundsViscosity: 0.85,
          // One finger scrolls the page; two fingers can pinch to explore the map.
          dragging: !L.Browser.mobile, tapHold: false,
        });
        instance = map;
        map.fitBounds(EUROPE_BOUNDS, { paddingTopLeft: [22, 44], paddingBottomRight: [22, 42], animate: false });
        map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>');
        map.attributionControl.addAttribution('<a href="https://www.naturalearthdata.com" target="_blank" rel="noopener noreferrer">Natural Earth</a>');
        L.control.scale({ imperial: false, position: "bottomleft", maxWidth: 90 }).addTo(map);
        map.createPane("countryLabels");
        map.getPane("countryLabels")!.style.zIndex = "410";
        map.getPane("countryLabels")!.style.pointerEvents = "none";
        map.createPane("routes");
        map.getPane("routes")!.style.zIndex = "450";
        map.getPane("routes")!.style.pointerEvents = "none";
        const grid = L.layerGroup().addTo(map);
        for (let lon = -30; lon <= 60; lon += 10) L.polyline([[27, lon], [74, lon]], { color: "#8b9d89", opacity: 0.065, weight: 1, interactive: false }).addTo(grid);
        for (let lat = 30; lat <= 70; lat += 10) L.polyline([[lat, -34], [lat, 58]], { color: "#8b9d89", opacity: 0.065, weight: 1, interactive: false }).addTo(grid);

        const countries = new Map<string, Leaflet.Path>();
        L.geoJSON(data, {
          style: (feature) => countryStyle(feature!.properties.code, selectedRef.current),
          onEachFeature: (feature, layer) => {
            const code = feature.properties.code;
            const polygon = layer as Leaflet.Path;
            countries.set(code, polygon);
            polygon.on("add", () => polygon.getElement()?.setAttribute("data-country", code));
            const market = MARKETS.find((item) => item.code === code);
            if (!market) return;
            polygon.on("click", () => choose(code, true));
            polygon.on("mouseover", () => {
              if (selectedRef.current !== code) polygon.setStyle({ color: "#c49a51", fillColor: "#3c5138", fillOpacity: 0.95 });
            });
            polygon.on("mouseout", () => polygon.setStyle(countryStyle(code, selectedRef.current)));
            polygon.bindTooltip(`${market.country} · ${market.city}`, { sticky: true, className: styles.hoverTooltip });
          },
        }).addTo(map);

        // Positions and names are from Natural Earth; suppress labels that overlap.
        const labels = labelPriority.flatMap((code) => {
          const feature = data.features.find((item) => item.properties.code === code);
          if (!feature) return [];
          const label = L.marker(feature.properties.label, {
            interactive: false, keyboard: false, pane: "countryLabels",
            icon: L.divIcon({ className: styles.countryLabel, html: feature.properties.name, iconSize: [0, 0], iconAnchor: [0, 0] }),
          });
          return [{ code, label, name: feature.properties.name }];
        });
        const markers = new Map<string, Leaflet.Marker>();
        for (const market of MARKETS) {
          const marker = L.marker([market.lat, market.lon], {
            icon: L.divIcon({ className: styles.pin, html: '<span></span>', iconSize: [28, 28], iconAnchor: [14, 14] }),
            title: `${market.country} · ${market.city}`, alt: `${market.country}, ${market.city}`,
            keyboard: true, autoPanOnFocus: false,
          }).addTo(map);
          marker.on("click", () => choose(market.code, true));
          const element = marker.getElement();
          element?.setAttribute("aria-label", `Select ${market.country}, ${market.city}`);
          element?.setAttribute("data-market", market.code);
          element?.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              choose(market.code, true);
            }
          });
          markers.set(market.code, marker);
        }
        const origin = L.marker([ORIGIN.lat, ORIGIN.lon], {
          icon: L.divIcon({ className: styles.originPin, html: '<span></span><i></i>', iconSize: [34, 34], iconAnchor: [17, 17] }),
          interactive: false, keyboard: false, zIndexOffset: 1000,
        }).addTo(map);
        origin.bindTooltip('<b>SKOPJE</b><span>North Macedonia</span>', { permanent: true, direction: "right", offset: [13, 0], className: styles.originTooltip }).openTooltip();
        const routeBase = L.polyline([], { pane: "routes", color: "#c49a51", weight: 5, opacity: 0.13, interactive: false }).addTo(map);
        const route = L.polyline([], { pane: "routes", color: "#e0bd7d", weight: 2, opacity: 1, smoothFactor: 0, interactive: false, className: styles.route }).addTo(map);
        const traveler = L.circleMarker([ORIGIN.lat, ORIGIN.lon], { pane: "routes", radius: 3.5, weight: 1.5, color: "#fff9e8", fillColor: "#e0bd7d", fillOpacity: 1, interactive: false }).addTo(map);

        const syncLabels = () => {
          const size = map.getSize();
          const occupied: { x: number; y: number; w: number; h: number }[] = [];
          for (const market of [ORIGIN, ...MARKETS.filter((m) => m.code === selectedRef.current)]) {
            const p = map.latLngToContainerPoint([market.lat, market.lon]);
            occupied.push({ x: p.x - 12, y: p.y - 12, w: 24, h: 24 });
            const tooltip = market.code === ORIGIN.code ? origin.getTooltip() : markers.get(market.code)?.getTooltip();
            const element = tooltip?.getElement();
            if (element) {
              const bounds = element.getBoundingClientRect(), container = map.getContainer().getBoundingClientRect();
              occupied.push({ x: bounds.left - container.left, y: bounds.top - container.top, w: bounds.width, h: bounds.height });
            }
          }
          for (const { label, name } of labels) {
            const p = map.latLngToContainerPoint(label.getLatLng());
            const w = name.length * 5.5;
            const r = { x: p.x - w / 2, y: p.y - 7, w, h: 14 };
            const visible = p.x > w / 2 + 14 && p.x < size.x - w / 2 - 14 && p.y > 58 && p.y < size.y - 55 && !occupied.some((o) => r.x < o.x + o.w + 10 && r.x + r.w + 10 > o.x && r.y < o.y + o.h + 10 && r.y + r.h + 10 > o.y);
            if (visible) { if (!map.hasLayer(label)) label.addTo(map); occupied.push(r); }
            else if (map.hasLayer(label)) label.remove();
          }
          for (const [code, marker] of markers) {
            const show = !microstates.has(code) || map.getZoom() >= 4.7 || selectedRef.current === code;
            const element = marker.getElement();
            if (element) { element.style.display = show ? "" : "none"; element.setAttribute("tabindex", show ? "0" : "-1"); }
          }
        };
        map.on("zoomend moveend resize", syncLabels);
        stateRef.current = { map, L, countries, markers, route, routeBase, traveler, syncLabels };
        syncLabels();
        let previousWidth = canvasRef.current.clientWidth;
        observer = new ResizeObserver(() => {
          map.invalidateSize({ pan: false });
          const width = map.getContainer().clientWidth;
          if (width && width !== previousWidth) {
            map.fitBounds(EUROPE_BOUNDS, { paddingTopLeft: [22, 44], paddingBottomRight: [22, 42], animate: false });
            previousWidth = width;
          }
          if (width) syncLabels();
        });
        observer.observe(canvasRef.current);
        setReady(true);
      } catch (error) {
        if (!disposed && (error as Error).name !== "AbortError") { instance?.remove(); stateRef.current = null; setFailed(true); }
      }
    }
    void initialize();
    return () => { disposed = true; controller.abort(); cancelAnimationFrame(frameRef.current); observer?.disconnect(); instance?.remove(); stateRef.current = null; };
  }, [attempt, choose]);

  useEffect(() => {
    const state = stateRef.current;
    if (!ready || !state) return;
    const { map, L, countries, markers, route, routeBase, traveler } = state;
    cancelAnimationFrame(frameRef.current);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const [code, country] of countries) country.setStyle(countryStyle(code, selectedCode));
    for (const [code, marker] of markers) {
      const active = code === selectedCode;
      marker.getElement()?.classList.toggle(styles.selectedPin, active);
      marker.getElement()?.setAttribute("aria-pressed", String(active));
      marker.setZIndexOffset(active ? 1100 : 0);
      marker.closeTooltip();
      marker.unbindTooltip();
      const market = MARKETS.find((item) => item.code === code)!;
      marker.bindTooltip(active ? `<b>${market.city.toUpperCase()}</b><span>${formatDistance(market.distanceKm)} km · air distance</span>` : `${market.country} · ${market.city}`, {
        permanent: active, direction: "top", offset: [0, active ? -15 : -10], className: active ? styles.destinationTooltip : styles.hoverTooltip,
      });
      if (active) marker.openTooltip();
    }
    const geodesic = getGeodesic(selected);
    const points: Leaflet.LatLngTuple[] = Array.from({ length: 121 }, (_, index) => {
      const p = geodesic.Position(geodesic.s13 * index / 120); return [p.lat2!, p.lon2!];
    });
    routeBase.setLatLngs(points);
    route.setLatLngs([points[0]]);
    traveler.setLatLng(points[0]).setStyle({ opacity: 1, fillOpacity: 1 });
    // Preserve the overview, recentering only when an endpoint needs more space.
    if (selection > 0) {
      const size = map.getSize();
      const endpoints = [points[0], points[points.length - 1]];
      const outside = endpoints.some((latlng) => { const p = map.latLngToContainerPoint(latlng); return p.x < 64 || p.x > size.x - 112 || p.y < 90 || p.y > size.y - 60; });
      if (outside) map.fitBounds(L.latLngBounds(endpoints), { paddingTopLeft: [65, 90], paddingBottomRight: [112, 60], maxZoom: Math.max(map.getZoom(), 3.6), animate: !reduced, duration: 0.65 });
    }
    state.syncLabels();
    if (reduced) {
      route.setLatLngs(points);
      traveler.setLatLng(points[points.length - 1]).setStyle({ opacity: 0, fillOpacity: 0 });
    } else {
      const started = performance.now();
      const animate = (now: number) => {
        const t = Math.min((now - started) / 1450, 1), eased = 1 - Math.pow(1 - t, 2);
        const p = geodesic.Position(geodesic.s13 * eased), position: Leaflet.LatLngTuple = [p.lat2!, p.lon2!];
        route.setLatLngs([...points.slice(0, Math.floor(eased * 120) + 1), position]);
        traveler.setLatLng(position);
        if (t < 1) frameRef.current = requestAnimationFrame(animate); else traveler.setStyle({ opacity: 0, fillOpacity: 0 });
      };
      frameRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [selectedCode, selected, selection, ready]);

  useEffect(() => {
    // Scroll only the destination list, leaving the About page in place.
    const list = listRef.current, row = list?.querySelector<HTMLElement>(`[data-destination="${selectedCode}"]`);
    if (list && row && !query) {
      const container = list.getBoundingClientRect(), item = row.getBoundingClientRect();
      if (item.top < container.top) list.scrollTop -= container.top - item.top;
      else if (item.bottom > container.bottom) list.scrollTop += item.bottom - container.bottom;
    }
  }, [selectedCode, selection, query]);
  const resetView = () => stateRef.current?.map.fitBounds(EUROPE_BOUNDS, { paddingTopLeft: [22, 44], paddingBottomRight: [22, 42], animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches, duration: 0.65 });

  return <div className={styles.geography} data-testid="geography-section">
    <header className={styles.heading}>
      <div><span className="nw-section-tag">NORTH MACEDONIA / EUROPEAN REACH</span><h2>THE GEOGRAPHY<br /><em>WORKS.</em></h2></div>
      <div className={styles.headingCopy}><span className={styles.originBadge}><i />SKOPJE, NORTH MACEDONIA</span><p>One connected base. A continent of possibilities.<br />Explore the distance to your European market.</p></div>
    </header>
    <div className={styles.explorer}>
      <div className={styles.mapPanel}>
        <div className={styles.mapFrame}>
          <div ref={canvasRef} className={styles.mapCanvas} aria-label="Interactive map of Europe. Select a country or destination pin." data-testid="europe-map" />
          <div className={styles.mapEyebrow}><span className={styles.liveDot} />EUROPEAN CONNECTIONS<span className={styles.mapMode}>AIR DISTANCE</span></div>
          <div className={styles.controls} aria-label="Map controls">
            <button type="button" aria-label="Zoom in" disabled={!ready} onClick={() => stateRef.current?.map.zoomIn()}><span>+</span></button>
            <button type="button" aria-label="Zoom out" disabled={!ready} onClick={() => stateRef.current?.map.zoomOut()}><span>−</span></button>
            <button type="button" aria-label="Reset Europe view" title="Reset Europe view" disabled={!ready} onClick={resetView}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" stroke="currentColor" strokeWidth="1.4" /></svg></button>
          </div>
          {!ready && <div className={styles.mapLoading} role="status">{failed ? <><p>The map could not be loaded.</p><button type="button" onClick={() => { setFailed(false); setAttempt((value) => value + 1); }}>Reload map ↗</button></> : <><span className={styles.loadingRing} /><span>Loading Europe map</span></>}</div>}
          <div className={styles.mapLegend}><span><i className={styles.legendOrigin} />NORDWOOD ORIGIN</span><span><i className={styles.legendDestination} />EUROPEAN DESTINATION</span></div>
        </div>
        <div className={styles.mapCaption}><span>Skopje <ArrowIcon /> <strong>{selected.city}</strong></span><small>Click a country or pin to connect.</small></div>
      </div>
      <aside className={styles.sidebar} aria-label="European destinations and distances">
        <div className={styles.sidebarHeading}><span>EUROPEAN DESTINATIONS</span><small>{MARKETS.length} markets</small></div>
        <div className={styles.destination} role="status" aria-live="polite" aria-atomic="true" data-testid="selected-destination">
          <div className={styles.destinationHeading}><span>SKOPJE <ArrowIcon /> {selected.city.toUpperCase()}</span><span>AIR DISTANCE</span></div>
          <div className={styles.destinationValue}><div><h3>{selected.country}</h3><p>{selected.city}</p></div><strong>{formatDistance(selected.distanceKm)}<small>km</small></strong></div>
        </div>
        <label className={styles.search}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" /></svg><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a country or city" aria-label="Search countries or cities" autoComplete="off" spellCheck={false} />{query && <button type="button" aria-label="Clear country search" onClick={() => setQuery("")}>×</button>}</label>
        <div className={styles.listHeader}><span>COUNTRY / REFERENCE CITY</span><span>FROM SKOPJE</span></div>
        <div ref={listRef} className={styles.marketList} aria-label="Choose a European destination" data-testid="destination-list">
          {filtered.map((market) => <button key={market.code} type="button" data-destination={market.code} className={selectedCode === market.code ? styles.selectedRow : ""} aria-pressed={selectedCode === market.code} aria-label={`${market.country}, ${market.city}, ${formatDistance(market.distanceKm)} kilometers air distance from Skopje`} onClick={() => choose(market.code)}>
            <span className={styles.countryCode}>{market.code === "GB" ? "UK" : market.code}</span><span className={styles.countryName}><strong>{market.country}</strong><small>{market.city}</small></span><span className={styles.rowDistance}>{formatDistance(market.distanceKm)}<small>km</small><ArrowIcon /></span>
          </button>)}
          {filtered.length === 0 && <div className={styles.emptyList}><strong>No matching destination</strong><p>Try another country or city.</p><button type="button" onClick={() => setQuery("")}>Show all destinations</button></div>}
        </div>
        <p className={styles.distanceNote}>Air distances between the city centres of Skopje and each named destination, rounded to the nearest kilometre. Road distances vary.</p>
      </aside>
    </div>
    <footer className={styles.footer}><span>A STRATEGIC BASE. A EUROPEAN PERSPECTIVE.</span><small>Geographic data: Natural Earth · Distances: WGS84 geodesic</small></footer>
  </div>;
}
