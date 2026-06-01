// =============================================================================
//  تاریخ بصری — Visual History  |  Central Historical Data Engine  v2
//  All empire metadata, figures, chronicles, flags, and marker definitions.
//  GeoJSON boundary polygons live in /public and are fetched at runtime.
// =============================================================================

export type EraYear = -1350 | -250 | 100 | 850 | 1300 | 1450 | 1550 | 1850;

export interface HistoricalFigure {
  id: string;
  name: string;
  title: string;
  years: string;
  bio: string;
  emoji: string;
}

export interface HistoricalMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "capital" | "city" | "battle" | "rebellion" | "exile" | "mosque" | "migration" | "temple";
  description: string;
}

export interface RouteOverlay {
  id: string;
  name: string;
  type: "rebellion_route" | "exile_route" | "trade_route";
  color: string;
  dashArray?: string;
}

export interface EmpireData {
  id: string;
  name: string;
  nameAr?: string;
  era: EraYear;
  eraLabel: string;
  capital: string;
  geojsonFile: string;
  borderColor: string;
  fillColor: string;
  fillOpacity: number;
  flagSymbol: string;
  flagDescription: string;
  summary: string;
  keyEvents: string[];
  figures: HistoricalFigure[];
  markers: HistoricalMarker[];
  routes?: RouteOverlay[];
}

export interface EraData {
  year: EraYear;
  label: string;
  subtitle: string;
  mapView: { center: [number, number]; zoom: number };
  empires: EmpireData[];
}

// =============================================================================
//  HELPER
// =============================================================================
export const formatYear = (year: EraYear): string =>
  year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;

// =============================================================================
//  1350 BCE — Ancient Egypt (New Kingdom)
// =============================================================================
const ancientEgypt: EmpireData = {
  id: "ancient-egypt",
  name: "Ancient Egypt",
  nameAr: "مصر القديمة",
  era: -1350,
  eraLabel: "New Kingdom — 18th Dynasty (Amarna Period)",
  capital: "Thebes (Waset) / Akhetaten",
  geojsonFile: "/ancient-egypt-1350bce.json",
  borderColor: "#C9A227",
  fillColor: "#E8C84A",
  fillOpacity: 0.28,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#C9A227"/>
    <rect x="8" y="8" width="104" height="64" fill="none" stroke="#2C2A29" stroke-width="2"/>
    <polygon points="60,14 68,35 90,35 73,48 80,70 60,57 40,70 47,48 30,35 52,35" fill="#2C2A29"/>
    <text x="60" y="76" text-anchor="middle" font-family="serif" font-size="7" fill="#2C2A29">KEMET — THE BLACK LAND</text>
  </svg>`,
  flagDescription:
    "The royal cartouche — an oval loop enclosing the pharaoh's divine name — served as the supreme symbol of Egyptian sovereignty. The gold of the sun god Ra and the black of the fertile Nile soil (Kemet) define the palette of Egypt's eternal civilisation.",
  summary:
    "At its zenith during the New Kingdom (~1550–1070 BCE), ancient Egypt ruled from the Nile Delta deep into Nubia (modern Sudan) and projected power across the Levant. The 18th Dynasty of pharaohs — including Thutmose III, Hatshepsut, Amenhotep III, and the heretic pharaoh Akhenaten — oversaw Egypt's greatest military campaigns, diplomatic marriages, and cultural flourishing. Akhenaten's revolutionary monotheistic religion centred on the sun disc Aten briefly upended 1,500 years of religious tradition before being reversed by his son Tutankhamun. Egyptian civilisation produced monumental architecture — the temples of Karnak and Luxor, the Valley of the Kings — that have endured 3,500 years.",
  keyEvents: [
    "~1479–1425 BCE: Thutmose III wages 17 military campaigns; Egypt reaches greatest territorial extent",
    "~1473–1458 BCE: Hatshepsut reigns as female pharaoh; launches major trade expedition to Punt",
    "~1353–1336 BCE: Akhenaten introduces monotheistic Atenism; moves capital to Akhetaten (Amarna)",
    "~1332–1323 BCE: Tutankhamun restores traditional polytheism; dies at ~19; his tomb discovered intact in 1922",
    "~1279–1213 BCE: Ramesses II — longest-reigning pharaoh; builds Abu Simbel; signs world's first peace treaty with Hittites",
  ],
  figures: [
    {
      id: "hatshepsut", name: "Hatshepsut", title: "Pharaoh — 'Foremost of Noble Women'",
      years: "~1507–1458 BCE", emoji: "👑",
      bio: "One of antiquity's most successful pharaohs, Hatshepsut ruled Egypt for over 20 years, dressed as a male pharaoh with a false beard. She expanded trade, constructed the magnificent mortuary temple at Deir el-Bahari, and led a famous expedition to the land of Punt. Her successor Thutmose III later attempted to erase her from history — yet she endured.",
    },
    {
      id: "akhenaten", name: "Akhenaten", title: "The Heretic Pharaoh — Priest of the Aten",
      years: "~1353–1336 BCE", emoji: "☀️",
      bio: "The most controversial pharaoh in history, Akhenaten dismantled Egypt's complex pantheon and decreed a single god — the sun disc Aten. He built an entirely new capital city (Akhetaten, modern Amarna) and co-ruled with his queen Nefertiti. His reign introduced a strikingly naturalistic art style unlike anything Egypt had seen. His religious revolution was reversed almost immediately after his death.",
    },
    {
      id: "imhotep", name: "Imhotep", title: "Architect, Physician & High Priest",
      years: "~2650 BCE (Old Kingdom)", emoji: "🏛️",
      bio: "Though from an earlier period, Imhotep's legacy defined Egyptian civilisation. He designed the first pyramid (Step Pyramid of Saqqara), was a pioneering physician — later deified as a god of medicine — and served as high priest. He is one of the few non-royal Egyptians to have been venerated as a deity.",
    },
  ],
  markers: [
    { id: "thebes", name: "Thebes (Waset) — Religious Capital", lat: 25.7, lng: 32.65, type: "capital", description: "The spiritual heart of Egypt and home to Karnak and Luxor temples — the largest religious complex ever built." },
    { id: "amarna", name: "Akhetaten (Amarna)", lat: 27.64, lng: 30.9, type: "city", description: "Akhenaten's revolutionary capital, built and abandoned within a generation. Excavations here revealed the famous bust of Nefertiti." },
    { id: "memphis", name: "Memphis — Administrative Capital", lat: 29.85, lng: 31.25, type: "capital", description: "The ancient administrative capital near the Nile Delta — burial site of the early pharaohs and home to the Saqqara Step Pyramid." },
    { id: "abu-simbel", name: "Abu Simbel", lat: 22.35, lng: 31.62, type: "temple", description: "The twin rock-cut temples of Ramesses II, carved to commemorate his victory at Kadesh and assert Egyptian power in Nubia." },
  ],
};

// =============================================================================
//  250 BCE — Carthage
// =============================================================================
const carthage: EmpireData = {
  id: "carthage-250bce",
  name: "Carthage",
  nameAr: "قرطاجة",
  era: -250,
  eraLabel: "Barcid Era — Second Punic War (264–146 BCE)",
  capital: "Carthago (near modern Tunis)",
  geojsonFile: "/carthage-250bce.json",
  borderColor: "#7B1818",
  fillColor: "#A52828",
  fillOpacity: 0.28,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#7B1818"/>
    <circle cx="60" cy="35" r="18" fill="none" stroke="#D4AF37" stroke-width="2"/>
    <text x="60" y="42" text-anchor="middle" font-size="22" fill="#D4AF37">🐘</text>
    <text x="60" y="70" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">QART HADASHT</text>
  </svg>`,
  flagDescription:
    "Carthage used the war elephant as its supreme military symbol — Hannibal's legendary war elephants crossing the Alps defined an era. The Phoenician crescent and star appear on Carthaginian coins. The city's name (Qart Hadasht) means 'New City' in Phoenician.",
  summary:
    "Founded by Phoenician settlers from Tyre (~814 BCE), Carthage became the Mediterranean's dominant naval and commercial power. By 250 BCE, it controlled a maritime empire spanning North Africa, southern Spain, Sardinia, Corsica, and western Sicily — rivalling Rome itself. The three Punic Wars (264–146 BCE) pitted Carthage against the rising Roman Republic in a century-long struggle for mastery of the Mediterranean. Carthage produced perhaps antiquity's greatest general — Hannibal Barca — who came agonisingly close to destroying Rome. Despite his genius, Carthage ultimately fell to Roman siege in 146 BCE; the city was razed, and according to legend, the earth salted so nothing would grow.",
  keyEvents: [
    "~814 BCE: Carthage founded by Queen Dido (Elissa) and Phoenician settlers from Tyre",
    "264–241 BCE: First Punic War — Carthage loses Sicily to Rome",
    "218 BCE: Hannibal crosses the Alps with 37 war elephants; wins at Trebia, Lake Trasimene, and Cannae",
    "202 BCE: Scipio Africanus defeats Hannibal at Zama — end of the Second Punic War",
    "146 BCE: Rome destroys Carthage after the Third Punic War; 50,000 survivors enslaved",
  ],
  figures: [
    {
      id: "hannibal", name: "Hannibal Barca", title: "Supreme Commander — Strategos",
      years: "247–183 BCE", emoji: "⚔️",
      bio: "Widely considered antiquity's greatest military commander. Hannibal led a Carthaginian army across the Alps in winter — a feat previously thought impossible — and inflicted Rome's worst-ever military defeats. At the Battle of Cannae (216 BCE) he annihilated a Roman army twice his size using a double-envelopment manoeuvre still studied in military academies today. He was eventually recalled to defend Carthage, where Scipio finally defeated him at Zama.",
    },
    {
      id: "dido", name: "Queen Dido (Elissa)", title: "Founder and First Queen of Carthage",
      years: "~9th century BCE", emoji: "👑",
      bio: "The legendary Phoenician princess who fled Tyre after her brother murdered her husband, and founded Carthage using a legendary stratagem — negotiating for as much land as could be covered by a bull's hide, then cutting it into thin strips to encircle a hill. She is celebrated in Virgil's Aeneid as one of antiquity's most tragic figures.",
    },
    {
      id: "hamilcar", name: "Hamilcar Barca", title: "General & Father of Hannibal",
      years: "~275–228 BCE", emoji: "🏛️",
      bio: "Commander of Carthaginian forces in Sicily during the First Punic War and builder of Carthage's Spanish empire. He made his young son Hannibal swear a lifelong oath of enmity toward Rome at the altar of sacrifice — beginning one of history's greatest vendettas.",
    },
  ],
  markers: [
    { id: "carthage-city", name: "Carthago — The Jewel of the Mediterranean", lat: 36.86, lng: 10.32, type: "capital", description: "Capital of the Punic empire — a city of over 700,000 at its peak, featuring triple harbours (the cothon), massive walls, and the sacred precinct of Tophet." },
    { id: "zama", name: "Zama — Site of Hannibal's Defeat", lat: 35.9, lng: 9.3, type: "battle", description: "The decisive battle of the Second Punic War (202 BCE). Scipio Africanus neutralised Hannibal's war elephants and encircled his army — ending Carthaginian dominance forever." },
  ],
};

