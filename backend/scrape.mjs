// Scrapes open settlements from classaction.org and upserts them into Supabase.
//
//   node backend/scrape.mjs --dry-run   print what was parsed, write nothing
//   SUPABASE_URL=... SUPABASE_SECRET_KEY=... node backend/scrape.mjs
//
// No dependencies: Node 22's fetch plus regexes over the page's settlement cards.

const SOURCE = 'https://www.classaction.org/settlements';
const dryRun = process.argv.includes('--dry-run');

const CATEGORIES = [
  ['Privacy', /privacy|data breach|biometric|tracking|wiretap|pixel|cookie|text message|robocall|unwanted call/i],
  ['False Ads', /false|misleading|deceptive|natural|label|marketing|advertis|made in usa|claims/i],
  ['Overbilling', /overcharg|fee|billing|pricing|price|charge|refund|subscription|auto-renew/i],
];

const html = await (await fetch(SOURCE, { headers: { 'User-Agent': 'MDBModeScraper/1.0' } })).text();
// Featured cards appear twice (featured strip + full list); keep the first, which knows it's featured.
const cards = html.split(/<div id="(?=[^>]*settlement-card)/).slice(1).map(parseCard).filter(Boolean);
const settlements = [...new Map(cards.reverse().map((s) => [s.id, s])).values()];

if (settlements.length === 0) throw new Error('Parsed 0 settlements; the page layout probably changed.');

if (dryRun) {
  console.log(JSON.stringify(settlements.slice(0, 3), null, 2));
  console.log(`Parsed ${settlements.length} settlements (dry run, nothing written).`);
} else {
  await upsert(settlements);
  console.log(`Upserted ${settlements.length} settlements.`);
}

function parseCard(card) {
  const id = card.slice(0, card.indexOf('"'));
  const link = card.match(/class="js-settlement-link db[^"]*" data-slug="[^"]*" data-name="([^"]*)"[^>]*>([^<]*)</);
  const href = card.match(/<a href="([^"]+)" class="js-settlement-link/);
  if (!id || !link || !href) return null;

  const name = decode(link[1]);
  const title = decode(link[2]).trim();
  const payout = field(card, /Payout<\/span>/) ?? 'Varies';
  const proof = field(card, /Required\?<\/span>/);

  return {
    id,
    brand: name.split(' - ')[0].trim(),
    title,
    payout,
    payout_max: maxDollars(payout),
    deadline: parseDate(field(card, /Deadline<\/span>/)),
    proof_required: proof === 'Yes' ? true : proof === 'No' ? false : null,
    category: CATEGORIES.find(([, pattern]) => pattern.test(title))?.[0] ?? 'Other',
    featured: card.includes('&bullet; Featured'),
    description: decode(card.match(/<p class="f6[^"]*">([\s\S]*?)<\/p>/)?.[1] ?? '').trim(),
    claim_url: href[1],
    image_url: imageUrl(card.match(/data-src="([^"]+)"/)?.[1]),
    scraped_at: new Date().toISOString(),
  };
}

// The value span right after a label like "Settlement <br>Payout</span>".
function field(card, label) {
  const match = card.match(new RegExp(label.source + String.raw`\s*<span[^>]*>([^<]*)</span>`));
  return match ? decode(match[1]).trim() : null;
}

// '11/16/26' → '2026-11-16'; anything else (N/A, Varies) → null.
function parseDate(text) {
  const match = text?.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2})$/);
  if (!match) return null;
  const [, month, day, year] = match;
  return `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

// '$5 - $10' → 10, 'Up to $6,000' → 6000, 'Varies' → null.
function maxDollars(text) {
  const amounts = [...text.matchAll(/\$([\d,]+(?:\.\d+)?)/g)].map((m) => Number(m[1].replace(/,/g, '')));
  return amounts.length ? Math.max(...amounts) : null;
}

function imageUrl(path) {
  if (!path) return null;
  return path.startsWith('http') ? path : new URL(path, SOURCE).href;
}

function decode(text) {
  const named = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ndash: '–', mdash: '—', bullet: '•' };
  return text
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&(\w+);/g, (entity, key) => named[key] ?? entity);
}

// Insert new settlements and refresh existing ones. claim_count and first_seen_at are
// left out so updates never reset them.
async function upsert(rows) {
  const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) throw new Error('Set SUPABASE_URL and SUPABASE_SECRET_KEY.');

  const response = await fetch(`${SUPABASE_URL}/rest/v1/settlements?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SECRET_KEY,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  });
  if (!response.ok) throw new Error(`Supabase upsert failed: ${response.status} ${await response.text()}`);
}
