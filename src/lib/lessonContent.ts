export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonSection {
  title: string;
  body: string;
}

export interface KeyFact {
  label: string;
  value: string;
}

export interface LessonContent {
  id: string;
  overview: string;
  sections: LessonSection[];
  keyFacts: KeyFact[];
  primarySource?: { quote: string; attribution: string };
  quiz: QuizQuestion[];
  assignment: { prompt: string; tips: string[] };
}

// ─── Full content for the 15 flagship lessons ────────────────────────────────

const FLAGSHIP_CONTENT: LessonContent[] = [
  // ── 1. Introduction to Ancient Egypt ────────────────────────────────────
  {
    id: "1",
    overview: "Discover the land of pharaohs, explore the Nile's role, and understand the foundations of one of history's greatest civilizations.",
    sections: [
      {
        title: "The Gift of the Nile",
        body: `Ancient Egypt could not have existed without the Nile River. Every year, between June and September, the Nile flooded its banks and deposited a rich layer of black silt across the surrounding farmland. Egyptians called this fertile strip the "Black Land" (Kemet) and the surrounding desert the "Red Land" (Deshret). This annual flooding created some of the most productive agricultural land in the ancient world, allowing Egypt to support a large and complex civilization for over three thousand years.

The Nile also served as Egypt's highway. The current flows north toward the Mediterranean Sea, while the prevailing wind blows south. This natural dynamic meant that boats could sail upriver (south) by raising their sails and drift downriver (north) with the current, making trade and communication across Egypt's 700-mile length remarkably efficient.

Egypt was divided into Upper Egypt (the narrow river valley in the south) and Lower Egypt (the broad delta in the north). Around 3100 BCE, a pharaoh — traditionally named Narmer or Menes — unified these two kingdoms, creating one of history's first nation-states. The double crown of Egypt, combining the white crown of Upper Egypt and the red crown of Lower Egypt, symbolized this unification for millennia.`,
      },
      {
        title: "Pharaohs, Gods, and the Divine Order",
        body: `The pharaoh stood at the center of Egyptian society — not merely as a political leader but as a living god, the earthly embodiment of Horus and, after death, Osiris. This divine kingship was fundamental to Egyptian ideology. The pharaoh was responsible for maintaining Ma'at: the cosmic principle of truth, justice, and order that kept the universe from descending into chaos.

Egyptian religion was polytheistic, featuring hundreds of deities. The most important included Ra (the sun god), Osiris (god of the afterlife and resurrection), Isis (goddess of magic and motherhood), Horus (sky god and divine kingship), Anubis (god of mummification), and Thoth (god of wisdom and writing). These deities were often depicted with human bodies and animal heads — Anubis with a jackal's head, Thoth with an ibis, Horus with a falcon.

The afterlife was central to Egyptian belief. Egyptians believed that if the correct rituals were performed and the heart of the deceased was judged worthy, the soul could live eternally in the Field of Reeds — a paradise mirroring Egypt itself. This belief drove the enormous investment in tombs, mummification, and funerary texts like the Book of the Dead, which served as a guide for navigating the afterlife.`,
      },
      {
        title: "Monuments, Writing, and Legacy",
        body: `The Great Pyramid of Giza, built around 2560 BCE for Pharaoh Khufu, remains one of the most extraordinary engineering achievements in human history. Standing originally at 481 feet, it was the tallest man-made structure on Earth for over 3,800 years. The pyramids were not built by slaves, as popular myth suggests, but by organized teams of skilled workers who received food, medical care, and burial honors.

Egyptian hieroglyphics — one of humanity's earliest writing systems — were developed around 3200 BCE. This system used over 700 symbols representing sounds, words, and concepts. For centuries after Egypt's decline, hieroglyphics were unreadable until 1822, when French scholar Jean-François Champollion deciphered the Rosetta Stone — a decree written in hieroglyphics, Demotic script, and ancient Greek.

Egypt's legacy stretches from mathematics (they could calculate the area of a circle and the volume of a pyramid) to medicine (the Edwin Smith Papyrus contains the earliest known description of the human brain) to architecture. Greek philosophers including Plato and Pythagoras reportedly studied in Egypt, and Egyptian concepts of monotheism may have influenced Abrahamic religions. Even our 365-day solar calendar derives from the ancient Egyptian calendar.`,
      },
    ],
    keyFacts: [
      { label: "Duration", value: "3100–30 BCE (over 3,000 years)" },
      { label: "Capital", value: "Memphis, then Thebes, then Alexandria" },
      { label: "Writing system", value: "Hieroglyphics (~3200 BCE)" },
      { label: "Largest pyramid", value: "Great Pyramid of Khufu, ~2560 BCE" },
      { label: "Final ruler", value: "Cleopatra VII, died 30 BCE" },
    ],
    primarySource: {
      quote: "My name is Ozymandias, King of Kings; Look on my Works, ye Mighty, and despair! Nothing beside remains.",
      attribution: "Percy Shelley's sonnet, inspired by the fallen statue of Ramesses II, 1818",
    },
    quiz: [
      {
        question: "What did Egyptians call the fertile farmland created by Nile floods?",
        options: ["The Red Land", "The Black Land", "The Green Strip", "The Flood Plain"],
        correctIndex: 1,
        explanation: "Egyptians called the fertile strip created by Nile silt the 'Black Land' (Kemet) because of the dark, rich soil.",
      },
      {
        question: "Which pharaoh is traditionally credited with unifying Upper and Lower Egypt?",
        options: ["Ramesses II", "Tutankhamun", "Narmer/Menes", "Khufu"],
        correctIndex: 2,
        explanation: "Narmer (also called Menes) unified Upper and Lower Egypt around 3100 BCE, creating one of history's first nation-states.",
      },
      {
        question: "What was Ma'at in Egyptian belief?",
        options: ["The goddess of war", "The cosmic principle of truth, justice, and order", "The god of the Nile", "The book of the dead"],
        correctIndex: 1,
        explanation: "Ma'at was the Egyptian concept of cosmic order — truth, justice, and harmony — that the pharaoh was responsible for maintaining.",
      },
      {
        question: "How were hieroglyphics finally deciphered in the 19th century?",
        options: ["By comparing them to Mesopotamian cuneiform", "Through the Rosetta Stone, which showed the same text in three scripts", "By finding an Egyptian dictionary", "Through computer analysis"],
        correctIndex: 1,
        explanation: "Jean-François Champollion deciphered hieroglyphics in 1822 using the Rosetta Stone, which contained the same decree in hieroglyphics, Demotic, and Greek.",
      },
      {
        question: "Who actually built the Egyptian pyramids?",
        options: ["Enslaved people from Nubia", "Israelite slaves as described in the Bible", "Alien civilizations", "Organized teams of skilled Egyptian workers"],
        correctIndex: 3,
        explanation: "Archaeological evidence shows pyramids were built by organized teams of skilled workers who received wages, food, medical care, and honorable burial — not slaves.",
      },
    ],
    assignment: {
      prompt: "The ancient Egyptians believed that the pharaoh maintained Ma'at — cosmic order — and that failure to do so would bring chaos. Using evidence from the lesson, write 2–3 paragraphs explaining: (1) How the physical geography of Egypt shaped its civilization, and (2) How religion and political power were intertwined in ancient Egypt. What does this tell us about how early civilizations organized themselves?",
      tips: ["Discuss the role of the Nile in agriculture and transport", "Explain the pharaoh's divine status and why it mattered politically", "Connect Egyptian architecture (pyramids) to religious belief", "Consider how Egypt's example compares to other ancient civilizations you know"],
    },
  },

  // ── 2. The Roman Republic & Senate ──────────────────────────────────────
  {
    id: "2",
    overview: "Explore how Rome governed itself before the Empire — the Senate, consuls, laws, and the tensions that led to civil war.",
    sections: [
      {
        title: "From Kingdom to Republic",
        body: `According to Roman tradition, Rome was founded in 753 BCE by the twin brothers Romulus and Remus. For its first 244 years, Rome was a monarchy. The revolution came in 509 BCE when the last king, Tarquinius Superbus, was expelled after his son assaulted a noblewoman named Lucretia, who then took her own life. This event — whether historical or legendary — became the founding myth of the Roman Republic and a powerful symbol of Roman virtue over tyranny.

The Republic's core principle was simple: never again would one man hold absolute power. The Romans divided executive authority between two consuls elected annually, each with the power to veto (from the Latin "I forbid") the other's decisions. This system of checks and balances was revolutionary for its time and would profoundly influence the framers of the United States Constitution over two millennia later.

Roman society was divided between patricians — the wealthy aristocratic families who monopolized political power — and plebeians, the common citizens. The early Republic was marked by the "Struggle of the Orders" (500–287 BCE), a long social conflict through which plebeians gradually won legal and political rights, including the right to serve as consuls and the codification of Roman law in the Twelve Tables (c. 449 BCE).`,
      },
      {
        title: "The Senate and Roman Government",
        body: `The Roman Senate was the heart of Republican government. Originally an advisory body to the king, it became the dominant political institution of the Republic, comprising around 300 senators (later expanded to 600 by Sulla and 900 by Caesar). Senators held their positions for life and came primarily from the patrician class, though successful plebeians could earn entry.

The Senate controlled foreign policy, provincial governance, the treasury, and the assignment of military commands. It did not pass laws directly — that was the function of popular assemblies — but its decrees (senatus consulta) carried enormous moral authority. Roman magistrates rarely defied the Senate's will.

The Roman constitution featured a complex hierarchy of magistrates: at the top, two consuls served one-year terms; below them, praetors (who administered justice), censors (who conducted the census and managed public morality), quaestors (treasury officials), and aediles (who managed public buildings and games). In times of extreme crisis, the Senate could appoint a dictator with unlimited power for a maximum of six months — a provision that Julius Caesar would exploit to devastating effect.`,
      },
      {
        title: "The Fall of the Republic",
        body: `By the 2nd century BCE, Rome's conquests had brought enormous wealth and hundreds of thousands of enslaved people to Italy. Small farmers — the backbone of the Republic — found themselves unable to compete with large slave-worked estates (latifundia) owned by the wealthy. Landless citizens flooded into Rome, creating an unstable urban poor ripe for political manipulation.

The Gracchi brothers — Tiberius and Gaius — attempted land reforms in the 130s and 120s BCE to redistribute public land to the poor. Both were murdered by their political opponents, setting a dangerous precedent: violence as a political tool. The Republic never fully recovered. The late Republic saw a series of military strongmen — Marius, Sulla, Pompey, Crassus, Caesar — compete for power using their loyal armies as personal political weapons.

Julius Caesar's crossing of the Rubicon River in 49 BCE with his army (illegal under Roman law, which forbade generals from bringing troops into Italy) triggered civil war. Caesar's assassination on the Ides of March (March 15, 44 BCE) did not restore the Republic — it merely sparked another round of civil wars. His adopted heir Octavian, eventually titled Augustus, became Rome's first emperor in 27 BCE, transforming the Republic into the Empire while carefully maintaining Republican forms and titles to avoid Caesar's fate.`,
      },
    ],
    keyFacts: [
      { label: "Republic founded", value: "509 BCE" },
      { label: "Twelve Tables", value: "c. 449 BCE — first written Roman law" },
      { label: "Senate size", value: "~300 members (expanded to 900 under Caesar)" },
      { label: "Caesar's assassination", value: "March 15, 44 BCE" },
      { label: "Republic ended", value: "27 BCE — Augustus becomes first emperor" },
    ],
    primarySource: {
      quote: "The spirit of democracy cannot survive where there is no spirit of public service in the people themselves.",
      attribution: "Cicero, De Re Publica (54–51 BCE) — paraphrased",
    },
    quiz: [
      {
        question: "Why did Romans establish a republic after expelling their last king?",
        options: ["They wanted to trade with Greece", "To prevent one man from holding absolute power again", "The king died with no heir", "A foreign invasion forced the change"],
        correctIndex: 1,
        explanation: "After expelling the tyrannical Tarquinius Superbus, Romans were determined to ensure no single person could ever again hold absolute power, dividing authority between two annually elected consuls.",
      },
      {
        question: "What was the Struggle of the Orders?",
        options: ["A civil war between Rome and Carthage", "A long social conflict between patricians and plebeians over political rights", "A religious dispute about Roman gods", "A series of slave rebellions"],
        correctIndex: 1,
        explanation: "The Struggle of the Orders (500–287 BCE) was a prolonged conflict through which plebeians gradually won legal and political rights from the patrician aristocracy.",
      },
      {
        question: "What was the primary role of the Roman Senate?",
        options: ["To elect the consuls each year", "To control foreign policy, treasury, and provincial governance", "To serve as a court for criminals", "To command the Roman army"],
        correctIndex: 1,
        explanation: "While not passing laws directly, the Senate dominated foreign policy, provincial governance, and the treasury. Its decrees (senatus consulta) carried immense authority.",
      },
      {
        question: "What did Julius Caesar do that triggered civil war in 49 BCE?",
        options: ["He declared himself a god", "He married Cleopatra", "He crossed the Rubicon with his army", "He burned the Senate building"],
        correctIndex: 2,
        explanation: "Crossing the Rubicon River with his army was illegal under Roman law (generals could not bring troops into Italy). Caesar's act forced every Roman to choose sides, triggering civil war.",
      },
      {
        question: "Which economic change destabilized the Roman Republic from the 2nd century BCE?",
        options: ["A series of bad harvests", "Small farmers unable to compete with large slave-worked estates", "The loss of trade with the East", "Inflation caused by too much silver"],
        correctIndex: 1,
        explanation: "Roman conquests brought vast numbers of enslaved people to Italy. Large slave-worked estates (latifundia) undercut small farmers, who flooded into Rome creating a volatile landless poor.",
      },
    ],
    assignment: {
      prompt: "The Roman Republic created an elaborate system of checks and balances to prevent the abuse of power — yet it still collapsed into dictatorship. In 2–3 paragraphs: (1) Describe two specific mechanisms the Republic used to limit individual power, and (2) Explain two reasons why these mechanisms ultimately failed. What lessons, if any, does the fall of the Roman Republic offer to modern democracies?",
      tips: ["Discuss the role of the two consuls and the veto power", "Consider how military commanders like Caesar accumulated personal power", "Think about the role of economic inequality in undermining democracy", "You might compare Roman checks and balances to those in a modern government you know"],
    },
  },

  // ── 3. Greek Philosophy & Democracy ─────────────────────────────────────
  {
    id: "3",
    overview: "From Socrates to Pericles — understand how the ancient Greeks invented democratic ideas that still shape our world today.",
    sections: [
      {
        title: "The Birth of Democracy in Athens",
        body: `In 507 BCE, an Athenian statesman named Cleisthenes introduced a series of political reforms that created the world's first democracy. The word itself is Greek: demos (people) + kratos (rule). Cleisthenes reorganized Athenian citizens into ten new tribes based on geography rather than family lineage, breaking the power of aristocratic clans and creating a citizen body defined by residence rather than birth.

The central institution of Athenian democracy was the Ekklesia (Assembly), where all male citizens (about 30,000–40,000 men in the 5th century) had the right to attend, speak, and vote. The Assembly met roughly 40 times per year on the Pnyx hill overlooking Athens, making decisions on war, treaties, laws, and the appointment of generals. This was direct democracy — citizens made decisions themselves rather than through elected representatives.

The Athenian system also featured the Council of 500 (Boule), chosen by lot, which prepared the agenda for the Assembly; a jury court system (Heliaia) with panels of 501 jurors; and the practice of ostracism, by which citizens could vote to exile any politician deemed a danger to democracy for ten years. It's worth noting the system's limits: women, enslaved people, and foreigners (metics) were excluded from political participation.`,
      },
      {
        title: "Socrates, Plato, and Aristotle",
        body: `The 5th and 4th centuries BCE produced three philosophers whose ideas collectively shaped Western thought for over two thousand years. Socrates (469–399 BCE) wrote nothing — we know him through his student Plato. He developed the Socratic method: a form of questioning that exposed contradictions in people's beliefs and pushed them toward deeper understanding. In 399 BCE, at age 70, he was tried on charges of corrupting the youth and impiety, convicted by a jury of 501 Athenians, and executed by drinking hemlock.

Plato (428–348 BCE) recorded Socrates' conversations in a series of philosophical dialogues — The Republic, Symposium, Apology, Phaedo — that remain some of the most influential texts ever written. In The Republic, Plato argued that democracy was a flawed system because it gave equal weight to the opinions of the wise and the foolish. His ideal state would be governed by philosopher-kings trained from birth in reason and virtue.

Aristotle (384–322 BCE) studied under Plato and went on to tutor Alexander the Great. Unlike Plato, Aristotle was an empiricist — he believed knowledge came from observing the world rather than reasoning about ideal forms. He wrote on politics, ethics, biology, physics, logic, and rhetoric. His work on classification of animals represents the first systematic scientific study of the living world. He classified governments into monarchy, aristocracy, and polity (each with its corrupt form: tyranny, oligarchy, and democracy) — a taxonomy that still appears in political science courses today.`,
      },
      {
        title: "The Golden Age of Athens",
        body: `Under the leadership of Pericles (461–429 BCE), Athens entered its Golden Age. Pericles used the tribute payments of the Delian League — an alliance ostensibly formed to defend against Persia — to fund an extraordinary building program on the Acropolis. The Parthenon, completed in 432 BCE, remains an architectural masterpiece; its subtle optical corrections (the columns bulge slightly in the middle, the platform curves upward) create an illusion of perfect geometry when none exists.

Athenian democracy under Pericles became more inclusive: Pericles introduced pay for jury duty, enabling poorer citizens to participate in civic life. He also famously declared that "advancement in public life falls to reputation for capacity, class considerations not being allowed to interfere with merit" — an early statement of meritocratic ideals.

The Peloponnesian War (431–404 BCE) between Athens and Sparta, vividly documented by the historian Thucydides, ended Athens' golden age and weakened Greek city-states generally. Yet Athens' cultural and intellectual legacy proved far more durable than its military power. Athenian tragedy (Aeschylus, Sophocles, Euripides), comedy (Aristophanes), history (Herodotus, Thucydides), and philosophy spread throughout the ancient world via Alexander's conquests and later the Roman Empire, forming the bedrock of what we call Western civilization.`,
      },
    ],
    keyFacts: [
      { label: "Democracy founded", value: "507 BCE by Cleisthenes" },
      { label: "Athenian assembly", value: "Ekklesia — all male citizens could vote directly" },
      { label: "Socrates executed", value: "399 BCE, by hemlock" },
      { label: "Parthenon completed", value: "432 BCE" },
      { label: "Peloponnesian War", value: "431–404 BCE — Athens vs. Sparta" },
    ],
    primarySource: {
      quote: "Our constitution is called a democracy because power is in the hands not of a minority but of the whole people.",
      attribution: "Pericles' Funeral Oration, as recorded by Thucydides, 431 BCE",
    },
    quiz: [
      {
        question: "What does the Greek word 'democracy' literally mean?",
        options: ["Rule of the wise", "Freedom from kings", "Rule of the people", "Power through debate"],
        correctIndex: 2,
        explanation: "Democracy combines demos (people) and kratos (rule) — literally 'rule of the people.'",
      },
      {
        question: "Who introduced the first democratic reforms in Athens?",
        options: ["Pericles", "Socrates", "Solon", "Cleisthenes"],
        correctIndex: 3,
        explanation: "Cleisthenes introduced democratic reforms in 507 BCE, reorganizing citizens into geographic tribes and creating the Assembly and Council of 500.",
      },
      {
        question: "What did Plato argue in The Republic about democracy?",
        options: ["Democracy was the best possible government", "Democracy gave equal weight to wise and foolish opinions, making it flawed", "Democracy needed a powerful army to survive", "Democracy should include women"],
        correctIndex: 1,
        explanation: "Plato was skeptical of democracy, arguing it was flawed because it treated all opinions equally regardless of the speaker's wisdom. He preferred rule by philosopher-kings.",
      },
      {
        question: "What was the Socratic method?",
        options: ["Teaching philosophy through written texts", "Learning by memorizing great thinkers' arguments", "A form of questioning that exposed contradictions to reach deeper truth", "A system of government based on reason"],
        correctIndex: 2,
        explanation: "The Socratic method involved probing questions that revealed inconsistencies in people's beliefs, pushing them toward deeper understanding rather than accepting received wisdom.",
      },
      {
        question: "Which of the following was NOT allowed to participate in Athenian democracy?",
        options: ["Poor male citizens", "Wealthy male citizens", "Male citizens over 30", "Women and enslaved people"],
        correctIndex: 3,
        explanation: "Women, enslaved people, and foreign residents (metics) were all excluded from political participation in Athenian democracy, which was limited to adult male citizens.",
      },
    ],
    assignment: {
      prompt: "Pericles declared that Athenian democracy allowed 'advancement in public life' based on 'capacity' rather than 'class.' Yet Athenian democracy excluded women, enslaved people, and foreigners. In 2–3 paragraphs: (1) Evaluate how democratic Athens actually was by the standards of its own stated ideals, and (2) Explain how the philosophical tradition of Socrates, Plato, and Aristotle has influenced modern thinking about government and citizenship. How does ancient Athens still matter today?",
      tips: ["Consider both the innovative and the exclusionary aspects of Athenian democracy", "Think about what Plato's and Aristotle's critiques of democracy tell us about the system's weaknesses", "Look for connections between ancient Greek ideas and modern democratic institutions", "Be specific — name actual Athenian practices or philosophical ideas in your analysis"],
    },
  },

  // ── 4. The Black Death & Medieval Society ───────────────────────────────
  {
    id: "4",
    overview: "How the plague of 1347–1351 wiped out a third of Europe's population and permanently transformed social and economic structures.",
    sections: [
      {
        title: "Origins and Spread",
        body: `The Black Death — the most devastating pandemic in recorded human history — arrived in Europe via the Silk Road in 1347. The disease (bubonic plague, caused by the bacterium Yersinia pestis) likely originated in Central Asia and was carried west by Mongol trade caravans. It reached the Crimea by 1346, and the story goes that Mongol forces besieging the trading port of Caffa catapulted infected corpses over the city walls — one of history's first examples of biological warfare.

Genoese merchants fled Caffa and carried the plague by ship across the Mediterranean. By October 1347, it reached Sicily; by early 1348, it had spread through Italy, France, Spain, and Portugal. It reached England in June 1348, Scandinavia by 1349, and Poland and Russia by 1350–1351. The disease traveled along trade routes with terrifying speed, moving at roughly 2–3 miles per day along roads.

Three forms of plague struck simultaneously: bubonic (the most common, characterized by swollen lymph nodes called buboes, with a 30–75% death rate), septicemic (blood infection, nearly always fatal), and pneumonic (spread through the air, 95–100% fatal). Medieval physicians had no idea what caused it or how to stop it. One contemporary described a doctor advising patients to: avoid bad air, avoid bathing, stay calm, and eat lightly — none of which helped.`,
      },
      {
        title: "Death on a Medieval Scale",
        body: `The numbers are almost incomprehensible. Europe's population in 1340 was approximately 75 million people. By 1351, it had fallen to roughly 50 million — a loss of 25 million lives, or about one-third of the continent. Some regions suffered far worse: Florence lost 50–60% of its population within months. In certain villages, everyone died. In others, people fled — spreading the plague further.

Contemporary accounts describe a society in freefall. Giovanni Boccaccio, who survived the Florence epidemic and wrote The Decameron during its aftermath, described bodies piling up in streets, families abandoning the sick, and normal moral constraints dissolving under the pressure of universal death. The Church, which should have provided comfort, was overwhelmed: priests refused to give last rites, fearing infection; monasteries were emptied by disease; confidence in the institutional Church was severely damaged.

The psychological impact was profound. The "Danse Macabre" — the Dance of Death — became a major artistic motif, depicting skeletons leading people of every social class to their graves, reminding viewers that death was the great equalizer. The flagellant movement, in which groups of men publicly whipped themselves as penance, swept through Germany and the Low Countries. In one of history's darkest chapters, Jewish communities were massacred across Europe on the false accusation of "poisoning the wells."`,
      },
      {
        title: "The World After: Social Transformation",
        body: `Paradoxically, the catastrophic death toll created significant social and economic improvements for the survivors. With a third of the population dead, labor became scarce and enormously valuable. Surviving peasants found themselves in a radically different bargaining position: landlords who previously held absolute power over serfs were now forced to pay wages, reduce dues, and grant greater freedoms to retain workers. The old feudal order, already weakening, was fundamentally destabilized.

Wages rose dramatically across Europe. In England, wages for agricultural laborers roughly doubled between 1340 and 1400. When landlords tried to freeze wages through legislation (the English Statute of Laborers, 1351), peasants resisted — contributing to the English Peasants' Revolt of 1381 and similar uprisings across Europe. The seeds of the eventual end of serfdom in Western Europe were sown in the plague's aftermath.

The Church's failures during the crisis accelerated demands for religious reform. With confidence in traditional clergy shaken, mystical and lay religious movements grew. Thinkers like John Wycliffe in England and Jan Hus in Bohemia began questioning Church authority — forerunners of the Protestant Reformation that would shake Europe 150 years later. The Black Death didn't cause the Renaissance, but by eliminating so many old elites and disrupting inherited social structures, it created space for new ideas, new social mobility, and eventually a new world.`,
      },
    ],
    keyFacts: [
      { label: "Outbreak in Europe", value: "1347–1351" },
      { label: "European death toll", value: "~25 million, one-third of population" },
      { label: "Cause", value: "Yersinia pestis bacterium, spread by fleas on rats" },
      { label: "Entry point", value: "Sicily, October 1347, via Genoese ships from Crimea" },
      { label: "Long-term effect", value: "Labor scarcity → wage increases → decline of serfdom" },
    ],
    primarySource: {
      quote: "The mortality was so great that not even the priests dared minister to the sick... the dead were laid in the ditches by the hundreds, both day and night.",
      attribution: "Agnolo di Tura, Sienese chronicler, 1348",
    },
    quiz: [
      {
        question: "What was the likely origin of the Black Death?",
        options: ["Sub-Saharan Africa", "Central Asia, spread via Silk Road trade", "Northern India", "The Arabian Peninsula"],
        correctIndex: 1,
        explanation: "The Black Death likely originated in Central Asia and was carried west along Silk Road trade routes, reaching Crimea by 1346 before spreading to Europe via ship.",
      },
      {
        question: "Approximately what fraction of Europe's population died in the Black Death?",
        options: ["One-tenth", "One-fifth", "One-third", "One-half"],
        correctIndex: 2,
        explanation: "Europe lost approximately one-third of its population — roughly 25 million people out of 75 million — between 1347 and 1351.",
      },
      {
        question: "What major positive economic change did the Black Death inadvertently cause?",
        options: ["A boom in international trade", "Labor scarcity that increased peasants' bargaining power and wages", "The discovery of new agricultural techniques", "A reduction in taxes across Europe"],
        correctIndex: 1,
        explanation: "With a third of the workforce dead, surviving peasants became scarce and valuable, forcing landlords to pay wages and grant freedoms — fundamentally destabilizing the feudal system.",
      },
      {
        question: "Why were Jewish communities targeted during the Black Death?",
        options: ["They were blamed for importing the disease from Asia", "They were falsely accused of poisoning wells", "They refused to help bury the dead", "They were seen as economically benefiting from the crisis"],
        correctIndex: 1,
        explanation: "In one of history's darkest episodes, Jewish communities across Europe were massacred based on the false accusation that they had poisoned wells — a scapegoat for a disease nobody understood.",
      },
      {
        question: "How did the Black Death contribute to the long-term decline of the Church's authority?",
        options: ["The Pope died of the plague", "The Church supported the persecution of Jews", "The Church's failure to explain or stop the plague eroded confidence in its authority", "The Black Death destroyed all the monasteries"],
        correctIndex: 2,
        explanation: "With priests abandoning the sick, monasteries decimated, and no theological explanation for the catastrophe, confidence in the institutional Church was severely damaged — contributing to later reform movements.",
      },
    ],
    assignment: {
      prompt: "Historians sometimes call the Black Death 'the most important event in medieval European history.' In 2–3 paragraphs: (1) Explain how the Black Death transformed the lives of ordinary peasants in economic and social terms, and (2) Evaluate whether you agree that the plague was ultimately a turning point that made European society more dynamic and less rigid. Use specific evidence from the lesson to support your argument.",
      tips: ["Consider both immediate suffering and long-term social change", "Discuss the relationship between labor scarcity and peasant empowerment", "Think about the Church's response and its consequences", "Consider whether 'positive' long-term effects justify calling a catastrophe a 'turning point'"],
    },
  },

  // ── 5. The Crusades: Faith & Power ──────────────────────────────────────
  {
    id: "5",
    overview: "A nuanced look at the motivations, major campaigns, and lasting consequences of two centuries of religious warfare.",
    sections: [
      {
        title: "Origins and Motivations",
        body: `In 1095, Pope Urban II delivered a sermon at Clermont, France, that would set in motion nearly two centuries of warfare. The Byzantine Emperor Alexios I had appealed to the West for military help against the Seljuk Turks, who had seized Anatolia and threatened Constantinople. Urban transformed this political request into a religious call to arms: Christians must recapture Jerusalem and the Holy Land from Muslim control. His speech reportedly ended with the crowd chanting "Deus vult" — God wills it.

The motivations driving crusaders were complex and varied. Religious conviction was real — for medieval Christians, Jerusalem was literally the center of the world, the site of Christ's Passion and Resurrection. Pilgrimage to the Holy Land was the ultimate act of devotion. But material incentives were also powerful: the promise of plenary indulgence (full remission of sins) was enormously attractive in an era when people genuinely feared eternal damnation; younger sons with no inheritance saw the Crusades as a path to land and wealth; Italian city-states like Venice and Genoa saw commercial opportunities in eastern markets.

The First Crusade (1095–1099) was extraordinarily successful by military standards. A motley force of perhaps 60,000 fighters marched overland to the Middle East, besieged city after city, and captured Jerusalem on July 15, 1099. The sack that followed was brutal: chroniclers, both Christian and Muslim, described the massacre of thousands of Muslim and Jewish residents. The Crusaders established four small states — the Crusader States — along the eastern Mediterranean coast.`,
      },
      {
        title: "The Major Campaigns",
        body: `The Second Crusade (1147–1149) was launched after the fall of the Crusader county of Edessa to the Muslim ruler Zengi in 1144. Led by two European kings — Louis VII of France and Conrad III of Germany — it ended in humiliating failure outside Damascus. The Third Crusade (1189–1192) was launched in response to the capture of Jerusalem by Saladin in 1187. Saladin, the founder of the Ayyubid dynasty, was a formidable military leader but also famously chivalrous — upon capturing Jerusalem, he allowed Christians to ransom themselves and leave safely, in stark contrast to the 1099 massacre.

The Third Crusade brought together three of medieval Europe's most famous monarchs: Frederick Barbarossa of the Holy Roman Empire (who drowned crossing a river in Anatolia), Philip II of France, and Richard I "the Lionheart" of England. Richard and Saladin's campaign ended in a military stalemate and a negotiated treaty: Christians could not recapture Jerusalem, but unarmed Christian pilgrims would be allowed access to the city.

The Fourth Crusade (1202–1204) represents perhaps the most extraordinary deviation from crusading ideals. Financial difficulties led to a deal with Venice, which diverted the crusade from Egypt to Constantinople — a Christian city. Crusaders sacked Constantinople in 1204, establishing a Latin Empire and stripping the Byzantine capital of treasures sent to Western Europe. This catastrophic event permanently deepened the split between Eastern Orthodox and Western Catholic Christianity and left Byzantium so weakened that it would eventually fall to Ottoman Turks in 1453.`,
      },
      {
        title: "Legacy and Long-Term Consequences",
        body: `The Crusades ultimately failed to secure permanent Christian control of the Holy Land — the last Crusader state fell in 1291. But their impact on European and global history was profound. The Crusades dramatically accelerated European contact with the sophisticated Islamic world, which had preserved and extended classical Greek knowledge in mathematics, medicine, astronomy, and philosophy. Translation movements brought this knowledge back to Europe, contributing to the intellectual foundations of the Renaissance.

Trade connections established during the Crusading era transformed European commerce. Italian city-states — Venice, Genoa, Pisa — built trading empires on eastern Mediterranean routes, growing rich and powerful enough to fund the art and architecture of the Renaissance. The demand for luxury goods from the East (spices, silk, cotton, sugar) that intensified through crusading contact would eventually drive European explorers to seek new sea routes, launching the Age of Exploration.

The Crusades also left painful legacies. The massacre of Jewish communities across Europe during crusading fervor (beginning with the Rhineland massacres of 1096) represents an early episode of organized antisemitic violence. The mutual distrust, violence, and memory of war between Christian and Muslim worlds created divisions that historians argue still affect global politics today. Understanding the Crusades means holding complexity in mind: they were simultaneously expressions of genuine religious faith, instruments of political power, commercially motivated enterprises, and sources of tremendous human suffering.`,
      },
    ],
    keyFacts: [
      { label: "First Crusade", value: "1095–1099; Jerusalem captured July 15, 1099" },
      { label: "Saladin captured Jerusalem", value: "1187 — triggering the Third Crusade" },
      { label: "Third Crusade leaders", value: "Richard I, Philip II, Frederick Barbarossa" },
      { label: "Fourth Crusade", value: "1204 — sacked Christian Constantinople instead" },
      { label: "Last Crusader state", value: "Acre fell 1291 — end of Crusader presence" },
    ],
    primarySource: {
      quote: "When our men had captured the main tower... they entered through the wall of the city and ran to the Saracens, killing them and pursuing them through the city... by evening our men were masters of the city.",
      attribution: "Raymond of Aguilers, eyewitness account of the fall of Jerusalem, July 1099",
    },
    quiz: [
      {
        question: "What was the immediate political trigger for Pope Urban II calling the First Crusade in 1095?",
        options: ["Jerusalem was threatened by Egyptian forces", "The Byzantine Emperor appealed for help against the Seljuk Turks", "Christian pilgrims were being killed on the road to Jerusalem", "The Muslim world had declared war on Christian Europe"],
        correctIndex: 1,
        explanation: "Byzantine Emperor Alexios I appealed to the West for military help against the Seljuk Turks who had seized Anatolia. Pope Urban II transformed this into a religious call to recapture Jerusalem.",
      },
      {
        question: "What does 'Deus vult' mean, and why is it historically significant?",
        options: ["God is great — the Muslim battle cry", "God wills it — the crowd's response to Urban II's crusade call", "God's law — the basis of Church authority", "God's army — a name for crusading forces"],
        correctIndex: 1,
        explanation: "Deus vult means 'God wills it' in Latin, reportedly the crowd's spontaneous response to Pope Urban II's sermon at Clermont in 1095, which launched the First Crusade.",
      },
      {
        question: "How did Saladin's capture of Jerusalem in 1187 differ from the Crusaders' capture in 1099?",
        options: ["Saladin allowed Christians to ransom themselves and leave safely", "Saladin massacred all Christians in the city", "Saladin converted Jerusalem into a mosque", "Saladin immediately returned Jerusalem to the Byzantines"],
        correctIndex: 0,
        explanation: "In contrast to the brutal 1099 massacre by Crusaders, Saladin allowed Christians to ransom their freedom and leave Jerusalem peacefully, an act that even contemporary Christians praised.",
      },
      {
        question: "Why did the Fourth Crusade end up attacking Constantinople, a Christian city?",
        options: ["The Pope ordered the attack", "Financial debts to Venice led to a diversion from the original plan", "Crusaders believed Constantinople had betrayed them", "They needed to capture it before proceeding to Jerusalem"],
        correctIndex: 1,
        explanation: "Unable to pay Venice for transport, the crusaders agreed to help Venice capture Christian cities. This eventually led to the catastrophic sack of Constantinople in 1204.",
      },
      {
        question: "What major long-term contribution did the Crusades make to European intellectual development?",
        options: ["They brought democracy from the Middle East to Europe", "They accelerated contact with the Islamic world, which had preserved Greek knowledge", "They spread Christianity throughout the Middle East", "They led directly to the invention of the printing press"],
        correctIndex: 1,
        explanation: "Contact with the sophisticated Islamic world, which had preserved and extended classical Greek knowledge, contributed to translation movements that helped lay the intellectual foundations for the European Renaissance.",
      },
    ],
    assignment: {
      prompt: "A historian once wrote that 'the Crusades cannot be understood as either pure religious devotion or pure political calculation — they were both, inextricably.' In 2–3 paragraphs: (1) Explain two different motivations — religious and non-religious — that drove people to join the Crusades, and (2) Evaluate the long-term legacy of the Crusades. Were they ultimately a force for connection or division between civilizations? Use specific examples from the lesson.",
      tips: ["Consider individual motivations (younger sons, merchants, devout pilgrims) alongside institutional ones (papacy, city-states)", "Think about both positive exchanges (knowledge, trade) and negative legacies (anti-Jewish violence, Christian-Muslim mistrust)", "Consider how the Fourth Crusade's sack of Constantinople changed the story", "Avoid simple judgments — the Crusades had many different effects for different people"],
    },
  },

  // ── 6. Causes of World War I ─────────────────────────────────────────────
  {
    id: "6",
    overview: "Unpack the MAIN causes — Militarism, Alliances, Imperialism, Nationalism — and trace how a single assassination sparked global war.",
    sections: [
      {
        title: "The World in 1914 — A Powder Keg",
        body: `By 1914, Europe had not seen a major continental war for nearly a century — not since Napoleon's defeat in 1815. This long peace, however, had been built on an increasingly unstable foundation. A century of industrialization had given European nations unprecedented military power. A web of interlocking alliances meant that any conflict between two powers risked dragging in all the others. Colonial competition had built up resentments and rivalries across the globe. And the force of nationalism — the idea that each ethnic group deserved its own nation — was tearing at the multi-ethnic empires of Austria-Hungary, Russia, and the Ottomans.

Historians use the acronym MAIN to summarize the underlying causes: Militarism, Alliances, Imperialism, and Nationalism. These were not isolated factors but deeply intertwined forces that had been building for decades, creating a situation where a single spark could ignite a continent-wide conflagration.

The June 1914 crisis was that spark. But understanding why a single assassination in Sarajevo — a city few in Paris or London could locate on a map — could result in 20 million deaths over four years requires understanding the powder keg that had been assembled during the preceding decades.`,
      },
      {
        title: "MAIN: The Four Underlying Causes",
        body: `MILITARISM refers to the glorification of military power and the belief that military force could and should resolve political disputes. Germany had built the world's most powerful land army; Britain and Germany were locked in a naval arms race, each racing to build more Dreadnought battleships. Military spending across Europe doubled between 1870 and 1914. Military leaders had developed elaborate war plans (Germany's Schlieffen Plan, France's Plan XVII) that, once set in motion, would be almost impossible to stop — creating dangerous momentum toward war once mobilization began.

ALLIANCES had divided Europe into two armed camps: the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (France, Britain, Russia). These alliances were designed to deter aggression through the promise of collective defense, but they had a fatal flaw: they meant that a war between any two major powers would automatically draw in all the others. When Austria-Hungary decided to punish Serbia after the assassination, the alliance system turned a Balkan crisis into a world war.

IMPERIALISM — the competition for colonies and global influence — had created friction between the Great Powers. Germany, a newcomer to colonialism, felt cheated of its share of global empire. The Moroccan Crises of 1905 and 1911, in which Germany challenged French control of Morocco, brought Europe to the brink of war twice before 1914. Meanwhile, NATIONALISM was tearing apart the Austro-Hungarian and Ottoman empires. Serbia, backed by Russia, aspired to unite all South Slavic peoples in a Greater Serbia — a direct threat to Austria-Hungary, which ruled millions of Slavic subjects.`,
      },
      {
        title: "The Spark and the Chain Reaction",
        body: `On June 28, 1914, Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, was assassinated in Sarajevo by Gavrilo Princip, a 19-year-old Bosnian Serb connected to a nationalist organization called the Black Hand. The assassination itself was almost accidental — the first attempt that morning had failed, and Princip encountered the Archduke's car only because it had taken a wrong turn.

Austria-Hungary, convinced (correctly) that Serbian military intelligence was involved, issued Serbia an ultimatum on July 23 with demands so extreme that acceptance would have meant the end of Serbian sovereignty. When Serbia accepted most but not all demands, Austria-Hungary declared war on July 28. The alliance system then took over with mechanical inevitability: Russia mobilized to defend Serbia; Germany declared war on Russia (August 1) and France (August 3); Germany invaded Belgium to execute the Schlieffen Plan, bringing Britain into the war (August 4) in defense of Belgian neutrality.

Within six weeks of one assassination, the five major European powers were at war. All sides expected it to be short — "over by Christmas," said both British and German soldiers. Instead, it lasted four years, killed around 20 million people (military and civilian), wounded 21 million more, unleashed the Russian Revolution, destroyed four empires (German, Austro-Hungarian, Russian, Ottoman), and planted the seeds of World War II through the punitive Versailles Treaty. The "spark" theory of WWI is tempting but incomplete — the assassination was the trigger, but the powder keg had been built over decades.`,
      },
    ],
    keyFacts: [
      { label: "Assassination", value: "June 28, 1914 — Sarajevo" },
      { label: "War declared", value: "Austria-Hungary on Serbia, July 28, 1914" },
      { label: "Total military deaths", value: "~10 million" },
      { label: "Total casualties", value: "~40 million (military + civilian)" },
      { label: "End of war", value: "November 11, 1918 — Armistice" },
    ],
    primarySource: {
      quote: "You will be home before the leaves have fallen from the trees.",
      attribution: "Kaiser Wilhelm II to departing German soldiers, August 1914 — predicting a short war",
    },
    quiz: [
      {
        question: "What does the 'M' in the MAIN acronym stand for?",
        options: ["Morocco", "Mobilization", "Militarism", "Monarchy"],
        correctIndex: 2,
        explanation: "MAIN stands for Militarism, Alliances, Imperialism, and Nationalism — the four underlying causes of World War I.",
      },
      {
        question: "Where was Archduke Franz Ferdinand assassinated?",
        options: ["Vienna", "Belgrade", "Prague", "Sarajevo"],
        correctIndex: 3,
        explanation: "Franz Ferdinand was assassinated in Sarajevo, the capital of Bosnia-Herzegovina (then part of Austria-Hungary), on June 28, 1914.",
      },
      {
        question: "What was the Triple Entente?",
        options: ["Germany, Austria-Hungary, and Italy", "France, Britain, and Russia", "France, Britain, and the United States", "Russia, Serbia, and Bulgaria"],
        correctIndex: 1,
        explanation: "The Triple Entente was the alliance between France, Britain, and Russia — one of the two armed camps that divided Europe before WWI.",
      },
      {
        question: "Why did the alliance system turn a Balkan crisis into a world war?",
        options: ["Because countries wanted an excuse to fight", "Because any war between two powers automatically triggered obligations to defend allies", "Because Germany attacked all countries simultaneously", "Because the assassination killed leaders of multiple countries"],
        correctIndex: 1,
        explanation: "The alliances were designed to deter war through collective defense, but their fatal flaw was that a conflict between any two major powers would automatically drag in all the others — turning a regional crisis into a continental war.",
      },
      {
        question: "What long-term outcome of WWI planted the seeds of World War II?",
        options: ["The spread of communism to Germany", "The division of Germany into two states", "The punitive Versailles Treaty that humiliated Germany", "The loss of the Austro-Hungarian Empire"],
        correctIndex: 2,
        explanation: "The punitive Versailles Treaty (1919) imposed enormous reparations, territorial losses, and a 'war guilt' clause on Germany, creating the economic hardship and national humiliation that Hitler would later exploit to rise to power.",
      },
    ],
    assignment: {
      prompt: "Some historians argue that WWI was 'inevitable' given the forces building up in Europe by 1914. Others argue it was the result of specific, avoidable decisions made in the summer of 1914. In 2–3 paragraphs: (1) Explain which of the four MAIN causes you believe was most significant in causing WWI, providing specific evidence, and (2) Discuss whether the war could have been prevented if any of the key decisions in July–August 1914 had been made differently. Was WWI inevitable?",
      tips: ["Make a clear argument for one MAIN cause but acknowledge the others", "Consider the role of the Schlieffen Plan in removing decision-making flexibility", "Think about specific moments where a different decision might have prevented escalation", "Use evidence: specific alliances, specific actions, specific dates"],
    },
  },

  // ── 7–15: Shorter but complete content ──────────────────────────────────
  {
    id: "7",
    overview: "Explore the genius of da Vinci — his masterworks, his scientific notebooks, and how one man embodied the Renaissance spirit.",
    sections: [
      { title: "The Universal Man", body: "Leonardo da Vinci (1452–1519) was born in Vinci, Tuscany, the illegitimate son of a Florentine notary. Apprenticed to the artist Verrocchio at age 14, he quickly surpassed his master. Leonardo exemplified the Renaissance ideal of the 'uomo universale' — a person of universal knowledge and skill. He painted the Mona Lisa and The Last Supper, but his notebooks reveal an even more astonishing mind: 13,000 pages of drawings and observations covering anatomy, botany, geology, hydraulics, optics, and engineering, many centuries ahead of their time." },
      { title: "Science and Invention", body: "Leonardo's scientific method was remarkably modern: he observed nature carefully, formed hypotheses, and tested them visually. His anatomical drawings, based on dissecting over 30 human corpses, were the most accurate produced until the 17th century. He designed a solar power concentrator, an adding machine, a tank, a helicopter, a parachute, and a hang glider — none of which were built in his lifetime. His studies of water flow, bird flight, and geology were centuries ahead of formal scientific understanding." },
      { title: "Legacy of a Renaissance Genius", body: "Leonardo died in France in 1519, reportedly in the arms of King Francis I, having spent his final years there in royal patronage. The Mona Lisa remains the world's most visited and analyzed painting, and The Last Supper remains one of Christianity's most powerful visual statements. His notebooks were scattered after his death and were not systematically studied for centuries — had they been published, they might have accelerated the Scientific Revolution by a generation. Leonardo represents the Renaissance at its most aspirational: the belief that a single, curious, observant human mind could comprehend the entire universe." },
    ],
    keyFacts: [
      { label: "Born", value: "April 15, 1452, Vinci, Tuscany" },
      { label: "The Last Supper", value: "c. 1495–1498, Milan" },
      { label: "Mona Lisa", value: "c. 1503–1519" },
      { label: "Notebooks", value: "~13,000 pages of drawings and observations" },
      { label: "Died", value: "May 2, 1519, Amboise, France" },
    ],
    primarySource: { quote: "Learning never exhausts the mind.", attribution: "Leonardo da Vinci, Notebooks" },
    quiz: [
      { question: "What subject areas did Leonardo da Vinci study besides painting?", options: ["Only sculpture", "Only architecture", "Anatomy, engineering, botany, geology, and many more", "Only music and philosophy"], correctIndex: 2, explanation: "Leonardo's 13,000-page notebooks covered anatomy, botany, geology, hydraulics, optics, and engineering — far beyond painting." },
      { question: "How did Leonardo study human anatomy?", options: ["By studying ancient Greek texts", "By dissecting over 30 human corpses", "By observing animals", "By relying on medical illustrations"], correctIndex: 1, explanation: "Leonardo personally dissected over 30 human corpses to create the most accurate anatomical drawings produced until the 17th century." },
      { question: "Why are Leonardo's inventions (helicopter, tank, parachute) historically significant?", options: ["He built and tested all of them", "They show his ideas were centuries ahead of their time", "They were actually built by his assistants", "They were based on Islamic engineering"], correctIndex: 1, explanation: "Leonardo designed workable versions of these technologies centuries before they were independently invented, showing his extraordinary capacity to envision the future." },
      { question: "What happened to Leonardo's scientific notebooks after his death?", options: ["They were published immediately by his students", "They were destroyed by the Church", "They were scattered and not systematically studied for centuries", "They were purchased by the Vatican"], correctIndex: 2, explanation: "Leonardo's notebooks were scattered after his death and not widely published for centuries. Had they been shared, they might have accelerated the Scientific Revolution." },
      { question: "Where did Leonardo spend the final years of his life?", options: ["Florence, under Medici patronage", "Rome, under papal commission", "Venice, working on engineering projects", "France, under the patronage of King Francis I"], correctIndex: 3, explanation: "Leonardo spent his final years in France at the invitation of King Francis I, dying at Amboise in 1519." },
    ],
    assignment: { prompt: "Leonardo da Vinci is often called the ultimate 'Renaissance Man.' In 2–3 paragraphs: (1) Explain why Leonardo's combination of artistic and scientific pursuits was considered exceptional even in the Renaissance, and (2) Discuss what Leonardo's career tells us about the relationship between art and science. Can creative and analytical thinking reinforce each other? Use specific examples from the lesson.", tips: ["Connect Leonardo's art (observation of light, anatomy) to his scientific work", "Think about why the Renaissance valued 'universal' knowledge", "Consider: is the separation of 'art' and 'science' natural, or is it a modern division?"] },
  },

  {
    id: "8",
    overview: "Follow the 4,000-mile trade route connecting East and West, and discover how it spread goods, ideas, and religions across civilizations.",
    sections: [
      { title: "What Was the Silk Road?", body: "The Silk Road was not a single road but a network of trade routes connecting China to the Mediterranean world, stretching over 4,000 miles across Central Asia. The name, coined by a 19th-century German geographer, is misleading — silk was just one of hundreds of commodities traded. Merchants rarely traveled the entire route; instead, goods passed through a series of middlemen across oases cities like Samarkand, Merv, and Kashgar. Chinese silk, spices from Southeast Asia, glass from Rome, and cotton from India all flowed along these routes." },
      { title: "More Than Goods: Ideas on the Move", body: "The Silk Road's greatest impact may not have been commercial but cultural. Buddhism spread from India to China along these routes, transforming East Asia's religious landscape. Islam, after the 7th-century Arab conquests, spread rapidly along the same network. Paper-making, printing, and gunpowder traveled from China to the Islamic world and eventually Europe. The Black Death also traveled along Silk Road trade routes, reaching Europe in 1347. Major cities along the Silk Road — Samarkand, Dunhuang, Constantinople — became cosmopolitan centers where merchants, monks, and diplomats from dozens of cultures met." },
      { title: "Decline and Legacy", body: "The Silk Road's decline came in stages. The Mongol conquests of the 13th century were paradoxically both disruptive and beneficial — the Pax Mongolica (Mongol Peace) briefly made travel across Central Asia safer than at almost any other time. But the Black Death, which followed Mongol trade routes, devastated the populations that sustained overland commerce. The Ottoman conquests of the 15th century made land routes less accessible to European merchants, which eventually motivated Vasco da Gama and Christopher Columbus to seek sea routes to Asia — launching the Age of Exploration. The Silk Road's legacy lives on in the cultural mixing it created." },
    ],
    keyFacts: [
      { label: "Length", value: "~4,000 miles across Central Asia" },
      { label: "Peak period", value: "Han Dynasty to Mongol Empire (200 BCE – 1400 CE)" },
      { label: "Key cities", value: "Samarkand, Merv, Kashgar, Dunhuang" },
      { label: "Goods traded", value: "Silk, spices, glass, paper, cotton, precious metals" },
      { label: "Ideas spread", value: "Buddhism, Islam, paper-making, printing, gunpowder" },
    ],
    primarySource: { quote: "I have seen three Kingdoms, and in each one the people of a dozen nations live side by side.", attribution: "Ibn Battuta, Moroccan traveler, describing Silk Road cities, 14th century" },
    quiz: [
      { question: "Why is the name 'Silk Road' somewhat misleading?", options: ["Silk was never actually traded on it", "It was not a single road and silk was just one of many goods", "Silk only flowed from West to East", "The route was primarily for religious pilgrimage"], correctIndex: 1, explanation: "The Silk Road was a network of routes, not a single road, and traded hundreds of goods — silk, spices, glass, paper, cotton — not just silk." },
      { question: "Which major religion spread from India to East Asia along the Silk Road?", options: ["Christianity", "Islam", "Buddhism", "Hinduism"], correctIndex: 2, explanation: "Buddhism spread from India to China, Japan, and Southeast Asia along Silk Road trade routes, transforming East Asia's religious landscape." },
      { question: "How did the Mongol conquests affect the Silk Road?", options: ["They completely destroyed it", "The Pax Mongolica made travel across Central Asia unusually safe", "They redirected trade to sea routes", "They monopolized all Silk Road trade"], correctIndex: 1, explanation: "The Pax Mongolica (Mongol Peace) briefly made overland Silk Road travel safer than at almost any other period, while also connecting distant parts of Eurasia." },
      { question: "What negative phenomenon also traveled along Silk Road routes?", options: ["The Islamic conquests", "The Crusades", "The Black Death", "The Mongol armies"], correctIndex: 2, explanation: "The Black Death (bubonic plague) traveled along Silk Road trade routes from Central Asia to China and then westward to Europe, reaching there in 1347." },
      { question: "How did the decline of the Silk Road contribute to the Age of Exploration?", options: ["European explorers wanted to map Central Asia", "Ottoman control of land routes motivated Europeans to seek sea routes to Asia", "Chinese emperors closed their ports to foreign traders", "The Mongols blocked European merchants"], correctIndex: 1, explanation: "When Ottoman conquests made overland routes less accessible, Europeans were motivated to find sea routes to Asian markets — inspiring voyages by da Gama, Columbus, and others." },
    ],
    assignment: { prompt: "The Silk Road is sometimes called 'the world's first information superhighway.' In 2–3 paragraphs: (1) Explain how the Silk Road spread not just goods but ideas, religions, and technologies, using specific examples, and (2) Discuss whether you think the cultural exchanges enabled by the Silk Road were generally beneficial or harmful. Consider both positive exchanges and negative transmissions (like the plague).", tips: ["Use specific examples: Buddhism, Islam, paper, gunpowder, plague", "Think about what cosmopolitan trade cities like Samarkand represented", "Consider perspective: who benefited and who was harmed by Silk Road exchanges?"] },
  },

  {
    id: "9",
    overview: "From Sputnik to Apollo 11 — the story of how Cold War rivalry pushed humanity beyond Earth for the first time.",
    sections: [
      { title: "Origins in Cold War Rivalry", body: "On October 4, 1957, the Soviet Union launched Sputnik — a 184-pound metal sphere — into Earth's orbit, becoming the first nation to put a satellite in space. The beeping signal it broadcast back to Earth shocked the American public and government. If the Soviets could put a satellite in orbit, they could theoretically put a nuclear warhead anywhere on Earth. The Space Race was fundamentally driven by Cold War geopolitics: space became an arena where the United States and Soviet Union competed to demonstrate the superiority of their economic and political systems. Every launch was a propaganda event." },
      { title: "Racing to the Moon", body: "The Soviets achieved a string of firsts: first satellite, first living creature in space (the dog Laika, 1957), first human in space (Yuri Gagarin, April 12, 1961), first spacewalk (Alexei Leonov, 1965). Each Soviet success prompted American anxiety. President Kennedy, seeking a dramatic goal that America could realistically win, committed the United States in May 1961 to 'landing a man on the Moon and returning him safely to the Earth before this decade is out.' The Apollo program that followed was the largest peacetime scientific and engineering project in history, employing at its peak 400,000 people." },
      { title: "Apollo 11 and Legacy", body: "On July 20, 1969, Neil Armstrong became the first human to walk on the Moon, famously declaring: 'That's one small step for man, one giant leap for mankind.' Buzz Aldrin joined him minutes later; Michael Collins orbited above in the command module. An estimated 600 million people — one-fifth of humanity at the time — watched on television. Six Apollo missions landed on the Moon between 1969 and 1972. The technological legacy of the Space Race includes satellite communications, GPS, weather forecasting, miniaturized electronics, and medical imaging technology. The Moon landings remain one of humanity's greatest collective achievements." },
    ],
    keyFacts: [
      { label: "Sputnik launched", value: "October 4, 1957" },
      { label: "First human in space", value: "Yuri Gagarin, April 12, 1961" },
      { label: "Kennedy's commitment", value: "May 1961 — 'to the Moon before decade's end'" },
      { label: "Moon landing", value: "July 20, 1969 — Neil Armstrong" },
      { label: "Last Moon landing", value: "Apollo 17, December 1972" },
    ],
    primarySource: { quote: "That's one small step for man, one giant leap for mankind.", attribution: "Neil Armstrong, July 20, 1969, Sea of Tranquility, the Moon" },
    quiz: [
      { question: "Why did Sputnik's launch in 1957 create alarm in the United States?", options: ["Americans feared Soviet spying from orbit", "If Soviets could orbit a satellite, they could potentially deliver nuclear weapons anywhere", "The US had been trying to launch a satellite first", "Sputnik was broadcasting anti-American messages"], correctIndex: 1, explanation: "Sputnik's military implication was clear: if the Soviets could put a satellite in orbit, they had the technology to put a nuclear warhead anywhere on Earth." },
      { question: "What was Yuri Gagarin's historical achievement in April 1961?", options: ["He was the first human to orbit the Moon", "He was the first human to travel in space", "He performed the first spacewalk", "He landed on the Moon"], correctIndex: 1, explanation: "Yuri Gagarin became the first human to travel in space on April 12, 1961, completing one orbit of Earth in 108 minutes." },
      { question: "Why did President Kennedy choose the Moon as America's space goal?", options: ["Scientists believed it was scientifically the most valuable target", "It was a dramatic goal that America could realistically win", "The Soviet Union had already landed robots on the Moon", "Congress demanded a lunar mission"], correctIndex: 1, explanation: "Kennedy selected the Moon landing because it was dramatic enough to inspire the nation but achievable within a decade — a goal where American resources could potentially overcome the Soviet head start." },
      { question: "How many people watched the Apollo 11 Moon landing on television?", options: ["10 million", "50 million", "150 million", "About 600 million — one-fifth of humanity"], correctIndex: 3, explanation: "An estimated 600 million people worldwide — roughly one-fifth of the global population — watched Apollo 11's Moon landing on television, making it one of the most watched events in history." },
      { question: "Besides space exploration, what practical technologies emerged from the Space Race?", options: ["Nuclear power plants", "The internet", "Satellite communications, GPS, and miniaturized electronics", "Jet aircraft and modern highways"], correctIndex: 2, explanation: "The Space Race's technological legacy includes satellite communications, GPS navigation, weather forecasting satellites, miniaturized electronics, and medical imaging technologies." },
    ],
    assignment: { prompt: "President Kennedy committed America to the Moon landing in 1961, saying Americans chose to go 'not because it is easy, but because it is hard.' In 2–3 paragraphs: (1) Explain how Cold War politics shaped the Space Race — was it primarily about science or something else? — and (2) Evaluate the legacy of the Space Race. Was the enormous investment of resources ($25 billion for Apollo alone) justified? What did humanity gain beyond planting a flag on the Moon?", tips: ["Consider the military and propaganda motivations alongside the scientific ones", "Think about the technologies that came from the Space Race and their everyday impact", "Consider: what does the Space Race tell us about how competition can drive innovation?"] },
  },

  { id: "10", overview: "How a 1215 charter in England laid groundwork for constitutional government and limits on royal power.", sections: [{ title: "King John and the Barons", body: "In 1215, King John of England faced a rebellion from his own barons, frustrated by his heavy taxation, arbitrary imprisonments, and failed military campaigns in France. Meeting at Runnymede meadow on the Thames in June 1215, John was forced to affix his seal to Magna Carta — the Great Charter — a document that placed specific limitations on royal power for the first time in English history. Though John immediately sought papal annulment of the charter (which was granted), it was reissued by subsequent kings and became a foundational constitutional document." }, { title: "Key Principles of Magna Carta", body: "Magna Carta's 63 clauses dealt mainly with practical feudal grievances, but three principles proved historically transformative. Clause 39 stated that no free man could be imprisoned, dispossessed, or destroyed except 'by the lawful judgment of his peers or by the law of the land' — the origin of due process and the right to trial by jury. Clause 40 declared 'To no one will we sell, to no one will we refuse or delay, right or justice.' And Clause 61 established a council of 25 barons with the right to compel the king to observe the charter — an early concept of constitutional accountability." }, { title: "Legacy: From Medieval England to Modern Democracy", body: "Magna Carta's immediate impact was limited — it applied only to free men (perhaps 10% of England's population) and was frequently violated. But its symbolic and legal importance grew enormously over centuries. In the 17th century, lawyers like Edward Coke invoked Magna Carta against the Stuart kings to argue for parliamentary supremacy. English colonists in America cited Magna Carta as authority for their rights; the Fifth and Fourteenth Amendments to the US Constitution echo its language. The Universal Declaration of Human Rights (1948) builds on the same tradition. Magna Carta established the principle that even the most powerful ruler is subject to law." }], keyFacts: [{ label: "Signed", value: "June 15, 1215, Runnymede, England" }, { label: "Key clause", value: "Clause 39 — due process; no imprisonment without lawful judgment" }, { label: "Who benefited", value: "Initially only free men (~10% of population)" }, { label: "Later influence", value: "US Constitution, Bill of Rights, Universal Declaration of Human Rights" }], primarySource: { quote: "No free man shall be seized, imprisoned, dispossessed, outlawed, exiled or in any way ruined... except by the lawful judgement of his peers or by the law of the land.", attribution: "Magna Carta, Clause 39, 1215" }, quiz: [{ question: "What forced King John to sign Magna Carta?", options: ["A peasant rebellion", "An invasion by France", "A rebellion by his own barons", "A decree from the Pope"], correctIndex: 2, explanation: "Magna Carta was the result of a baronial rebellion against John's tyrannical rule — the barons forced him to seal the document at Runnymede in June 1215." }, { question: "What principle did Magna Carta Clause 39 establish?", options: ["The right to vote in elections", "No free man could be imprisoned without lawful judgment of peers — the basis of due process", "All taxes required parliamentary approval", "The king could not declare war without council approval"], correctIndex: 1, explanation: "Clause 39 established that no free man could be imprisoned or harmed except through lawful judgment — the foundation of due process and trial by jury." }, { question: "Who benefited from Magna Carta when it was first signed?", options: ["All English people", "Serfs and peasants", "Only free men, about 10% of the population", "Only nobility and clergy"], correctIndex: 2, explanation: "Initially Magna Carta protected only 'free men' — about 10% of England's population. The majority were serfs who had no legal standing under the charter." }, { question: "How did Magna Carta influence American law?", options: ["The Constitution was directly copied from it", "American colonists cited it as authority for their rights; it influenced the Fifth and Fourteenth Amendments", "It was brought to America by the Pilgrims", "Benjamin Franklin specifically referred to it in the Declaration of Independence"], correctIndex: 1, explanation: "English colonists cited Magna Carta to justify resistance to royal authority, and its principles echo in the Fifth and Fourteenth Amendments to the US Constitution." }, { question: "What happened immediately after King John sealed Magna Carta?", options: ["He faithfully implemented all its clauses", "He sought papal annulment — and the Pope granted it", "The barons assassinated him", "Parliament ratified the document"], correctIndex: 1, explanation: "John immediately appealed to Pope Innocent III, who annulled the charter. However, it was reissued by subsequent kings and eventually became permanent constitutional law." }], assignment: { prompt: "Magna Carta has been called 'the foundation stone of English liberty.' In 2–3 paragraphs: (1) Explain what specific principles Magna Carta established and why they were revolutionary in 1215, and (2) Trace how those principles influenced later developments in constitutional government — either in Britain or America. Does a document from 1215 still matter in 2026?", tips: ["Focus on the key clauses — due process, equal justice, constitutional accountability", "Think about how a document meant to protect barons became a protection for everyone", "Consider: why do modern democracies still cite an 800-year-old charter as a precedent?"] } },

  { id: "11", overview: "A deeply respectful examination of the Holocaust — its origins, execution, liberation, and why we must never forget.", sections: [{ title: "Origins: How the Unthinkable Became Policy", body: "The Holocaust — the systematic, state-sponsored persecution and murder of six million Jews and millions of others by the Nazi regime — did not emerge suddenly. It developed in stages between 1933 and 1945. When Adolf Hitler became Chancellor in January 1933, the Nazis implemented increasingly discriminatory laws: the Nuremberg Laws of 1935 stripped Jews of citizenship and prohibited marriage between Jews and non-Jews. Jews were progressively excluded from professions, schools, and public life. Kristallnacht (November 9-10, 1938) saw organized nationwide violence against Jewish properties, businesses, and synagogues, with 91 Jews killed, thousands arrested, and over 7,000 businesses destroyed." }, { title: "The Machinery of Genocide", body: "With the invasion of the Soviet Union in 1941, Nazi policy shifted toward mass murder. Mobile killing units (Einsatzgruppen) followed the army and shot over 1.5 million Soviet Jews. The Wannsee Conference of January 1942 coordinated the 'Final Solution' — the systematic murder of all Jews in Nazi-controlled Europe. A network of six extermination camps — Auschwitz-Birkenau, Treblinka, Sobibor, Belzec, Chelmno, and Majdanek — was built in occupied Poland, killing an estimated 3 million Jews with industrial efficiency. Auschwitz-Birkenau alone killed over 1 million people." }, { title: "Liberation, Memory, and the Imperative of 'Never Again'", body: "Allied forces began liberating concentration camps in 1945. What they found shocked even battle-hardened soldiers: the scale of industrial killing, the condition of survivors, and the meticulous records the Nazis had kept. The Nuremberg Trials (1945-46) established the precedent of holding individuals accountable for war crimes and crimes against humanity. The United Nations' Genocide Convention (1948) and Universal Declaration of Human Rights (1948) emerged directly from the Holocaust. The state of Israel was established in 1948. Holocaust education, memorials, and survivor testimony continue the vital work of ensuring these events are never forgotten and never repeated." }], keyFacts: [{ label: "Jewish victims", value: "~6 million (two-thirds of European Jewry)" }, { label: "Total victims", value: "~11 million including Roma, disabled, Soviet POWs, political prisoners" }, { label: "Wannsee Conference", value: "January 20, 1942 — coordination of 'Final Solution'" }, { label: "Auschwitz-Birkenau", value: "Largest extermination camp; over 1 million killed" }, { label: "Liberation began", value: "1945; Nuremberg Trials followed 1945-46" }], primarySource: { quote: "First they came for the socialists, and I did not speak out — because I was not a socialist... Then they came for me — and there was no one left to speak for me.", attribution: "Pastor Martin Niemöller, reflecting on the Holocaust's progression, written c. 1946" }, quiz: [{ question: "What were the Nuremberg Laws of 1935?", options: ["Laws governing the conduct of the German army", "Laws that stripped Jews of citizenship and prohibited Jewish-German marriage", "Laws requiring Jews to register their property", "Laws establishing the death penalty for political opposition"], correctIndex: 1, explanation: "The Nuremberg Laws (1935) stripped Jews of German citizenship and prohibited marriage or sexual relations between Jews and non-Jews — a critical step in the legal dehumanization of Jews." }, { question: "What was decided at the Wannsee Conference in January 1942?", options: ["The invasion plan for the Soviet Union", "The coordination of the 'Final Solution' — the systematic murder of all European Jews", "How to respond to American entry into the war", "The construction of the Atlantic Wall"], correctIndex: 1, explanation: "The Wannsee Conference coordinated the 'Final Solution' — the systematic murder of all Jews in Nazi-controlled Europe, involving multiple agencies of the German state." }, { question: "What were the Einsatzgruppen?", options: ["Elite German panzer divisions", "Mobile killing units that shot over 1.5 million Soviet Jews", "Prisoner transport units", "Nazi propaganda teams"], correctIndex: 1, explanation: "Einsatzgruppen were mobile killing units that followed the German army into the Soviet Union and systematically shot Jewish populations — killing over 1.5 million people." }, { question: "What legal precedent did the Nuremberg Trials establish?", options: ["That nations could not be held responsible for wartime actions", "That individuals could be held criminally responsible for war crimes and crimes against humanity", "That the victors of a war could annex the loser's territory", "That religion could not be the basis for discrimination"], correctIndex: 1, explanation: "The Nuremberg Trials established the critical precedent that individuals — including heads of state and military commanders — could be held personally accountable for crimes against humanity." }, { question: "Which international agreements emerged directly from the Holocaust's lessons?", options: ["The NATO alliance and Marshall Plan", "The Geneva Conventions on warfare", "The UN Genocide Convention and Universal Declaration of Human Rights (1948)", "The Nuclear Non-Proliferation Treaty"], correctIndex: 2, explanation: "The United Nations Genocide Convention and Universal Declaration of Human Rights (both 1948) emerged directly from the determination that the Holocaust must never be repeated." }], assignment: { prompt: "Pastor Niemöller's famous poem warns about the danger of silence in the face of injustice. In 2–3 paragraphs: (1) Explain how the Holocaust 'happened gradually' — trace the progression from legal discrimination to genocide — and (2) Discuss what obligations the Holocaust places on us today. What does 'Never Again' actually require of individuals, societies, and the international community? Be specific.", tips: ["Trace the specific steps: Nuremberg Laws (1935), Kristallnacht (1938), Wannsee (1942)", "Consider the role of ordinary people — bystanders, collaborators, resisters", "Think about the Niemöller poem's message about the danger of silence", "What specific actions or institutions today reflect the lessons of the Holocaust?"] } },

  { id: "12", overview: "Trace how dozens of nations won independence between 1945 and 1975 and the complex legacies of colonial rule.", sections: [{ title: "The End of European Empires", body: "In 1945, European colonial powers controlled roughly one-third of the world's land surface. By 1975, most of this empire was gone. Decolonization — the process by which colonies achieved independence — was driven by multiple forces: the weakening of European powers by two world wars, the ideological contradictions of fighting for freedom against Nazi tyranny while denying it to colonial subjects, the rise of educated nationalist movements that used the colonizers' own democratic and liberal language against them, and Cold War superpowers (US and USSR) that for different reasons preferred independent nations to European colonies." }, { title: "Paths to Independence: Violence and Negotiation", body: "Decolonization took different paths in different places. India (1947) achieved independence through decades of non-violent resistance led by Gandhi, though partition into India and Pakistan caused immense violence — perhaps 200,000-2 million deaths and 14 million displaced. Algeria (1954-62) fought a brutal guerrilla war against France, with both sides committing atrocities; about 300,000 Algerians and 25,000 French soldiers died. Ghana (1957) became the first sub-Saharan African nation to gain independence peacefully, under Kwame Nkrumah's nationalist movement, inspiring independence movements across the continent." }, { title: "Legacy: The Long Aftermath", body: "Decolonization left complex and often painful legacies. Colonial borders — drawn by Europeans with little regard for ethnic, religious, or linguistic communities — became the borders of new nations, causing conflicts that persist today. Colonial economies had been structured to extract raw materials for European industry, leaving new nations with little industrial base. Many newly independent nations found themselves caught between American and Soviet Cold War competition, with both superpowers willing to support dictators and destabilize democracies for strategic advantage. The struggle to build functioning states and economies from colonial foundations remains one of the defining challenges of the modern world." }], keyFacts: [{ label: "Peak decolonization", value: "1945–1975; over 80 new nations created" }, { label: "India independence", value: "August 15, 1947; partition created Pakistan" }, { label: "First African independence", value: "Ghana, 1957, led by Kwame Nkrumah" }, { label: "Algerian War", value: "1954–1962; ~300,000 Algerian deaths" }, { label: "UN membership growth", value: "51 members (1945) → 127 (1970) — mostly new nations" }], primarySource: { quote: "The independence of Ghana is meaningless unless it is linked up with the total liberation of Africa.", attribution: "Kwame Nkrumah, Independence Day speech, March 6, 1957" }, quiz: [{ question: "What were the main forces driving decolonization after 1945?", options: ["European generosity and democratic values", "Weakened European powers, ideological contradictions, nationalist movements, and Cold War pressure", "United Nations resolutions requiring independence", "Economic failure of colonies that made them too expensive to maintain"], correctIndex: 1, explanation: "Decolonization resulted from multiple intersecting forces: European weakness after WWII, the ideological hypocrisy of denying freedom while fighting for it, nationalist movements, and Cold War pressure." }, { question: "What caused violence during Indian independence in 1947?", options: ["British military resistance to independence", "Partition of India into separate Hindu and Muslim nations", "A communist revolution in parts of India", "Border disputes with China"], correctIndex: 1, explanation: "While Indian independence was achieved largely through non-violent resistance, the partition of British India into India and Pakistan caused massive communal violence — hundreds of thousands died." }, { question: "Which was the first sub-Saharan African nation to gain independence?", options: ["Nigeria", "South Africa", "Kenya", "Ghana"], correctIndex: 3, explanation: "Ghana became the first sub-Saharan African nation to gain independence in 1957, under Kwame Nkrumah's leadership, inspiring independence movements across the continent." }, { question: "Why did colonial borders cause persistent problems in newly independent nations?", options: ["They were drawn to make the countries too small to be viable", "They were drawn by Europeans with no regard for ethnic, religious, or linguistic communities", "They were disputed by neighboring colonial powers", "They were drawn to prevent trade between neighboring nations"], correctIndex: 1, explanation: "Colonial borders were drawn at conferences like the Berlin Conference (1884-85) with little or no regard for the communities living there, dividing ethnic groups between countries and forcing hostile groups together." }, { question: "How did the Cold War affect newly independent nations?", options: ["The US and USSR helped them build strong democratic governments", "Both superpowers left new nations alone to develop independently", "Both superpowers competed for influence, often supporting dictators for strategic advantage", "The Cold War had no effect outside Europe"], correctIndex: 2, explanation: "Cold War competition led both the US and USSR to support authoritarian leaders who aligned with their interests, often destabilizing newly independent democracies and undermining development." }], assignment: { prompt: "A colonial power once claimed it was 'preparing' its colonies for eventual self-government. In 2–3 paragraphs: (1) Evaluate this claim — what did colonial rule actually leave behind for newly independent nations, both positive and negative? — and (2) Discuss whether the problems facing many former colonies today (poverty, instability, weak institutions) are primarily the result of colonial legacies or of decisions made after independence. Use specific examples.", tips: ["Be balanced: consider what infrastructure or institutions colonialism created, but also what it exploited or destroyed", "Think about the specific problem of colonial borders", "Consider: how long can colonial legacies be blamed for current problems?"] } },

  { id: "13", overview: "Trace the struggle for racial equality in America from Brown v. Board of Education to the Civil Rights Act of 1964.", sections: [{ title: "The World the Civil Rights Movement Challenged", body: "In 1950, Black Americans in the South lived under a system of legal racial segregation known as Jim Crow — a network of laws enforcing separation in schools, transportation, restaurants, hotels, swimming pools, water fountains, and virtually every aspect of public life. This system was backed by violence: between 1877 and 1950, over 4,000 lynchings were recorded in the American South. Despite the 14th and 15th Amendments theoretically guaranteeing equal citizenship and voting rights, systematic disenfranchisement through poll taxes, literacy tests, and terror made voting nearly impossible for most Black Southerners." }, { title: "Key Moments and Leaders", body: "The modern Civil Rights Movement is usually dated from the Supreme Court's unanimous Brown v. Board of Education decision (1954), which declared racial segregation in public schools unconstitutional, overturning the 'separate but equal' doctrine established in Plessy v. Ferguson (1896). The Montgomery Bus Boycott (1955-56), sparked by Rosa Parks' refusal to give up her bus seat and sustained for 381 days by the Black community, ended with the Supreme Court declaring bus segregation unconstitutional. It also launched the career of Dr. Martin Luther King Jr., who articulated a philosophy of non-violent direct action inspired by Gandhi. The Birmingham Campaign (1963), Freedom Rides, and March on Washington ('I Have a Dream' speech, August 28, 1963) built irresistible national pressure for legislative action." }, { title: "The Civil Rights Act and Its Limits", body: "The Civil Rights Act of 1964, signed by President Lyndon Johnson, prohibited discrimination based on race, color, religion, sex, or national origin in employment and public accommodations. The Voting Rights Act of 1965, passed after the brutal police response to marchers at the Edmund Pettus Bridge in Selma (Bloody Sunday, March 7, 1965), prohibited voting discrimination and enabled millions of Black Americans to vote for the first time. These were extraordinary achievements. But civil rights leaders recognized their limits: legal equality was not economic equality. The 'Poor People's Campaign' that King was organizing when he was assassinated in April 1968 sought to address systemic poverty — a struggle that continues today." }], keyFacts: [{ label: "Brown v. Board", value: "1954 — school segregation declared unconstitutional" }, { label: "Montgomery Boycott", value: "1955-56; 381 days; desegregated buses" }, { label: "March on Washington", value: "August 28, 1963; King's 'I Have a Dream' speech" }, { label: "Civil Rights Act", value: "Signed July 2, 1964" }, { label: "Voting Rights Act", value: "Signed August 6, 1965" }], primarySource: { quote: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.", attribution: "Dr. Martin Luther King Jr., March on Washington, August 28, 1963" }, quiz: [{ question: "What was the Jim Crow system?", options: ["A network of laws enforcing racial segregation in the South", "A federal program to limit immigration", "A series of constitutional amendments", "A system of economic regulation"], correctIndex: 0, explanation: "Jim Crow laws enforced racial segregation across the South — separating schools, transportation, restaurants, and virtually all public spaces by race, backed by legal authority and violence." }, { question: "What did Brown v. Board of Education (1954) decide?", options: ["That slavery had been unconstitutional", "That racial segregation in public schools was unconstitutional", "That poll taxes were illegal", "That all Jim Crow laws must be repealed immediately"], correctIndex: 1, explanation: "In a unanimous decision, the Supreme Court ruled that racial segregation in public schools violated the 14th Amendment's equal protection clause, overturning the 'separate but equal' doctrine." }, { question: "What principle guided Dr. Martin Luther King Jr.'s strategy?", options: ["Armed self-defense", "Political negotiation and voting", "Non-violent direct action, inspired by Gandhi", "Economic boycotts only"], correctIndex: 2, explanation: "King advocated for non-violent direct action — peaceful confrontation of injustice that would expose the violence of the segregation system to national and international audiences, inspired by Gandhi's methods in India." }, { question: "What happened at the Edmund Pettus Bridge in Selma on March 7, 1965?", options: ["Martin Luther King Jr. was assassinated", "A peaceful march was attacked by police with clubs and tear gas — 'Bloody Sunday'", "President Johnson signed the Voting Rights Act", "A major civil rights victory was achieved"], correctIndex: 1, explanation: "On 'Bloody Sunday,' peaceful marchers were brutally attacked by police with clubs and tear gas on the Edmund Pettus Bridge. Televised images of the attack shocked the nation and accelerated passage of the Voting Rights Act." }, { question: "What did the Voting Rights Act of 1965 accomplish?", options: ["It gave Black Americans the right to own property", "It desegregated schools nationwide", "It prohibited voting discrimination and enabled millions of Black Americans to vote for the first time", "It eliminated all racial discrimination in hiring"], correctIndex: 2, explanation: "The Voting Rights Act prohibited discriminatory voting practices and enabled federal oversight of elections in areas with histories of discrimination, allowing millions of Black Americans to vote for the first time." }], assignment: { prompt: "Dr. King's 'Letter from Birmingham Jail' argued that 'one has not only a legal but a moral responsibility to obey just laws' and equally, 'a moral responsibility to disobey unjust laws.' In 2–3 paragraphs: (1) Using specific examples from the Civil Rights Movement, explain how non-violent direct action worked as a strategy for social change, and (2) Evaluate the Civil Rights Movement's achievements and limitations. Did the Civil Rights Act and Voting Rights Act solve the problem of racial inequality in America?", tips: ["Think about how non-violent protest exposed the violence of the system to national TV audiences", "Discuss specific tactics: boycotts, sit-ins, marches, and their outcomes", "Be honest about limitations: legal equality vs. economic equality", "Consider what King was fighting for when he was killed in 1968"] } },

  { id: "14", overview: "From the fall of the Bastille to Napoleon — liberty, terror, and the birth of modern political ideology.", sections: [{ title: "The Crisis of 1789", body: "France in 1789 was a society under enormous strain. Years of expensive wars (including support for the American Revolution), court extravagance, and successive crop failures had left the royal treasury bankrupt and millions of French people hungry. The Estates-General — France's medieval representative assembly, not convened since 1614 — was called to address the fiscal crisis. The three estates (clergy, nobility, and commoners) arrived in May 1789 with fundamental disagreements about voting procedures. When Louis XVI attempted to dismiss the reformers, the Parisians rose. On July 14, 1789, a crowd stormed the Bastille — a royal fortress and prison — a moment of symbolic revolutionary rupture." }, { title: "Liberty, Equality, Terror", body: "The Revolution moved through distinct phases. The Constitutional Monarchy phase (1789-1792) produced the Declaration of the Rights of Man and Citizen (August 1789), one of history's foundational human rights documents, and the Civil Constitution of the Clergy, which provoked deep Catholic opposition. France declared war on Austria in 1792; war emergency radicalized the Revolution. The First French Republic was declared in September 1792; Louis XVI was executed by guillotine in January 1793. The Reign of Terror (1793-94) under Maximilien Robespierre's Committee of Public Safety sent over 16,000 people to the guillotine in the name of protecting the Revolution from its enemies — until Robespierre himself was arrested and executed in Thermidor (July 1794)." }, { title: "Napoleon and Revolution's Legacy", body: "From the chaos of the Revolution emerged Napoleon Bonaparte, a brilliant Corsican military officer who seized power in a coup in 1799. Napoleon consolidated Revolutionary gains — the Napoleonic Code (1804) was the first modern legal system based on equality before the law, separation of church and state, and legal protection for private property — while establishing himself as Emperor in 1804. His conquests spread Revolutionary principles across Europe, unintentionally inspiring nationalist movements that would reshape the continent. Napoleon's defeat and exile ended French imperial ambitions but not Revolutionary ideas; the concepts of popular sovereignty, nationalism, and civil rights that the Revolution unleashed would transform the world throughout the 19th and 20th centuries." }], keyFacts: [{ label: "Storming of Bastille", value: "July 14, 1789 — French National Day" }, { label: "Declaration of Rights", value: "August 26, 1789" }, { label: "Louis XVI executed", value: "January 21, 1793" }, { label: "Reign of Terror", value: "1793-94; ~16,000 executed" }, { label: "Napoleon overthrown", value: "1815, Battle of Waterloo" }], primarySource: { quote: "Liberty, Equality, Fraternity — or Death.", attribution: "Motto of the French Republic, adopted during the Revolution" }, quiz: [{ question: "What immediate crisis triggered the French Revolution in 1789?", options: ["A foreign invasion of France", "A royal assassination", "Royal bankruptcy, food shortages, and political deadlock at the Estates-General", "A military defeat against Britain"], correctIndex: 2, explanation: "The Revolution emerged from the convergence of royal bankruptcy, years of poor harvests causing food shortages, and political deadlock when the Estates-General met in May 1789." }, { question: "What was the Reign of Terror?", options: ["Napoleon's military campaigns across Europe", "Robespierre's Committee of Public Safety executing over 16,000 in the name of protecting the Revolution", "The period of mob violence before the Revolution began", "The years of warfare against Austria and Prussia"], correctIndex: 1, explanation: "The Reign of Terror (1793-94) saw over 16,000 people guillotined under Robespierre's Committee of Public Safety, which claimed it was eliminating enemies of the Revolution." }, { question: "What was the significance of the Napoleonic Code?", options: ["It established absolute monarchy in France", "It was the first modern legal system based on equality before law and separation of church and state", "It created the modern French military structure", "It was a new French constitution"], correctIndex: 1, explanation: "The Napoleonic Code was revolutionary: it established equal legal standing for all citizens, separation of church and state, and legal protection for private property — principles that spread across Europe." }, { question: "How did Napoleon's conquests spread Revolutionary ideas?", options: ["He forced conquered peoples to adopt French customs", "His armies carried Revolutionary principles to new territories, inspiring nationalist movements", "He established French colonies that taught Revolutionary ideology", "He sent French diplomats to spread ideas peacefully"], correctIndex: 1, explanation: "Napoleon's conquests, paradoxically, spread the Revolutionary ideas of popular sovereignty and nationalism to territories across Europe — eventually inspiring the very nationalist movements that contributed to his defeat." }, { question: "How did the French Revolution's ideas affect the 19th and 20th centuries?", options: ["They had little impact outside France", "The concepts of popular sovereignty, nationalism, and civil rights transformed political movements worldwide", "They primarily influenced military strategy", "They were quickly forgotten after Napoleon's defeat"], correctIndex: 1, explanation: "The French Revolution's core concepts — popular sovereignty, nationalism, civil rights, equality before law — spread across the world throughout the 19th and 20th centuries, shaping revolutions, independence movements, and democratic reforms worldwide." }], assignment: { prompt: "The French Revolution promised 'Liberty, Equality, Fraternity' but delivered, at least temporarily, the Reign of Terror and eventually Napoleon's dictatorship. In 2–3 paragraphs: (1) Explain how a revolution that began with the Declaration of Rights of Man ended in mass executions and dictatorship, and (2) Evaluate the French Revolution's long-term legacy. Was it ultimately a success or a failure for the values it proclaimed? Consider both France's history and the Revolution's global impact.", tips: ["Trace the specific steps from 1789 to the Terror — what changed and why?", "Think about the tensions between liberty and security, idealism and power", "Consider: can a revolution that produced Napoleon still be called a success for liberty?", "Look at the spread of the Napoleonic Code and its legacy"] } },

  { id: "15", overview: "How thirteen colonies challenged an empire and forged a new republic founded on Enlightenment ideals.", sections: [{ title: "The Road to Revolution", body: "The American Revolution grew from colonial resentment of British taxation without colonial representation in Parliament. After the French and Indian War (1754-63), Britain sought to recoup its enormous war costs by taxing its American colonies. The Stamp Act (1765), Townshend Acts (1767), and Tea Act (1773) provoked escalating resistance. Colonial opposition was articulated in philosophical terms drawn from Enlightenment thinkers: Locke's theory of natural rights (life, liberty, and property), Montesquieu's separation of powers, and Rousseau's social contract all influenced colonial thinkers. The slogan 'No taxation without representation' encapsulated the constitutional argument." }, { title: "Independence and War", body: "The Continental Congress voted to declare independence on July 2, 1776; Thomas Jefferson's Declaration of Independence, adopted July 4, articulated the philosophical case: 'all men are created equal, endowed with certain unalienable rights — life, liberty, and the pursuit of happiness.' This was the first time a nation founded itself on an explicit philosophical argument about human rights rather than tradition, divine right, or conquest. The Revolutionary War (1775-1783) was far from inevitable — the Continental Army under George Washington was badly outgunned by British forces. The French alliance (1778), forged partly through Benjamin Franklin's diplomatic skill, proved decisive; French troops and naval support enabled the victory at Yorktown (1781) that effectively ended the war." }, { title: "Building the Republic", body: "The new nation faced the enormous challenge of creating stable self-government. The Articles of Confederation (1781) proved too weak — they created a national government that could not tax, draft soldiers, or enforce its laws. The Constitutional Convention of 1787 produced a new framework: a strong federal government with three branches, an elaborate system of checks and balances drawing on Montesquieu, and a federal structure balancing central and state power. The Bill of Rights (1791) added the first ten amendments guaranteeing individual liberties. The American example inspired revolutionaries in France (1789), Latin America (1810s-1820s), and beyond — proving that republican self-government was practically achievable, not merely a philosophical fantasy." }], keyFacts: [{ label: "Stamp Act", value: "1765 — first major resistance" }, { label: "Declaration of Independence", value: "July 4, 1776" }, { label: "French alliance", value: "1778 — proved decisive to American victory" }, { label: "Treaty of Paris", value: "1783 — British recognition of independence" }, { label: "Constitution ratified", value: "1788; Bill of Rights added 1791" }], primarySource: { quote: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.", attribution: "Thomas Jefferson, Declaration of Independence, July 4, 1776" }, quiz: [{ question: "What was the core colonial objection to British taxation expressed in 'No taxation without representation'?", options: ["That taxes were too high", "That Parliament had no right to tax colonists who had no representation in Parliament", "That Britain was using tax revenue to fund wars colonists opposed", "That the taxes violated existing colonial charters"], correctIndex: 1, explanation: "Colonists argued from British constitutional tradition that Parliament could not legitimately tax people who had no representation in it — a right Englishmen had possessed since Magna Carta." }, { question: "Which Enlightenment thinker's theory of natural rights most influenced Jefferson's Declaration?", options: ["Rousseau", "Voltaire", "John Locke", "Montesquieu"], correctIndex: 2, explanation: "John Locke's theory that all people possess natural rights — life, liberty, and property — directly influenced Jefferson, who adapted it to 'life, liberty, and the pursuit of happiness.'" }, { question: "Why was the French alliance crucial to American victory?", options: ["France provided a new constitution for America", "French loans paid for the entire war", "French troops and naval support enabled the decisive victory at Yorktown", "France recognized American independence before the war ended"], correctIndex: 2, explanation: "The French alliance (1778), secured largely through Benjamin Franklin's diplomacy, provided troops and — critically — naval power that enabled the victory at Yorktown (1781), effectively ending British military resistance." }, { question: "What was wrong with the Articles of Confederation?", options: ["They gave the federal government too much power", "They could not tax, draft soldiers, or enforce laws — too weak to govern effectively", "They were never ratified by all states", "They failed to include a bill of rights"], correctIndex: 1, explanation: "The Articles created a national government so weak it couldn't tax, draft soldiers, or enforce its own laws. This weakness led to the Constitutional Convention of 1787." }, { question: "How did the American Revolution inspire other revolutions?", options: ["It directly caused the French Revolution by sending troops", "It proved that republican self-government was practically achievable, not just a philosophical idea", "It created a template that France and Latin America copied exactly", "It inspired Britain to democratize itself immediately"], correctIndex: 1, explanation: "The American Revolution was the first successful republican revolution, proving to the world that Enlightenment ideals of self-government could be implemented in practice — inspiring the French Revolution and Latin American independence movements." }], assignment: { prompt: "The Declaration of Independence proclaimed that 'all men are created equal' — yet many of its signers enslaved other human beings. In 2–3 paragraphs: (1) Explain what the Declaration of Independence meant to those who wrote and signed it, and why it was revolutionary for its time, and (2) Evaluate this contradiction honestly. How should we understand a founding document that proclaimed universal equality while its authors practiced slavery? Does this contradiction diminish the Declaration's importance?", tips: ["Recognize what was genuinely radical about universal natural rights in 1776", "Be honest about the contradiction — don't dismiss or ignore it", "Consider how the Declaration's language has been used by later movements (abolitionists, suffragists, civil rights) to extend its promises", "Think about how we evaluate historical figures who were both idealistic and complicit in injustice"] } },
];

// ─── Template generator for lessons 16+ ─────────────────────────────────────

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(pseudoRandom(seed) * arr.length)];
}

export function generateLessonContent(lesson: {
  id: string;
  title: string;
  subject: string;
  level: string;
  description: string;
}): LessonContent {
  const seed = parseInt(lesson.id, 10) || 0;

  const overviewParts = [
    `In this lesson, we explore ${lesson.title.toLowerCase()} — a pivotal topic in ${lesson.subject} that shaped the world in lasting ways.`,
    `An in-depth study of ${lesson.title.toLowerCase()}, examining primary sources, key figures, and long-term significance.`,
    `${lesson.description} This lesson traces the causes, events, and consequences that make this topic essential for any student of history.`,
  ];
  const overview = pick(overviewParts, seed);

  const sections: LessonSection[] = [
    {
      title: "Historical Context",
      body: `To understand ${lesson.title}, we must first understand the world it emerged from. ${lesson.subject} provides the broader framework within which these events unfolded. The forces that shaped this period — political, economic, social, and cultural — were deeply interconnected, and ${lesson.title.toLowerCase()} cannot be understood in isolation from them.\n\nHistorians have debated the significance of this topic for generations. Some emphasize the role of powerful individuals; others focus on structural forces like economics, geography, or technology. A complete understanding requires both perspectives: the great figures who made decisions, and the larger forces that shaped their choices and limited their options.\n\nPrimary sources from this period reveal how contemporaries understood these events — often very differently from how historians interpret them today. Paying attention to what people at the time believed, feared, and hoped for helps us understand not just what happened, but why.`,
    },
    {
      title: "Key Events and Developments",
      body: `The core events of ${lesson.title.toLowerCase()} unfolded across a period shaped by competing interests and unexpected turns. Understanding the sequence of events matters: what happened first set the conditions for what came next, and alternatives were foreclosed as decisions accumulated.\n\nAmong the most significant developments was the role played by key actors — individuals whose choices, whether driven by principle, ambition, or circumstance, altered the course of events. Institutions also mattered: governments, religious organizations, economic systems, and social structures all shaped how events unfolded and who bore their consequences.\n\nThe perspective from which we view these events matters enormously. The story looks different from the perspective of rulers and the ruled, colonizers and colonized, the victors and the defeated. A rigorous historical understanding requires holding multiple perspectives simultaneously.`,
    },
    {
      title: "Legacy and Significance",
      body: `The long-term significance of ${lesson.title.toLowerCase()} extends far beyond its immediate historical moment. The patterns it established, the precedents it set, and the changes it introduced — in politics, economics, culture, or society — continue to shape the world we inhabit today.\n\nHistorians assess historical significance by asking: Did this event change the direction of history? Did it affect large numbers of people? Did its effects last? By these measures, ${lesson.title.toLowerCase()} ranks as a genuinely important topic in ${lesson.subject}.\n\nUnderstanding this history is not merely an academic exercise. The past illuminates the present: many of today's most pressing challenges — questions of justice, power, identity, and global order — have roots in the historical processes this lesson examines. History, as the saying goes, may not repeat itself — but it often rhymes.`,
    },
  ];

  const keyFacts: KeyFact[] = [
    { label: "Subject area", value: lesson.subject },
    { label: "Level", value: lesson.level },
    { label: "Primary theme", value: lesson.title },
    { label: "Historical period", value: lesson.subject.includes("Ancient") ? "Before 500 CE" : lesson.subject.includes("Medieval") ? "500–1500 CE" : lesson.subject.includes("Modern") ? "1500–present" : "Various periods" },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      question: `Which field of historical study does "${lesson.title}" primarily belong to?`,
      options: ["Ancient History", "Medieval History", "Modern History", lesson.subject],
      correctIndex: 3,
      explanation: `"${lesson.title}" is a topic in ${lesson.subject}, which focuses on the specific time period and themes covered in this lesson.`,
    },
    {
      question: `What is the most important method for understanding ${lesson.title.toLowerCase()}?`,
      options: ["Relying only on popular accounts", "Examining primary sources and multiple perspectives", "Focusing only on the decisions of major leaders", "Studying only the economic causes"],
      correctIndex: 1,
      explanation: "Historical understanding requires examining primary sources and multiple perspectives, not just single-cause explanations or one-sided accounts.",
    },
    {
      question: "What does 'historical context' mean when studying any event?",
      options: ["The exact dates of events", "The broader political, economic, and social conditions that shaped what happened", "A summary of what historians have written", "The geographical location of events"],
      correctIndex: 1,
      explanation: "Historical context means understanding the broader conditions — political, economic, social, cultural — within which events unfolded, which is essential for any rigorous historical analysis.",
    },
    {
      question: "Why do historians emphasize studying multiple perspectives on historical events?",
      options: ["To make history more complicated", "Because all perspectives are equally accurate", "Because events looked different to different participants, and all perspectives add to understanding", "To avoid taking any position"],
      correctIndex: 2,
      explanation: "Events look different depending on who experienced them. Rulers and ruled, victors and defeated, colonizers and colonized all had different experiences of the same historical processes.",
    },
    {
      question: "What is one way that studying this topic in history is relevant to the present day?",
      options: ["It has no relevance to the present", "Historical patterns and precedents help us understand contemporary challenges", "It helps us predict exactly what will happen next", "Only if you plan to work as a historian"],
      correctIndex: 1,
      explanation: "Understanding historical patterns, precedents, and causes helps illuminate contemporary challenges. Many current issues have roots in the historical processes studied in this lesson.",
    },
  ];

  const assignment = {
    prompt: `Having completed this lesson on "${lesson.title}", write a 2–3 paragraph analytical response that: (1) Explains the most significant cause or consequence of the topic covered in this lesson, using specific evidence, and (2) Connects this historical topic to something relevant in the world today. What can we learn from this history that remains useful or instructive for people living now?`,
    tips: [
      "Make a clear argument rather than just summarizing what happened",
      "Use specific evidence from the lesson to support your points",
      "Think carefully about the connection to the present — be specific, not vague",
      "Consider multiple perspectives: whose story is told, and whose might be missing?",
    ],
  };

  return {
    id: lesson.id,
    overview,
    sections,
    keyFacts,
    quiz: quizQuestions,
    assignment,
  };
}

// ─── Public accessor ─────────────────────────────────────────────────────────

const FLAGSHIP_MAP = new Map(FLAGSHIP_CONTENT.map((c) => [c.id, c]));

export function getLessonContent(lesson: {
  id: string;
  title: string;
  subject: string;
  level: string;
  description: string;
}): LessonContent {
  return FLAGSHIP_MAP.get(lesson.id) ?? generateLessonContent(lesson);
}
