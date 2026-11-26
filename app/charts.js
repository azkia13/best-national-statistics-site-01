// charts.js — hand-written SVG chart helpers. No chart library is used.
// Each function takes plain data and returns an SVG string. Colours come
// from the site palette: deep sea blue, gold, brick red, teal.

const NAVY = '#0b2a4a';
const GOLD = '#c9a227';
const BRICK = '#b3402a';
const TEAL = '#1f7a6d';
const GRID = '#d9dee4';
const INK = '#1c2733';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceMax(values) {
  const top = Math.max(...values.map((v) => Math.abs(v)), 1);
  return Math.ceil(top * 1.15 * 10) / 10;
}

// Vertical bar chart. `series` is [{ label, value }]; negative values
// draw below the zero line. `unit` is appended to value labels.
export function barChart(series, { unit = '%', height = 260, width = 640, color = TEAL, negativeColor = BRICK } = {}) {
  const padL = 44, padB = 30, padT = 26, padR = 10;
  const w = width, h = height;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const max = niceMax(series.map((s) => s.value));
  const min = Math.min(0, ...series.map((s) => s.value));
  const span = max - min;
  const y = (v) => padT + ((max - v) / span) * plotH;
  const zeroY = y(0);
  const slot = plotW / series.length;
  const barW = Math.min(64, slot * 0.58);
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart" class="chart">`;
  for (let g = 0; g <= 4; g++) {
    const gv = max - (span * g) / 4;
    const gy = y(gv);
    out += `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#5a6b7a">${gv.toFixed(1)}</text>`;
  }
  out += `<line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" stroke="${INK}" stroke-width="1.5"/>`;
  series.forEach((s, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(s.value, 0));
    const bottom = y(Math.min(s.value, 0));
    const fill = s.value < 0 ? negativeColor : color;
    out += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(1, bottom - top).toFixed(1)}" rx="3" fill="${fill}"/>`;
    out += `<text x="${cx}" y="${(top - 7).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${s.value.toFixed(2)}${unit}</text>`;
    out += `<text x="${cx}" y="${h - 8}" text-anchor="middle" font-size="12" fill="#5a6b7a">${esc(s.label)}</text>`;
  });
  out += '</svg>';
  return out;
}

// Horizontal bars for shares (0–100). `rows` is [{ label, value }].
export function shareBars(rows, { width = 640, barH = 26, gap = 14, color = NAVY, accent = GOLD } = {}) {
  const labelW = 170;
  const h = rows.length * (barH + gap) + 10;
  const trackW = width - labelW - 56;
  let out = `<svg viewBox="0 0 ${width} ${h}" role="img" aria-label="Share bars" class="chart">`;
  rows.forEach((r, i) => {
    const y = 6 + i * (barH + gap);
    const fillW = Math.max(2, (trackW * r.value) / 100);
    const fill = i === 0 ? accent : color;
    out += `<text x="0" y="${y + barH / 2 + 4}" font-size="13" fill="${INK}">${esc(r.label)}</text>`;
    out += `<rect x="${labelW}" y="${y}" width="${trackW}" height="${barH}" rx="4" fill="#eef1f4"/>`;
    out += `<rect x="${labelW}" y="${y}" width="${fillW.toFixed(1)}" height="${barH}" rx="4" fill="${fill}"/>`;
    out += `<text x="${labelW + trackW + 8}" y="${y + barH / 2 + 4}" font-size="13" font-weight="700" fill="${INK}">${r.value}%</text>`;
  });
  out += '</svg>';
  return out;
}

// Simple ring gauge: one value on a 0–100 scale, drawn as an SVG arc.
export function gauge(value, { size = 180, label = '', color = TEAL } = {}) {
  const r = (size - 24) / 2;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(100, value)) / 100;
  const cx = size / 2, cy = size / 2;
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(label)} ${value} percent" class="gauge">`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#eef1f4" stroke-width="18"/>`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="18" stroke-linecap="round" stroke-dasharray="${(c * frac).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`
    + `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="30" font-weight="800" fill="${INK}">${value}%</text>`
    + `<text x="${cx}" y="${cy + 22}" text-anchor="middle" font-size="12" fill="#5a6b7a">${esc(label)}</text></svg>`;
}
export function lineChart(series, { unit = '%', height = 260, width = 640, color = NAVY } = {}) {
  const padL = 44, padB = 30, padT = 26, padR = 16;
  const w = width, h = height;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const values = series.map((s) => s.value);
  const max = niceMax(values);
  const min = Math.min(0, ...values);
  const span = max - min;
  const x = (i) => padL + (plotW * i) / (series.length - 1);
  const y = (v) => padT + ((max - v) / span) * plotH;
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart" class="chart">`;
  for (let g = 0; g <= 4; g++) {
    const gv = max - (span * g) / 4;
    const gy = y(gv);
    out += `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    out += `<text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#5a6b7a">${gv.toFixed(1)}</text>`;
  }
  const points = series.map((s, i) => `${x(i).toFixed(1)},${y(s.value).toFixed(1)}`).join(' ');
  out += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.forEach((s, i) => {
    out += `<circle cx="${x(i).toFixed(1)}" cy="${y(s.value).toFixed(1)}" r="5" fill="#ffffff" stroke="${color}" stroke-width="2.5"/>`;
    out += `<text x="${x(i).toFixed(1)}" y="${(y(s.value) - 11).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${s.value.toFixed(2)}${unit}</text>`;
    out += `<text x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="12" fill="#5a6b7a">${esc(s.label)}</text>`;
  });
  out += '</svg>';
  return out;
}