// =============================================================================
//  100 CE — Roman Empire
// =============================================================================
const romanEmpire: EmpireData = {
  id: "roman-empire-100ce",
  name: "Roman Empire",
  nameAr: "الإمبراطورية الرومانية",
  era: 100,
  eraLabel: "Principate Era — Nerva-Antonine Dynasty",
  capital: "Rome (Roma Aeterna)",
  geojsonFile: "/roman-empire-100ce.json",
  borderColor: "#8B1A1A",
  fillColor: "#C0392B",
  fillOpacity: 0.25,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#8B1A1A"/>
    <rect x="10" y="10" width="100" height="60" fill="none" stroke="#D4AF37" stroke-width="2"/>
    <text x="60" y="32" text-anchor="middle" font-family="serif" font-size="16" fill="#D4AF37" font-weight="bold">SPQR</text>
    <text x="60" y="48" text-anchor="middle" font-family="serif" font-size="7" fill="#F4EBE1">SENATUS POPVLVSQVE ROMANVS</text>
    <polygon points="60,5 65,18 78,18 68,26 72,39 60,31 48,39 52,26 42,18 55,18" fill="#D4AF37"/>
  </svg>`,
  flagDescription:
    "The SPQR Aquila (Eagle) — 'Senatus Populusque Romanus' — was the supreme emblem of Roman imperial authority. Every legion carried its own golden eagle standard, and to lose it in battle was the ultimate dishonour.",
  summary:
    "At its zenith under Emperor Trajan (~117 CE), the Roman Empire spanned three continents — stretching from Britannia to Mesopotamia, encompassing 70 million subjects. The Pax Romana (27 BCE–180 CE) was a period of relative internal peace that fostered an explosion of engineering, law, literature, and commerce. Roman roads, aqueducts, and legal codes shaped Western civilisation for two millennia.",
  keyEvents: [
    "98–117 CE: Emperor Trajan conquers Dacia and Mesopotamia — empire reaches greatest extent",
    "117–138 CE: Hadrian consolidates borders; builds Hadrian's Wall across Britannia",
    "80 CE: Colosseum (Flavian Amphitheatre) completed — seats 50,000 spectators",
    "79 CE: Mount Vesuvius erupts; Pompeii and Herculaneum buried",
    "Roman road network totals over 400,000 km across the known world",
  ],
  figures: [
    { id: "trajan", name: "Emperor Trajan", title: "Optimus Princeps", years: "53–117 CE", emoji: "⚔️", bio: "Rome's first provincial-born emperor, Trajan conquered Dacia and reached the Persian Gulf. His forum and column still stand in Rome. Called 'Optimus Princeps' — the best ruler — by the Senate." },
    { id: "tacitus", name: "Tacitus", title: "Historian & Senator", years: "56–120 CE", emoji: "📜", bio: "Rome's greatest historian, Tacitus chronicled the Empire's politics with forensic precision. His Annals and Histories remain essential primary sources for understanding imperial Rome's power and corruption." },
    { id: "epictetus", name: "Epictetus", title: "Stoic Philosopher", years: "50–135 CE", emoji: "🏛️", bio: "Born a slave in Phrygia, Epictetus became antiquity's most influential Stoic teacher. His Enchiridion distilled the philosophy of inner freedom, profoundly shaping Marcus Aurelius and centuries of Western moral thought." },
  ],
  markers: [
    { id: "rome", name: "Rome — Caput Mundi", lat: 41.9, lng: 12.5, type: "capital", description: "The Eternal City — seat of the Senate, home to over 1 million inhabitants, and centre of the ancient world." },
    { id: "alexandria", name: "Alexandria", lat: 31.2, lng: 29.9, type: "city", description: "Home to the Great Library and Mouseion. Egypt's jewel and Rome's breadbasket." },
    { id: "carthago-nova", name: "Carthago Nova (Cartagena)", lat: 37.6, lng: -0.98, type: "city", description: "Rome's key western port and military base on the Iberian peninsula." },
    { id: "londinium", name: "Londinium", lat: 51.51, lng: -0.1, type: "city", description: "Founded after the Roman conquest of Britannia in 43 CE — the future city of London." },
  ],
};

// =============================================================================
//  850 CE — Abbasid Caliphate
// =============================================================================
const abbasidCaliphate: EmpireData = {
  id: "abbasid-caliphate-850ce",
  name: "Abbasid Caliphate",
  nameAr: "الخلافة العباسية",
  era: 850,
  eraLabel: "Islamic Golden Age — Al-Mutawakkil's Reign",
  capital: "Baghdad (Madinat al-Salam)",
  geojsonFile: "/abbasid-caliphate-850ce.json",
  borderColor: "#1A4D2E",
  fillColor: "#27AE60",
  fillOpacity: 0.25,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#1A1A1A"/>
    <text x="60" y="38" text-anchor="middle" font-size="24" fill="#D4AF37">☽</text>
    <text x="60" y="55" text-anchor="middle" font-family="serif" font-size="9" fill="#F4EBE1">الخلافة العباسية</text>
    <text x="60" y="67" text-anchor="middle" font-family="serif" font-size="7" fill="#D4AF37">ABBASID CALIPHATE</text>
  </svg>`,
  flagDescription:
    "The Abbasids adopted black as their dynastic colour — in contrast to the Umayyads' white — symbolising mourning for the family of the Prophet ﷺ and righteous justice. The crescent became a universal Islamic symbol during this era of caliphal splendour.",
  summary:
    "The Abbasid Caliphate (750–1258 CE) presided over the Islamic Golden Age — humanity's most extraordinary period of scientific, philosophical, and cultural achievement. Baghdad, built in a perfect circle by Caliph al-Mansur in 762 CE, became the world's largest city and foremost intellectual centre. The House of Wisdom (Bayt al-Hikmah) attracted scholars from across the known world who translated, preserved, and advanced Greek, Indian, and Persian knowledge. Algebra, algorithms, optics, chemistry, and medicine all received seminal contributions from Abbasid scholars whose names — al-Khawarizmi, Ibn Sina, al-Biruni — changed the course of human history.",
  keyEvents: [
    "750 CE: Abbasid revolution overthrows Umayyads — capital moved from Damascus to Mesopotamia",
    "762 CE: Caliph al-Mansur builds Baghdad as a circular 'City of Peace' (Madinat al-Salam)",
    "786–809 CE: Reign of Harun al-Rashid — Abbasid golden age; Baghdad the world's largest city",
    "830 CE: House of Wisdom founded — mass translation of Greek, Indian, and Persian texts",
    "~850 CE: Al-Khawarizmi publishes Al-Kitab al-Mukhtasar — founding algebra and algorithms",
    "1258 CE: Hulagu Khan and the Mongols sack Baghdad; the Caliph killed; Golden Age ends",
  ],
  figures: [
    { id: "al-khawarizmi", name: "Muhammad ibn Musa al-Khawarizmi", title: "Mathematician — Father of Algebra", years: "~780–850 CE", emoji: "🔢", bio: "The scholar whose name gave us the word 'algorithm' and whose book Al-Kitab al-Mukhtasar fi Hisab al-Jabr wal-Muqabala ('The Compendious Book on Calculation by Completion and Balancing') gave us algebra. He worked at the House of Wisdom and introduced Hindu-Arabic numerals to the Islamic world and subsequently to Europe." },
    { id: "harun-al-rashid", name: "Harun al-Rashid", title: "Caliph — Commander of the Faithful", years: "763–809 CE", emoji: "👑", bio: "The fifth Abbasid Caliph, under whom the empire reached the pinnacle of its cultural and political power. His court in Baghdad exchanged ambassadors with Charlemagne, commanded the world's richest treasury, and inspired the tales of One Thousand and One Nights. His reign defined the archetype of the magnificent Islamic sovereign." },
    { id: "ibn-sina", name: "Ibn Sina (Avicenna)", title: "Physician, Philosopher & Polymath", years: "980–1037 CE", emoji: "⚕️", bio: "The greatest physician of the medieval world. His Canon of Medicine (Al-Qanun fi'l-Tibb) served as the standard medical textbook in both Islamic and European universities for over 600 years. He wrote 450 works on philosophy, medicine, mathematics, and astronomy. Dante placed him in the company of Aristotle and Socrates." },
    { id: "al-jahiz", name: "Al-Jahiz", title: "Scholar, Author & Theologian", years: "776–868 CE", emoji: "📚", bio: "The polymath author of over 200 works, al-Jahiz wrote on zoology, rhetoric, theology, and social life with irreverent wit. His Kitab al-Hayawan anticipated evolutionary ideas by 1,000 years. He was famed for his bulging eyes, sharp intellect, and legendary capacity for argument." },
  ],
  markers: [
    { id: "baghdad", name: "Baghdad — Madinat al-Salam", lat: 33.34, lng: 44.4, type: "capital", description: "The 'City of Peace' — world's largest city in 900 CE with a population of over 1 million. Its circular design, triple walls, and House of Wisdom defined the Islamic Golden Age." },
    { id: "samarra", name: "Samarra", lat: 34.2, lng: 43.87, type: "city", description: "The temporary Abbasid capital (836–892 CE), built by Caliph al-Mu'tasim. The Great Mosque of Samarra and its distinctive spiral minaret (Malwiya) are among the finest works of Islamic architecture." },
    { id: "basra", name: "Basra — Oasis of Learning", lat: 30.51, lng: 47.78, type: "city", description: "A major port city and intellectual centre of the Abbasid world — home to al-Jahiz and the Basra school of Arabic grammar." },
    { id: "makkah-abbasid", name: "Makkah al-Mukarramah", lat: 21.38, lng: 39.83, type: "mosque", description: "The spiritual centre of the Islamic world under Abbasid protection. The Caliphs were patrons of the Holy Mosque and its expansion." },
  ],
};

