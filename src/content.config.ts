import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/blog' }),
  schema: z.object({
    judul: z.string(),
    tanggal: z.coerce.date(),
    penulis: z.string(),
    ringkasan: z.string(),
    gambarSampul: z.string().optional(),
  }),
});

export const collections = { blog };
