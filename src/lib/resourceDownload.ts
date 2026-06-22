/** Client-side resource download utility.
 *  Generates real educational content for each study resource and triggers
 *  a browser download using the Blob API — no server or PDF library needed.
 */

// ─── HTML shell ───────────────────────────────────────────────────────────────

function htmlDoc(title: string, typeLabel: string, subject: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} — History Homeroom</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Georgia',serif;background:#faf9f6;color:#1a1a1a;max-width:780px;margin:0 auto;padding:40px 32px 64px}
  header{border-bottom:3px solid #B8760A;padding-bottom:18px;margin-bottom:32px}
  .badge{display:inline-block;background:#B8760A;color:#fff;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:20px;margin-bottom:10px}
  .subject{font-size:12px;color:#888;margin-top:4px}
  h1{font-size:26px;font-weight:700;line-height:1.25;color:#111;margin-bottom:6px}
  h2{font-size:18px;font-weight:700;color:#B8760A;margin:32px 0 10px;padding-bottom:4px;border-bottom:1px solid #e8dcc8}
  h3{font-size:14px;font-weight:700;color:#333;margin:18px 0 6px}
  p{font-size:14px;line-height:1.75;color:#333;margin-bottom:12px}
  ul,ol{padding-left:22px;margin-bottom:12px}
  li{font-size:14px;line-height:1.7;color:#333;margin-bottom:4px}
  .key-box{background:#fffbf0;border:1px solid #e8dcc8;border-left:4px solid #B8760A;border-radius:6px;padding:14px 18px;margin:18px 0}
  .key-box strong{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#B8760A;margin-bottom:6px}
  table{width:100%;border-collapse:collapse;margin:16px 0;font-size:13px}
  th{background:#B8760A;color:#fff;padding:8px 12px;text-align:left}
  td{padding:7px 12px;border-bottom:1px solid #e8dcc8}
  tr:nth-child(even) td{background:#fdf6e8}
  .q-block{background:#f8f8f8;border-radius:8px;padding:12px 16px;margin-bottom:12px;border-left:3px solid #B8760A}
  .q-num{font-weight:700;color:#B8760A;font-size:13px}
  .options{list-style:none;padding:0;margin:6px 0 0}
  .options li{font-size:13px;padding:2px 0;color:#444}
  .answer{font-size:12px;color:#2a7a2a;font-weight:600;margin-top:4px}
  footer{margin-top:48px;padding-top:14px;border-top:1px solid #ddd;font-size:11px;color:#999;text-align:center}
  @media print{body{background:#fff}header{border-bottom-color:#000}}
</style>
</head>
<body>
<header>
  <span class="badge">${typeLabel}</span>
  <div class="subject">${subject}</div>
  <h1>${title}</h1>
  <div class="subject" style="margin-top:8px">History Homeroom &nbsp;·&nbsp; historyhomeroom.com</div>
</header>
${body}
<footer>© 2026 History Homeroom &nbsp;·&nbsp; For educational use only &nbsp;·&nbsp; historyhomeroom.com</footer>
</body>
</html>`;
}

// ─── Resource content map ─────────────────────────────────────────────────────

const CONTENT: Record<string, { body: string; filename: string; typeLabel: string }> = {

  // ── 1. Complete Guide to Ancient Egypt ───────────────────────────────────
  "1": {
    typeLabel: "Study Guide (PDF)",
    filename: "ancient-egypt-complete-guide.html",
    body: `
<h2>Overview</h2>
<p>Ancient Egypt endured for over three thousand years — from the first unification of Upper and Lower Egypt around 3100 BCE to the death of Cleopatra VII in 30 BCE. Few civilizations have combined longevity, complexity, and cultural brilliance in equal measure. This guide covers Egyptian dynasties, the role of the Nile, religion, daily life, writing, and architecture.</p>

<h2>1. The Nile: Foundation of Civilization</h2>
<p>Without the Nile, Egypt would be nothing but desert. Every summer, the river flooded its banks and deposited a layer of black, nutrient-rich silt across the narrow floodplain. Egyptians called this fertile strip <em>Kemet</em> (Black Land) and the surrounding desert <em>Deshret</em> (Red Land). The flood cycle — flooding in July, recession by October, planting in November, harvest by April — structured the entire agricultural calendar and, by extension, the rhythms of Egyptian society.</p>
<p>The Nile also served as a highway. Its current flows north toward the Mediterranean while prevailing winds blow south, meaning boats could sail upstream (south) by raising sails and drift downstream (north) with the current. This made trade and communication across Egypt's 700-mile length remarkably efficient.</p>

<h2>2. Dynasties and Historical Periods</h2>
<table>
<tr><th>Period</th><th>Approx. Dates</th><th>Key Features</th></tr>
<tr><td>Early Dynastic</td><td>3100–2686 BCE</td><td>Unification; Memphis as capital; hieroglyphics develop</td></tr>
<tr><td>Old Kingdom</td><td>2686–2181 BCE</td><td>Age of pyramids; pyramid texts; strong centralized pharaoh</td></tr>
<tr><td>First Intermediate Period</td><td>2181–2055 BCE</td><td>Political fragmentation; regional governors gain power</td></tr>
<tr><td>Middle Kingdom</td><td>2055–1650 BCE</td><td>Reunification; literature flourishes; expansion into Nubia</td></tr>
<tr><td>Second Intermediate Period</td><td>1650–1550 BCE</td><td>Hyksos invasion; horse-drawn chariots introduced</td></tr>
<tr><td>New Kingdom</td><td>1550–1069 BCE</td><td>Empire at greatest extent; Ramesses II; Valley of the Kings</td></tr>
<tr><td>Late Period</td><td>664–332 BCE</td><td>Assyrian and Persian conquests; foreign pharaohs</td></tr>
<tr><td>Ptolemaic Period</td><td>332–30 BCE</td><td>Greek rulers; Alexandria built; ends with Cleopatra VII</td></tr>
</table>

<h2>3. Religion and the Afterlife</h2>
<p>Egyptian religion was polytheistic with hundreds of deities, many depicted with human bodies and animal heads. The most important included Ra (sun god), Osiris (afterlife and resurrection), Isis (magic and motherhood), Horus (sky god and divine kingship), Anubis (mummification), and Thoth (wisdom and writing).</p>
<p>The pharaoh was not merely a political ruler — he was a living god, the earthly embodiment of Horus and, after death, Osiris. His principal duty was to maintain <em>Ma'at</em>: the cosmic principle of truth, justice, and harmony that prevented the universe from sliding into chaos.</p>
<p>Egyptians believed in life after death. If the correct rituals were performed and the heart of the deceased was judged lighter than the feather of Ma'at (in the Hall of Two Truths), the soul could live eternally in the <em>Field of Reeds</em>, a paradise mirroring Egypt. This belief drove enormous investment in tombs, mummification, <em>shabtis</em> (servant figurines), and texts like the <em>Book of the Dead</em>.</p>

<h2>4. Mummification</h2>
<p>Mummification preserved the body so the soul (Ka) could recognise it upon return. The process took 70 days:</p>
<ol>
<li>Remove internal organs; place in four canopic jars (lungs, liver, stomach, intestines). The heart remained in the body.</li>
<li>Remove the brain through the nostrils using a metal hook.</li>
<li>Pack the body in natron (natural salt) for 40 days to dehydrate it.</li>
<li>Stuff the cavity with linen, sawdust, and resins to restore shape.</li>
<li>Wrap the body in layers of linen bandages; place amulets between layers.</li>
<li>Place in a decorated coffin (or nested coffins for royalty) and seal in a tomb.</li>
</ol>

<h2>5. Architecture and Engineering</h2>
<p>The Great Pyramid of Giza (c. 2560 BCE), built for Pharaoh Khufu, originally stood at 481 feet — the tallest man-made structure for over 3,800 years. It contains approximately 2.3 million stone blocks averaging 2.5 tonnes each. Archaeological evidence shows it was built not by slaves but by organized teams of skilled workers who were paid, housed, and given medical care.</p>
<p>Egyptian temples were designed as earthly houses of the gods. The key components: a massive pylon gateway, an open courtyard, a hypostyle hall of columns, and an innermost sanctuary housing the god's statue. Only priests could enter the sanctuary; the public remained in the outer courts.</p>

<h2>6. Hieroglyphics and Writing</h2>
<p>Hieroglyphic writing developed around 3200 BCE using over 700 symbols representing sounds, words, and concepts. It was used for religious and monumental inscriptions. For everyday use, Egyptians developed faster scripts: Hieratic (cursive hieroglyphics) and later Demotic (even more simplified). Hieroglyphics remained unreadable after the decline of Egyptian civilization until 1822, when Jean-François Champollion deciphered the Rosetta Stone.</p>

<div class="key-box">
<strong>Key Figures</strong>
<ul>
<li><strong>Narmer/Menes (c. 3100 BCE)</strong> — traditionally credited with unifying Upper and Lower Egypt</li>
<li><strong>Khufu (c. 2589–2566 BCE)</strong> — builder of the Great Pyramid</li>
<li><strong>Hatshepsut (c. 1473–1458 BCE)</strong> — one of Egypt's few female pharaohs; expanded trade routes</li>
<li><strong>Akhenaten (c. 1353–1336 BCE)</strong> — introduced monotheism (worship of the Aten); later erased from records</li>
<li><strong>Ramesses II (c. 1279–1213 BCE)</strong> — Egypt's most celebrated pharaoh; prolific builder; Battle of Kadesh</li>
<li><strong>Cleopatra VII (69–30 BCE)</strong> — last active ruler of the Ptolemaic Kingdom; allied with Caesar and Antony</li>
</ul>
</div>

<h2>7. Legacy</h2>
<p>Egyptian achievements include: the first solar calendar (365 days), foundational mathematics (calculating pyramid volumes, area of circles), advanced medicine (the Edwin Smith Papyrus describes the human brain), and one of humanity's earliest writing systems. Greek philosophers including Plato reportedly studied in Egypt. Concepts of monotheism that emerged under Akhenaten may have influenced later Abrahamic religions. The 365-day calendar we use today is directly descended from the ancient Egyptian calendar.</p>

<h2>Review Questions</h2>
<div class="q-block"><span class="q-num">1.</span> What were the two key geographic zones Egyptians called Kemet and Deshret, and why did each matter?</div>
<div class="q-block"><span class="q-num">2.</span> Explain the concept of Ma'at. Why was it essential to the pharaoh's role?</div>
<div class="q-block"><span class="q-num">3.</span> Describe the mummification process and explain its religious significance.</div>
<div class="q-block"><span class="q-num">4.</span> How did the Rosetta Stone enable the decipherment of hieroglyphics?</div>
<div class="q-block"><span class="q-num">5.</span> Evaluate Egypt's legacy: which of its contributions do you consider most significant, and why?</div>
`
  },

  // ── 2. World War II: Causes & Consequences ───────────────────────────────
  "2": {
    typeLabel: "Study Guide (PDF)",
    filename: "world-war-2-causes-consequences.html",
    body: `
<h2>Overview</h2>
<p>World War II (1939–1945) was the deadliest conflict in human history, killing an estimated 70–85 million people — roughly 3% of the world's 1940 population. It reshaped political borders, ended European colonialism, launched the nuclear age, and established the international order we still inhabit. This guide covers the causes, major campaigns, the Holocaust, and the post-war world.</p>

<h2>1. Causes of World War II</h2>
<h3>The Legacy of Versailles (1919)</h3>
<p>The Treaty of Versailles imposed brutal terms on Germany: the "war guilt" clause (Article 231) assigned sole responsibility for WWI to Germany; reparations were set at 132 billion gold marks; Germany lost 13% of its territory including the industrial Rhineland; and its military was reduced to 100,000 men. Economic crisis, national humiliation, and resentment created fertile ground for extremist politics.</p>

<h3>Rise of Fascism</h3>
<p>Benito Mussolini took power in Italy in 1922, establishing the first fascist regime. In Germany, the Great Depression (1929) destroyed the Weimar Republic's credibility. Adolf Hitler and the Nazi Party exploited economic despair, national humiliation, and antisemitism to rise to power, with Hitler becoming Chancellor in January 1933 and Führer (dictator) by August 1934.</p>

<h3>Appeasement</h3>
<p>Britain and France adopted a policy of appeasement — yielding to Hitler's demands to avoid another catastrophic war. The Munich Agreement (September 1938) allowed Germany to annex Czechoslovakia's Sudetenland in exchange for Hitler's promise of no further territorial demands. Prime Minister Neville Chamberlain returned to London declaring "peace for our time." Within six months Hitler occupied all of Czechoslovakia. The invasion of Poland on September 1, 1939, finally triggered the British and French declarations of war.</p>

<h2>2. Major Campaigns</h2>
<table>
<tr><th>Campaign/Event</th><th>Date</th><th>Significance</th></tr>
<tr><td>Fall of France</td><td>May–June 1940</td><td>Germany overruns France in six weeks; Dunkirk evacuation</td></tr>
<tr><td>Battle of Britain</td><td>July–Oct 1940</td><td>RAF defeats Luftwaffe; first major German defeat</td></tr>
<tr><td>Operation Barbarossa</td><td>June 1941</td><td>Germany invades USSR; largest military operation in history</td></tr>
<tr><td>Battle of Stalingrad</td><td>Aug 1942–Feb 1943</td><td>Decisive Soviet victory; turning point on Eastern Front</td></tr>
<tr><td>Pearl Harbor</td><td>December 7, 1941</td><td>Japan attacks US; America enters the war</td></tr>
<tr><td>D-Day (Normandy)</td><td>June 6, 1944</td><td>Allied invasion of Western Europe; 156,000 troops land</td></tr>
<tr><td>Hiroshima & Nagasaki</td><td>August 1945</td><td>Atomic bombs dropped; Japan surrenders; nuclear age begins</td></tr>
</table>

<h2>3. The Holocaust</h2>
<p>The Holocaust was the systematic, state-sponsored genocide of six million Jews — two-thirds of European Jewry — and millions of others including Roma, disabled persons, political prisoners, and Soviet POWs. It developed in stages: legal discrimination (Nuremberg Laws, 1935), organized violence (Kristallnacht, 1938), mass shootings by Einsatzgruppen in the USSR from 1941, and the "Final Solution" coordinated at the Wannsee Conference (January 1942). Six dedicated extermination camps — Auschwitz-Birkenau, Treblinka, Sobibor, Belzec, Chelmno, Majdanek — used industrial methods to kill approximately 3 million people. Auschwitz-Birkenau alone killed over 1 million.</p>

<div class="key-box">
<strong>Key Statistics</strong>
<ul>
<li>Total dead (military + civilian): ~70–85 million</li>
<li>Soviet Union dead: ~27 million (largest national loss)</li>
<li>Jewish Holocaust victims: ~6 million</li>
<li>Total Holocaust victims: ~11 million</li>
<li>D-Day Allied troops: ~156,000 on June 6 alone</li>
<li>Hiroshima immediate deaths: ~70,000–80,000</li>
</ul>
</div>

<h2>4. Post-War Consequences</h2>
<h3>The United Nations (1945)</h3>
<p>Determined to prevent future world wars, 51 nations signed the UN Charter in San Francisco. The Security Council (with five permanent members: US, UK, France, USSR, China) was empowered to authorize military action. The General Assembly provided a forum for all nations. The Universal Declaration of Human Rights followed in 1948.</p>

<h3>The Cold War</h3>
<p>The wartime alliance between the US and USSR fractured immediately. By 1947, Europe was divided: Western democracies backed by the US Marshall Plan ($13 billion in reconstruction aid); Eastern Europe under Soviet-imposed communist governments. The Truman Doctrine committed the US to containing communism globally. The nuclear arms race began when the USSR tested its first atomic bomb in 1949.</p>

<h3>Decolonization</h3>
<p>The war fatally weakened European colonial powers. Britain granted independence to India and Pakistan (1947), followed by dozens of African and Asian nations through the 1950s–70s. The ideological contradiction of fighting for freedom against Nazi tyranny while denying it to colonial subjects became untenable.</p>

<h3>Nuremberg Trials (1945–46)</h3>
<p>22 senior Nazi leaders were tried by an international military tribunal. 12 were sentenced to death. The trials established the precedent that individuals — including heads of state — could be held personally accountable for crimes against humanity and war crimes. This principle underlies the modern International Criminal Court.</p>

<h2>Review Questions</h2>
<div class="q-block"><span class="q-num">1.</span> How did the Treaty of Versailles create conditions for Hitler's rise to power?</div>
<div class="q-block"><span class="q-num">2.</span> What was appeasement, and why did Britain and France pursue it? Was it a reasonable policy?</div>
<div class="q-block"><span class="q-num">3.</span> Explain how the Holocaust "developed gradually." What were the key stages?</div>
<div class="q-block"><span class="q-num">4.</span> Why was the Battle of Stalingrad a turning point in the war?</div>
<div class="q-block"><span class="q-num">5.</span> How did WWII reshape the international order? Name three specific post-war structures still in place today.</div>
`
  },

  // ── 3. The Renaissance Explained (video → lecture notes) ─────────────────
  "3": {
    typeLabel: "Study Guide (PDF)",
    filename: "renaissance-explained-lecture-notes.html",
    body: `
<p style="background:#fdf6e8;border:1px solid #e8dcc8;border-radius:6px;padding:12px 16px;font-size:13px;color:#666;margin-bottom:8px">
<strong>Note:</strong> These are the full lecture notes and script for the 48-minute video <em>"The Renaissance Explained."</em> Read alongside or after watching for maximum retention.
</p>

<h2>Introduction (0:00–4:00)</h2>
<p>The word "Renaissance" is French for "rebirth." It describes a cultural and intellectual movement that began in Italy around 1350 and spread across Europe through the 16th century, transforming art, science, philosophy, and politics. Understanding the Renaissance requires understanding what was being "reborn": the classical world of ancient Greece and Rome, whose texts, art, and values had never entirely disappeared but were now rediscovered with new intensity and applied to contemporary questions.</p>

<h2>1. Why Italy? (4:00–10:00)</h2>
<p>The Renaissance began in northern Italy — particularly Florence, Venice, and Milan — for several converging reasons:</p>
<ul>
<li><strong>Wealth:</strong> Italian city-states were Europe's commercial powerhouses, enriched by Mediterranean trade. Wealthy merchant families — above all the Medici of Florence — had the resources and appetite to patronize artists and scholars.</li>
<li><strong>Urban culture:</strong> Italy's cities were centres of education, debate, and competition. Civic pride drove investment in beautiful buildings, paintings, and public art.</li>
<li><strong>Access to classical texts:</strong> The fall of Constantinople (1453) sent Greek scholars and manuscripts westward into Italy. The translation of Plato, Aristotle, and other classical authors sparked intellectual excitement.</li>
<li><strong>Political fragmentation:</strong> Unlike France or England, Italy had no single monarchy. Competing city-states created multiple centres of patronage, fostering diversity and innovation.</li>
</ul>

<h2>2. Renaissance Art: A Revolution in Seeing (10:00–22:00)</h2>
<h3>Linear Perspective</h3>
<p>The most technically transformative innovation was linear perspective, developed by Filippo Brunelleschi around 1413 and formalized by Leon Battista Alberti. For the first time, artists could create mathematically accurate illusions of three-dimensional space on a two-dimensional surface. All parallel lines converge at a single vanishing point on the horizon. This gave Renaissance painting a sense of depth and realism utterly unlike the flat, symbolic art of the Middle Ages.</p>

<h3>Humanism in Art</h3>
<p>Medieval art was overwhelmingly religious, depicting saints and biblical scenes as symbolic expressions of faith. Renaissance art retained religious subjects but transformed them: figures became anatomically accurate, emotionally expressive, and psychologically individual. The human body — studied through anatomy — became a subject of beauty in itself, echoing the classical Greek celebration of physical perfection.</p>

<h3>Key Artists and Works</h3>
<table>
<tr><th>Artist</th><th>Dates</th><th>Key Works</th><th>Innovation</th></tr>
<tr><td>Leonardo da Vinci</td><td>1452–1519</td><td>Mona Lisa, The Last Supper</td><td>Sfumato technique; anatomy; universal genius</td></tr>
<tr><td>Michelangelo</td><td>1475–1564</td><td>David, Sistine Chapel ceiling, Pietà</td><td>Idealized human form; emotional intensity</td></tr>
<tr><td>Raphael</td><td>1483–1520</td><td>School of Athens, Sistine Madonna</td><td>Harmonious composition; graceful idealism</td></tr>
<tr><td>Botticelli</td><td>1445–1510</td><td>Birth of Venus, Primavera</td><td>Classical mythology; poetic beauty</td></tr>
<tr><td>Donatello</td><td>1386–1466</td><td>David (bronze), Gattamelata</td><td>First freestanding nude sculpture since antiquity</td></tr>
</table>

<h2>3. Renaissance Science and the Birth of the Scientific Method (22:00–32:00)</h2>
<p>Medieval understanding of the natural world relied heavily on ancient authorities — above all Aristotle and Galen — interpreted through a Christian theological framework. Renaissance thinkers began to challenge this with direct observation and experimentation.</p>
<ul>
<li><strong>Leonardo da Vinci</strong> dissected over 30 human corpses, producing the most accurate anatomical drawings before the 17th century. His notebooks contain designs for helicopters, solar concentrators, and armoured vehicles.</li>
<li><strong>Nicolaus Copernicus</strong> (1473–1543) proposed the heliocentric model — that the Earth orbits the Sun, not vice versa — in his <em>De revolutionibus</em> (1543). This challenged both ancient authority (Ptolemy) and Church teaching.</li>
<li><strong>Galileo Galilei</strong> (1564–1642) used the telescope to confirm Copernican theory, observed the moons of Jupiter, and developed the law of falling bodies through experiment. His trial by the Inquisition (1633) for "vehement suspicion of heresy" dramatized the conflict between old authority and new empiricism.</li>
<li><strong>Andreas Vesalius</strong> (1514–1564) corrected centuries of anatomical errors in <em>De humani corporis fabrica</em> (1543), based on actual human dissection rather than Galen's animal-based models.</li>
</ul>

<h2>4. Renaissance Philosophy: Humanism (32:00–40:00)</h2>
<p>The Renaissance intellectual movement is called humanism — not because it rejected religion, but because it placed human beings, their dignity, potential, and achievements at the centre of inquiry. Humanist scholars studied classical Greek and Latin texts (the <em>studia humanitatis</em>: grammar, rhetoric, poetry, history, moral philosophy) to understand how to live virtuously and serve their communities.</p>
<p>Pico della Mirandola's <em>Oration on the Dignity of Man</em> (1486) is the movement's manifesto: God, Pico argued, gave humans uniquely unlimited capacity for self-creation. Unlike animals (fixed by instinct) or angels (fixed by nature), humans could choose to become whatever they wished. This optimism about human potential was genuinely revolutionary.</p>

<h2>5. The Spread of the Renaissance (40:00–45:00)</h2>
<p>The printing press (Gutenberg, c. 1450) was decisive. Ideas that had previously taken years to circulate as handwritten manuscripts now spread across Europe in months. Renaissance ideas reached northern Europe via scholars like Erasmus of Rotterdam (critical humanism), Thomas More (Utopia), and William Shakespeare (whose plays drew on classical themes and humanist psychology). The Northern Renaissance often blended Italian Renaissance learning with the intense religiosity of the Reformation.</p>

<h2>Conclusion (45:00–48:00)</h2>
<p>The Renaissance was not a sudden break with the Middle Ages but an intensification and reorientation of existing intellectual currents. Its legacy is the world we live in: the scientific method, the concept of individual rights, artistic realism, and the belief in human capacity for improvement. When we say someone has a "Renaissance mind" — curious, versatile, capable across many domains — we are invoking an ideal that Italians invented 650 years ago.</p>

<div class="key-box">
<strong>Key Terms to Know</strong>
<ul>
<li><strong>Sfumato</strong> — Leonardo's technique of blurring outlines to create atmosphere</li>
<li><strong>Chiaroscuro</strong> — the use of light and shadow for three-dimensional effect</li>
<li><strong>Patron</strong> — a wealthy individual or institution who commissions and pays for art</li>
<li><strong>Studia humanitatis</strong> — the Renaissance curriculum: grammar, rhetoric, poetry, history, moral philosophy</li>
<li><strong>Heliocentric</strong> — the model placing the Sun at the centre of the solar system</li>
</ul>
</div>
`
  },

  // ── 4. Ancient Rome: Rise and Fall (video → lecture notes) ───────────────
  "4": {
    typeLabel: "Study Guide (PDF)",
    filename: "ancient-rome-rise-and-fall-lecture-notes.html",
    body: `
<p style="background:#fdf6e8;border:1px solid #e8dcc8;border-radius:6px;padding:12px 16px;font-size:13px;color:#666;margin-bottom:8px">
<strong>Note:</strong> Full lecture notes for the 62-minute video <em>"Ancient Rome: Rise and Fall."</em>
</p>

<h2>Part 1 — The Roman Republic (509–27 BCE) (0:00–18:00)</h2>
<p>Roman tradition held that the city was founded in 753 BCE by Romulus and Remus, twin sons of the war god Mars, suckled by a she-wolf. The kingdom ended in 509 BCE when the last king, Tarquinius Superbus, was expelled after his son assaulted the noblewoman Lucretia. This event — historical or legendary — became Rome's founding myth of virtue over tyranny.</p>

<h3>Republican Government</h3>
<p>The Republic's core innovation was distributing power to prevent tyranny. Two consuls, elected annually, shared executive authority. Either could veto the other's decisions (from Latin <em>veto</em>: "I forbid"). The Senate — 300 patrician men serving for life — controlled foreign policy, the treasury, and the allocation of military commands. Popular assemblies passed laws and elected magistrates.</p>

<h3>Social Structure</h3>
<ul>
<li><strong>Patricians:</strong> aristocratic families who monopolised political power initially</li>
<li><strong>Plebeians:</strong> free Roman citizens; through the Struggle of the Orders (500–287 BCE) they won the right to hold consulships and had their rights codified in the Twelve Tables (c. 449 BCE)</li>
<li><strong>Clients and Patrons:</strong> a social network of mutual obligation underpinning Roman civic life</li>
<li><strong>Slaves:</strong> by the late Republic, perhaps 30–40% of Italy's population; enslaved through conquest</li>
</ul>

<h3>Expansion</h3>
<p>Rome expanded through a combination of military conquest and strategic incorporation: conquered peoples could eventually earn Roman citizenship, creating loyalty within the empire. By 264 BCE Rome controlled the Italian peninsula. The Punic Wars (264–146 BCE) against Carthage made Rome master of the western Mediterranean. By 133 BCE Rome controlled Spain, Greece, North Africa, and parts of Asia Minor.</p>

<h2>Part 2 — The Fall of the Republic (133–27 BCE) (18:00–30:00)</h2>
<p>Roman conquests created destabilising wealth inequality. Large slave-worked estates (<em>latifundia</em>) displaced small farmers who had been the Republic's backbone. Landless citizens flooded into Rome, creating a volatile urban poor easily manipulated by populist politicians.</p>

<h3>Civil Wars</h3>
<p>The Gracchi brothers (Tiberius, killed 133 BCE; Gaius, killed 121 BCE) attempted land reforms and were murdered by their political opponents — the first use of mass political violence in Rome's history. The precedent proved fatal. Generals including Marius, Sulla, Pompey, Crassus, and Julius Caesar used loyal armies as personal political weapons. Caesar's crossing of the Rubicon (49 BCE) with his army — illegal under Roman law — triggered the final civil war. His assassination (March 15, 44 BCE) sparked another. His adopted heir Octavian ultimately prevailed, becoming Augustus — the first Emperor — in 27 BCE.</p>

<h2>Part 3 — The Roman Empire at Its Height (27 BCE–180 CE) (30:00–44:00)</h2>
<h3>The Pax Romana</h3>
<p>The period from Augustus (27 BCE) to Marcus Aurelius (d. 180 CE) is called the <em>Pax Romana</em> — the Roman Peace. Population: ~70 million across three continents. The Mediterranean was a Roman lake (<em>Mare Nostrum</em> — "Our Sea"). A network of 250,000 miles of roads connected the empire, enabling trade, military movement, and communication. Roman law provided a common framework from Britain to Mesopotamia.</p>

<h3>Engineering and Architecture</h3>
<table>
<tr><th>Achievement</th><th>Description</th></tr>
<tr><td>Aqueducts</td><td>11 aqueducts supplied Rome with ~1 million cubic metres of water daily</td></tr>
<tr><td>The Colosseum</td><td>Held 50,000–80,000 spectators; built 70–80 CE; complex vaulted concrete construction</td></tr>
<tr><td>The Pantheon</td><td>Unreinforced concrete dome (43m diameter) still the largest of its kind</td></tr>
<tr><td>Roads</td><td>"All roads lead to Rome" — 250,000 miles of paved roads; some still in use</td></tr>
<tr><td>Concrete</td><td>Roman opus caementicium revolutionised construction; secret lost after Rome's fall</td></tr>
</table>

<h3>Roman Law</h3>
<p>Roman law introduced concepts still fundamental to modern legal systems: the presumption of innocence, the right to face one's accuser, and equality before the law (in principle). The Corpus Juris Civilis, compiled under Emperor Justinian (533 CE), formed the foundation of civil law in most of continental Europe and Latin America.</p>

<h2>Part 4 — Decline and Fall (180–476 CE) (44:00–57:00)</h2>
<h3>Political Instability</h3>
<p>After Marcus Aurelius, the Empire entered a crisis of legitimacy. The "Year of the Five Emperors" (193 CE) saw five different men claim the throne within a single year. Between 235 and 284 CE (the Crisis of the Third Century), there were over 50 emperors, most dying violently. The army became the real kingmaker.</p>

<h3>Economic Decline</h3>
<p>Constant warfare required constant military spending. To finance it, emperors debased the currency — reducing the silver content of coins — causing inflation. Trade contracted. The tax burden on the remaining productive population became crushing.</p>

<h3>Barbarian Invasions</h3>
<p>Germanic peoples — Visigoths, Vandals, Ostrogoths, Huns — had always pressed against Rome's northern borders. As the Empire weakened, it could no longer hold them back. The Visigoths sacked Rome in 410 CE — the first time in 800 years. In 476 CE, the Germanic chieftain Odoacer deposed the last Western Emperor, Romulus Augustulus, a teenager — the conventional end of the Western Roman Empire. The Eastern Empire (Byzantium) survived until 1453.</p>

<h3>Why Did Rome Fall? Key Theories</h3>
<ul>
<li><strong>Edward Gibbon (1776):</strong> Christianity undermined civic militarism; barbarian migration finished the job</li>
<li><strong>Henri Pirenne:</strong> Islamic conquests of the 7th–8th century, not 476, ended the ancient Mediterranean world</li>
<li><strong>Peter Heather:</strong> External barbarian pressure was the primary cause</li>
<li><strong>Bryan Ward-Perkins:</strong> Material decline was real and catastrophic; not just "transformation"</li>
<li><strong>Modern consensus:</strong> Multiple interacting factors — military overstretch, economic deterioration, political instability, climate change, pandemic (Antonine Plague, Plague of Justinian), and barbarian migration</li>
</ul>

<div class="key-box">
<strong>Key Dates Timeline</strong>
<ul>
<li>509 BCE — Republic founded</li>
<li>264–146 BCE — Punic Wars; Mediterranean dominance achieved</li>
<li>44 BCE — Julius Caesar assassinated</li>
<li>27 BCE — Augustus becomes first Emperor; Republic ends</li>
<li>27 BCE–180 CE — Pax Romana</li>
<li>410 CE — Visigoths sack Rome</li>
<li>476 CE — Western Empire falls</li>
<li>1453 CE — Eastern Empire (Byzantium) falls to Ottoman Turks</li>
</ul>
</div>
`
  },

  // ── 5. French Revolution Podcast Series (audio → transcript) ─────────────
  "5": {
    typeLabel: "Study Guide (PDF)",
    filename: "french-revolution-podcast-transcript.html",
    body: `
<p style="background:#fdf6e8;border:1px solid #e8dcc8;border-radius:6px;padding:12px 16px;font-size:13px;color:#666;margin-bottom:8px">
<strong>Note:</strong> Full episode transcripts for the six-episode audio series <em>"The French Revolution Podcast."</em> Total runtime: 3 hours 20 minutes.
</p>

<h2>Episode 1: France on the Eve of Revolution (33 min)</h2>
<p>France in 1789 was a society under extraordinary strain. Despite its cultural brilliance — French was the language of European diplomacy; Voltaire, Rousseau, and the Encyclopédistes had made Paris the intellectual capital of the Western world — the political and economic system was dangerously dysfunctional.</p>
<p>The Old Regime divided French society into three Estates: the First Estate (clergy, ~0.5% of the population, owned ~10% of land, paid no taxes), the Second Estate (nobility, ~1.5% of population, largely exempt from direct taxation), and the Third Estate (everyone else — 98% of the population — who bore virtually the entire tax burden). Within the Third Estate, a prosperous bourgeoisie of lawyers, merchants, and doctors read Enlightenment philosophy and grew frustrated by a system that excluded them from political power regardless of merit or wealth.</p>
<p>Financial crisis precipitated the breakdown. France had been effectively bankrupt since the 1780s, largely due to the cost of wars — including, ironically, funding the American Revolution. When Louis XVI attempted to tax the nobility, they refused and demanded the convening of the Estates-General, a representative assembly not met since 1614. The nobility expected to dominate it. They miscalculated fatally.</p>

<h2>Episode 2: The Bastille and Revolution Begins (35 min)</h2>
<p>The Estates-General opened in May 1789 in deadlock: the Third Estate insisted on voting by head (giving them an advantage with sympathetic clergy and nobles), while the first two estates demanded voting by order (each estate having one vote, easily outvoting the Third). After months of paralysis, the Third Estate declared itself a National Assembly on June 17 and swore the Tennis Court Oath (June 20) — pledging not to disperse until France had a constitution.</p>
<p>When Louis XVI seemed to be massing troops around Paris, Parisians panicked. On July 14, 1789, a crowd of 8,000 stormed the Bastille — a royal fortress and symbol of arbitrary royal power — and freed its seven prisoners. The governor's head was paraded on a pike. Though militarily trivial, the event was psychologically revolutionary: the people had taken direct action against royal authority. July 14 remains France's national day.</p>
<p>In August 1789, the National Assembly produced two foundational documents. On the night of August 4, in a surge of revolutionary enthusiasm, nobles voluntarily surrendered their feudal privileges — ending serfdom, church tithes, and noble exemptions from taxation overnight. The Declaration of the Rights of Man and Citizen (August 26) proclaimed: "The principle of sovereignty resides essentially in the nation... Liberty consists in the freedom to do everything which injures no one else." It remains one of history's great human rights documents.</p>

<h2>Episode 3: Constitutional Monarchy to Republic (38 min)</h2>
<p>Between 1789 and 1792, France attempted a constitutional monarchy. The National Assembly produced a constitution (1791) establishing a legislature and limiting royal power. Louis XVI nominally accepted it while secretly seeking foreign intervention to restore his power. His attempted flight to the Austrian border in June 1791 — the Flight to Varennes — was intercepted. The king was brought back to Paris in humiliation. His credibility as a constitutional monarch was destroyed.</p>
<p>War with Austria and Prussia (declared April 1792) radicalized the Revolution. Military disasters and fears of foreign invasion and domestic treachery inflamed Paris. On August 10, 1792, a revolutionary crowd stormed the Tuileries palace. The monarchy was suspended; Louis XVI was imprisoned. The First French Republic was proclaimed on September 21, 1792. Louis XVI was tried for treason, convicted, and guillotined on January 21, 1793.</p>

<h2>Episode 4: The Reign of Terror (37 min)</h2>
<p>With France at war with most of Europe, counter-revolutionary uprisings in the Vendée region, economic crisis, and suspected traitors everywhere, the Committee of Public Safety — headed by Maximilien Robespierre — assumed emergency powers. What followed was the Reign of Terror (September 1793 – July 1794): approximately 17,000 people were officially executed by guillotine; perhaps 40,000 more died in prison or were killed in summary executions.</p>
<p>The guillotine — adopted as a democratic form of execution, equal for all — became the Revolution's symbol. Among those executed: Marie Antoinette (October 1793), the scientist Antoine Lavoisier (May 1794), and eventually the moderate revolutionary Georges Danton, who had called for the Terror to end. Robespierre justified it with chilling logic: "Terror is nothing other than justice, prompt, severe, inflexible; it is therefore an emanation of virtue."</p>
<p>The Terror ended when Robespierre's colleagues, fearing they were next, had him arrested and guillotined on July 28, 1794 — 9 Thermidor in the Revolutionary calendar. The period that followed is called the Thermidorian Reaction.</p>

<h2>Episode 5: The Directory and the Road to Napoleon (28 min)</h2>
<p>The Thermidorian Reaction dismantled the Committee of Public Safety and tried to find a stable middle ground between royal restoration and radical Jacobinism. The Directory (1795–1799) — a five-man executive — was corrupt, ineffective, and dependent on military victories to maintain its popularity. The general providing those victories was Napoleon Bonaparte, a brilliant Corsican officer who had won stunning campaigns in Italy (1796–97) and Egypt (1798).</p>
<p>On November 9, 1799 (18 Brumaire), Napoleon staged a coup with the support of key politicians, ending the Directory. He justified it as saving the Revolution from both royalists and Jacobins. In reality, he was preparing to concentrate power in his own hands. Within five years he would be Emperor of the French.</p>

<h2>Episode 6: Napoleon and the Revolution's Legacy (29 min)</h2>
<p>Napoleon's relationship to the Revolution was complex: he consolidated many of its gains while destroying others. The Napoleonic Code (1804) — civil law based on equality before the law, separation of church and state, and protection of property — remains the basis of legal systems in France, Quebec, Louisiana, and many former French colonies. He abolished serfdom across conquered territories. Yet he restored slavery in French colonies (1802), ended freedom of the press, and eventually crowned himself Emperor in a ceremony that consciously mimicked Charlemagne.</p>
<p>Napoleon's final defeat at Waterloo (June 18, 1815) and his exile to St. Helena did not extinguish the Revolution's ideas. The concepts of popular sovereignty, nationalism, and civil equality that the Revolution unleashed spread across Europe and the world throughout the 19th century. The Revolutions of 1830 and 1848, Latin American independence movements, and nationalist uprisings from Germany to Greece all drew on the French Revolutionary tradition. In the words of the historian Lynn Hunt: "The Revolution did not end in 1799. In many ways, it never ended."</p>

<div class="key-box">
<strong>Episode Quick Reference</strong>
<table>
<tr><th>Episode</th><th>Topic</th><th>Key Events</th></tr>
<tr><td>1</td><td>Eve of Revolution</td><td>Old Regime, fiscal crisis, Estates-General</td></tr>
<tr><td>2</td><td>Revolution Begins</td><td>Tennis Court Oath, Bastille, Declaration of Rights</td></tr>
<tr><td>3</td><td>Constitutional Monarchy</td><td>Flight to Varennes, Republic declared, Louis XVI executed</td></tr>
<tr><td>4</td><td>Reign of Terror</td><td>Committee of Public Safety, ~17,000 executions, Robespierre's fall</td></tr>
<tr><td>5</td><td>Directory & Napoleon</td><td>Thermidorian Reaction, Directory, 18 Brumaire coup</td></tr>
<tr><td>6</td><td>Legacy</td><td>Napoleonic Code, exile, Revolution's global spread</td></tr>
</table>
</div>
`
  },

  // ── 6. Historical Maps Collection ────────────────────────────────────────
  "6": {
    typeLabel: "Study Guide (PDF)",
    filename: "historical-maps-collection.html",
    body: `
<p style="background:#fdf6e8;border:1px solid #e8dcc8;border-radius:6px;padding:12px 16px;font-size:13px;color:#666;margin-bottom:8px">
<strong>Note:</strong> This collection contains annotated descriptions and simplified reference maps for 30 key historical periods and themes, from 3000 BCE to 1900 CE.
</p>

<h2>Section A: Ancient World (3000 BCE – 500 CE)</h2>

<h3>Map 1 — Ancient Egypt and the Nile Valley (c. 3000 BCE)</h3>
<p><strong>Region:</strong> Northeastern Africa. The Nile flows north from its headwaters in central Africa to the Mediterranean delta. Upper Egypt occupies the narrow southern valley; Lower Egypt the broad northern delta. Key cities: Memphis (capital of the Old Kingdom, near the delta-valley junction), Thebes (New Kingdom capital, 600 km south), Amarna (Akhenaten's short-lived capital). The desert to east and west provided natural defensive barriers. Nubia (modern Sudan) lies to the south — Egypt's main rival and trading partner in gold, ivory, and enslaved people.</p>

<h3>Map 2 — Ancient Mesopotamia (c. 2500 BCE)</h3>
<p><strong>Region:</strong> Modern Iraq, between the Tigris and Euphrates rivers. The term "Fertile Crescent" describes the arc of arable land from the Persian Gulf through Mesopotamia and the Levant to Egypt. Key city-states: Ur, Uruk, Lagash, Kish (Sumer in the south); Babylon (central, later dominant); Assur and Nineveh (Assyria in the north). The rivers were unpredictable and could flood catastrophically — unlike the orderly Nile — shaping Mesopotamia's more anxious religious worldview.</p>

<h3>Map 3 — Ancient Greece and the Aegean (c. 500 BCE)</h3>
<p><strong>Region:</strong> The Greek peninsula, Aegean islands, and western Anatolia coast. Greece's mountainous geography fragmented the land into hundreds of independent city-states (<em>poleis</em>). Athens dominated Attica in the east; Sparta controlled the Peloponnese in the south. Greek colonies extended across the Mediterranean from southern France (Massalia/Marseille) to the Black Sea coast. The Persian Empire under Darius and Xerxes controlled Anatolia and threatened Greek independence in the Persian Wars (490–479 BCE).</p>

<h3>Map 4 — The Roman Empire at Its Height (c. 117 CE)</h3>
<p><strong>Region:</strong> Under Emperor Trajan the Empire reached its maximum extent: Britain in the northwest, Mesopotamia in the east, Egypt and North Africa in the south, Romania (Dacia) in the northeast. Total area: approximately 5 million km². The Rhine and Danube rivers formed the northern frontier (<em>limes</em>); Hadrian's Wall (122 CE) marked the northwestern limit in Britain. The Mediterranean — <em>Mare Nostrum</em> — was entirely ringed by Roman territory.</p>

<h3>Map 5 — The Silk Road Network (c. 100 CE)</h3>
<p><strong>Routes:</strong> The northern route ran from Chang'an (Xi'an) in China westward through Central Asia (Dunhuang, Kashgar, Samarkand) to Persia and Antioch. The southern route passed through India. Maritime routes connected Arabia, India, Southeast Asia, and China. Key chokepoints and trading cities: Kashgar (gateway between China and Central Asia), Samarkand (crossroads of Central Asian routes), Palmyra (Syrian desert trading city), Alexandria (Mediterranean terminus). Goods: silk (west-bound), glassware and silver (east-bound), spices (both directions).</p>

<h2>Section B: Medieval World (500–1500 CE)</h2>

<h3>Map 6 — The Arab/Islamic Conquests (632–750 CE)</h3>
<p>Within 100 years of Muhammad's death (632 CE), Islam spread from Arabia across the Middle East, Persia, North Africa, and into Spain (711 CE) and Central Asia. The Umayyad Caliphate at its peak (c. 750 CE) stretched from the Iberian Peninsula to the Indus Valley — the largest empire the world had yet seen. The advance into Western Europe was halted by Charles Martel at the Battle of Tours/Poitiers (732 CE). The Byzantine Empire survived in Anatolia and the Balkans.</p>

<h3>Map 7 — The Mongol Empire (c. 1280 CE)</h3>
<p>Under Genghis Khan and his successors, the Mongol Empire became the largest contiguous land empire in history: stretching from Korea and China to Poland and Persia (approximately 24 million km²). Four khanates: the Yuan Dynasty (China), the Ilkhanate (Persia), the Chagatai Khanate (Central Asia), and the Golden Horde (Russia/Eastern Europe). The <em>Pax Mongolica</em> (Mongol Peace) made travel across Eurasia unusually safe, facilitating trade but also enabling the spread of the Black Death (1347 onward).</p>

<h3>Map 8 — Medieval Trade Routes: Hanseatic League and Mediterranean (c. 1350)</h3>
<p>Two overlapping trade networks dominated medieval European commerce. The <strong>Hanseatic League</strong> — a confederation of northern European trading cities (Lubeck, Hamburg, Bruges, London, Riga) — controlled Baltic and North Sea trade in grain, timber, fish, and cloth. The <strong>Italian city-states</strong> (Venice, Genoa, Pisa) dominated Mediterranean trade, connecting European markets to the luxury goods of the Islamic world and beyond. The intersecting of these networks at Bruges and Antwerp created northern Europe's earliest financial markets.</p>

<h3>Map 9 — The Crusader States (c. 1135 CE)</h3>
<p>Following the First Crusade (1096–1099), Christians established four small states along the eastern Mediterranean coast: the County of Edessa (northern Syria/Iraq), the Principality of Antioch (coastal Syria), the County of Tripoli (modern Lebanon), and the Kingdom of Jerusalem (modern Israel/Palestine). These states were thinly populated, perpetually short of military manpower, and surrounded by Muslim powers. Edessa fell in 1144; Jerusalem fell to Saladin in 1187; the last crusader fortress (Acre) fell in 1291.</p>

<h2>Section C: Early Modern World (1400–1800 CE)</h2>

<h3>Map 10 — European Exploration and Colonial Claims (c. 1600)</h3>
<p>By 1600, Portugal had established a maritime empire along the African coast and into Asia (Goa, Macau, Malacca). Spain had claimed most of the Americas — Mesoamerica, South America, and parts of North America — following Columbus (1492) and Cortés (1521). The Treaty of Tordesillas (1494) divided the non-Christian world between Portugal and Spain along a meridian 370 leagues west of Cape Verde. Britain, France, and the Netherlands were beginning to challenge Iberian dominance in North America and the Caribbean.</p>

<h3>Map 11 — The Atlantic Slave Trade Routes (1600–1800)</h3>
<p>The triangular trade connected three continents. European ships carried manufactured goods (textiles, metal, weapons) to West African trading ports (Elmina, Ouidah, Bonny). Enslaved Africans were transported across the Middle Passage to the Americas (Brazil, the Caribbean, North America). American cash crops (sugar, tobacco, cotton) were shipped to Europe. An estimated 12.5 million enslaved Africans were transported; approximately 1.8 million died during the Middle Passage. The trade was centred on the Gulf of Guinea coast but also involved Senegambia and the Congo-Angola region.</p>

<h3>Map 12 — Napoleon's Europe (c. 1810)</h3>
<p>At its height, Napoleon directly controlled or was allied with most of continental Europe: the French Empire (including the Netherlands, Belgium, and much of Italy and Germany) was surrounded by satellite states (Kingdom of Italy, Kingdom of Naples, Kingdom of Westphalia, Grand Duchy of Warsaw) and allied nations (Austria, Prussia, Russia under the Treaty of Tilsit). Only Britain (protected by its navy), Portugal (behind British lines), and Sweden remained hostile. This hegemony collapsed after the Russian campaign (1812) and Napoleon's defeats at Leipzig (1813) and Waterloo (1815).</p>

<h2>Section D: Modern World (1800–1900 CE)</h2>

<h3>Map 13 — The Scramble for Africa (c. 1900)</h3>
<p>By 1900, European powers controlled approximately 90% of the African continent. Britain held the largest share (Egypt, Sudan, East Africa, South Africa, West Africa); France the second largest (North Africa, West Africa, Madagascar); Germany (East Africa/Tanganyika, Southwest Africa/Namibia, Cameroon, Togo); Belgium (the Congo); Italy (Libya, Eritrea, Somalia); Portugal (Angola, Mozambique). Only Ethiopia (after its victory over Italy at Adwa, 1896) and Liberia remained independent. Borders were drawn at the Berlin Conference (1884–85) without regard to existing African political communities, ethnic groups, or languages — creating divisions whose consequences persist today.</p>

<h3>Map 14 — World War I: The Western Front (1914–1918)</h3>
<p>The Western Front stretched approximately 700 km from the English Channel coast (near Nieuport, Belgium) south through France to the Swiss border near Basel. After the initial German advance was halted at the Marne (September 1914), the front stabilized into a system of trenches facing each other across a narrow no-man's-land. Key sectors: Ypres (Belgium — site of three major battles and poison gas attacks), the Somme (scene of the bloodiest single day in British military history, July 1, 1916: 57,470 British casualties), and Verdun (longest battle, Feb–Dec 1916: ~700,000 French and German casualties). The front barely moved more than 10 km in either direction between 1914 and the German Spring Offensive (1918).</p>

<h2>Quick Reference: 30 Maps at a Glance</h2>
<table>
<tr><th>#</th><th>Map Title</th><th>Date</th><th>Key Theme</th></tr>
<tr><td>1</td><td>Ancient Egypt & Nile Valley</td><td>c. 3000 BCE</td><td>Geography, dynasties</td></tr>
<tr><td>2</td><td>Ancient Mesopotamia</td><td>c. 2500 BCE</td><td>City-states, Fertile Crescent</td></tr>
<tr><td>3</td><td>Ancient Greece & Aegean</td><td>c. 500 BCE</td><td>City-states, Persian Wars</td></tr>
<tr><td>4</td><td>Roman Empire at Height</td><td>c. 117 CE</td><td>Imperial extent, frontiers</td></tr>
<tr><td>5</td><td>Silk Road Network</td><td>c. 100 CE</td><td>Trade routes, goods</td></tr>
<tr><td>6</td><td>Islamic Conquests</td><td>632–750 CE</td><td>Caliphate expansion</td></tr>
<tr><td>7</td><td>Mongol Empire</td><td>c. 1280 CE</td><td>Largest land empire</td></tr>
<tr><td>8</td><td>Medieval Trade Routes</td><td>c. 1350</td><td>Hanseatic League, Italian trade</td></tr>
<tr><td>9</td><td>Crusader States</td><td>c. 1135 CE</td><td>Holy Land politics</td></tr>
<tr><td>10</td><td>European Exploration</td><td>c. 1600</td><td>Colonial claims, Treaty of Tordesillas</td></tr>
<tr><td>11</td><td>Atlantic Slave Trade</td><td>1600–1800</td><td>Triangular trade routes</td></tr>
<tr><td>12</td><td>Napoleonic Europe</td><td>c. 1810</td><td>French Empire at peak</td></tr>
<tr><td>13</td><td>Scramble for Africa</td><td>c. 1900</td><td>Colonial partitions</td></tr>
<tr><td>14</td><td>WWI Western Front</td><td>1914–1918</td><td>Trench warfare, key battles</td></tr>
<tr><td>15–30</td><td>Additional Maps</td><td>Various</td><td>Alexander's conquests, Ottoman Empire, Cold War Europe, Decolonization 1945–75, and more — available in the full interactive map viewer at historyhomeroom.com</td></tr>
</table>
`
  },

  // ── 7. American Revolution Study Pack ────────────────────────────────────
  "7": {
    typeLabel: "Study Guide (PDF)",
    filename: "american-revolution-study-pack.html",
    body: `
<h2>Overview</h2>
<p>The American Revolution (1775–1783) transformed thirteen British colonies into the United States of America — the world's first nation explicitly founded on Enlightenment principles of natural rights, popular sovereignty, and limited government. This study pack includes a comprehensive timeline, key figures, major battles, primary source excerpts, and review questions.</p>

<h2>1. Causes: From Colonies to Crisis (1763–1775)</h2>
<p>The Seven Years' War (1756–1763) — called the French and Indian War in North America — left Britain deeply in debt. Parliament decided the colonies should help pay for the war that had protected them. A series of new taxes followed, each provoking stronger colonial resistance.</p>
<table>
<tr><th>Act</th><th>Year</th><th>Provision</th><th>Colonial Response</th></tr>
<tr><td>Proclamation of 1763</td><td>1763</td><td>Banned colonial settlement west of Appalachians</td><td>Widely ignored; colonial resentment</td></tr>
<tr><td>Stamp Act</td><td>1765</td><td>Tax on all printed materials</td><td>"No taxation without representation"; stamp riots; repealed 1766</td></tr>
<tr><td>Townshend Acts</td><td>1767</td><td>Import duties on glass, lead, paint, tea</td><td>Colonial boycotts; largely repealed 1770</td></tr>
<tr><td>Tea Act</td><td>1773</td><td>East India Co. monopoly on tea</td><td>Boston Tea Party, December 16, 1773</td></tr>
<tr><td>Coercive/Intolerable Acts</td><td>1774</td><td>Punishment for Boston; closed port; suspended MA self-government</td><td>First Continental Congress; colonial solidarity</td></tr>
</table>

<p>The philosophical case for resistance was articulated by colonial thinkers drawing on John Locke's theory that governments derive their just powers from the consent of the governed and may be overthrown when they violate natural rights. Thomas Paine's <em>Common Sense</em> (January 1776) made this case in plain language accessible to ordinary colonists: "Society in every state is a blessing, but Government, even in its best state, is but a necessary evil."</p>

<h2>2. Key Figures</h2>
<table>
<tr><th>Figure</th><th>Role</th><th>Significance</th></tr>
<tr><td>George Washington</td><td>Commander-in-Chief of Continental Army</td><td>Military leadership; held army together through Valley Forge (1777–78); first President</td></tr>
<tr><td>Thomas Jefferson</td><td>Primary author of Declaration of Independence</td><td>Articulated philosophical case for independence; later 3rd President</td></tr>
<tr><td>Benjamin Franklin</td><td>Diplomat in France</td><td>Secured French alliance (1778), decisive to American victory</td></tr>
<tr><td>John Adams</td><td>Continental Congress leader</td><td>Championed independence; negotiated Treaty of Paris; 2nd President</td></tr>
<tr><td>Thomas Paine</td><td>Pamphleteer</td><td><em>Common Sense</em> (1776) convinced ordinary people that independence was necessary</td></tr>
<tr><td>Alexander Hamilton</td><td>Washington's aide; later Treasury Secretary</td><td>Designed U.S. financial system; co-authored The Federalist Papers</td></tr>
<tr><td>Marquis de Lafayette</td><td>French officer in Continental Army</td><td>Symbol of Franco-American alliance; crucial at Yorktown</td></tr>
<tr><td>King George III</td><td>British monarch</td><td>Refused to negotiate; declared colonies in rebellion; pushed moderates toward independence</td></tr>
</table>

<h2>3. The Declaration of Independence (July 4, 1776)</h2>
<p>The Declaration served two purposes: a philosophical statement of principles and a list of specific grievances against King George III. Its preamble is among the most influential political writing in history:</p>

<div class="key-box">
<strong>Primary Source — Declaration of Independence (Preamble)</strong>
<p style="font-style:italic;margin:8px 0 0">"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness. — That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed, — That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it, and to institute new Government."</p>
</div>

<p><strong>Key philosophical claims:</strong> (1) All people have natural, inalienable rights. (2) Government's purpose is to protect those rights. (3) Government's authority rests on the consent of the governed. (4) A government that systematically violates rights may be overthrown. Each claim was drawn directly from John Locke's <em>Two Treatises of Government</em> (1689).</p>

<h2>4. Major Battles Timeline</h2>
<table>
<tr><th>Battle</th><th>Date</th><th>Result</th><th>Significance</th></tr>
<tr><td>Lexington & Concord</td><td>April 19, 1775</td><td>Colonial militia vs. British regulars</td><td>"The shot heard round the world" — war begins</td></tr>
<tr><td>Bunker Hill</td><td>June 17, 1775</td><td>British tactical victory; heavy losses</td><td>Showed colonists could fight; boosted morale</td></tr>
<tr><td>Trenton</td><td>Dec 26, 1776</td><td>American victory</td><td>Washington's surprise attack on Hessians; saved the army</td></tr>
<tr><td>Saratoga</td><td>Sept–Oct 1777</td><td>American victory</td><td>Convinced France to formally ally with America (1778)</td></tr>
<tr><td>Valley Forge</td><td>Winter 1777–78</td><td>Encampment</td><td>Army nearly disintegrated; Baron von Steuben trained and professionalized Continental Army</td></tr>
<tr><td>Yorktown</td><td>Sept–Oct 1781</td><td>American/French victory</td><td>British surrender; effectively ended the war</td></tr>
</table>

<h2>5. The French Alliance</h2>
<p>Benjamin Franklin arrived in Paris in December 1776 and quickly became the most celebrated man in France — philosopher, scientist, and American frontier hero rolled into one. He played on French desire to humiliate Britain after the Seven Years' War defeat. The victory at Saratoga (October 1777) convinced French Foreign Minister Vergennes that the Americans could actually win. France formally allied with the United States in February 1778, providing troops, naval power, and loans. The French fleet's blockade of Yorktown harbour in 1781 was decisive — it prevented British evacuation or reinforcement of Cornwallis.</p>

<h2>6. Building the Republic</h2>
<div class="key-box">
<strong>Primary Source — Thomas Paine, Common Sense (1776)</strong>
<p style="font-style:italic;margin:8px 0 0">"The cause of America is in a great measure the cause of all mankind. Many circumstances have, and will arise, which are not local, but universal, and through which the principles of all Lovers of Mankind are affected."</p>
</div>
<p>The Articles of Confederation (1781) — the first US constitution — created a national government too weak to tax, draft soldiers, or enforce laws. Shays' Rebellion (1786–87), when indebted Massachusetts farmers took up arms, demonstrated the weakness of the system. The Constitutional Convention (Philadelphia, 1787) produced a new framework: a strong federal government of three branches with a federal structure balancing central and state power. The Bill of Rights (1791) added the first ten amendments guaranteeing individual freedoms.</p>

<h2>Review Questions</h2>
<div class="q-block"><span class="q-num">1.</span> What was the core colonial objection to British taxation? Why did colonists feel it was unconstitutional?</div>
<div class="q-block"><span class="q-num">2.</span> Explain the significance of the Battle of Saratoga — why did it matter beyond its immediate military result?</div>
<div class="q-block"><span class="q-num">3.</span> The Declaration proclaimed "all men are created equal" while many signers enslaved people. How do historians interpret this contradiction?</div>
<div class="q-block"><span class="q-num">4.</span> Why did the Articles of Confederation fail, and how did the Constitution address its weaknesses?</div>
<div class="q-block"><span class="q-num">5.</span> How did the American Revolution inspire later revolutions (French, Latin American)?</div>
`
  },

  // ── 8. Quiz Bank: Ancient Civilizations ──────────────────────────────────
  "8": {
    typeLabel: "Study Guide (PDF)",
    filename: "quiz-bank-ancient-civilizations.html",
    body: `
<p style="background:#fdf6e8;border:1px solid #e8dcc8;border-radius:6px;padding:12px 16px;font-size:13px;color:#666;margin-bottom:8px">
<strong>200 Questions</strong> covering Egypt, Greece, Rome, Mesopotamia, and the Indus Valley. Answers appear below each question. Use cover paper to self-test.
</p>

<h2>Part 1: Ancient Egypt (40 Questions)</h2>
<div class="q-block"><span class="q-num">E1.</span> What writing system did ancient Egyptians develop around 3200 BCE?<div class="answer">✓ Hieroglyphics</div></div>
<div class="q-block"><span class="q-num">E2.</span> What was the Egyptian term for the fertile black silt land along the Nile?<div class="answer">✓ Kemet</div></div>
<div class="q-block"><span class="q-num">E3.</span> Who traditionally unified Upper and Lower Egypt around 3100 BCE?<div class="answer">✓ Narmer (also known as Menes)</div></div>
<div class="q-block"><span class="q-num">E4.</span> In which period were the great pyramids at Giza built?<div class="answer">✓ Old Kingdom (c. 2686–2181 BCE)</div></div>
<div class="q-block"><span class="q-num">E5.</span> What Egyptian cosmic principle encompassed truth, justice, and harmony?<div class="answer">✓ Ma'at</div></div>
<div class="q-block"><span class="q-num">E6.</span> Name the Egyptian god of the afterlife and resurrection.<div class="answer">✓ Osiris</div></div>
<div class="q-block"><span class="q-num">E7.</span> What natural salt was used to dehydrate bodies during mummification?<div class="answer">✓ Natron</div></div>
<div class="q-block"><span class="q-num">E8.</span> Which pharaoh built the Great Pyramid of Giza (c. 2560 BCE)?<div class="answer">✓ Khufu (also called Cheops)</div></div>
<div class="q-block"><span class="q-num">E9.</span> Who deciphered hieroglyphics using the Rosetta Stone in 1822?<div class="answer">✓ Jean-François Champollion</div></div>
<div class="q-block"><span class="q-num">E10.</span> Which pharaoh introduced monotheistic worship of the Aten?<div class="answer">✓ Akhenaten (c. 1353–1336 BCE)</div></div>
<div class="q-block"><span class="q-num">E11.</span> What was the name of Egypt's most celebrated New Kingdom pharaoh, famous for his many building projects and the Battle of Kadesh?<div class="answer">✓ Ramesses II (Ramesses the Great)</div></div>
<div class="q-block"><span class="q-num">E12.</span> What was the purpose of canopic jars?<div class="answer">✓ To hold the internal organs (lungs, liver, stomach, intestines) removed during mummification</div></div>
<div class="q-block"><span class="q-num">E13.</span> Who was the last ruler of the Ptolemaic Kingdom of Egypt?<div class="answer">✓ Cleopatra VII (died 30 BCE)</div></div>
<div class="q-block"><span class="q-num">E14.</span> What guided a soul through the dangers of the afterlife in ancient Egyptian belief?<div class="answer">✓ The Book of the Dead (funerary texts)</div></div>
<div class="q-block"><span class="q-num">E15.</span> What was the Rosetta Stone, and why was it significant?<div class="answer">✓ A decree inscribed in hieroglyphics, Demotic, and Greek (196 BCE); the parallel texts allowed Champollion to decode hieroglyphics</div></div>
<div class="q-block"><span class="q-num">E16–E40.</span> <em>Additional questions cover: Egyptian social hierarchy, the role of priests, significance of the sphinx, Egypt's trading partners, the Valley of the Kings, women pharaohs (Hatshepsut, Nefertiti), the Hyksos invasion, Egyptian mathematics, medicine (Edwin Smith Papyrus), and the decline of Ptolemaic Egypt — available in the full digital quiz bank at historyhomeroom.com.</em></div>

<h2>Part 2: Ancient Greece (40 Questions)</h2>
<div class="q-block"><span class="q-num">G1.</span> Who introduced the first democratic reforms in Athens (507 BCE)?<div class="answer">✓ Cleisthenes</div></div>
<div class="q-block"><span class="q-num">G2.</span> What was the Ekklesia?<div class="answer">✓ The Athenian Assembly — the main democratic body where all male citizens could speak and vote</div></div>
<div class="q-block"><span class="q-num">G3.</span> What city-state was Athens' main rival in the Peloponnesian War?<div class="answer">✓ Sparta</div></div>
<div class="q-block"><span class="q-num">G4.</span> How was Socrates executed in 399 BCE?<div class="answer">✓ By drinking hemlock, after being convicted of impiety and corrupting youth</div></div>
<div class="q-block"><span class="q-num">G5.</span> What was the name of Plato's work outlining his ideal state governed by philosopher-kings?<div class="answer">✓ The Republic</div></div>
<div class="q-block"><span class="q-num">G6.</span> Which student of Plato went on to tutor Alexander the Great?<div class="answer">✓ Aristotle</div></div>
<div class="q-block"><span class="q-num">G7.</span> What was the Parthenon, and who built it?<div class="answer">✓ A temple to Athena on the Athenian Acropolis, built under Pericles, completed 432 BCE</div></div>
<div class="q-block"><span class="q-num">G8.</span> What does the Greek word "democracy" literally mean?<div class="answer">✓ Rule of the people (demos = people; kratos = rule/power)</div></div>
<div class="q-block"><span class="q-num">G9.</span> Who was excluded from participation in Athenian democracy?<div class="answer">✓ Women, enslaved people, and foreign residents (metics)</div></div>
<div class="q-block"><span class="q-num">G10.</span> What was the Peloponnesian War and when did it occur?<div class="answer">✓ A war between Athens and Sparta (and their allies), 431–404 BCE; Sparta ultimately won</div></div>
<div class="q-block"><span class="q-num">G11–G40.</span> <em>Additional questions cover: Alexander the Great's conquests, the Persian Wars (Marathon, Thermopylae, Salamis), Spartan society, Greek mythology, Olympic Games, the Iliad and Odyssey, Herodotus and Thucydides, Greek theatre, the Hellenistic Age, and the spread of Greek culture — available in the full digital quiz bank.</em></div>

<h2>Part 3: Ancient Rome (40 Questions)</h2>
<div class="q-block"><span class="q-num">R1.</span> In what year was the Roman Republic traditionally founded?<div class="answer">✓ 509 BCE</div></div>
<div class="q-block"><span class="q-num">R2.</span> What were the two chief magistrates of the Roman Republic called?<div class="answer">✓ Consuls (two elected annually)</div></div>
<div class="q-block"><span class="q-num">R3.</span> What was the Latin word veto, and how was it used in the Roman Republic?<div class="answer">✓ "I forbid" — either consul could veto the other's decisions, preventing any single magistrate accumulating unchecked power</div></div>
<div class="q-block"><span class="q-num">R4.</span> What was the Twelve Tables (c. 449 BCE)?<div class="answer">✓ Rome's first written legal code, inscribed on twelve bronze tablets; created during the Struggle of the Orders</div></div>
<div class="q-block"><span class="q-num">R5.</span> Who crossed the Rubicon in 49 BCE, triggering Roman civil war?<div class="answer">✓ Julius Caesar</div></div>
<div class="q-block"><span class="q-num">R6.</span> On what date was Julius Caesar assassinated?<div class="answer">✓ March 15, 44 BCE (the Ides of March)</div></div>
<div class="q-block"><span class="q-num">R7.</span> Who became Rome's first Emperor in 27 BCE?<div class="answer">✓ Octavian (Augustus Caesar)</div></div>
<div class="q-block"><span class="q-num">R8.</span> What was the Pax Romana and how long did it last?<div class="answer">✓ The "Roman Peace" — a period of relative stability under strong imperial rule, from Augustus (27 BCE) to Marcus Aurelius (d. 180 CE); approximately 200 years</div></div>
<div class="q-block"><span class="q-num">R9.</span> What was the Colosseum, and how many spectators could it hold?<div class="answer">✓ An amphitheatre in Rome (completed c. 80 CE) for gladiatorial contests, holding 50,000–80,000 spectators</div></div>
<div class="q-block"><span class="q-num">R10.</span> In what year did the Western Roman Empire officially fall?<div class="answer">✓ 476 CE, when Odoacer deposed the last Western Emperor, Romulus Augustulus</div></div>
<div class="q-block"><span class="q-num">R11–R40.</span> <em>Additional questions cover: the Punic Wars, Roman engineering (aqueducts, roads), Roman law's influence on modern legal systems, Roman religion, the spread of Christianity, Constantine, the division of the Empire, Hadrian's Wall, Roman social classes, and the Byzantine Empire — available in the full digital quiz bank.</em></div>

<h2>Part 4: Ancient Mesopotamia (40 Questions)</h2>
<div class="q-block"><span class="q-num">M1.</span> Between which two rivers did Mesopotamian civilization develop?<div class="answer">✓ The Tigris and Euphrates (in modern Iraq)</div></div>
<div class="q-block"><span class="q-num">M2.</span> What was the world's first writing system, developed in Mesopotamia around 3400 BCE?<div class="answer">✓ Cuneiform</div></div>
<div class="q-block"><span class="q-num">M3.</span> What Babylonian ruler created one of history's earliest written legal codes?<div class="answer">✓ Hammurabi (c. 1754 BCE) — Hammurabi's Code</div></div>
<div class="q-block"><span class="q-num">M4.</span> What was the Epic of Gilgamesh?<div class="answer">✓ One of the earliest known works of literature — an epic poem from ancient Mesopotamia featuring a great flood narrative and themes of mortality and heroism</div></div>
<div class="q-block"><span class="q-num">M5.</span> What were ziggurats?<div class="answer">✓ Massive stepped temple platforms built by Sumerians, Babylonians, and Assyrians as sacred spaces for worship</div></div>
<div class="q-block"><span class="q-num">M6.</span> What was the first Mesopotamian city-state civilization called?<div class="answer">✓ Sumer (in southern Mesopotamia, c. 4500–1900 BCE)</div></div>
<div class="q-block"><span class="q-num">M7–M40.</span> <em>Additional questions cover: Babylonian astronomy and mathematics, the Assyrian Empire, Nebuchadnezzar and the Neo-Babylonian Empire, the Persian conquest of Babylon, Mesopotamian religion, the Hanging Gardens of Babylon, and the legacy of cuneiform — available in the full digital quiz bank.</em></div>

<h2>Part 5: Indus Valley Civilization (40 Questions)</h2>
<div class="q-block"><span class="q-num">I1.</span> What was the Indus Valley (Harappan) civilization, and when did it flourish?<div class="answer">✓ A Bronze Age civilization in modern Pakistan and northwest India, flourishing c. 2600–1900 BCE; one of the world's first urban cultures</div></div>
<div class="q-block"><span class="q-num">I2.</span> Name the two largest known cities of the Indus Valley civilization.<div class="answer">✓ Mohenjo-daro and Harappa</div></div>
<div class="q-block"><span class="q-num">I3.</span> What was remarkable about the urban planning of Harappan cities?<div class="answer">✓ Sophisticated grid-plan streets, standardized baked brick construction, and advanced drainage and sewage systems — more advanced than contemporary Mesopotamia</div></div>
<div class="q-block"><span class="q-num">I4.</span> Has the Indus Valley script been deciphered?<div class="answer">✓ No — the Indus script remains undeciphered, which is why we know comparatively little about their political structure, religion, or language</div></div>
<div class="q-block"><span class="q-num">I5.</span> What are the leading theories about the decline of the Indus Valley civilization (c. 1900 BCE)?<div class="answer">✓ Climate change (drying of the Saraswati River), flooding, shifts in monsoon patterns, and possibly migration of Aryan peoples from the northwest</div></div>
<div class="q-block"><span class="q-num">I6–I40.</span> <em>Additional questions cover: Harappan trade with Mesopotamia, standardised weights and measures, the "Great Bath" at Mohenjo-daro, Harappan art and figurines, and the civilization's legacy in South Asian history — available in the full digital quiz bank.</em></div>
`
  },

  // ── 9. The Silk Road: Trade & Culture ────────────────────────────────────
  "9": {
    typeLabel: "Study Guide (PDF)",
    filename: "silk-road-maps-and-commentary.html",
    body: `
<h2>Introduction</h2>
<p>The Silk Road — a name coined by German geographer Ferdinand von Richthofen in 1877 — was not a single road but an interconnected network of overland and maritime trade routes linking China to the Mediterranean world across approximately 4,000 miles. Active from roughly 200 BCE to the 15th century CE, it was the ancient world's most important mechanism for the exchange not just of goods but of ideas, religions, technologies, and diseases.</p>

<h2>Map 1: The Overland Routes</h2>
<p><strong>Northern Route (Steppe Road):</strong> Ran from China's Yellow River region northwestward through Mongolia and the Central Asian steppes, crossing the Caspian Sea region toward the Black Sea and Eastern Europe. Used primarily by nomadic peoples and less important for long-distance luxury trade.</p>
<p><strong>Central/Main Route:</strong> The principal artery. From Chang'an (modern Xi'an, China) westward through the Gansu Corridor, crossing the Taklamakan Desert (via its northern and southern rim), through the Pamir Mountains, into Sogdiana (modern Uzbekistan) via Samarkand, then onward to Persia and the Levantine coast. This route was anchored by a series of oasis cities that provided water, food, and lodging for merchants and their caravans.</p>
<p><strong>Southern Route:</strong> Split from the main route at Dunhuang and ran through Afghanistan, into the Indian subcontinent and Southeast Asia. Important for Indian spices, cotton, and Buddhism's westward spread.</p>

<div class="key-box">
<strong>Key Oasis Cities on the Silk Road</strong>
<table>
<tr><th>City</th><th>Modern Location</th><th>Significance</th></tr>
<tr><td>Chang'an (Xi'an)</td><td>China</td><td>Eastern terminus; Tang dynasty capital; cosmopolitan city of 1 million by 700 CE</td></tr>
<tr><td>Dunhuang</td><td>China (Gansu)</td><td>Gateway to the Taklamakan Desert; famous for Mogao Caves and Buddhist art</td></tr>
<tr><td>Kashgar</td><td>China (Xinjiang)</td><td>Critical junction between northern and southern routes; meeting of Chinese, Tibetan, and Central Asian cultures</td></tr>
<tr><td>Samarkand</td><td>Uzbekistan</td><td>Greatest Silk Road city; hub of Sogdian merchants who dominated Central Asian trade; architectural wonders</td></tr>
<tr><td>Merv</td><td>Turkmenistan</td><td>Among the world's largest cities in the 12th century; devastated by Mongol conquest (1221)</td></tr>
<tr><td>Ctesiphon/Baghdad</td><td>Iraq</td><td>Sasanian and later Abbasid capital; major switching point between overland and maritime routes</td></tr>
<tr><td>Antioch/Palmyra</td><td>Syria</td><td>Western terminals of overland routes; connection to Mediterranean ports</td></tr>
<tr><td>Constantinople</td><td>Turkey</td><td>Byzantine capital; bridge between Asian land routes and European Mediterranean trade</td></tr>
</table>
</div>

<h2>Map 2: The Maritime Silk Road</h2>
<p>From roughly the 2nd century BCE, maritime routes increasingly competed with overland ones. Ships from Chinese and Southeast Asian ports sailed through the South China Sea, across the Indian Ocean (using monsoon winds), through the Persian Gulf and Red Sea to Arabian and East African ports, and from there overland or by sea to Egypt and the Mediterranean.</p>
<p><strong>Key maritime nodes:</strong> Guangzhou (Canton) and Quanzhou in China; Malacca (Malaysia) — the chokepoint controlling the Strait of Malacca; Calicut and Quilon on India's Malabar Coast; Hormuz (Persian Gulf); Aden (Red Sea); Kilwa (East Africa); Alexandria (Mediterranean). The maritime routes became increasingly dominant after the 10th century, eventually making overland routes largely obsolete.</p>

<h2>Map 3: What Traveled the Silk Road</h2>
<h3>East to West</h3>
<ul>
<li><strong>Silk:</strong> China closely guarded the secret of silk production (sericulture); a single pound of raw silk could be worth a pound of gold in Rome</li>
<li><strong>Porcelain (china):</strong> Chinese ceramics were prized across Eurasia; their production methods were not replicated in Europe until the 18th century</li>
<li><strong>Paper:</strong> Invented in China c. 105 CE; reached the Islamic world by the 8th century; transformed administration and intellectual life</li>
<li><strong>Gunpowder:</strong> Chinese invention, c. 9th century; reached the Islamic world by 1200s, Europe by the 13th century</li>
<li><strong>Printing:</strong> Woodblock printing from China via the Islamic world</li>
</ul>
<h3>West to East</h3>
<ul>
<li><strong>Glass:</strong> Roman glassblowing techniques were unknown in China; glass was more exotic there than silk was in Rome</li>
<li><strong>Gold and silver:</strong> Mediterranean coinage and bullion</li>
<li><strong>Wool and linen textiles</strong></li>
<li><strong>Horses:</strong> The "Heavenly Horses" of the Ferghana Valley were so prized by Han Chinese emperors that they went to war to obtain them (102 BCE)</li>
</ul>
<h3>Ideas, Religions, and Diseases</h3>
<ul>
<li><strong>Buddhism:</strong> spread from India to China (1st century CE), Korea (4th century), Japan (6th century) — the Silk Road's most transformative cultural transmission</li>
<li><strong>Islam:</strong> after the Arab conquests (7th century), Islam spread rapidly along existing Silk Road networks into Central Asia, South Asia, and East Africa</li>
<li><strong>Christianity and Manichaeism:</strong> traveled east via Nestorian Christian missionaries; found communities in China's Tang dynasty</li>
<li><strong>The Black Death:</strong> Yersinia pestis spread westward along the Silk Road from Central Asia, reaching Crimea by 1346 and Western Europe by 1347</li>
</ul>

<h2>Map 4: The Decline of the Silk Road</h2>
<p>The Silk Road never died abruptly — it transformed. The Mongol empire's fragmentation after 1260 destabilized overland routes. The Black Death devastated the populations that sustained caravan trade. The Ottoman conquest of Constantinople (1453) made overland access to Asian markets more difficult for Western Europeans. This motivated Portuguese and Spanish navigators to seek sea routes to Asia — Vasco da Gama reached India by sailing around Africa in 1498; Columbus, seeking the same route westward, encountered the Americas in 1492. The Age of Exploration was, in large part, a consequence of the Silk Road's disruption.</p>

<div class="key-box">
<strong>Key Facts at a Glance</strong>
<ul>
<li>Length: ~4,000 miles (overland); maritime routes extended several times further</li>
<li>Active period: c. 200 BCE – 1450 CE (over 1,600 years)</li>
<li>Peak era: Tang Dynasty China and Abbasid Caliphate, c. 600–900 CE</li>
<li>Most important trading people: Sogdians (from modern Uzbekistan), who controlled Central Asian routes and served as the "middlemen of the ancient world"</li>
<li>Modern equivalent: The Chinese Belt and Road Initiative (2013–present) explicitly names itself after the ancient Silk Road</li>
</ul>
</div>
`
  },

  // ── 10. Cold War: Flashpoints & Crises ───────────────────────────────────
  "10": {
    typeLabel: "Study Guide (PDF)",
    filename: "cold-war-flashpoints-lecture-notes.html",
    body: `
<p style="background:#fdf6e8;border:1px solid #e8dcc8;border-radius:6px;padding:12px 16px;font-size:13px;color:#666;margin-bottom:8px">
<strong>Note:</strong> Full lecture notes for the 55-minute video <em>"Cold War: Flashpoints & Crises."</em>
</p>

<h2>Introduction: The Cold War Framework (0:00–8:00)</h2>
<p>The Cold War (c. 1947–1991) was a sustained period of geopolitical tension between the United States and the Soviet Union — and their respective allies — that stopped just short of direct military conflict between the superpowers. The term "cold" distinguishes it from a "hot" war of direct military engagement. Instead, it was characterized by ideological competition (liberal democracy vs. communism), arms races, proxy wars, espionage, propaganda, and a constant nuclear shadow.</p>
<p>Its origins lay in the collapse of the wartime alliance. Despite fighting together against Nazi Germany, the US and USSR had fundamentally incompatible worldviews. By 1947, the former allies had divided Europe: Western democracies backed by the US Marshall Plan; Eastern Europe under Soviet-imposed communist governments. The Truman Doctrine (March 1947) committed the US to "support free peoples who are resisting attempted subjugation" anywhere in the world. The Cold War was truly global.</p>

<h2>1. The Korean War (1950–1953) (8:00–20:00)</h2>
<p>Korea had been divided at the 38th parallel after WWII: the communist North (backed by the USSR and later China) and the US-aligned South. On June 25, 1950, North Korean forces invaded the South with Soviet-supplied tanks. The UN Security Council (with the Soviet delegate boycotting) authorized military intervention; US General Douglas MacArthur commanded UN forces.</p>
<p>The war moved in dramatic phases. UN forces were pushed to a small perimeter around Pusan by August 1950. MacArthur's amphibious landing at Inchon (September 1950) turned the tide, pushing the North Korean army back across the 38th parallel and deep into North Korea. This brought China into the war: 300,000 Chinese "People's Volunteers" crossed the Yalu River in October 1950, pushing UN forces back south of Seoul. Three years of grinding trench warfare followed. An armistice was signed on July 27, 1953 — essentially restoring the pre-war border. The Korean War killed approximately 3–5 million people and remains technically unresolved (no peace treaty has been signed).</p>
<p><strong>Significance:</strong> Korea established that the US would fight limited wars to contain communism; that China was a major military power; and that nuclear weapons could not be used in every conflict. MacArthur was fired by Truman after publicly challenging civilian control of military policy — a landmark affirmation of civilian supremacy over the military.</p>

<h2>2. The Cuban Missile Crisis (October 1962) (20:00–33:00)</h2>
<p>Thirteen days in October 1962 brought the world closer to nuclear war than at any other moment in history. The crisis had three preconditions: Fidel Castro's communist revolution in Cuba (1959); the failed US-backed Bay of Pigs invasion (April 1961); and Soviet leader Nikita Khrushchev's decision to secretly install nuclear missiles in Cuba, 90 miles from Florida.</p>
<p>On October 16, 1962, US reconnaissance photographs confirmed missile installations under construction. President Kennedy faced a stark choice: accept nuclear missiles next door or risk nuclear war to remove them. The EXCOMM (Executive Committee of the National Security Council) debated options for six days: an air strike (risking Soviet retaliation), a naval blockade (less provocative but uncertain), or negotiation.</p>
<p>Kennedy chose a naval "quarantine" (blockade), announced on October 22 in a televised address to the nation. Soviet ships heading for Cuba slowed, then stopped, then turned back. Khrushchev proposed a deal: Soviet missiles removed from Cuba in exchange for a US pledge not to invade Cuba and a secret agreement to later remove US missiles from Turkey. Kennedy accepted. The crisis ended on October 28. The world had survived.</p>
<p><strong>Significance:</strong> The crisis led directly to the establishment of a direct "hotline" telephone connection between the White House and Kremlin, and to the Partial Nuclear Test Ban Treaty (1963). It demonstrated that both superpowers, when faced with actual nuclear conflict, would retreat from the brink.</p>

<h2>3. The Vietnam War (1955–1975) (33:00–46:00)</h2>
<p>Vietnam, like Korea, was divided after WWII: the communist North (under Ho Chi Minh) and the US-backed South. The Eisenhower administration provided aid to South Vietnam; Kennedy sent "advisers." Under Johnson, the Gulf of Tonkin Resolution (August 1964) — based on a disputed North Vietnamese attack on US ships — provided the legal basis for massive military escalation. By 1968, 536,000 US troops were in Vietnam.</p>
<p>The Tet Offensive (January 1968) — a massive North Vietnamese and Viet Cong surprise attack on over 100 South Vietnamese cities simultaneously — was militarily a failure for the communists but a psychological catastrophe for the US. Television images of fighting inside the US Embassy compound in Saigon shattered public confidence. Walter Cronkite, America's most trusted newscaster, declared the war a "stalemate." Johnson withdrew from the 1968 presidential race.</p>
<p>Nixon pursued "Vietnamization" — gradually withdrawing US troops while training South Vietnamese forces — and a negotiated settlement. The Paris Peace Accords (January 1973) ended direct US military involvement. Without American support, South Vietnam collapsed: Saigon fell to North Vietnamese forces on April 30, 1975.</p>
<p><strong>Significance:</strong> Vietnam killed approximately 58,000 Americans and 2–3 million Vietnamese. It permanently damaged American public trust in government (along with Watergate), produced the "Vietnam Syndrome" — deep reluctance to commit ground troops abroad — and demonstrated the limits of military superpower.</p>

<h2>4. The Arms Race and Nuclear Anxiety (46:00–52:00)</h2>
<p>The nuclear arms race proceeded in escalating steps. The US tested the first atomic bomb (July 1945) and used it against Japan (August 1945). The USSR tested its first atomic bomb (August 1949), four years earlier than the US had expected. The US tested the first hydrogen bomb (November 1952), yielding 450 times the Hiroshima bomb's power. The USSR tested its own H-bomb within nine months.</p>
<p>By the 1960s, both superpowers had thousands of nuclear warheads mounted on Intercontinental Ballistic Missiles (ICBMs). The doctrine of Mutually Assured Destruction (MAD) held that any nuclear first strike would trigger a retaliatory strike leaving both sides destroyed — making nuclear war "unwinnable" and therefore theoretically preventing it. The SALT I treaty (1972) and SALT II treaty (1979) attempted to cap the growth of nuclear arsenals.</p>

<h2>5. The Fall of the Berlin Wall (1989) (52:00–55:00)</h2>
<p>By the late 1980s, Soviet leader Mikhail Gorbachev's policies of <em>glasnost</em> (openness) and <em>perestroika</em> (restructuring) had loosened Soviet control over Eastern Europe. Mass pro-democracy protests spread across the Soviet bloc. On November 9, 1989, a confused East German official announced that citizens could cross the Berlin Wall freely — immediately. Crowds overwhelmed the checkpoints; jubilant Berliners tore down the Wall with hammers and pickaxes. Within two years, the Soviet Union had dissolved.</p>

<div class="key-box">
<strong>Cold War Timeline</strong>
<table>
<tr><th>Year</th><th>Event</th></tr>
<tr><td>1947</td><td>Truman Doctrine; Marshall Plan; Cold War officially begins</td></tr>
<tr><td>1949</td><td>USSR tests atomic bomb; NATO formed; China becomes communist</td></tr>
<tr><td>1950–53</td><td>Korean War</td></tr>
<tr><td>1957</td><td>Sputnik; Space Race begins</td></tr>
<tr><td>1961</td><td>Berlin Wall constructed; Bay of Pigs invasion</td></tr>
<tr><td>1962</td><td>Cuban Missile Crisis</td></tr>
<tr><td>1963–75</td><td>Vietnam War (major US involvement 1965–73)</td></tr>
<tr><td>1972</td><td>Nixon visits China; SALT I signed</td></tr>
<tr><td>1989</td><td>Berlin Wall falls; Eastern Europe democratizes</td></tr>
<tr><td>1991</td><td>Soviet Union dissolves; Cold War ends</td></tr>
</table>
</div>
`
  },

  // ── 11. Medieval Europe Audio Guide ──────────────────────────────────────
  "11": {
    typeLabel: "Study Guide (PDF)",
    filename: "medieval-europe-audio-guide-transcript.html",
    body: `
<p style="background:#fdf6e8;border:1px solid #e8dcc8;border-radius:6px;padding:12px 16px;font-size:13px;color:#666;margin-bottom:8px">
<strong>Note:</strong> Full transcript for the 2-hour 10-minute audio guide <em>"Medieval Europe: A Narrated Tour."</em> Five parts.
</p>

<h2>Part 1: Feudalism and the Social Order (26 min)</h2>
<p>Welcome to Medieval Europe — a world of castles, cathedrals, and communities bound together by chains of obligation and devotion. The period we call the Middle Ages runs roughly from the fall of the Western Roman Empire (476 CE) to the fall of Constantinople (1453 CE), though historians debate these boundaries. It was not a static "dark age" — it was a period of remarkable creativity and complexity that laid the foundations for the modern world.</p>

<p>At the heart of medieval society was the <strong>feudal system</strong> — a hierarchical arrangement of mutual obligation. At the apex sat the king, who theoretically owned all land. He granted land (a <em>fief</em>) to great lords — barons, earls, dukes — in exchange for military service and loyalty. These lords, in turn, granted portions to lesser knights, who pledged the same. At the base of the pyramid sat the peasants — the vast majority of the population — who worked the land in exchange for the lord's protection.</p>

<p>The ritual at the heart of this system was <strong>homage</strong>: a vassal knelt before his lord, placed his hands within the lord's hands, and swore an oath of fealty. This ceremony created a personal bond — legally binding and morally sacred. The lord was obligated to protect his vassal; the vassal to fight for and advise his lord. When these obligations broke down — as they frequently did — the result was warfare.</p>

<p>The great majority of medieval Europeans — perhaps 90% — were <strong>serfs</strong> or peasants tied to the land. A serf could not leave the manor without the lord's permission, could not marry without permission, and owed the lord a portion of all they produced. Life was governed by the agricultural cycle: planting in spring, maintaining in summer, harvesting in autumn, surviving winter. The typical peasant's diet was bread, pottage (vegetable stew), and occasional cheese or salted meat. Life expectancy at birth was perhaps 30–35 years, though those who survived childhood could live much longer.</p>

<h2>Part 2: The Power of the Medieval Church (28 min)</h2>
<p>In medieval Europe, the Church was not simply a religious institution — it was the most powerful organisation on the continent, touching virtually every aspect of life. There was no secular state as we understand it; the Church provided education, social welfare, record-keeping, and moral authority alongside its spiritual functions.</p>

<p>The Church's power rested on several foundations. First, <strong>spiritual monopoly</strong>: the Church controlled the sacraments — baptism, communion, marriage, last rites — without which a Christian could not be saved. The threat of excommunication (exclusion from the sacraments) or interdict (withdrawal of all sacraments from an entire region) was the ultimate political weapon. When Pope Gregory VII excommunicated Holy Roman Emperor Henry IV in 1076, Henry was forced to stand barefoot in the snow at Canossa for three days to beg forgiveness.</p>

<p>Second, <strong>intellectual monopoly</strong>: the Church ran virtually all schools and universities. The great medieval universities — Bologna (founded 1088), Paris (c. 1150), Oxford (c. 1167) — were ecclesiastical institutions. Theology was the "Queen of Sciences." The greatest medieval intellectual, Thomas Aquinas (1225–1274), devoted his life to reconciling Aristotle's philosophy with Christian theology in the <em>Summa Theologica</em>.</p>

<p>Third, <strong>economic power</strong>: the Church owned approximately one-third of the land in medieval Western Europe. Monasteries were economic engines — clearing forest, draining marshes, breeding improved livestock, and keeping meticulous records. The Cistercian monasteries of northern England were among the most efficient wool producers in Europe by the 13th century.</p>

<p>The Church was also riven with controversy. The <strong>Great Schism of 1054</strong> permanently split Christianity into Roman Catholicism (Western Europe) and Eastern Orthodoxy (Eastern Europe and the Byzantine world). The <strong>Investiture Controversy</strong> — the centuries-long dispute over whether popes or kings could appoint bishops — was arguably medieval Europe's defining political conflict. And the <strong>Avignon Papacy</strong> (1309–1377), when popes lived in French Avignon under French influence, severely damaged papal prestige, setting the stage for calls for reform that would eventually produce the Protestant Reformation.</p>

<h2>Part 3: The Crusades — Faith, War, and Commerce (32 min)</h2>
<p>In 1095, Pope Urban II called for Christian warriors to liberate Jerusalem from Muslim control. He promised spiritual rewards — specifically, the forgiveness of sins — to those who took up the cross. The crowd reportedly responded: <em>"Deus vult!"</em> — God wills it. What followed over the next two centuries was one of history's most complex entanglements of religion, politics, and commerce.</p>

<p>The <strong>First Crusade (1096–1099)</strong> was a military triumph and a moral disaster. A diverse force — French knights, German peasants, Italian merchants — trekked overland to the Middle East. They took Jerusalem on July 15, 1099. The sack that followed was brutal: most of the city's Muslim and Jewish inhabitants were massacred. Four Crusader states were established along the eastern Mediterranean coast, thinly populated and perpetually vulnerable.</p>

<p>The Muslim world united under <strong>Saladin</strong>, the Sultan of Egypt and Syria, who recaptured Jerusalem in 1187. His response to the city's recapture was deliberately contrasted with the 1099 massacre: he allowed Christians to ransom themselves and leave safely. The <strong>Third Crusade (1189–1192)</strong>, led by Richard I of England, failed to recapture Jerusalem but negotiated access for Christian pilgrims.</p>

<p>The <strong>Fourth Crusade (1202–1204)</strong> never reached the Holy Land. Financially indebted to Venice, the crusaders diverted to sack Christian Constantinople, establishing a Latin Empire and stripping the Byzantine capital of treasures. This catastrophic event permanently deepened the breach between Catholic and Orthodox Christianity and left Byzantium too weak to resist the eventual Ottoman conquest (1453).</p>

<p>The Crusades' legacy is mixed. They accelerated contact between Europe and the sophisticated Islamic world, bringing back Arabic-translated classical texts, mathematical advances (including "Arabic" numerals, originally Indian), and spices that transformed European diet and commerce. Italian city-states built commercial empires on Crusading trade routes. But they also produced massacres of Jewish communities in the Rhineland, centuries of Christian-Muslim hostility, and the permanent sack of a Christian city.</p>

<h2>Part 4: The Black Death and Social Transformation (28 min)</h2>
<p>In 1347, twelve Genoese ships docked at the Sicilian port of Messina. The sailors aboard were dying of a mysterious illness — swollen, black lumps (buboes) at the lymph nodes, black blotches from internal bleeding, fever, and delirium. Port authorities ordered the ships out of harbour, but it was too late. Within three years, the Black Death had swept through Europe, killing an estimated one-third of the continent's population — approximately 25 million people out of 75 million.</p>

<p>The impact was shattering. Whole villages were abandoned; mass graves replaced individual burials; the Church, overwhelmed and unable to explain or stop the carnage, lost irreplaceable prestige. The flagellant movement swept through Germany — bands of men publicly whipping themselves as penance. Jewish communities were massacred across Europe on the false accusation of poisoning wells.</p>

<p>Yet paradoxically, the catastrophe created significant improvements for survivors. With a third of the workforce dead, labor became scarce and enormously valuable. Peasants found themselves in a radically different bargaining position — lords who had once treated them as property now competed for their labor. Wages rose, dues fell, and serfdom began its long decline in Western Europe. The English Peasants' Revolt of 1381 and similar uprisings across Europe expressed the new assertiveness of a peasantry that had survived the worst and found itself indispensable.</p>

<h2>Part 5: The End of the Middle Ages (16 min)</h2>
<p>By the 15th century, the structures that had defined medieval Europe were straining under pressure. The Black Death had shaken feudalism. The Hundred Years' War (1337–1453) between England and France — punctuated by Joan of Arc's remarkable campaigns (1429–1430) — crystallized national identities that would replace the universal Christian community. Gutenberg's printing press (c. 1450) made books affordable, spreading knowledge beyond the Church's control. The fall of Constantinople (1453) sent Greek scholars and manuscripts westward, accelerating the Renaissance.</p>

<p>And in 1517, Martin Luther nailed his 95 Theses to a church door in Wittenberg, sparking the Protestant Reformation — the definitive end of Western Christendom's unity and, many historians argue, the true end of the Middle Ages.</p>

<div class="key-box">
<strong>Key Dates of Medieval Europe</strong>
<ul>
<li>476 CE — Fall of Western Roman Empire</li>
<li>800 CE — Charlemagne crowned Holy Roman Emperor</li>
<li>1054 — Great Schism: Catholic/Orthodox split</li>
<li>1066 — Norman Conquest of England</li>
<li>1095 — First Crusade called by Urban II</li>
<li>1215 — Magna Carta signed by King John</li>
<li>1347–51 — Black Death in Europe</li>
<li>1431 — Joan of Arc burned at the stake</li>
<li>1453 — Constantinople falls to Ottoman Turks</li>
<li>1517 — Luther's 95 Theses; Reformation begins</li>
</ul>
</div>
`
  },

  // ── 12. Quick Quiz: Modern World History ─────────────────────────────────
  "12": {
    typeLabel: "Study Guide (PDF)",
    filename: "quiz-modern-world-history.html",
    body: `
<p style="background:#fdf6e8;border:1px solid #e8dcc8;border-radius:6px;padding:12px 16px;font-size:13px;color:#666;margin-bottom:8px">
<strong>100 Questions</strong> covering Industrialization, World Wars, Decolonization, and the Cold War. Answers follow each question.
</p>

<h2>Section 1: The Industrial Revolution (20 Questions)</h2>
<div class="q-block"><span class="q-num">1.</span> Where did the Industrial Revolution begin, and approximately when?<div class="answer">✓ Britain, from the 1760s–1780s</div></div>
<div class="q-block"><span class="q-num">2.</span> What invention by James Watt (improved 1769) became the engine of industrialization?<div class="answer">✓ The steam engine</div></div>
<div class="q-block"><span class="q-num">3.</span> What term describes the movement of people from farms to factory cities?<div class="answer">✓ Urbanization</div></div>
<div class="q-block"><span class="q-num">4.</span> What economic system, championed by Adam Smith's "Wealth of Nations" (1776), argued for free markets?<div class="answer">✓ Capitalism (laissez-faire economics)</div></div>
<div class="q-block"><span class="q-num">5.</span> What did Karl Marx and Friedrich Engels argue in "The Communist Manifesto" (1848)?<div class="answer">✓ That history is driven by class struggle; workers (proletariat) would inevitably overthrow capitalist owners (bourgeoisie) and create a communist society</div></div>
<div class="q-block"><span class="q-num">6.</span> What new forms of transportation emerged during the Industrial Revolution?<div class="answer">✓ Steam railway locomotives (Stephenson's Rocket, 1829) and steamships</div></div>
<div class="q-block"><span class="q-num">7.</span> How did child labor in 19th-century factories differ from pre-industrial child work?<div class="answer">✓ Factory work was more dangerous, involved longer hours (12–16 hours/day) in physically hazardous conditions, and children had no legal protections until reform acts (British Factory Acts from 1833)</div></div>
<div class="q-block"><span class="q-num">8.</span> What was the Luddite movement?<div class="answer">✓ Early 19th-century British workers who destroyed textile machinery, fearing it would replace their skilled labor; became a symbol of resistance to technological change</div></div>
<div class="q-block"><span class="q-num">9.</span> Name two countries that industrialized later than Britain but caught up rapidly by 1900.<div class="answer">✓ Germany and the United States (also acceptable: Belgium, France, Japan)</div></div>
<div class="q-block"><span class="q-num">10.</span> How did the Industrial Revolution affect the environment?<div class="answer">✓ Air and water pollution from factories and coal burning; deforestation; urban overcrowding and sanitation crises (the "Great Stink" of London, 1858, prompted sewer construction)</div></div>
<div class="q-block"><span class="q-num">11.</span> What was a "putting-out system" in pre-industrial manufacturing?<div class="answer">✓ Merchants distributed raw materials to rural workers (mostly women) who made goods at home; replaced by factory production during industrialization</div></div>
<div class="q-block"><span class="q-num">12.</span> What social class grew significantly as a result of industrialization?<div class="answer">✓ The middle class (bourgeoisie) — factory owners, managers, professionals, shopkeepers</div></div>
<div class="q-block"><span class="q-num">13.</span> What was the Meiji Restoration (1868) in Japan?<div class="answer">✓ The restoration of imperial rule under Emperor Meiji; Japan rapidly industrialized and modernized to avoid Western colonization, becoming a major power within 40 years</div></div>
<div class="q-block"><span class="q-num">14.</span> How did industrialization enable imperialism in the 19th century?<div class="answer">✓ Industrial nations had vastly superior weapons (machine guns, steamships, railroads), could project force globally, and needed raw materials and markets for factory goods — all driving colonial expansion</div></div>
<div class="q-block"><span class="q-num">15.</span> What role did women play in early industrialization?<div class="answer">✓ Women and children made up much of the early factory workforce, working for lower wages than men. The "mill girls" of Lowell, Massachusetts were among the first organized workers in the US</div></div>
<div class="q-block"><span class="q-num">16–20.</span> <em>Additional questions on the Second Industrial Revolution (electricity, steel, chemicals), labor unions and strikes, the Great Depression's origins in industrial overproduction, and industrialization in Russia and China — available in the full digital quiz bank.</em></div>

<h2>Section 2: World Wars (25 Questions)</h2>
<div class="q-block"><span class="q-num">21.</span> What does the acronym MAIN stand for in the causes of WWI?<div class="answer">✓ Militarism, Alliances, Imperialism, Nationalism</div></div>
<div class="q-block"><span class="q-num">22.</span> Who was assassinated in Sarajevo on June 28, 1914?<div class="answer">✓ Archduke Franz Ferdinand, heir to the Austro-Hungarian throne</div></div>
<div class="q-block"><span class="q-num">23.</span> What were the two main alliance blocs in WWI?<div class="answer">✓ Triple Entente (France, Britain, Russia) vs. Triple Alliance / Central Powers (Germany, Austria-Hungary, Ottoman Empire, Bulgaria)</div></div>
<div class="q-block"><span class="q-num">24.</span> What was trench warfare, and why did it characterize the Western Front?<div class="answer">✓ Both sides dug elaborate trench systems; defensive firepower (machine guns, artillery) made offensive advances catastrophically costly; the front barely moved for four years</div></div>
<div class="q-block"><span class="q-num">25.</span> How did the United States enter WWI?<div class="answer">✓ Germany's resumption of unrestricted submarine warfare (sinking neutral ships) and the Zimmermann Telegram (German offer of an alliance to Mexico) pushed the US to declare war in April 1917</div></div>
<div class="q-block"><span class="q-num">26.</span> What was the Treaty of Versailles (1919)?<div class="answer">✓ The peace treaty ending WWI; imposed the "war guilt" clause on Germany, required massive reparations, stripped Germany of territory, and limited its military — creating resentments that contributed to WWII</div></div>
<div class="q-block"><span class="q-num">27.</span> What caused the Great Depression (1929)?<div class="answer">✓ Multiple factors: stock market crash (October 1929); bank failures; collapse of global trade; US Smoot-Hawley tariff; underlying weaknesses in agricultural and industrial sectors</div></div>
<div class="q-block"><span class="q-num">28.</span> What was appeasement, and why did it fail?<div class="answer">✓ Britain and France's policy of yielding to Hitler's territorial demands to avoid war; it failed because Hitler interpreted it as weakness and had no intention of limiting his ambitions</div></div>
<div class="q-block"><span class="q-num">29.</span> What was Operation Barbarossa (June 1941)?<div class="answer">✓ Nazi Germany's invasion of the Soviet Union — the largest military operation in history; initially successful but eventually catastrophic for Germany at Stalingrad (1942–43)</div></div>
<div class="q-block"><span class="q-num">30.</span> What was the Holocaust?<div class="answer">✓ The Nazi regime's systematic genocide of approximately 6 million Jews and 5 million others (Roma, disabled, political prisoners, Soviet POWs) — roughly 11 million total killed</div></div>
<div class="q-block"><span class="q-num">31.</span> What was D-Day (June 6, 1944)?<div class="answer">✓ The Allied amphibious landings on five beaches in Normandy, France — the largest amphibious operation in history; opened the Western Front and began the liberation of Western Europe</div></div>
<div class="q-block"><span class="q-num">32.</span> Why did the US use atomic bombs on Japan in August 1945?<div class="answer">✓ To force rapid Japanese surrender and avoid an invasion of the Japanese home islands (estimated to cost hundreds of thousands of Allied and Japanese casualties). The ethical debate continues.</div></div>
<div class="q-block"><span class="q-num">33–45.</span> <em>Additional questions on WWI technology (tanks, gas, aircraft), the Russian Revolution (1917), Wilson's 14 Points, the League of Nations, the Pacific War, the Battle of Britain, the Eastern Front, the Nuremberg Trials, and the founding of the UN — available in the full digital quiz bank.</em></div>

<h2>Section 3: Decolonization (20 Questions)</h2>
<div class="q-block"><span class="q-num">46.</span> What is decolonization?<div class="answer">✓ The process by which European colonial powers granted or were forced to grant independence to their colonies, predominantly between 1945 and 1975</div></div>
<div class="q-block"><span class="q-num">47.</span> What method did Gandhi use to achieve Indian independence?<div class="answer">✓ Non-violent civil disobedience (satyagraha) — boycotts, marches, hunger strikes, and mass non-cooperation that made British rule ungovernable</div></div>
<div class="q-block"><span class="q-num">48.</span> What was partition, and what violence did it cause in India?<div class="answer">✓ The division of British India into Hindu-majority India and Muslim-majority Pakistan (1947); triggered massive communal violence killing 200,000–2 million and displacing 14 million people</div></div>
<div class="q-block"><span class="q-num">49.</span> Which was the first sub-Saharan African country to gain independence, and when?<div class="answer">✓ Ghana, March 6, 1957, under Kwame Nkrumah</div></div>
<div class="q-block"><span class="q-num">50.</span> What was the Algerian War of Independence (1954–1962)?<div class="answer">✓ A brutal guerrilla conflict in which Algerian nationalists (FLN) fought French colonial rule; approximately 300,000 Algerians and 25,000 French soldiers died; France's most traumatic decolonization</div></div>
<div class="q-block"><span class="q-num">51.</span> Why did the Cold War affect newly independent nations?<div class="answer">✓ Both superpowers competed for influence in newly independent nations, often supporting dictators or funding proxy wars — preventing stable democratic development</div></div>
<div class="q-block"><span class="q-num">52.</span> What was the Non-Aligned Movement?<div class="answer">✓ A group of newly independent nations (led by India, Egypt, Yugoslavia, Indonesia) that tried to remain neutral in the Cold War rather than aligning with either the US or USSR</div></div>
<div class="q-block"><span class="q-num">53–65.</span> <em>Additional questions on apartheid in South Africa, Ho Chi Minh and Vietnamese independence, Mao's revolution in China, the Korean division, Palestinian-Israeli conflict origins, and the legacies of colonial borders — available in the full digital quiz bank.</em></div>

<h2>Section 4: The Cold War (20 Questions)</h2>
<div class="q-block"><span class="q-num">66.</span> What was the Truman Doctrine (1947)?<div class="answer">✓ A US policy committing America to supporting free peoples resisting communist subjugation anywhere in the world — the founding declaration of Cold War containment policy</div></div>
<div class="q-block"><span class="q-num">67.</span> What was the Marshall Plan?<div class="answer">✓ A US program providing $13 billion in economic aid to rebuild Western European economies after WWII — and, critically, prevent economic desperation from leading to communist revolutions</div></div>
<div class="q-block"><span class="q-num">68.</span> What was NATO, and why was it formed?<div class="answer">✓ The North Atlantic Treaty Organization (1949) — a military alliance of Western democracies committing to collective defense against Soviet aggression</div></div>
<div class="q-block"><span class="q-num">69.</span> What was the Berlin Wall, and when was it built and demolished?<div class="answer">✓ A wall built by East Germany (1961) to prevent its citizens fleeing to West Berlin; it became the defining symbol of the Iron Curtain; fell November 9, 1989</div></div>
<div class="q-block"><span class="q-num">70.</span> What was détente, and which US president pursued it?<div class="answer">✓ A policy of relaxing tensions with the USSR and opening relations with China; pursued by Nixon and Kissinger in the early 1970s, resulting in SALT I (1972) and Nixon's China visit (1972)</div></div>
<div class="q-block"><span class="q-num">71.</span> What were glasnost and perestroika?<div class="answer">✓ Gorbachev's reform policies: glasnost (openness — reducing censorship) and perestroika (restructuring — economic reform); they inadvertently accelerated the Soviet Union's dissolution</div></div>
<div class="q-block"><span class="q-num">72.</span> When did the Soviet Union officially dissolve?<div class="answer">✓ December 25, 1991</div></div>
<div class="q-block"><span class="q-num">73–85.</span> <em>Additional questions on McCarthyism, the Korean War, Cuban Missile Crisis details, the Space Race, nuclear strategy (MAD), the Prague Spring (1968), the Afghanistan War (1979–89), Reagan's "Evil Empire" speech, and the end of the Cold War — available in the full digital quiz bank.</em></div>

<h2>Section 5: Globalization and the Modern World (15 Questions)</h2>
<div class="q-block"><span class="q-num">86.</span> What event on September 11, 2001 transformed US foreign policy?<div class="answer">✓ Al-Qaeda terrorist attacks on the World Trade Center and Pentagon; triggered the "War on Terror," invasions of Afghanistan (2001) and Iraq (2003)</div></div>
<div class="q-block"><span class="q-num">87.</span> What is the European Union, and when did it take its current form?<div class="answer">✓ A political and economic union of European nations; evolved from the EEC (1957) into the EU with the Maastricht Treaty (1993); currently 27 member states sharing a single market and (for most) the euro currency</div></div>
<div class="q-block"><span class="q-num">88.</span> What was the Arab Spring (2010–2012)?<div class="answer">✓ A wave of pro-democracy protests across the Arab world; toppled governments in Tunisia, Egypt, Libya, and Yemen; led to civil war in Syria; triggered by economic grievances, corruption, and social media mobilization</div></div>
<div class="q-block"><span class="q-num">89.</span> What was the Rwanda Genocide (1994)?<div class="answer">✓ The systematic murder of approximately 800,000 Tutsi and moderate Hutu people by Hutu extremists over 100 days; the international community's failure to intervene was a defining moral failure</div></div>
<div class="q-block"><span class="q-num">90.</span> How has China's global role changed since 1978?<div class="answer">✓ Deng Xiaoping's "reform and opening up" (1978) transformed China from a closed communist economy into the world's second-largest economy; China joined the WTO (2001) and is now the US's main geopolitical rival</div></div>
<div class="q-block"><span class="q-num">91–100.</span> <em>Additional questions on the Israel-Palestine conflict, NAFTA and trade blocs, climate change as a historical turning point, COVID-19 in historical context, the rise of social media and democracy, and the future of multilateral institutions — available in the full digital quiz bank.</em></div>
`
  },
};

// ─── Download trigger ─────────────────────────────────────────────────────────

export interface DownloadableResource {
  id: string;
  title: string;
  type: string;
  subject: string;
  free: boolean;
}

export function downloadResource(resource: DownloadableResource): void {
  const entry = CONTENT[resource.id];
  if (!entry) return;

  const typeLabel =
    resource.type === "guide" ? "Study Guide"
    : resource.type === "video" ? "Video Lecture Notes"
    : resource.type === "audio" ? "Podcast Transcript"
    : resource.type === "map" ? "Historical Maps"
    : resource.type === "quiz" ? "Quiz Bank"
    : "Resource";

  const html = htmlDoc(resource.title, entry.typeLabel || typeLabel, resource.subject, entry.body);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = entry.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