// =============================================================================
//  850 CE — Mayan Civilisation
// =============================================================================
const mayanCivilisation: EmpireData = {
  id: "mayans-850ce",
  name: "Maya Civilisation",
  nameAr: "حضارة المايا",
  era: 850,
  eraLabel: "Terminal Classic Period — City-State Apogee",
  capital: "Chichén Itzá / Uxmal (multiple city-state capitals)",
  geojsonFile: "/mayans-850ce.json",
  borderColor: "#0E6655",
  fillColor: "#1ABC9C",
  fillOpacity: 0.28,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#0E6655"/>
    <polygon points="60,10 70,35 95,35 75,50 83,75 60,60 37,75 45,50 25,35 50,35" fill="#D4AF37"/>
    <text x="60" y="77" text-anchor="middle" font-family="serif" font-size="7" fill="#F4EBE1">MAYA — LORDS OF TIME</text>
  </svg>`,
  flagDescription:
    "The Maya had no single banner but used elaborate carved stone monuments called stelae to project royal authority. Jade — the most precious substance in Mesoamerica — and the quetzal bird feather adorned rulers. The five-pointed star represented Venus, the war star, tracked with extraordinary calendrical precision.",
  summary:
    "The Maya civilisation reached its Classic Period peak (~250–900 CE) — a sophisticated network of city-states in the Yucatan, Guatemala, and Belize. At the height of the Terminal Classic (~800–900 CE), cities like Chichén Itzá, Uxmal, Palenque, and Tikal were centres of astronomical observation, mathematical innovation (the concept of zero), and monumental architecture. The Maya developed the most sophisticated writing system in the Americas, a complex calendar system of extraordinary precision, and a deep philosophical worldview centred on cyclical cosmic time. The Classic collapse (800–900 CE) — likely driven by drought, warfare, and political fragmentation — remains one of archaeology's great mysteries.",
  keyEvents: [
    "~250–900 CE: Classic Period — zenith of Maya city-state culture",
    "~683 CE: Death of Pakal the Great, ruler of Palenque — his sarcophagus lid is one of the finest works of Maya art",
    "~800–900 CE: Terminal Classic Collapse — major southern lowland cities abandoned",
    "~987 CE: Chichén Itzá becomes the dominant northern power; Toltec influences appear",
    "Maya calendar tracks astronomical cycles with sub-second accuracy over millions of years",
  ],
  figures: [
    { id: "pakal", name: "K'inich Janaab' Pakal", title: "Great King of Palenque", years: "603–683 CE", emoji: "👑", bio: "One of the greatest Maya rulers, Pakal the Great ruled Palenque for 68 years — one of the longest reigns in world history. He transformed Palenque into a major power, constructing the Temple of the Inscriptions (his mausoleum) and overseeing a golden age of art and architecture. His jade death mask is among the masterpieces of pre-Columbian art." },
    { id: "lady-sak-kuk", name: "Lady Sak K'uk'", title: "Queen Regent of Palenque", years: "~583–640 CE", emoji: "👑", bio: "Mother of Pakal the Great, Lady Sak K'uk' served as ruler of Palenque in her own right — one of a small number of women who wielded executive power in Maya politics. She ensured the dynasty's survival by selecting her son as heir despite his young age, founding one of Mesoamerica's most celebrated royal lines." },
  ],
  markers: [
    { id: "chichen-itza", name: "Chichén Itzá", lat: 20.68, lng: -88.57, type: "temple", description: "One of the great Maya city-states, home to El Castillo (Temple of Kukulcan) — a pyramid that functions as a solar calendar." },
    { id: "tikal", name: "Tikal", lat: 17.22, lng: -89.62, type: "capital", description: "The largest Classic Maya city — its Temple IV rose 65m above the jungle floor. Tikal's rivalry with Calakmul defined the Classic period's power politics." },
    { id: "palenque", name: "Palenque", lat: 17.48, lng: -92.04, type: "temple", description: "A jewel of Maya architecture and epigraphy. The Temple of the Inscriptions contains one of the longest Maya hieroglyphic texts ever found." },
  ],
};

// =============================================================================
//  1300 CE — Delhi Sultanate
// =============================================================================
const delhiSultanate: EmpireData = {
  id: "delhi-sultanate-1300ce",
  name: "Delhi Sultanate",
  nameAr: "سلطنة دلهي",
  era: 1300,
  eraLabel: "Khalji Dynasty — Alauddin Khalji's Reign",
  capital: "Delhi (Siri Fort)",
  geojsonFile: "/delhi-sultanate-1300ce.json",
  borderColor: "#1A3A7B",
  fillColor: "#2E86C1",
  fillOpacity: 0.25,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#1A3A7B"/>
    <circle cx="60" cy="35" r="16" fill="none" stroke="#D4AF37" stroke-width="2"/>
    <text x="60" y="42" text-anchor="middle" font-size="18" fill="#D4AF37">☽</text>
    <text x="60" y="60" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">سلطنة دلهي</text>
    <text x="60" y="72" text-anchor="middle" font-family="serif" font-size="7" fill="#D4AF37">DELHI SULTANATE</text>
  </svg>`,
  flagDescription:
    "The Delhi Sultanate's sultans used Persian-style royal banners incorporating calligraphic invocations, stars, and crescents. Alauddin Khalji's court adopted Central Asian Timurid aesthetic traditions mixed with indigenous Indian motifs — a fusion that would define subcontinental Islamic art.",
  summary:
    "The Delhi Sultanate (1206–1526 CE) was the first major Islamic sultanate on the Indian subcontinent, founded by Qutb ud-Din Aibak after Muiz ud-Din Muhammad Ghori's conquests. Under the Khalji dynasty — particularly Sultan Alauddin Khalji (1296–1316) — the Sultanate reached its greatest territorial extent, successfully repelling multiple Mongol invasions and briefly controlling most of the subcontinent from Sindh to the Deccan. Alauddin instituted remarkable price control reforms and a standing professional army. The Sultanate was a crucible of Indo-Islamic culture — producing the magnificent Qutb Minar, the music of Amir Khusrau, and the synthesis of Persian and Indic artistic traditions.",
  keyEvents: [
    "1206 CE: Qutb ud-Din Aibak founds the Sultanate; Qutb Minar construction begins",
    "1296 CE: Alauddin Khalji seizes power; launches market reforms regulating prices across the empire",
    "1298–1308 CE: Four successful campaigns repel Mongol invasions — saving the subcontinent",
    "1310 CE: General Malik Kafur leads campaign to the far south — reaching the tip of India",
    "1320 CE: Ghiyasuddin Tughluq begins the Tughluq dynasty after Khalji collapse",
  ],
  figures: [
    { id: "alauddin-khalji", name: "Alauddin Khalji", title: "Sultan of Delhi — 'Alexander the Second'", years: "~1266–1316 CE", emoji: "⚔️", bio: "The most powerful ruler of the Sultanate era, Alauddin Khalji repelled the Mongols four times, conquered much of southern India, and implemented extraordinary economic reforms — fixing prices of grain, cloth, cattle, and horses across the empire. He was a ruthless political operator but a brilliant administrator whose reforms prefigured modern economic policy by seven centuries." },
    { id: "amir-khusrau", name: "Amir Khusrau", title: "Poet, Musician & Mystic", years: "1253–1325 CE", emoji: "🎵", bio: "The greatest literary figure of medieval India — poet, musician, historian, and Sufi mystic. Khusrau wrote in Persian, Arabic, Braj Bhasha, and Hindavi, pioneering the synthesis of Persian and Indian musical and literary traditions. He is credited with inventing the tabla, the sitar, and the khayal form of Hindustani music. His shrine in Delhi remains a place of pilgrimage." },
    { id: "razia-sultana", name: "Razia al-Din (Razia Sultana)", title: "Sultan of Delhi — First Female Ruler", years: "1205–1240 CE", emoji: "👑", bio: "The only woman to sit on the throne of Delhi, Razia was appointed by her father Iltutmish over her brothers as the most capable of his children. She ruled without purdah, appearing in public unveiled on horseback, and cultivated alliances with various factions. Overthrown after four years in a male-dominated court, she died fighting to reclaim her throne." },
  ],
  markers: [
    { id: "delhi-siri", name: "Delhi — Siri Fort Capital", lat: 28.56, lng: 77.22, type: "capital", description: "Alauddin Khalji's Siri Fort was the third city of Delhi — built to house his vast army and house the institutions of his reformed empire." },
    { id: "qutb-minar", name: "Qutb Minar Complex", lat: 28.52, lng: 77.19, type: "temple", description: "The 73-metre Qutb Minar — begun by Qutb ud-Din Aibak in 1193 — is the world's tallest brick minaret and a UNESCO World Heritage Site." },
    { id: "daulatabad", name: "Daulatabad (Devagiri)", lat: 19.94, lng: 75.22, type: "city", description: "Muhammad bin Tughluq controversially relocated the entire population of Delhi to Daulatabad in 1327 — then reversed the decision, causing massive suffering." },
  ],
};

