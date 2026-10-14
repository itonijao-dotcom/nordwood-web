# NORDWOOD Europe map data

The map uses Leaflet 1.9.4 and the original Natural Earth 1:10 million Admin 0 country geometries. The GeoJSON is clipped to the European map extent (-34 to 58 degrees longitude, 27 to 74 degrees latitude); coordinates are rounded to five decimal places. Country coastlines and borders are data-derived, not hand-drawn. Natural Earth depicts its documented default boundary convention.

City points come from Natural Earth 1:10 million Populated Places. Every destination is a named reference city, not a distance to a country's border, centroid, or capital unless that capital is the displayed reference city. The twelve existing commercial city references are retained, with 34 additional destinations.

Origin: Skopje city centre, latitude 42.000006, longitude 21.433462. Distance is the shortest surface geodesic on the WGS84 ellipsoid, calculated with GeographicLib 2.2.0, in metres, then rounded to the nearest kilometre for display. The route animation follows that same geodesic. These are air distances, not driving routes, airline itineraries, or freight delivery estimates.

The mapping library, data, and calculations are bundled with the site. No map API key, external tiles, CDN, or live geocoding service is needed. Country and pin clicks, keyboard selection, search, map zoom/reset, and reduced motion are supported. Microstate pins become visible when zoomed in or when selected from the list.

Sources retrieved 14 October 2026:

- Countries: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_admin_0_countries.geojson
- Places: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_10m_populated_places_simple.geojson
- Natural Earth data licence: public domain, https://www.naturalearthdata.com/about/terms-of-use/
- Leaflet: BSD-2-Clause, https://github.com/Leaflet/Leaflet/blob/v1.9.4/LICENSE
- GeographicLib: MIT, https://github.com/geographiclib/geographiclib-js

Website content and styles outside the Geography Works component are unchanged.
