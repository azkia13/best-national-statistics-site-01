// views.js — renders each hash-route page into #app.
// Every figure shown carries its source and year, taken from data.js.

import { ECONOMY, PEOPLE, WORK, GEOGRAPHY, ISLAND_SHARES, ISLAND_SHARE_SOURCE, TOP_PROVINCES, PROVINCE_SOURCE, SOURCES, UPDATES, META } from './data.js';
import { barChart, lineChart, shareBars, gauge } from './charts.js';

function srcTag(s) {
  return `<p class="src">Source: ${s.source}, ${s.year}</p>`;
}

function kpi(label, value, sub, s) {
  return `<article class="kpi"><h3>${label}</h3><p class="big">${value}</p><p class="sub">${sub}</p>${srcTag(s)}</article>`;
}

function growthSeries() {
  return ECONOMY.growth.map((g) => ({ label: String(g.year), value: g.value }));
}

function inflationSeries() {
  return ECONOMY.inflation.map((g) => ({ label: String(g.year), value: g.value }));
}

export function viewOverview() {
  const growth = growthSeries();
  const islands = ISLAND_SHARES.map((i) => ({ label: i.island, value: i.share }));
  return `
  <section class="hero">
    <p class="eyebrow">National statistics · ${META.country}</p>
    <h1>Indonesia in Numbers</h1>
    <p class="lede">The essential figures about Indonesia — its economy, its people, its work and its regions — in one place, each with its source and year.</p>
    <p class="meta">Last updated ${META.updated} · Figures for 2024 unless stated otherwise</p>
    <div class="hero-actions">
      <a class="btn" href="#/economy">Explore the economy</a>
      <a class="btn ghost" href="#/regions">See the regions</a>
    </div>
  </section>

  <section aria-label="Key indicators">
    <h2>At a glance</h2>
    <div class="grid kpis">
      ${kpi('Population', PEOPLE.population.value, 'The world’s fourth-largest population', PEOPLE.population)}
      ${kpi('GDP', ECONOMY.gdp.value, ECONOMY.gdp.usd, ECONOMY.gdp)}
      ${kpi('GDP growth, 2024', '5.03%', 'Real growth, year on year', ECONOMY.growthSource)}
      ${kpi('Unemployment', WORK.unemployment.value, WORK.unemployment.note, WORK.unemployment)}
      ${kpi('Poverty rate', WORK.poverty.value, WORK.poverty.note, WORK.poverty)}
      ${kpi('Internet users', PEOPLE.internetUsers.value, PEOPLE.internetUsers.note, PEOPLE.internetUsers)}
    </div>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>GDP growth, 2020–2024</h2>
      <p class="note">Real GDP growth, percent per year. 2020 shows the pandemic contraction.</p>
      <div class="chart-toggle" role="group" aria-label="Growth chart type">
        <button type="button" class="toggle active" data-growth-chart="bar">Bars</button>
        <button type="button" class="toggle" data-growth-chart="line">Line</button>
      </div>
      <div id="growth-chart">${barChart(growth)}</div>
      ${srcTag(ECONOMY.growthSource)}
    </article>
    <article class="card">
      <h2>Where Indonesians live</h2>
      <p class="note">Share of the population by island group. Shares are approximate and rounded, so they may not add up to exactly 100%.</p>
      ${shareBars(islands)}
      ${srcTag(ISLAND_SHARE_SOURCE)}
    </article>
  </section>

  <section>
    <h2>Latest updates</h2>
    <ul class="updates">
      ${UPDATES.map((u) => `<li><strong>${u.title}</strong><span>${u.body}</span><em>Source: ${u.source}, ${u.year}</em></li>`).join('')}
    </ul>
  </section>`;
}

export function viewPeople() {
  return `
  <section class="page-head">
    <h1>People</h1>
    <p class="lede">How many Indonesians there are, how long they live, how they learn and how they connect.</p>
  </section>
  <div class="grid kpis">
    ${kpi('Population', PEOPLE.population.value, 'Mid-year estimate', PEOPLE.population)}
    ${kpi('Density', PEOPLE.density.value, 'People per square kilometre', PEOPLE.density)}
    ${kpi('Median age', PEOPLE.medianAge.value, 'Half the population is younger', PEOPLE.medianAge)}
    ${kpi('Life expectancy', PEOPLE.lifeExpectancy.value, 'At birth, approximate', PEOPLE.lifeExpectancy)}
    ${kpi('Human Development Index', PEOPLE.hdi.value, PEOPLE.hdi.note, PEOPLE.hdi)}
    ${kpi('Internet users', PEOPLE.internetUsers.value, PEOPLE.internetUsers.note, PEOPLE.internetUsers)}
  </div>
  <section class="two-col">
    <article class="card">
      <h2>Urban Indonesia</h2>
      <p>About 59% of Indonesians live in urban areas — more than half the country, and rising with every census.</p>
      ${srcTag(PEOPLE.urban)}
      <h3>Connected Indonesia</h3>
      <p>221.6 million people used the internet in 2024 — 79.5% of the population.</p>
      ${srcTag(PEOPLE.internetUsers)}
    </article>
    <article class="card gauge-card">
      <h2>Internet use</h2>
      ${gauge(79.5, { label: 'of the population online', color: '#1f7a6d' })}
      <p>79.5% of Indonesians used the internet in 2024 (221.6 million people).</p>
      ${srcTag(PEOPLE.internetUsers)}
    </article>
  </section>`;
}