// =============================================================================
//  1450 CE — Aztec Empire
// =============================================================================
const aztecEmpire: EmpireData = {
  id: "aztec-empire-1450ce",
  name: "Aztec Empire",
  nameAr: "الإمبراطورية الأزتيكية",
  era: 1450,
  eraLabel: "Triple Alliance — Reign of Moctezuma I",
  capital: "Tenochtitlan (Mexico City)",
  geojsonFile: "/aztec-empire-1450ce.json",
  borderColor: "#7D3C00",
  fillColor: "#E67E22",
  fillOpacity: 0.28,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#7D3C00"/>
    <circle cx="60" cy="35" r="18" fill="#2ECC71" stroke="#D4AF37" stroke-width="2"/>
    <text x="60" y="42" text-anchor="middle" font-size="18">🦅</text>
    <text x="60" y="60" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">TENOCHTITLAN</text>
    <text x="60" y="72" text-anchor="middle" font-family="serif" font-size="7" fill="#D4AF37">MEXICA TRIPLE ALLIANCE</text>
  </svg>`,
  flagDescription:
    "The Aztec sun stone (Calendar Stone) — a massive carved disc depicting the five cosmological ages — was the supreme religious symbol of the Mexica. The imperial eagle, shown perched on a cactus devouring a serpent, is the founding symbol of Tenochtitlan and survives today on the Mexican flag.",
  summary:
    "The Aztec (Mexica) Triple Alliance — comprising Tenochtitlan, Texcoco, and Tlacopan — dominated Mesoamerica from ~1428 to 1521 CE. At its peak under Moctezuma I and II, the empire encompassed 200,000–300,000 km² and extracted tribute from over 400 towns. Tenochtitlan, built on an island in Lake Texcoco, was one of the world's largest cities — connected to the mainland by massive causeways, crisscrossed by canals, and home to 200,000+ inhabitants. Its twin-pyramid Templo Mayor was the spiritual and political heart of the Aztec universe. The empire fell with shocking speed to Hernán Cortés and his indigenous allies in 1521.",
  keyEvents: [
    "1325 CE: Tenochtitlan founded on an island in Lake Texcoco",
    "1428 CE: Triple Alliance formed — Tenochtitlan, Texcoco, Tlacopan defeat Tepanecs",
    "1440–1469 CE: Moctezuma I massively expands the empire; Templo Mayor rebuilt",
    "1487 CE: Mass rededication of the Templo Mayor — thousands sacrificed over four days",
    "1519 CE: Hernán Cortés arrives; Moctezuma II receives him; Spanish-Aztec confrontation begins",
    "1521 CE: Fall of Tenochtitlan — 80-day siege ends Aztec independence",
  ],
  figures: [
    { id: "moctezuma-I", name: "Moctezuma I (Ilhuicamina)", title: "Huey Tlatoani — Great Speaker", years: "~1398–1469 CE", emoji: "👑", bio: "The 'Elder Moctezuma' was the architect of Aztec imperial expansion, transforming the Triple Alliance from a regional power into a true empire. He reorganised the army, created the Flower Wars (ritual battles for sacrificial captives), and oversaw the construction of the massive aqueduct system feeding Tenochtitlan." },
    { id: "tlacaelel", name: "Tlacaelel", title: "Cihuacoatl — Imperial Advisor", years: "~1397–1487 CE", emoji: "📜", bio: "The ideological architect of the Aztec state, Tlacaelel served as chief advisor to three emperors. He reformulated Aztec religion to cast the Mexica as the people chosen by the sun god Huitzilopochtli to sustain the cosmos through ritual sacrifice, creating the cosmic mandate for imperial expansion and the Flower Wars." },
  ],
  markers: [
    { id: "tenochtitlan", name: "Tenochtitlan", lat: 19.43, lng: -99.13, type: "capital", description: "One of the world's largest cities in 1500 — the Venice of the Americas, built on an island with causeways, aqueducts, and a magnificent twin-pyramid Templo Mayor at its centre." },
    { id: "cholula", name: "Cholula", lat: 19.06, lng: -98.3, type: "temple", description: "Site of the Great Pyramid of Cholula — the largest pyramid by volume in the world, today topped by a Spanish colonial church." },
  ],
};

// =============================================================================
//  1450 CE — Inca Empire
// =============================================================================
const incaEmpire: EmpireData = {
  id: "inca-empire-1450ce",
  name: "Inca Empire",
  nameAr: "إمبراطورية الإنكا",
  era: 1450,
  eraLabel: "Tawantinsuyu — Reign of Pachacuti",
  capital: "Cusco (Qosqo)",
  geojsonFile: "/inca-empire-1450ce.json",
  borderColor: "#8B4513",
  fillColor: "#D4783A",
  fillOpacity: 0.28,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#8B4513"/>
    <circle cx="60" cy="32" r="16" fill="#D4AF37" stroke="#F4EBE1" stroke-width="2"/>
    <text x="60" y="40" text-anchor="middle" font-size="18">☀️</text>
    <text x="60" y="58" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">TAWANTINSUYU</text>
    <text x="60" y="70" text-anchor="middle" font-family="serif" font-size="7" fill="#D4AF37">THE FOUR QUARTERS</text>
  </svg>`,
  flagDescription:
    "The Inca sun disc — Inti, the sun god — was the supreme symbol of imperial authority. The Inca Emperor (Sapa Inca) was considered the son of Inti. Gold, described as 'sweat of the sun', adorned temples and royal palaces. The rainbow flag (Wiphala) represented the multi-ethnic Andean world united under Inca rule.",
  summary:
    "Tawantinsuyu (The Four Quarters) was the largest empire in pre-Columbian America — stretching over 4,000 km from modern Ecuador to central Chile and Argentina. At its peak under Pachacuti and his successors (~1438–1533 CE), it encompassed 12 million people across extraordinary geographical diversity — from Pacific coast deserts to Amazonian jungle to high Andean peaks. The Incas built over 40,000 km of roads without wheeled vehicles or horses, engineered spectacular agricultural terraces, and administered a vast empire without a written language — using knotted strings (quipu) to record information. Their capital Cusco was laid out in the shape of a puma. The empire fell with devastating speed to Francisco Pizarro and his conquistadors in 1533.",
  keyEvents: [
    "~1438 CE: Pachacuti defeats the Chanka confederation and begins massive imperial expansion",
    "~1450 CE: Machu Picchu constructed as a royal estate for Pachacuti",
    "~1470 CE: Chimor (Chimu kingdom) conquered — empire reaches the Pacific coast fully",
    "1527 CE: Death of Sapa Inca Huayna Capac from smallpox — civil war between Huascar and Atahualpa",
    "1532 CE: Francisco Pizarro captures Atahualpa at Cajamarca; empire collapses rapidly",
  ],
  figures: [
    { id: "pachacuti", name: "Pachacuti", title: "Sapa Inca — 'Earth-Shaker'", years: "~1418–1471 CE", emoji: "👑", bio: "The greatest Inca emperor and founder of the empire in its recognisable form. Pachacuti defeated the Chanka invasion of Cusco against overwhelming odds, then methodically expanded the empire from a regional state into the largest civilisation in the Americas. He rebuilt Cusco in stone on the shape of a puma and likely commissioned Machu Picchu." },
    { id: "mama-ocllo", name: "Mama Ocllo", title: "Coya — Empress of the Four Quarters", years: "15th century CE", emoji: "👑", bio: "The principal wife of Pachacuti and the divine Empress (Coya) of Tawantinsuyu. The Coya was considered the daughter of the Moon goddess Mama Quilla, and co-ruled with the Sapa Inca as a dual monarchy of sun and moon — a unique Andean conception of gender-balanced cosmic governance." },
  ],
  markers: [
    { id: "cusco", name: "Cusco — Navel of the World", lat: -13.52, lng: -71.98, type: "capital", description: "The imperial capital, built in the shape of a puma. The Coricancha (Temple of the Sun) was sheathed in gold plates. Cusco sat at 3,400m altitude in the Andes." },
    { id: "machu-picchu", name: "Machu Picchu", lat: -13.16, lng: -72.54, type: "temple", description: "The royal estate of Pachacuti — a masterpiece of Inca engineering carved into a mountain ridge at 2,430m. Undiscovered by the Spanish and revealed to the world in 1911 by Hiram Bingham." },
  ],
};

