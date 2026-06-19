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
    egypt: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Egypt.Giza.Sphinx.01.jpg",
    romanSenate:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari_-_3.jpg",
    greekDemocracy:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    blackDeath:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg/1280px-Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg",
    crusades: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Maqamat_hariri.jpg",
    ww1Causes:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Cheshire_Regiment_trench_Somme_1916.jpg/1280px-Cheshire_Regiment_trench_Somme_1916.jpg",
    holocaust:
      "https://upload.wikimedia.org/wikipedia/commons/2/26/Bundesarchiv_B_285_Bild-04413%2C_KZ_Auschwitz%2C_Einfahrt.jpg",
    decolonization:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Martin_Luther_King_Jr_NYWTS.jpg/1280px-Martin_Luther_King_Jr_NYWTS.jpg",
    daVinci:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1280px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    silkRoad:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Caravane_sur_la_Route_de_la_soie_-_Atlas_catalan.jpg/1280px-Caravane_sur_la_Route_de_la_soie_-_Atlas_catalan.jpg",
    spaceRace:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/1280px-Aldrin_Apollo_11_original.jpg",
    civilRights:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Martin_Luther_King_Jr_NYWTS.jpg/1280px-Martin_Luther_King_Jr_NYWTS.jpg",
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
  "Lakshay Rastogi": "50% 38%",
  "Ashton Andrade": "50% 28%",
};

export function getTutorImagePosition(name: string | undefined): string {
  if (!name) return "50% 20%";
  return TUTOR_IMAGE_POSITION[name] ?? "50% 20%";
}

/** True when the src is a remote http(s) URL (not a local /public path). */
export function isRemoteImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
