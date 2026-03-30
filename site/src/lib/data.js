import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DATA_DIR = resolve(process.cwd(), '../data');

function parseCSV(filename) {
  const text = readFileSync(resolve(DATA_DIR, filename), 'utf8');
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1)
    .filter(l => l.trim())
    .map(line => {
      const values = [];
      let cur = '', inQ = false;
      for (const c of line) {
        if (c === '"') { inQ = !inQ; continue; }
        if (c === ',' && !inQ) { values.push(cur.trim()); cur = ''; continue; }
        cur += c;
      }
      values.push(cur.trim());
      return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']));
    });
}

export function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const players    = Object.fromEntries(parseCSV('players.csv').map(p => [p.player_id, p]));
export const editions   = parseCSV('editions.csv');
export const categories = parseCSV('categories.csv');
export const matches    = parseCSV('matches.csv');
export const entries    = parseCSV('entries.csv');
