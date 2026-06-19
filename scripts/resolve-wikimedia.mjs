/**
 * Resolves Wikimedia filenames to direct thumb URLs.
 * Run: node scripts/resolve-wikimedia.mjs
 */

const FILES = {
  cuneiform: "Sumerian_account_of_silver_for_the_govenor_(background_removed).png",
  pyramids: "Kheops-Pyramid.jpg",
  athensDemocracy: "The Acropolis of Athens viewed from the Hill of the Muses (14220794964).jpg",
  fallOfRome: "Thomas Couture - Les Romains de la Decadence.jpg",
  islamicGoldenAge: "Maqamat hariri.jpg",
  magnaCarta: "Magna Carta (British Library Cotton MS Augustus II.106).jpg",
  renaissance: "Sanzio 01.jpg",
  columbus: "Christopher Columbus3.jpg",
  americanRevolution: "Washington Crossing the Delaware by Emanuel Leutze, MMA-NYC, 1851.jpg",
  frenchRevolution: "Eugène Delacroix - Le 28 Juillet. La Liberté guidant le peuple.jpg",
  industrialRevolution: "Philip James de Loutherbourg - Coalbrookdale by Night - Google Art Project.jpg",
  ww1: "Cheshire Regiment trench Somme 1916.jpg",
  ww2: "Into the Jaws of Death 23-0455M edit.jpg",
  moonLanding: "Aldrin Apollo 11 original.jpg",
  cleopatra: "Kleopatra-VII.-Altes-Museum-Berlin1.jpg",
  napoleon: "Jacques-Louis David - The Emperor Napoleon in His Study at the Tuileries - Google Art Project.jpg",
  leonardo: "Francesco Melzi - Portrait of Leonardo - WGA14795.jpg",
  lincoln: "Abraham Lincoln O-77 matte collodion print.jpg",
  colosseum: "Colosseo 2020.jpg",
  greatWall: "The Great Wall of China at Jinshanling-edit.jpg",
  machuPicchu: "Machu Picchu, Peru.jpg",
  pyramidsGiza: "All Gizah Pyramids.jpg",
  egypt: "Egypt.Giza.Sphinx.01.jpg",
  romanSenate: "Maccari-Cicero.jpg",
  greekDemocracy: "Sanzio 01.jpg",
  blackDeath: "Pieter Bruegel the Elder - The Triumph of Death - WGA3393.jpg",
  crusades: "Conquest of Jerusalem (1099).jpg",
  holocaust: "Bundesarchiv B 285 Bild-04413, KZ Auschwitz, Einfahrt.jpg",
  decolonization: "Mahatma Gandhi, January 1931.jpg",
  daVinci: "Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg",
  silkRoad: "Caravane sur la Route de la soie - Atlas catalan.jpg",
  civilRights: "Martin Luther King Jr NYWTS.jpg",
  libraryShowcase: "Stiftsbibliothek St Gallen.jpg",
  parchmentMap: "1689 Mortier Map of Italy - Geographicus - Italia-mortier-1689.jpg",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function resolveThumb(filename, width = 1024) {
  const title = `File:${filename}`;
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&titles=" +
    encodeURIComponent(title) +
    `&prop=imageinfo&iiprop=thumburl&iiurlwidth=${width}&format=json`;

  const res = await fetch(api, {
    headers: { "User-Agent": "HistoryHomeroom/1.0 (image-resolve; contact@historyhomeroom.org)" },
  });
  const text = await res.text();
  if (!text.startsWith("{")) return null;
  const data = JSON.parse(text);
  const pages = data.query?.pages ?? {};
  const page = Object.values(pages)[0];
  if (!page || page.missing !== undefined) return null;
  return page.imageinfo?.[0]?.thumburl ?? null;
}

async function resolveRedirect(filename, width = 1024) {
  const path = filename.replace(/ /g, "_");
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${path}?width=${width}`;
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "HistoryHomeroom/1.0" },
  });
  if (!res.ok) return null;
  const ct = res.headers.get("content-type") ?? "";
  if (!ct.includes("image")) return null;
  return res.url;
}

const results = {};

for (const [key, file] of Object.entries(FILES)) {
  let url = await resolveThumb(file, 1024);
  if (!url) {
    await sleep(1500);
    url = await resolveRedirect(file, 1024);
  }
  results[key] = { file, url };
  console.log(`${url ? "OK" : "MISS"} ${key}: ${file}`);
  if (url) console.log(`     ${url}`);
  await sleep(1500);
}

console.log("\n--- JSON ---\n");
console.log(JSON.stringify(results, null, 2));
