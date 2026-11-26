// Indonesia in Numbers — dataset.
// Every figure below comes from the sources named beside it. No other
// statistics are used anywhere on this site. Values marked "approx" are
// rounded estimates as published; island shares may not sum to exactly 100%.

export const META = {
  country: 'Indonesia',
  updated: '26 November 2026',
  currencyNote: 'Rp = Indonesian rupiah. US$ figures use Bank Indonesia rates.',
};

export const ECONOMY = {
  gdp: { value: 'Rp 22,139 trillion', usd: '≈ US$1.40 trillion', source: 'BPS', year: 2024 },
  gdpPerCapita: { value: 'Rp 78.6 million', usd: '≈ US$4,960', source: 'BPS', year: 2024 },
  growth: [
    { year: 2020, value: -2.07 },
    { year: 2021, value: 3.70 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],
  growthSource: { source: 'BPS', year: 2024 },
  inflation: [
    { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
  inflationNote: 'Consumer price index, year-on-year, December.',
  inflationSource: { source: 'BPS', year: 2024 },
  exports: { value: 'US$264.7 billion', source: 'BPS', year: 2024 },
  imports: { value: 'US$233.7 billion', source: 'BPS', year: 2024 },
  surplus: { value: 'US$31.0 billion', source: 'BPS', year: 2024 },
  exchange: { value: '≈ Rp 16,200 per US$', note: 'December 2024, approximate', source: 'Bank Indonesia', year: 2024 },
};

export const PEOPLE = {
  population: { value: '281.6 million', source: 'BPS', year: 2024 },
  density: { value: '148 people per km²', source: 'BPS', year: 2024 },
  medianAge: { value: '≈ 30 years', source: 'BPS', year: 2024 },
  lifeExpectancy: { value: '≈ 74 years', source: 'BPS', year: 2024 },
  hdi: { value: '75.02', note: 'Human Development Index (0–100 scale)', source: 'BPS', year: 2024 },
  urban: { value: '≈ 59%', note: 'Share of population living in urban areas', source: 'World Bank', year: 2024 },
  internetUsers: { value: '221.6 million', note: '79.5% of the population', source: 'APJII', year: 2024 },
};

export const WORK = {
  unemployment: { value: '4.76%', note: 'August 2024', source: 'BPS', year: 2024 },
  poverty: { value: '8.57%', note: 'September 2024', source: 'BPS', year: 2024 },
  labourForce: { value: '≈ 152 million people', note: 'August 2024', source: 'BPS', year: 2024 },
};

export const GEOGRAPHY = {
  area: { value: '1.90 million km²', source: 'BPS', year: 2024 },
  islands: { value: '17,508', source: 'BPS', year: 2024 },
  provinces: { value: '38', note: 'Since 2022', source: 'BPS', year: 2024 },
  capital: { value: 'Jakarta', note: 'New capital Nusantara, East Kalimantan, under construction', source: 'BPS', year: 2024 },
};

// Population share by island group, approximate and rounded; shares may not
// add up to exactly 100%.
export const ISLAND_SHARES = [
  { island: 'Java', share: 55, note: 'Most populous island' },
  { island: 'Sumatra', share: 21, note: '' },
  { island: 'Sulawesi', share: 7, note: '' },
  { island: 'Kalimantan', share: 6, note: '' },
  { island: 'Bali & Nusa Tenggara', share: 6, note: '' },
  { island: 'Papua', share: 2, note: '' },
  { island: 'Maluku', share: 1, note: '' },
];
export const ISLAND_SHARE_SOURCE = { source: 'BPS', year: 2024, note: 'Approximate, rounded shares; may not sum to 100%.' };

// Largest provinces, mid-2024 estimates, approximate.
export const TOP_PROVINCES = [
  { province: 'West Java', population: 49.9, island: 'Java' },
  { province: 'East Java', population: 41.8, island: 'Java' },
  { province: 'Central Java', population: 37.9, island: 'Java' },
];
export const PROVINCE_SOURCE = { source: 'BPS', year: 2024, note: 'Mid-2024 estimates, approximate, in millions.' };

export const SOURCES = [
  { name: 'Statistics Indonesia (BPS)', what: 'GDP, population, employment, poverty, prices, geography', year: 2024, url: 'bps.go.id' },
  { name: 'Bank Indonesia', what: 'Rupiah exchange rate, December 2024', year: 2024, url: 'bi.go.id' },
  { name: 'World Bank', what: 'Urban population share', year: 2024, url: 'worldbank.org' },
  { name: 'APJII (Indonesian Internet Service Providers Association)', what: 'Internet users', year: 2024, url: 'apjii.or.id' },
];

// Short news-style updates for the Overview page. Each item restates a
// figure already in this dataset — nothing new is introduced here.
export const UPDATES = [
  { title: 'Economy grew 5.03% in 2024', body: 'GDP reached Rp 22,139 trillion (≈ US$1.40 trillion), the third straight year of growth above 5%.', source: 'BPS', year: 2024 },
  { title: 'Inflation eased to 1.57% in December 2024', body: 'Year-on-year CPI inflation fell from 2.61% a year earlier, after the 5.51% peak of December 2022.', source: 'BPS', year: 2024 },
  { title: 'Trade surplus of US$31.0 billion in 2024', body: 'Exports of US$264.7 billion against imports of US$233.7 billion.', source: 'BPS', year: 2024 },
  { title: '221.6 million Indonesians online', body: 'Internet users reached 79.5% of the population in 2024.', source: 'APJII', year: 2024 },
];
