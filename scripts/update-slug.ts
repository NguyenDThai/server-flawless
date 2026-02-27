/* eslint-disable prefer-const */
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import slugify from 'slugify';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
  const products = await prisma.product.findMany();

  for (const product of products) {
    let baseSlug = slugify(product.name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    // kiểm tra slug đã tồn tại chưa
    while (true) {
      const existing = await prisma.product.findUnique({
        where: { slug },
      });

      if (!existing || existing.id === product.id) break;

      slug = `${baseSlug}-${count}`;
      count++;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { slug },
    });

    console.log(`Updated: ${product.name} -> ${slug}`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
