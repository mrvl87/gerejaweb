import { collection, config, fields, singleton } from '@keystatic/core';
import { liturgiThemes } from './src/config/liturgi.config';

const defaultGithubRepo = 'mrvl87/gerejaweb' as const;
const githubRepoValue = process.env.KEYSTATIC_GITHUB_REPO;
const githubRepo =
  githubRepoValue && githubRepoValue.includes('/')
    ? (githubRepoValue as `${string}/${string}`)
    : defaultGithubRepo;
const toWebpFilename = (originalFilename: string) =>
  `${originalFilename.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]+/g, '-').toLowerCase()}.webp`;

// [CMS SCHEMA] Default ke GitHub repo produksi, masih bisa dioverride via env.
export default config({
  storage: {
    kind: 'github',
    repo: githubRepo,
  },
  singletons: {
    pengaturan: singleton({
      label: 'Pengaturan Umum',
      path: 'content/site/pengaturan',
      format: { data: 'json' },
      schema: {
        masaLiturgi: fields.select({
          label: 'Masa Liturgi',
          options: Object.entries(liturgiThemes).map(([value, theme]) => ({
            label: theme.label,
            value,
          })),
          defaultValue: 'biasa',
        }),
      },
    }),
    carousel: singleton({
      label: 'Carousel',
      path: 'content/site/carousel',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object(
            {
              gambar: fields.image({
                label: 'Gambar',
                directory: 'public/uploads/carousel',
                publicPath: '/uploads/carousel/',
                transformFilename: toWebpFilename,
              }),
              judul: fields.text({ label: 'Judul', validation: { isRequired: true } }),
              subjudul: fields.text({
                label: 'Subjudul',
                multiline: true,
                validation: { isRequired: true },
              }),
            },
            { label: 'Slide' }
          ),
          {
            label: 'Daftar Slide',
            itemLabel: (props) => props.fields.judul.value || 'Slide baru',
            validation: {
              length: {
                max: 5,
              },
            },
          }
        ),
      },
    }),
    profilKetua: singleton({
      label: 'Profil Ketua',
      path: 'content/site/profil-ketua',
      format: { data: 'json' },
      schema: {
        foto: fields.image({
          label: 'Foto',
          directory: 'public/uploads/profil',
          publicPath: '/uploads/profil/',
          transformFilename: toWebpFilename,
        }),
        jabatan: fields.text({ label: 'Jabatan', validation: { isRequired: true } }),
        nama: fields.text({ label: 'Nama', validation: { isRequired: true } }),
        subJudul: fields.text({ label: 'Subjudul', validation: { isRequired: true } }),
        biografi: fields.text({
          label: 'Biografi',
          multiline: true,
          validation: { isRequired: true },
        }),
        kutipan: fields.text({
          label: 'Kutipan',
          multiline: true,
          validation: { isRequired: true },
        }),
      },
    }),
    strukturOrganisasi: singleton({
      label: 'Struktur Organisasi',
      path: 'content/site/struktur-organisasi',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            level: fields.integer({
              label: 'Level',
              validation: { min: 1, max: 10 },
            }),
            jabatan: fields.text({ label: 'Jabatan', validation: { isRequired: true } }),
            nama: fields.text({ label: 'Nama', validation: { isRequired: true } }),
            isMilestone: fields.checkbox({
              label: 'Tandai aksen emas',
              defaultValue: false,
            }),
          }),
          {
            label: 'Daftar Struktur',
            itemLabel: (props) => props.fields.jabatan.value || 'Posisi baru',
          }
        ),
      },
    }),
    sejarah: singleton({
      label: 'Sejarah Gereja',
      path: 'content/site/sejarah',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            tahun: fields.integer({
              label: 'Tahun',
              validation: { min: 1800, max: 2100 },
            }),
            judul: fields.text({ label: 'Judul', validation: { isRequired: true } }),
            narasi: fields.text({
              label: 'Narasi',
              multiline: true,
              validation: { isRequired: true },
            }),
            namaKetua: fields.text({ label: 'Nama Ketua / Tokoh' }),
            labelKetua: fields.text({ label: 'Label Ketua / Tokoh' }),
            isMilestone: fields.checkbox({
              label: 'Tandai milestone',
              defaultValue: false,
            }),
          }),
          {
            label: 'Daftar Peristiwa',
            itemLabel: (props) => props.fields.judul.value || 'Peristiwa baru',
          }
        ),
      },
    }),
    visiMisi: singleton({
      label: 'Visi Misi',
      path: 'content/site/visi-misi',
      format: { data: 'json' },
      schema: {
        visi: fields.text({
          label: 'Visi',
          multiline: true,
          validation: { isRequired: true },
        }),
        misi: fields.array(fields.text({ label: 'Poin misi', validation: { isRequired: true } }), {
          label: 'Daftar Misi',
          itemLabel: (props) => props.value || 'Poin misi baru',
        }),
      },
    }),
    statistik: singleton({
      label: 'Statistik Jemaat',
      path: 'content/site/statistik',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            label: fields.text({ label: 'Label', validation: { isRequired: true } }),
            angka: fields.text({ label: 'Angka', validation: { isRequired: true } }),
            keterangan: fields.text({
              label: 'Keterangan',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Daftar Statistik',
            itemLabel: (props) => props.fields.label.value || 'Statistik baru',
          }
        ),
      },
    }),
  },
  collections: {
    blog: collection({
      label: 'Artikel Blog',
      path: 'content/blog/*',
      slugField: 'judul',
      columns: ['tanggal', 'penulis'],
      format: {
        contentField: 'konten',
      },
      schema: {
        judul: fields.slug({
          name: {
            label: 'Judul',
            description: 'Judul artikel',
          },
          slug: {
            label: 'Slug',
            description: 'URL artikel',
          },
        }),
        tanggal: fields.date({ label: 'Tanggal', validation: { isRequired: true } }),
        penulis: fields.text({ label: 'Penulis', validation: { isRequired: true } }),
        ringkasan: fields.text({
          label: 'Ringkasan',
          multiline: true,
          validation: { isRequired: true },
        }),
        gambarSampul: fields.image({
          label: 'Gambar Sampul',
          directory: 'public/uploads/blog',
          publicPath: '/uploads/blog/',
          transformFilename: toWebpFilename,
        }),
        konten: fields.markdoc({
          label: 'Konten',
          extension: 'md',
          options: {
            heading: [1, 2, 3],
            image: {
              directory: 'public/uploads/blog',
              publicPath: '/uploads/blog/',
              transformFilename: toWebpFilename,
            },
          },
        }),
      },
    }),
  },
});