// =============================================================================
//  1550 CE — Mughal Empire
// =============================================================================
const mughalEmpire: EmpireData = {
  id: "mughal-empire-1550ce",
  name: "Mughal Empire",
  nameAr: "الإمبراطورية المغولية",
  era: 1550,
  eraLabel: "Akbari Era — Timurid-Mughal Dynasty",
  capital: "Agra (then Fatehpur Sikri)",
  geojsonFile: "/mughal-empire-1550ce.json",
  borderColor: "#1A5E37",
  fillColor: "#27AE60",
  fillOpacity: 0.25,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#1A5E37"/>
    <circle cx="60" cy="35" r="18" fill="none" stroke="#D4AF37" stroke-width="2"/>
    <text x="60" y="42" text-anchor="middle" font-size="20" fill="#D4AF37">☽</text>
    <text x="60" y="60" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">MUGHAL SALTANAT</text>
  </svg>`,
  flagDescription:
    "The Mughal imperial standard bore the crescent and royal green of the Timurid dynasty. Akbar later introduced composite symbols reflecting his Din-i-Ilahi philosophy of religious synthesis between Islam, Hinduism, Zoroastrianism, and Christianity.",
  summary:
    "Founded by Babur after his victory at Panipat (1526), the Mughal Empire reached a golden age under Akbar (1556–1605). His court at Agra and Fatehpur Sikri became unparalleled centres of architecture, art, music, and pluralist governance. The empire's architectural legacy — the Taj Mahal, Red Fort, Humayun's Tomb — remains among humanity's greatest built heritage.",
  keyEvents: [
    "1526: Babur defeats Ibrahim Lodi at Panipat — founding the Mughal dynasty",
    "1556: Akbar defeats Hemu at Second Panipat; begins transformative reign",
    "1569–1585: Fatehpur Sikri constructed as a new imperial capital near Agra",
    "1571: Akbar introduces Din-i-Ilahi — syncretic spiritual movement",
    "1632–1653: Shah Jahan builds the Taj Mahal as tomb for Mumtaz Mahal",
  ],
  figures: [
    { id: "akbar", name: "Jalal ud-Din Muhammad Akbar", title: "Akbar-e-Azam — The Great", years: "1542–1605 CE", emoji: "👑", bio: "Third Mughal emperor and architect of Mughal greatness. Akbar abolished the jizya tax on non-Muslims, employed Hindu Rajput generals, and created an empire of remarkable cultural pluralism. His Navaratnas (Nine Gems) court included luminaries across every field of human endeavour." },
    { id: "tansen", name: "Tansen", title: "Nava-Ratna Court Musician", years: "1500–1586 CE", emoji: "🎵", bio: "Considered the greatest musician in Indian history, Tansen was one of Akbar's Nine Gems. He is credited with creating several ragas still performed today, including the legendary Raga Miyan ki Malhar." },
  ],
  markers: [
    { id: "agra", name: "Agra — Imperial Capital", lat: 27.18, lng: 78.02, type: "capital", description: "Home to Agra Fort and future site of the Taj Mahal. Under Akbar, Agra was one of the most cosmopolitan cities on earth." },
    { id: "fatehpur", name: "Fatehpur Sikri", lat: 27.09, lng: 77.67, type: "city", description: "Akbar's purpose-built capital (1571–1585), abandoned due to water shortages. A UNESCO World Heritage Site." },
    { id: "lahore", name: "Lahore", lat: 31.56, lng: 74.36, type: "city", description: "The empire's north-western gateway and a major cultural centre. Lahore Fort was greatly expanded by Akbar." },
  ],
};

// =============================================================================
//  1550 CE — Ottoman Empire
// =============================================================================
const ottomanEmpire: EmpireData = {
  id: "ottoman-empire-1550ce",
  name: "Ottoman Empire",
  nameAr: "الإمبراطورية العثمانية",
  era: 1550,
  eraLabel: "Suleimanic Era — Reign of Suleiman the Magnificent",
  capital: "Constantinople (Istanbul)",
  geojsonFile: "/ottoman-empire-1550ce.json",
  borderColor: "#6B1A1A",
  fillColor: "#E74C3C",
  fillOpacity: 0.22,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#8B0000"/>
    <text x="50" y="46" text-anchor="middle" font-size="28" fill="white">☽</text>
    <text x="72" y="38" text-anchor="middle" font-size="14" fill="white">★</text>
    <text x="60" y="68" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">الدولة العثمانية</text>
  </svg>`,
  flagDescription:
    "The Ottoman crescent and star — adopted from captured Constantinople's Byzantine symbols — became one of history's most recognised imperial emblems. The deep red (kırmızı) was the colour of the Ottoman dynasty. Suleiman the Magnificent's tughra (imperial monogram) was a masterpiece of Ottoman calligraphic art.",
  summary:
    "Under Suleiman the Magnificent (r. 1520–1566), the Ottoman Empire reached its zenith — a vast multi-continental state controlling southeastern Europe, Anatolia, the Arab Middle East, Egypt, and the North African coast as far as Algeria. Suleiman personally led 13 military campaigns, conquered Belgrade, Hungary, and Rhodes, and twice besieged Vienna. His reign was equally celebrated for legal codification (earning him the title Kanuni — Lawgiver), architectural achievement (the Süleymaniye Mosque), and literary patronage. The Ottoman state was one of the most sophisticated administrative systems of the early modern world.",
  keyEvents: [
    "1453: Mehmed II conquers Constantinople — end of the Byzantine Empire",
    "1514: Battle of Chaldiran — Ottomans defeat Safavids; gain Anatolia",
    "1517: Selim I conquers Mamluk Egypt; assumes Caliphate title",
    "1520–1566: Suleiman the Magnificent — greatest Ottoman sultan; empire at peak",
    "1529: First Siege of Vienna — stopped at the gates of the Habsburg capital",
    "1557: Süleymaniye Mosque completed in Constantinople — Sinan's masterpiece",
  ],
  figures: [
    { id: "suleiman", name: "Suleiman I — Kanuni", title: "Sultan of the Ottoman Empire", years: "1494–1566 CE", emoji: "👑", bio: "Called 'the Magnificent' in Europe and 'Kanuni' (the Lawgiver) by his own people, Suleiman was the longest-reigning Ottoman Sultan. He codified Islamic and secular law into a unified legal system, patronised the arts lavishly, and his rule represented the apogee of Ottoman power and cultural achievement." },
    { id: "sinan", name: "Mimar Sinan", title: "Chief Imperial Architect", years: "~1490–1588 CE", emoji: "🏛️", bio: "The supreme architect of the Ottoman Golden Age, Sinan designed over 370 structures including the Süleymaniye Mosque in Istanbul and the Selimiye Mosque in Edirne — considered the pinnacle of classical Ottoman architecture. He served as Chief Architect for three successive sultans over 50 years." },
    { id: "hurrem", name: "Hürrem Sultan (Roxelana)", title: "Haseki Sultan — Chief Consort", years: "~1502–1558 CE", emoji: "👑", bio: "A woman of extraordinary political intelligence, Hürrem rose from slave concubine to become the first woman to be legally married to a reigning Ottoman Sultan, breaking 200 years of precedent. She wielded immense influence over Suleiman, corresponded with foreign rulers, founded charitable institutions, and shaped Ottoman policy from within the palace." },
  ],
  markers: [
    { id: "constantinople", name: "Constantinople (Istanbul)", lat: 41.01, lng: 28.98, type: "capital", description: "Mehmed II renamed it Istanbul after 1453. The Hagia Sophia was converted to a mosque; the Topkapi Palace became the seat of imperial government." },
    { id: "vienna-siege", name: "Vienna — The Furthest Advance", lat: 48.21, lng: 16.37, type: "battle", description: "The Ottoman siege of Vienna (1529) marked the high-water mark of Ottoman expansion into Europe — repulsed and leaving a psychological impact on European-Ottoman relations for centuries." },
    { id: "jerusalem-ottoman", name: "Jerusalem (Al-Quds)", lat: 31.78, lng: 35.22, type: "mosque", description: "Suleiman rebuilt Jerusalem's walls (still standing today) and renovated the Dome of the Rock, underscoring Ottoman protection of Islam's holy sites." },
    { id: "cairo-ottoman", name: "Cairo — Province of Egypt", lat: 30.04, lng: 31.24, type: "city", description: "After conquering the Mamluks in 1517, the Ottomans made Egypt their most prosperous province, channelling Nile grain revenues to Istanbul." },
  ],
};