export function viewWork() {
  const rates = [
    { label: 'Unemployment', value: 4.76 },
    { label: 'Poverty', value: 8.57 },
  ];
  return `
  <section class="page-head">
    <h1>Work</h1>
    <p class="lede">Jobs, unemployment and poverty — who works, who is looking for work, and who lives below the poverty line.</p>
  </section>
  <div class="grid kpis">
    ${kpi('Labour force', WORK.labourForce.value, WORK.labourForce.note, WORK.labourForce)}
    ${kpi('Unemployment rate', WORK.unemployment.value, WORK.unemployment.note, WORK.unemployment)}
    ${kpi('Poverty rate', WORK.poverty.value, WORK.poverty.note, WORK.poverty)}
  </div>
  <article class="card">
    <h2>Unemployment and poverty, 2024</h2>
    <p class="note">Rates in percent. Unemployment is measured in August 2024; poverty in September 2024.</p>
    ${barChart(rates.map((r) => ({ label: r.label, value: r.value })), { unit: '%', color: '#0b2a4a' })}
    <p>About 1 in 21 people in the labour force was unemployed in August 2024, while about 1 in 12 Indonesians lived below the poverty line in September 2024.</p>
    ${srcTag({ source: 'BPS', year: 2024 })}
  </article>`;
}

export function viewRegions() {
  const islandRows = ISLAND_SHARES.map((i) => `<tr><td>${i.island}</td><td data-num="${i.share}">${i.share}%</td><td>${i.note || '—'}</td></tr>`).join('');
  const provinceCards = TOP_PROVINCES.map((p) => `<article class="kpi"><h3>${p.province}</h3><p class="big">${p.population.toFixed(1)} million</p><p class="sub">Island: ${p.island}</p>${srcTag(PROVINCE_SOURCE)}</article>`).join('');
  return `
  <section class="page-head">
    <h1>Regions</h1>
    <p class="lede">An archipelago of ${GEOGRAPHY.islands.value} islands across ${GEOGRAPHY.area.value}, divided into ${GEOGRAPHY.provinces.value} provinces. Most Indonesians live on Java.</p>
    ${srcTag({ source: 'BPS', year: 2024 })}
  </section>
  <div class="grid kpis">
    ${kpi('Land area', GEOGRAPHY.area.value, 'Across the archipelago', GEOGRAPHY.area)}
    ${kpi('Islands', GEOGRAPHY.islands.value, 'Named and unnamed', GEOGRAPHY.islands)}
    ${kpi('Provinces', GEOGRAPHY.provinces.value, GEOGRAPHY.provinces.note, GEOGRAPHY.provinces)}
    ${kpi('Capital', GEOGRAPHY.capital.value, GEOGRAPHY.capital.note, GEOGRAPHY.capital)}
  </div>
  <h2>Largest provinces</h2>
  <div class="grid kpis">${provinceCards}</div>
  <p class="note">Mid-2024 estimates, approximate, in millions. Source: BPS, 2024.</p>
  <article class="card">
    <h2>Population by island group</h2>
    <p class="note">Click a column heading to sort. Type in the search box to filter the table. Shares are approximate and rounded, so they may not add up to exactly 100%.</p>
    <label class="search-label" for="region-search">Search islands</label>
    <input id="region-search" type="search" placeholder="Type an island name, e.g. Java" autocomplete="off">
    <div class="table-wrap">
      <table id="island-table">
        <thead><tr>
          <th><button type="button" data-sort="0" data-type="text">Island group ▲▼</button></th>
          <th><button type="button" data-sort="1" data-type="num">Share of population ▲▼</button></th>
          <th><button type="button" data-sort="2" data-type="text">Note ▲▼</button></th>
        </tr></thead>
        <tbody>${islandRows}</tbody>
      </table>
    </div>
    <p id="region-count" class="note" aria-live="polite">Showing 7 of 7 island groups.</p>
    ${srcTag(ISLAND_SHARE_SOURCE)}
  </article>`;
}

