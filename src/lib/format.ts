export function formatTanggalIndonesia(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}
