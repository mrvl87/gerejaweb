import carousel from '../../content/site/carousel.json';
import pengaturan from '../../content/site/pengaturan.json';
import profilKetua from '../../content/site/profil-ketua.json';
import sejarah from '../../content/site/sejarah.json';
import siteSettings from '../../content/site/site-settings.json';
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

export interface SiteNavLink {
  label: string;
  href: string;
}

export interface SitePublicText {
  menuLabel: string;
  skipToContent: string;
  heroBadge: string;
  profilEyebrow: string;
  strukturTitle: string;
  strukturEyebrow: string;
  sejarahTitle: string;
  sejarahEyebrow: string;
  visiTitle: string;
  misiTitle: string;
  visiEyebrow: string;
  statistikTitle: string;
  statistikEyebrow: string;
  footerTitle: string;
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  blogTitle: string;
  blogSubtitle: string;
  blogReadMore: string;
  blogBack: string;
  footerPrayer: string;
}

export interface SiteSettingsContent {
  namaGereja: string;
  tagline: string;
  alamat: string;
  telepon: string;
  email: string;
  siteUrl: string;
  description: string;
  navLinks: SiteNavLink[];
  publicText: SitePublicText;
}

export function getCarouselContent() {
  return (carousel as { items: CarouselItem[] }).items;
}

export function getPengaturanContent() {
  return pengaturan as PengaturanContent;
}

export function getSiteSettingsContent() {
  return siteSettings as SiteSettingsContent;
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
