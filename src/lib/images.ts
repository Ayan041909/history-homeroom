/**
 * Curated image library for History Homeroom.
 *
 * Wikimedia images use direct upload.wikimedia.org thumb URLs (resolved and
 * verified). Redirect-based Special:FilePath links are unreliable in browsers.
 * Unsplash is used for team portraits.
 */

/** Stable Unsplash URL for stock portraits / emergency fallback. */
export function unsplash(photoId: string, width = 1280, height = 720): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop&q=80&auto=format`;
}

export const IMAGES = {
  // ───────────────────────── Historical Events ─────────────────────────
  events: {
    cuneiform:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Sumerian_account_of_silver_for_the_govenor_%28background_removed%29.png",
    pyramids:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/1280px-Kheops-Pyramid.jpg",
    athensDemocracy:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg/1280px-The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg",
    fallOfRome:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    islamicGoldenAge:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Maqamat_hariri.jpg",
    magnaCarta:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg/1280px-Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg",
    renaissance:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    columbus:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Christopher_Columbus3.jpg/1280px-Christopher_Columbus3.jpg",
    americanRevolution:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Washington_Crossing_the_Delaware_by_Emanuel_Leutze%2C_MMA-NYC%2C_1851.jpg/1280px-Washington_Crossing_the_Delaware_by_Emanuel_Leutze%2C_MMA-NYC%2C_1851.jpg",
    frenchRevolution:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
    industrialRevolution:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Cheshire_Regiment_trench_Somme_1916.jpg/1280px-Cheshire_Regiment_trench_Somme_1916.jpg",
    ww1:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Cheshire_Regiment_trench_Somme_1916.jpg/1280px-Cheshire_Regiment_trench_Somme_1916.jpg",
    ww2:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/1280px-Into_the_Jaws_of_Death_23-0455M_edit.jpg",
    moonLanding:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/1280px-Aldrin_Apollo_11_original.jpg",
  },

  // ───────────────────────── Historical Figures & Places ─────────────────────────
  figures: {
    cleopatra:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg",
    napoleon:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/1280px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
    leonardo:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Francesco_Melzi_-_Portrait_of_Leonardo_-_WGA14795.jpg",
    lincoln:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/1280px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
  },

  places: {
    colosseum:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    greatWall:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1280px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    machuPicchu:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/1280px-Machu_Picchu%2C_Peru.jpg",
    pyramidsGiza:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/1280px-All_Gizah_Pyramids.jpg",
  },

  // ───────────────────────── Lesson thumbnails ─────────────────────────
  lessons: {
    // 1 — Ancient Egypt: Great Sphinx at Giza
    egypt: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Egypt.Giza.Sphinx.01.jpg",
    // 2 — Roman Senate: Cicero denouncing Catiline, Cesare Maccari
    romanSenate:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari_-_3.jpg",
    // 3 — Greek Philosophy: School of Athens, Raphael
    greekDemocracy:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    // 4 — Black Death: Triumph of Death, Pieter Bruegel the Elder
    blackDeath:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Pieter_Bruegel_de_Oude_-_De_triomf_van_de_dood.jpg/1280px-Pieter_Bruegel_de_Oude_-_De_triomf_van_de_dood.jpg",
    // 5 — Crusades: Taking of Jerusalem by the Crusaders 1099, Émile Signol
    crusades:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Taking_of_Jerusalem_by_the_Crusaders%2C_15th_July_1099.jpg/1280px-Taking_of_Jerusalem_by_the_Crusaders%2C_15th_July_1099.jpg",
    // 6 — WWI Causes: British troops in Somme trenches, 1916
    ww1Causes:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Cheshire_Regiment_trench_Somme_1916.jpg/1280px-Cheshire_Regiment_trench_Somme_1916.jpg",
    // 7 — Da Vinci: Mona Lisa
    daVinci:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1280px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    // 8 — Silk Road: Catalan Atlas caravan illustration
    silkRoad:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Caravane_sur_la_Route_de_la_soie_-_Atlas_catalan.jpg/1280px-Caravane_sur_la_Route_de_la_soie_-_Atlas_catalan.jpg",
    // 9 — Space Race: Buzz Aldrin on the Moon, Apollo 11
    spaceRace:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/1280px-Aldrin_Apollo_11_original.jpg",
    // 11 — Holocaust: Auschwitz main entrance (Bundesarchiv photo)
    holocaust:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Bundesarchiv_B_285_Bild-04413%2C_KZ_Auschwitz%2C_Einfahrt.jpg/1280px-Bundesarchiv_B_285_Bild-04413%2C_KZ_Auschwitz%2C_Einfahrt.jpg",
    // 12 — Decolonization: Mahatma Gandhi, 1931 studio portrait
    decolonization:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/1280px-Mahatma-Gandhi%2C_studio%2C_1931.jpg",
    // 13 — Civil Rights: Martin Luther King Jr., 1964 (NYWTS)
    civilRights:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Martin_Luther_King_Jr_NYWTS.jpg/1280px-Martin_Luther_King_Jr_NYWTS.jpg",

    // ── Generated lesson thumbnails ──────────────────────────────────────
    // Mesopotamia: Sumerian cuneiform silver account tablet
    mesopotamia:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Sumerian_account_of_silver_for_the_govenor_%28background_removed%29.png",
    // Hammurabi's Code: Stele at the Louvre
    hammurabi:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Code_of_Hammurabi_%28Louvre_Sb_8%29-31434550325.jpg/1280px-Code_of_Hammurabi_%28Louvre_Sb_8%29-31434550325.jpg",
    // Persian Empire: Apadana Eastern Stairway, Persepolis
    persianEmpire:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Persepolis_Apadana_Eastern_Stairway.jpg/1280px-Persepolis_Apadana_Eastern_Stairway.jpg",
    // Sparta vs Athens: Leonidas at Thermopylae, Jacques-Louis David (1814)
    spartaAthens:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/L%C3%A9onidas_aux_Thermopyles_%28Jacques-Louis_David%29.PNG/1280px-L%C3%A9onidas_aux_Thermopyles_%28Jacques-Louis_David%29.PNG",
    // Alexander the Great: Alexander Mosaic from Pompeii
    alexanderGreat:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Alexander_the_Great_mosaic.jpg/1280px-Alexander_the_Great_mosaic.jpg",
    // Punic Wars: Hannibal and Scipio Africanus, 17th-century painting
    punicWars:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Hannibal_and_Scipio_Africanus.jpg/1280px-Hannibal_and_Scipio_Africanus.jpg",
    // Pompeii: Ruins with Mount Vesuvius in background
    pompeii:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ruins_of_Pompeii_with_the_Vesuvius.jpg/1280px-Ruins_of_Pompeii_with_the_Vesuvius.jpg",
  },

  // ───────────────────────── Hero showcase ─────────────────────────
  hero: {
    libraryShowcase:
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/Sumerian_account_of_silver_for_the_govenor_%28background_removed%29.png",
    parchmentMap:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Caravane_sur_la_Route_de_la_soie_-_Atlas_catalan.jpg/1280px-Caravane_sur_la_Route_de_la_soie_-_Atlas_catalan.jpg",
  },

  team: {
    ayan: "/team/ayan-gupta.png",
    lakshay: "/team/lakshay-rastogi.png",
    ashton: "/team/ashton-andrade.png",
    sarah:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
    james:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
    amara:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces",
    daniel:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces",
    priya:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
  },
} as const;

/** Lookup tutor portrait by display name (sessions, banners, etc.). */
export const TUTOR_PHOTOS_BY_NAME: Record<string, string> = {
  "Ayan Gupta": IMAGES.team.ayan,
  "Lakshay Rastogi": IMAGES.team.lakshay,
  "Ashton Andrade": IMAGES.team.ashton,
};

export function getTutorPhoto(name: string | undefined): string | undefined {
  if (!name) return undefined;
  return TUTOR_PHOTOS_BY_NAME[name];
}

/** Per-tutor crop anchor so faces stay centered in portrait cards. */
export const TUTOR_IMAGE_POSITION: Record<string, string> = {
  "Ayan Gupta": "50% 22%",
  "Lakshay Rastogi": "50% 22%",
  "Ashton Andrade": "50% 12%",
};

export function getTutorImagePosition(name: string | undefined): string {
  if (!name) return "50% 20%";
  return TUTOR_IMAGE_POSITION[name] ?? "50% 20%";
}

/** True when the src is a remote http(s) URL (not a local /public path). */
export function isRemoteImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
