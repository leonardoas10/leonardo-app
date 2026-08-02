import { writeFileSync } from 'node:fs';
import path from 'node:path';

import sharp from 'sharp';
import { rgbaToThumbHash, thumbHashToDataURL } from 'thumbhash';

import { SITE_IMAGE_FILES } from '../utils/images/site-images';

const OUTPUT_PATH = path.join(process.cwd(), 'utils/images/thumbhashes.json');

const BASE_URL =
    process.env.NEXT_PUBLIC_CLOUDFRONT_URL_IMAGES ??
    'https://assets.leonardoaranguren.com/images';

async function thumbhashFromUrl(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const { data, info } = await sharp(buffer)
        .resize(100, 100, { fit: 'inside' })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const hash = rgbaToThumbHash(info.width, info.height, data);

    return {
        hash: Buffer.from(hash).toString('base64'),
        blurDataURL: thumbHashToDataURL(hash),
    };
}

async function main() {
    const entries: Record<string, { hash: string; blurDataURL: string }> = {};

    for (const file of SITE_IMAGE_FILES) {
        const url = `${BASE_URL}/${file}`;
        entries[file] = await thumbhashFromUrl(url);
        console.log(`Generated thumbhash for ${file}`);
    }

    writeFileSync(OUTPUT_PATH, `${JSON.stringify(entries, null, 4)}\n`);
    console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
