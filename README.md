# NORDWOOD

The About page's **THE GEOGRAPHY WORKS** section uses locally bundled Leaflet and real Natural Earth country borders. It includes 46 European destinations, geodesic route animation, city references, search, keyboard interaction, and responsive layouts.

Distances are air distances from the Skopje city centre to each displayed reference city, calculated on WGS84 with GeographicLib and rounded to the nearest kilometre. No external map service or API key is required. See `public/maps/README.md` for sources and methodology.

## Development

Use Node.js 22.13 or newer:

```sh
npm ci
npx next dev
```

Open `http://localhost:3000/about`.

## Static hosting

```sh
npm run build:static
```

This ZIP contains the repository files at its root. Upload its extracted contents to the root of your GitHub repository, on the `main` branch, including `.github/workflows/deploy-pages.yml`.

In GitHub, select **Settings > Pages > Source: GitHub Actions**. Then run **Actions > Deploy NORDWOOD to GitHub Pages > Run workflow**. The workflow builds the static site and deploys `out/`. Its base path is read automatically from the GitHub Pages configuration, so it also works when the repository name changes or a custom domain is configured. See `NGARKIMI-NE-GITHUB.txt` for the upload steps.

The original Sites build is available through `npm run build`; `npm test` builds and checks its worker artifact.

The homepage COMPANY section and About hero also use a locally stored photograph of a woodworking workshop. Photo provenance is documented in `PHOTO-SOURCE.txt`. The existing map, shared CSS, header, footer, and other sections are preserved.
