// ============================================================
// LITURGI CONFIG — Tambah masa liturgi baru di sini
// ============================================================

export const liturgiThemes = {
  biasa: {
    label: 'Masa Biasa (Trinitatis)',
    warnaPrimer: '#2D6A3F',
    warnaGelap: '#1a3f26',
    warnaTerang: '#e8f5ec',
  },
  adven: {
    label: 'Adven',
    warnaPrimer: '#6B3FA0',
    warnaGelap: '#3d1f6b',
    warnaTerang: '#f3edf9',
  },
  natal: {
    label: 'Natal & Epifani',
    warnaPrimer: '#2a5298',
    warnaGelap: '#1a3060',
    warnaTerang: '#e8eef8',
  },
  prapaska: {
    label: 'Prapaska',
    warnaPrimer: '#4a2060',
    warnaGelap: '#2a1040',
    warnaTerang: '#ede5f5',
  },
  paska: {
    label: 'Paska & Pentakosta',
    warnaPrimer: '#9B2020',
    warnaGelap: '#5c1010',
    warnaTerang: '#faeaea',
  },
} as const;

export type MasaLiturgi = keyof typeof liturgiThemes;