// =============================================================================
//  1550 CE — Safavid Empire
// =============================================================================
const safavidEmpire: EmpireData = {
  id: "safavid-empire-1550ce",
  name: "Safavid Empire",
  nameAr: "الإمبراطورية الصفوية",
  era: 1550,
  eraLabel: "Tahmasp I — Persian Renaissance",
  capital: "Tabriz / Qazvin (later Isfahan)",
  geojsonFile: "/safavid-empire-1550ce.json",
  borderColor: "#2E4DA3",
  fillColor: "#5DADE2",
  fillOpacity: 0.25,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#1A2C6E"/>
    <text x="60" y="35" text-anchor="middle" font-size="24">🦁</text>
    <text x="60" y="52" text-anchor="middle" font-size="12" fill="#D4AF37">☀️</text>
    <text x="60" y="68" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">الدولة الصفوية</text>
  </svg>`,
  flagDescription:
    "The Safavid imperial emblem — the Lion and Sun (Shir o Khorshid) — combined the ancient Persian symbol of the lion (royal power) with the sun (the divine light of Imam Ali). This symbol adorned Persian flags for centuries, surviving into the 20th century. The Safavid turban bore twelve pleats representing the Twelve Imams of Twelver Shia Islam.",
  summary:
    "The Safavid dynasty (1501–1736 CE) fundamentally transformed Persia — converting the Iranian plateau from a predominantly Sunni region to Twelver Shia Islam, creating a Persian national-religious identity that persists today. Shah Ismail I established the dynasty; Shah Tahmasp I (r. 1524–1576) consolidated it in constant conflict with both the Ottomans (Sunni rivals) to the west and the Uzbek Shaybanids to the east. The Safavids patronised an extraordinary flowering of Persian art — miniature painting, carpet-weaving, tile work, and calligraphy. Under Shah Abbas I (r. 1588–1629), Isfahan was rebuilt as 'half the world' — one of the most beautiful cities in human history.",
  keyEvents: [
    "1501 CE: Shah Ismail I declares Twelver Shia Islam the state religion; founds Safavid dynasty",
    "1514 CE: Battle of Chaldiran — Safavids lose to Ottoman firearms; permanent Ottoman-Safavid rivalry established",
    "1524–1576 CE: Shah Tahmasp I consolidates rule; survives multiple Ottoman campaigns",
    "1588–1629 CE: Shah Abbas I — Safavid golden age; rebuilds Isfahan; defeats Ottomans and Uzbeks",
    "~1600: Isfahan's Royal Square (Naqsh-e Jahan) — one of the world's largest public squares — constructed",
  ],
  figures: [
    { id: "shah-ismail", name: "Shah Ismail I", title: "Founder of the Safavid State", years: "1487–1524 CE", emoji: "👑", bio: "A warrior-poet who crowned himself Shah at age 14 after sweeping across Iran in three years, Shah Ismail I declared Twelver Shia Islam the state religion in a decision that would permanently reshape the Islamic world. He was simultaneously a mystical poet (writing in Azerbaijani Turkic as 'Khatayi') and a fearless military commander. His defeat at Chaldiran (1514) to Ottoman firearms was a traumatic reversal that haunted him for life." },
    { id: "bihzad", name: "Kamal ud-Din Bihzad", title: "Master Painter — 'Wonder of the Age'", years: "~1450–1535 CE", emoji: "🎨", bio: "The greatest miniature painter of the Persian tradition, Bihzad transformed the art form with unprecedented naturalism, psychological depth, and mastery of composition. Sought after by the Ottoman and Mughal courts, he eventually became head of the Safavid royal library. His works are among the treasures of Persian visual culture." },
  ],
  markers: [
    { id: "isfahan", name: "Isfahan — Nisf-e Jahan", lat: 32.66, lng: 51.68, type: "capital", description: "'Isfahan is half the world' — the Safavid capital under Shah Abbas I. Naqsh-e Jahan Square, the Imam Mosque, and the Sheikh Lotfollah Mosque are UNESCO masterpieces." },
    { id: "tabriz", name: "Tabriz — First Safavid Capital", lat: 38.08, lng: 46.29, type: "city", description: "Shah Ismail I's first capital — a major centre of the carpet trade and miniature painting tradition. Repeatedly lost and recaptured in Ottoman-Safavid conflicts." },
    { id: "qom", name: "Qom", lat: 34.64, lng: 50.88, type: "mosque", description: "The pre-eminent shrine city of Twelver Shia Islam — the Fatima Masumeh shrine made Qom a spiritual centre that the Safavids heavily patronised and which remains central to Shia religious authority today." },
  ],
};

// =============================================================================
//  1850 CE — South Asia & the 1857 Uprising
// =============================================================================
const southAsia1857: EmpireData = {
  id: "south-asia-1850ce",
  name: "South Asia — Eve of the Great Uprising",
  nameAr: "جنوب آسيا — عشية الانتفاضة الكبرى",
  era: 1850,
  eraLabel: "Late Colonial Period — British East India Company",
  capital: "Calcutta (EIC HQ) / Delhi (Mughal symbolic seat)",
  geojsonFile: "/south-asia-1850ce.json",
  borderColor: "#4A235A",
  fillColor: "#7D3C98",
  fillOpacity: 0.2,
  flagSymbol: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="80" fill="#2C2A29"/>
    <rect x="0" y="0" width="120" height="26" fill="#4A235A"/>
    <rect x="0" y="27" width="120" height="26" fill="#1A3A5E"/>
    <rect x="0" y="54" width="120" height="26" fill="#1A5E37"/>
    <text x="60" y="44" text-anchor="middle" font-family="serif" font-size="22" fill="#D4AF37">☪</text>
    <text x="60" y="70" text-anchor="middle" font-family="serif" font-size="7" fill="#F4EBE1">1857 — AZAADI</text>
  </svg>`,
  flagDescription:
    "The 1857 Uprising had no single banner — it was a coalition of Mughal loyalists, Sepoy soldiers, princely states, and popular resistance united by rejection of colonial rule. The Mughal crescent and the saffron, green and white banners of diverse rebel factions have been retrospectively interpreted as proto-national symbols of South Asian resistance.",
  summary:
    "By 1850, the British East India Company had reduced the Mughal Emperor Bahadur Shah Zafar to a pensioned figurehead. The annexation of Awadh (1856) and the Enfield rifle cartridge controversy ignited the powder keg. The uprising began in Meerut (10 May 1857), spread through Delhi, Lucknow, Kanpur, Jhansi, and into Bihar. Although suppressed by 1858, it catalysed the transfer of power from the Company to the British Crown, planted the seeds of modern South Asian nationalism, and sent thousands of scholars, soldiers, and families into exile along the westward routes toward Makkah al-Mukarramah.",
  keyEvents: [
    "1848–1856: Doctrine of Lapse annexes Satara, Nagpur, Jhansi, and Awadh",
    "10 May 1857: Sepoys in Meerut mutiny and march to Delhi — Bahadur Shah Zafar proclaimed Emperor",
    "June–July 1857: Siege of Lucknow; Rani Lakshmibai raises her standard at Jhansi",
    "July–August 1857: Kunwar Singh leads resistance across Bihar from Arrah to Jagdishpur",
    "September 1857: British forces recapture Delhi; Bahadur Shah Zafar exiled to Rangoon",
    "1858: British Crown assumes direct governance; East India Company dissolved",
  ],
  figures: [
    { id: "bahadur-shah-zafar", name: "Bahadur Shah Zafar", title: "Last Mughal Emperor & Poet", years: "1775–1862 CE", emoji: "✍️", bio: "The last Mughal Emperor — a Sufi mystic and sublime Urdu poet — found himself proclaimed 'Emperor of Hindustan' by rebel Sepoys. Exiled to Rangoon, he died in captivity. His couplet echoes through history: 'Kitna hai bad-naseeb Zafar dafn ke liye / Do gaz zameen bhi na mili kuy-e-yaar mein.'" },
    { id: "rani-lakshmibai", name: "Rani Lakshmibai of Jhansi", title: "The Queen of Jhansi", years: "1828–1858 CE", emoji: "⚔️", bio: "A figure of extraordinary martial courage, the Rani took up arms after the British annexed her kingdom. She personally led cavalry charges and died on the battlefield near Gwalior. British general Hugh Rose wrote that she was 'the most dangerous of all Indian leaders'." },
    { id: "kunwar-singh", name: "Kunwar Singh", title: "Bihar's Lion — Commander of Jagdishpur", years: "1777–1858 CE", emoji: "🦁", bio: "An 80-year-old Rajput zamindar who became Bihar's most formidable rebel commander. He reportedly cut off his own wounded arm and threw it into the Ganges as an offering, then won his final battle near Jagdishpur before dying victorious and undefeated." },
    { id: "begum-hazrat-mahal", name: "Begum Hazrat Mahal", title: "Regent of Awadh", years: "1820–1879 CE", emoji: "👑", bio: "After the British deposed her husband, Begum Hazrat Mahal directed the defence of Lucknow and issued a proclamation refuting Queen Victoria's promises. She refused a British pardon and chose exile in Nepal, where she died." },
  ],
  markers: [
    { id: "delhi-1857", name: "Delhi — Rebel Capital", lat: 28.65, lng: 77.23, type: "rebellion", description: "The epicentre of the 1857 Uprising. Sepoys proclaimed Bahadur Shah Zafar Emperor here." },
    { id: "meerut", name: "Meerut — Spark of the Uprising", lat: 28.98, lng: 77.71, type: "rebellion", description: "The site of the first open mutiny on 10 May 1857." },
    { id: "lucknow", name: "Lucknow — Seat of Awadh", lat: 26.85, lng: 80.95, type: "rebellion", description: "The Siege of Lucknow lasted from June to November 1857. Begum Hazrat Mahal directed resistance from Kaiserbagh palace." },
    { id: "arrah-bihar", name: "Arrah, Bihar", lat: 25.56, lng: 84.66, type: "rebellion", description: "The Siege of Arrah (July 1857) — Kunwar Singh's pivotal engagement in Bihar." },
    { id: "jagdishpur", name: "Jagdishpur, Bihar — Final Victory", lat: 25.45, lng: 84.44, type: "rebellion", description: "Kunwar Singh's ancestral seat. He died here on 26 April 1858, days after his final battle." },
    { id: "kabul-exile", name: "Kabul — Gateway of Exile", lat: 34.53, lng: 69.17, type: "exile", description: "A major waypoint on westward exile routes — thousands of Muslim scholars and families passed through Kabul after 1857." },
    { id: "makkah-1857", name: "Makkah al-Mukarramah — Destination of Hijra", lat: 21.38, lng: 39.83, type: "mosque", description: "The final destination of the post-1857 hijra. Scholars, Sufis, and families from Delhi, Lucknow, and across the subcontinent resettled in the Hijaz." },
  ],
  routes: [
    { id: "rebellion-route", name: "1857 Rebellion Corridor — Meerut to Bihar", type: "rebellion_route", color: "#C0392B" },
    { id: "exile-route", name: "Exile & Migration Route — Delhi to Makkah", type: "exile_route", color: "#8E44AD", dashArray: "8, 5" },
  ],
};

