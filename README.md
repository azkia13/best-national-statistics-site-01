# Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/azkia13/best-national-statistics-site-01/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/azkia13/best-national-statistics-site-01/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia: the essential figures about the
country — its economy, its people, its work and its regions — in one place,
each with its source and year.

## What is inside

- **Overview** — six key indicators, GDP growth 2020–2024, population share
  by island group, and the latest updates.
- **Economy** — GDP and GDP per capita, growth, trade (exports, imports,
  surplus) and inflation, with tabs and bar/line chart toggles.
- **People** — population, density, median age, life expectancy, HDI, urban
  share and internet use.
- **Work** — labour force, unemployment (4.76%, August 2024) and poverty
  (8.57%, September 2024).
- **Regions** — the 38 provinces, the largest provinces, and a sortable,
  searchable table of population by island group.
- **Sources** — every source, the update date and the methodology notes.

## Data

All figures are for 2024 and come from Statistics Indonesia (BPS), Bank
Indonesia, the World Bank and APJII. Every figure on the site shows its
source and year where it appears.

## Running it

The site is plain static files in `app/` — no build step, no network
request, no external font or library. Serve it with any static server:

```sh
python3 -m http.server 8080 --directory app
```

Then open http://localhost:8080/ — and try the hash routes `#/economy`,
`#/people`, `#/work`, `#/regions` and `#/sources`.

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to `/output` and writes `/output/dossier.json` with the vendored
`vendor/makefun-frontend.ts` library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).

Built for the make.fun bounty
[best-national-statistics-site-20261126-0539](https://make.fun/c/best-national-statistics-site-20261126-0539).
