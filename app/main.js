// main.js — router and page controls for Indonesia in Numbers.
// Hash routes: #/ overview, #/economy, #/people, #/work, #/regions, #/sources.
// After each render, wireControls() attaches the controls on that page:
// chart-type toggles, economy tabs, island table sort and search.

import { viewOverview, viewEconomy, viewPeople, viewWork, viewRegions, viewSources } from './views.js';
import { barChart, lineChart } from './charts.js';
import { ECONOMY } from './data.js';

const app = document.getElementById('app');
const navLinks = Array.from(document.querySelectorAll('.nav a'));

const ROUTES = {
  '/': viewOverview,
  '/economy': viewEconomy,
  '/people': viewPeople,
  '/work': viewWork,
  '/regions': viewRegions,
  '/sources': viewSources,
};

function growthSeries() {
  return ECONOMY.growth.map((g) => ({ label: String(g.year), value: g.value }));
}

function inflationSeries() {
  return ECONOMY.inflation.map((g) => ({ label: String(g.year), value: g.value }));
}

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route]();
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#/, '');
    a.classList.toggle('active', target === route);
    if (target === route) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireControls();
  window.scrollTo(0, 0);
}

function setActive(group, button) {
  group.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
  button.classList.add('active');
}

function wireControls() {
  // Growth chart type toggle (Overview and Economy pages).
  document.querySelectorAll('[data-growth-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const box = document.getElementById('growth-chart');
      if (!box) return;
      setActive(btn.closest('.chart-toggle'), btn);
      box.innerHTML = btn.dataset.growthChart === 'line'
        ? lineChart(growthSeries())
        : barChart(growthSeries());
    });
  });

  // Inflation chart type toggle (Economy page, Prices tab).
  document.querySelectorAll('[data-inflation-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const box = document.getElementById('inflation-chart');
      if (!box) return;
      setActive(btn.closest('.chart-toggle'), btn);
      box.innerHTML = btn.dataset.inflationChart === 'bar'
        ? barChart(inflationSeries())
        : lineChart(inflationSeries());
    });
  });

  // Economy tabs: Growth / Trade / Prices.
  document.querySelectorAll('.tabs [data-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tabs [data-tab]').forEach((t) => {
        t.classList.toggle('active', t === tab);
      });
      document.querySelectorAll('.tab-panel').forEach((panel) => {
        panel.hidden = panel.dataset.panel !== tab.dataset.tab;
      });
    });
  });

  // Island table: sortable columns.
  const table = document.getElementById('island-table');
  if (table) {
    const tbody = table.querySelector('tbody');
    let direction = 1;
    table.querySelectorAll('[data-sort]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const col = Number(btn.dataset.sort);
        const type = btn.dataset.type;
        direction = -direction;
        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a, b) => {
          const av = a.cells[col].textContent.trim();
          const bv = b.cells[col].textContent.trim();
          if (type === 'num') return direction * (Number(a.cells[col].dataset.num) - Number(b.cells[col].dataset.num));
          return direction * av.localeCompare(bv);
        });
        rows.forEach((r) => tbody.appendChild(r));
      });
    });
  }

  // Island table: live search / filter.
  const search = document.getElementById('region-search');
  const count = document.getElementById('region-count');
  if (search && table) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      table.querySelectorAll('tbody tr').forEach((row) => {
        const hit = row.textContent.toLowerCase().includes(q);
        row.style.display = hit ? '' : 'none';
        if (hit) shown += 1;
      });
      const total = table.querySelectorAll('tbody tr').length;
      count.textContent = q
        ? `Showing ${shown} of ${total} island groups matching “${search.value.trim()}”.`
        : `Showing ${total} of ${total} island groups.`;
    });
  }
}

window.addEventListener('hashchange', render);
render();

