import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const NES16 = [
  '#000000', '#1D2B53', '#7E2553', '#008751',
  '#AB5236', '#5F574F', '#C2C3C7', '#FFF1E8',
  '#FF004D', '#FFA300', '#FFEC27', '#00e436',
  '#29ADFF', '#83769C', '#FF77A8', '#FFCCAA',
].map(hexToRgb);

function hexToRgb(hex: string) {
  const h = hex.replace('#', '').trim();
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
  };
}

type Args = {
  force: boolean;
};

const FLEET_DIR = path.join('public', 'assets', 'fleet');
const OUT_DIR = path.join('public', 'assets', 'fleet-retro');
const BASE_SIZE = 128;
const SCALE = 2;

function parseArgs(argv: string[]): Args {
  const args: Args = { force: false };

  for (const a of argv) {
    if (a === '--force') {
      args.force = true;
    } else if (a === '--help' || a === '-h') {
      process.stdout.write('Usage: npm run generate:fleet-retro [-- --force]\n');
      process.exit(0);
    }
  }

  return args;
}

function slugify(s: string) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function nearestPaletteColor(
  r: number,
  g: number,
  b: number,
  cache: Map<number, { r: number; g: number; b: number }>
) {
  const key = (r << 16) | (g << 8) | b;
  const cached = cache.get(key);
  if (cached) return cached;

  let best = NES16[0];
  let bestD = Number.POSITIVE_INFINITY;

  for (const c of NES16) {
    const dr = r - c.r;
    const dg = g - c.g;
    const db = b - c.b;
    const d = dr * dr + dg * dg + db * db;
    if (d < bestD) {
      bestD = d;
      best = c;
      if (d === 0) break;
    }
  }

  cache.set(key, best);
  return best;
}

async function convertToRetro({
  inputPath,
  outPath,
  force,
}: {
  inputPath: string;
  outPath: string;
  force: boolean;
}) {
  if (!force && (await fileExists(outPath))) {
    return { skipped: true, outPath };
  }

  await fs.mkdir(path.dirname(outPath), { recursive: true });

  const source = sharp(inputPath)
    .rotate()
    .toColourspace('srgb')
    .resize(BASE_SIZE, BASE_SIZE, {
      fit: 'inside',
      withoutEnlargement: false,
    })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .ensureAlpha();

  const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });

  const cache = new Map<number, { r: number; g: number; b: number }>();
  const mapped = Buffer.alloc(BASE_SIZE * BASE_SIZE * 4);

  const offsetX = Math.floor((BASE_SIZE - info.width) / 2);
  const offsetY = Math.floor((BASE_SIZE - info.height) / 2);

  for (let y = 0; y < BASE_SIZE; y++) {
    for (let x = 0; x < BASE_SIZE; x++) {
      const destIdx = (y * BASE_SIZE + x) * 4;

      if (
        x >= offsetX &&
        x < offsetX + info.width &&
        y >= offsetY &&
        y < offsetY + info.height
      ) {
        const srcIdx = ((y - offsetY) * info.width + (x - offsetX)) * 4;
        const r = data[srcIdx];
        const g = data[srcIdx + 1];
        const b = data[srcIdx + 2];
        const a = data[srcIdx + 3];

        const c = nearestPaletteColor(r, g, b, cache);
        mapped[destIdx] = c.r;
        mapped[destIdx + 1] = c.g;
        mapped[destIdx + 2] = c.b;
        mapped[destIdx + 3] = a;
      } else {
        mapped[destIdx] = 39;
        mapped[destIdx + 1] = 43;
        mapped[destIdx + 2] = 83;
        mapped[destIdx + 3] = 255;
      }
    }
  }

  await sharp(mapped, { raw: { width: BASE_SIZE, height: BASE_SIZE, channels: 4 } })
    .resize(BASE_SIZE * SCALE, BASE_SIZE * SCALE, { kernel: sharp.kernel.nearest })
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toFile(outPath);

  return { skipped: false, outPath };
}

async function listImages(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((n) => /\.(png|jpe?g|webp)$/i.test(n))
    .map((n) => path.join(dir, n))
    .sort();
}

async function main() {
  const { force } = parseArgs(process.argv.slice(2));

  const inputs = await listImages(FLEET_DIR);

  let ok = 0;
  let skipped = 0;

  for (const inputPath of inputs) {
    const base = path.basename(inputPath, path.extname(inputPath));
    const slug = slugify(base);
    const outPath = path.join(OUT_DIR, `${slug}.png`);

    const res = await convertToRetro({ inputPath, outPath, force });

    if (res.skipped) {
      skipped++;
      process.stdout.write(`SKIP ${slug}\n`);
    } else {
      ok++;
      process.stdout.write(`OK  ${slug} -> ${res.outPath}\n`);
    }
  }

  process.stdout.write(
    `\nDone. generated=${ok} skipped=${skipped} total=${inputs.length}\n`
  );
}

main().catch((err) => {
  process.stderr.write(`${err?.stack ?? String(err)}\n`);
  process.exitCode = 1;
});