export function viewSources() {
  return `
  <section class="page-head">
    <h1>Sources &amp; methodology</h1>
    <p class="lede">Every figure on this site comes from one of the sources below, and every figure shows its source and year where it appears.</p>
  </section>
  <article class="card">
    <h2>Sources</h2>
    <table class="plain">
      <thead><tr><th>Source</th><th>What it provides</th><th>Year</th></tr></thead>
      <tbody>
        ${SOURCES.map((s) => `<tr><td><strong>${s.name}</strong><br><span class="muted">${s.url}</span></td><td>${s.what}</td><td>${s.year}</td></tr>`).join('')}
      </tbody>
    </table>
  </article>
  <article class="card">
    <h2>Methodology &amp; notes</h2>
    <ul class="notes">
      <li>Figures are for 2024 unless a different year is shown next to the figure.</li>
      <li>Values marked “≈” or “approximate” are rounded as published; island population shares are rounded and may not add up to exactly 100%.</li>
      <li>GDP is shown in rupiah as published by BPS, with a US-dollar equivalent at Bank Indonesia rates.</li>
      <li>Unemployment is measured in August 2024 and poverty in September 2024, following BPS survey dates.</li>
      <li>Province populations are mid-2024 estimates for the three largest provinces only; other provinces are not listed because no figure is published here.</li>
      <li>This site is an independent presentation of public statistics. It is not affiliated with BPS, Bank Indonesia, the World Bank or APJII.</li>
    </ul>
    <p class="note">Last updated ${META.updated}.</p>
  </article>`;
}

export function viewEconomy() {
  const growth = growthSeries();
  const infl = inflationSeries();
  return `
  <section class="page-head">
    <h1>The economy</h1>
    <p class="lede">Output, growth, prices and trade — the headline numbers for Indonesia’s economy in 2024.</p>
  </section>
  <div class="tabs" role="tablist" aria-label="Economy sections">
    <button type="button" class="tab active" data-tab="growth" role="tab">Growth</button>
    <button type="button" class="tab" data-tab="trade" role="tab">Trade</button>
    <button type="button" class="tab" data-tab="prices" role="tab">Prices</button>
  </div>
  <div class="tab-panel" data-panel="growth">
    <div class="grid kpis">
      ${kpi('GDP', ECONOMY.gdp.value, ECONOMY.gdp.usd, ECONOMY.gdp)}
      ${kpi('GDP per capita', ECONOMY.gdpPerCapita.value, ECONOMY.gdpPerCapita.usd, ECONOMY.gdpPerCapita)}
      ${kpi('Growth, 2024', '5.03%', 'Up from 5.05% in 2023', ECONOMY.growthSource)}
    </div>
    <article class="card">
      <h2>Real GDP growth, 2020–2024</h2>
      <div class="chart-toggle" role="group" aria-label="Growth chart type">
        <button type="button" class="toggle active" data-growth-chart="bar">Bars</button>
        <button type="button" class="toggle" data-growth-chart="line">Line</button>
      </div>
      <div id="growth-chart">${barChart(growth)}</div>
      ${srcTag(ECONOMY.growthSource)}
    </article>
  </div>
  <div class="tab-panel" data-panel="trade" hidden>
    <div class="grid kpis">
      ${kpi('Exports', ECONOMY.exports.value, 'Goods exported in 2024', ECONOMY.exports)}
      ${kpi('Imports', ECONOMY.imports.value, 'Goods imported in 2024', ECONOMY.imports)}
      ${kpi('Trade surplus', ECONOMY.surplus.value, 'Exports minus imports', ECONOMY.surplus)}
    </div>
    <article class="card">
      <h2>Trade in 2024</h2>
      <p>Indonesia exported US$264.7 billion of goods and imported US$233.7 billion, leaving a surplus of US$31.0 billion. Exports were about 13% larger than imports.</p>
      ${srcTag({ source: 'BPS', year: 2024 })}
      <h3>Exchange rate</h3>
      <p>The rupiah averaged ${ECONOMY.exchange.value} in December 2024 (approximate).</p>
      ${srcTag(ECONOMY.exchange)}
    </article>
  </div>
  <div class="tab-panel" data-panel="prices" hidden>
    <article class="card">
      <h2>Inflation, 2020–2024</h2>
      <p class="note">${ECONOMY.inflationNote} Inflation peaked at 5.51% in December 2022 and eased to 1.57% by December 2024.</p>
      <div class="chart-toggle" role="group" aria-label="Inflation chart type">
        <button type="button" class="toggle active" data-inflation-chart="line">Line</button>
        <button type="button" class="toggle" data-inflation-chart="bar">Bars</button>
      </div>
      <div id="inflation-chart">${lineChart(infl)}</div>
      ${srcTag(ECONOMY.inflationSource)}
    </article>
  </div>`;
}