// =============================================================================
//  ERA REGISTRY — The master timeline
// =============================================================================
export const ERAS: EraData[] = [
  {
    year: -1350, label: "1350 BCE", subtitle: "Ancient Egypt — New Kingdom",
    mapView: { center: [27, 31], zoom: 5 },
    empires: [ancientEgypt],
  },
  {
    year: -250, label: "250 BCE", subtitle: "Carthage & Punic Wars",
    mapView: { center: [36, 5], zoom: 4 },
    empires: [carthage],
  },
  {
    year: 100, label: "100 CE", subtitle: "Roman Empire at its Zenith",
    mapView: { center: [38, 20], zoom: 4 },
    empires: [romanEmpire],
  },
  {
    year: 850, label: "850 CE", subtitle: "Islamic Golden Age & Maya Apogee",
    mapView: { center: [28, 10], zoom: 2 },
    empires: [abbasidCaliphate, mayanCivilisation],
  },
  {
    year: 1300, label: "1300 CE", subtitle: "Delhi Sultanate",
    mapView: { center: [26, 78], zoom: 5 },
    empires: [delhiSultanate],
  },
  {
    year: 1450, label: "1450 CE", subtitle: "Aztec & Inca Empires",
    mapView: { center: [3, -75], zoom: 3 },
    empires: [aztecEmpire, incaEmpire],
  },
  {
    year: 1550, label: "1550 CE", subtitle: "Age of Empires — Mughal, Ottoman & Safavid",
    mapView: { center: [32, 55], zoom: 3 },
    empires: [mughalEmpire, ottomanEmpire, safavidEmpire],
  },
  {
    year: 1850, label: "1850 CE", subtitle: "South Asia & the 1857 Uprising",
    mapView: { center: [25, 80], zoom: 5 },
    empires: [southAsia1857],
  },
];

export const getEraByYear = (year: EraYear): EraData =>
  ERAS.find((e) => e.year === year) ?? ERAS[0];

export const getAllEmpires = (): EmpireData[] =>
  ERAS.flatMap((e) => e.empires);
