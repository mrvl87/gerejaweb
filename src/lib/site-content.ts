import carousel from '../../content/site/carousel.json';
import pengaturan from '../../content/site/pengaturan.json';
import profilKetua from '../../content/site/profil-ketua.json';
import sejarah from '../../content/site/sejarah.json';
import statistik from '../../content/site/statistik.json';
import strukturOrganisasi from '../../content/site/struktur-organisasi.json';
import visiMisi from '../../content/site/visi-misi.json';
import type { MasaLiturgi } from '../config/liturgi.config';

export interface CarouselItem {
  gambar?: string;
  judul: string;
  subjudul: string;
}

export interface ProfilKetuaContent {
  foto?: string;
  jabatan: string;
  nama: string;
  subJudul: string;
  biografi: string;
  kutipan: string;
}

export interface StrukturOrganisasiItem {
  level: number;
  jabatan: string;
  nama: string;
  isMilestone?: boolean;
}

export interface SejarahItem {
  tahun: number;
  judul: string;
  narasi: string;
  namaKetua?: string;
  labelKetua?: string;
  isMilestone?: boolean;
}

export interface VisiMisiContent {
  visi: string;
  misi: string[];
}

export interface StatistikItem {
  label: string;
  angka: string;
  keterangan: string;
}

export interface PengaturanContent {
  masaLiturgi: MasaLiturgi;
}

export function getCarouselContent() {
  return (carousel as { items: CarouselItem[] }).items;
}

export function getPengaturanContent() {
  return pengaturan as PengaturanContent;
}

export function getProfilKetuaContent() {
  return profilKetua as ProfilKetuaContent;
}

export function getStrukturOrganisasiContent() {
  return (strukturOrganisasi as { items: StrukturOrganisasiItem[] }).items.sort(
    (left, right) => left.level - right.level
  );
}

export function getSejarahContent() {
  return [...(sejarah as { items: SejarahItem[] }).items].sort(
    (left, right) => left.tahun - right.tahun
  );
}

export function getVisiMisiContent() {
  return visiMisi as VisiMisiContent;
}

export function getStatistikContent() {
  return (statistik as { items: StatistikItem[] }).items;
}
