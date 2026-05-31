// ==============================================================================
//  ChronosAtlas — Central Historical Data Engine
//  All empire metadata, figures, chronicles, flags, and marker definitions
//  are housed here. GeoJSON boundary polygons are stored in /public as .json
//  files and fetched at runtime for a clean data/UI separation.
// ==============================================================================

export type EraYear = 100 | 1550 | 1850;

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
  type: "capital" | "city" | "battle" | "rebellion" | "exile" | "mosque" | "migration";
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
  era: EraYear;
  eraLabel: string;
  capital: string;
  geojsonFile: string;
  borderColor: string;
  fillColor: string;
  fillOpacity: number;
  hoverColor: string;
  flagSymbol: string;       // SVG string or emoji art for the flag panel
  flagDescription: string;
  summary: string;
  keyEvents: string[];
  figures: HistoricalFigure[];
  markers: HistoricalMarker[];
  routes?: RouteOverlay[];
}

// ==============================================================================
//  TIMELINE MILESTONES — drives the slider snap points
// ==============================================================================
export const TIMELINE_MILESTONES: { year: EraYear; label: string; subtitle: string }[] = [
  {
    year: 100,
    label: "100 CE",
    subtitle: "Height of the Roman Empire",
  },
  {
    year: 1550,
    label: "1550 CE",
    subtitle: "Golden Age of the Mughal Empire",
  },
  {
    year: 1850,
    label: "1850 CE",
    subtitle: "South Asia & the 1857 Uprising",
  },
];

// ==============================================================================
//  CASE 1: THE ROMAN EMPIRE — 100 CE
// ==============================================================================
export const romanEmpire100CE: EmpireData = {
  id: "roman-empire-100ce",
  name: "The Roman Empire",
  era: 100,
  eraLabel: "Principate Era — Nerva-Antonine Dynasty",
  capital: "Rome (Roma Aeterna)",
  geojsonFile: "/roman-empire-100ce.json",
  borderColor: "#8B1A1A",
  fillColor: "#C0392B",
  fillOpacity: 0.25,
  hoverColor: "#D4AF37",
  flagSymbol: `
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="80" fill="#8B1A1A"/>
      <rect x="10" y="10" width="100" height="60" fill="none" stroke="#D4AF37" stroke-width="2"/>
      <text x="60" y="30" text-anchor="middle" font-family="serif" font-size="14" fill="#D4AF37" font-weight="bold">SPQR</text>
      <text x="60" y="48" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">SENATUS POPVLVSQVE</text>
      <text x="60" y="60" text-anchor="middle" font-family="serif" font-size="8" fill="#F4EBE1">ROMANVS</text>
      <polygon points="60,5 65,18 78,18 68,26 72,39 60,31 48,39 52,26 42,18 55,18" fill="#D4AF37"/>
    </svg>
  `,
  flagDescription:
    "The Aquila — the golden Eagle standard — accompanied by the legendary SPQR sigil: \"Senatus Populusque Romanus\" (The Senate and People of Rome). Each Roman legion carried its own Aquila as a sacred emblem of imperial authority.",
  summary:
    "At its zenith under Emperor Trajan (~117 CE), the Roman Empire stretched from the Iberian Peninsula to Mesopotamia, encompassing the entirety of the Mediterranean basin. Rome commanded over 70 million subjects across three continents, unified by an unprecedented network of roads, aqueducts, and codified law. The Pax Romana — a period of relative internal peace lasting over 200 years — fostered explosive cultural exchange, artistic flourishing, and the consolidation of Roman engineering marvels that still stand today.",
  keyEvents: [
    "98–117 CE: Emperor Trajan conquers Dacia and Mesopotamia, reaching empire's greatest territorial extent",
    "117–138 CE: Emperor Hadrian consolidates borders; constructs Hadrian's Wall in Britannia",
    "100 CE: Roman population reaches ~5 million in the city of Rome alone",
    "Colosseum (Flavian Amphitheatre) completed in 80 CE — seating 50,000 spectators",
    "Roman roads total over 400,000 km across the known world",
  ],
  figures: [
    {
      id: "trajan",
      name: "Emperor Trajan",
      title: "Optimus Princeps — Greatest of Emperors",
      years: "53–117 CE",
      bio: "Born in Hispania Baetica, Trajan became Rome's first provincial-born emperor. His military campaigns in Dacia (modern Romania) and Parthia brought unprecedented territorial expansion. He was celebrated for his public works — Trajan's Forum and Column still stand in Rome today.",
      emoji: "⚔️",
    },
    {
      id: "tacitus",
      name: "Tacitus",
      title: "Senator, Historian & Orator",
      years: "56–120 CE",
      bio: "Rome's greatest historian, Tacitus chronicled the Empire's darker currents with forensic precision. His works Annals and Histories provide an indispensable account of imperial politics, Germanic tribes, and the character of tyranny under the Julio-Claudian and Flavian dynasties.",
      emoji: "📜",
    },
    {
      id: "pliny-younger",
      name: "Pliny the Younger",
      title: "Lawyer, Magistrate & Author",
      years: "61–113 CE",
      bio: "A prolific correspondent and jurist, Pliny served as governor of Bithynia. His letters to Emperor Trajan offer a vivid window into provincial governance. His eyewitness account of the eruption of Mount Vesuvius is the world's earliest surviving description of a volcanic disaster.",
      emoji: "✍️",
    },
    {
      id: "epictetus",
      name: "Epictetus",
      title: "Stoic Philosopher",
      years: "50–135 CE",
      bio: "Born a slave in Phrygia, Epictetus rose to become antiquity's most influential Stoic teacher. His Enchiridion (Handbook) distilled the philosophy of inner freedom and virtue, profoundly shaping Marcus Aurelius and centuries of Western moral thought.",
      emoji: "🏛️",
    },
  ],
  markers: [
    {
      id: "rome",
      name: "Rome — Caput Mundi",
      lat: 41.9,
      lng: 12.5,
      type: "capital",
      description: "The Eternal City and heart of the Empire — seat of the Senate, home to over 1 million inhabitants, and the centre of the ancient world.",
    },
    {
      id: "carthage",
      name: "Carthage",
      lat: 36.85,
      lng: 10.33,
      type: "city",
      description: "Rebuilt by Julius Caesar as a Roman colony, Carthage was the third-largest city in the Empire and the capital of the Africa Proconsularis province.",
    },
    {
      id: "alexandria",
      name: "Alexandria",
      lat: 31.2,
      lng: 29.9,
      type: "city",
      description: "Egypt's jewel — home to the Great Library and the Mouseion. Alexandria was Rome's breadbasket and one of its foremost centres of learning and commerce.",
    },
    {
      id: "antioch",
      name: "Antioch on the Orontes",
      lat: 36.2,
      lng: 36.16,
      type: "city",
      description: "The Empire's third city and capital of Syria province, Antioch served as a crucial military and commercial hub connecting Rome to the Parthian frontier.",
    },
    {
      id: "londinium",
      name: "Londinium",
      lat: 51.51,
      lng: -0.1,
      type: "city",
      description: "Founded after the Roman conquest of Britannia in 43 CE, Londinium became the provincial capital and a bustling trading port — the future city of London.",
    },
  ],
};

// ==============================================================================
//  CASE 2: THE MUGHAL EMPIRE — 1550 CE
// ==============================================================================
export const mughalEmpire1550CE: EmpireData = {
  id: "mughal-empire-1550ce",
  name: "The Mughal Empire",
  era: 1550,
  eraLabel: "Akbari Era — Timurid-Mughal Dynasty",
  capital: "Agra (then Fatehpur Sikri)",
  geojsonFile: "/mughal-empire-1550ce.json",
  borderColor: "#1A5E37",
  fillColor: "#27AE60",
  fillOpacity: 0.25,
  hoverColor: "#D4AF37",
  flagSymbol: `
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="80" fill="#1A5E37"/>
      <circle cx="60" cy="40" r="22" fill="none" stroke="#D4AF37" stroke-width="2.5"/>
      <text x="60" y="35" text-anchor="middle" font-family="serif" font-size="20" fill="#D4AF37">☽</text>
      <text x="60" y="58" text-anchor="middle" font-family="serif" font-size="9" fill="#F4EBE1">MUGHAL SALTANAT</text>
      <line x1="10" y1="40" x2="35" y2="40" stroke="#D4AF37" stroke-width="1.5"/>
      <line x1="85" y1="40" x2="110" y2="40" stroke="#D4AF37" stroke-width="1.5"/>
    </svg>
  `,
  flagDescription:
    "The Mughal imperial standard bore the crescent and royal green of the Timurid dynasty, adorned with intricate calligraphic inscriptions. Regional banners incorporated the Zulfiqar sword and Rumi-inspired geometric patterns. Akbar later introduced composite symbols reflecting his Din-i-Ilahi philosophy of religious synthesis.",
  summary:
    "Founded by Babur after his victory at the First Battle of Panipat (1526), the Mughal Empire reached a remarkable early golden age under Humayun and, decisively, under his son Akbar (1556–1605). By 1550, the empire was consolidating its grip on the Gangetic plain and the Indus valley. Akbar's court at Agra and later Fatehpur Sikri became unparalleled centres of architecture, art, music, and philosophy. Mughal administration created revenue systems and administrative districts (subahs) that influenced governance of the subcontinent for centuries. The empire's architectural legacy — the Taj Mahal, Red Fort, Fatehpur Sikri, Humayun's Tomb — remains among humanity's greatest built heritage.",
  keyEvents: [
    "1526: Babur defeats Ibrahim Lodi at Panipat — founding the Mughal dynasty",
    "1540: Humayun defeated by Sher Shah Suri; spends decade in Safavid Persian exile",
    "1555: Humayun recaptures Delhi with Safavid military support",
    "1556: Akbar ascends the throne at age 13; General Bairam Khan defeats Hemu at Second Panipat",
    "1569–1585: Fatehpur Sikri constructed as a new imperial capital near Agra",
    "1571: Akbar introduces Din-i-Ilahi — a syncretic spiritual movement uniting Muslim, Hindu and Zoroastrian elements",
  ],
  figures: [
    {
      id: "akbar",
      name: "Jalal ud-Din Muhammad Akbar",
      title: "The Great Emperor — Akbar-e-Azam",
      years: "1542–1605 CE",
      bio: "Third Mughal emperor and the true architect of Mughal greatness. Akbar abolished the jizya tax on non-Muslims, employed Hindu Rajput generals and ministers, and created an empire of remarkable cultural pluralism. His Navaratnas (Nine Gems) court included luminaries across every field of human endeavour.",
      emoji: "👑",
    },
    {
      id: "bairam-khan",
      name: "Bairam Khan",
      title: "Khan-i-Khanan — Regent & Commander",
      years: "1501–1561 CE",
      bio: "The indispensable general and regent who secured Akbar's early reign. A Turkmen nobleman of towering military genius, Bairam Khan defeated Hemu at the Second Battle of Panipat (1556) and stabilised the empire before his untimely assassination en route to Mecca.",
      emoji: "⚔️",
    },
    {
      id: "hamida-banu",
      name: "Hamida Banu Begum",
      title: "Maryam Makani — Mother of Akbar",
      years: "1527–1604 CE",
      bio: "A woman of exceptional intellect and influence, Hamida Banu bore Emperor Akbar and guided the empire through the vulnerable years of Humayun's exile in Persia. She oversaw the construction of Humayun's Tomb in Delhi — a landmark that inaugurated Mughal monumental architecture and inspired the Taj Mahal.",
      emoji: "🏛️",
    },
    {
      id: "tansen",
      name: "Tansen (Ramtanu Pandey)",
      title: "Nav-Ratna Court Musician — Master of Dhrupad",
      years: "1500–1586 CE",
      bio: "Considered the greatest musician in Indian history, Tansen was one of Akbar's Nine Gems. A master of the Dhrupad style of classical Hindustani music, he is credited with creating several ragas still performed today, including the legendary Raga Miyan ki Malhar.",
      emoji: "🎵",
    },
    {
      id: "todar-mal",
      name: "Raja Todar Mal",
      title: "Finance Minister — Diwan-i-Kul",
      years: "1500–1589 CE",
      bio: "A brilliant Hindu Khatri administrator, Todar Mal reformed the entire land revenue system of the empire. His Ain-i-Dahsala (ten-year assessment) introduced standardised measurements of agricultural land and created a rational taxation framework that remained the foundation of subcontinental governance for over two centuries.",
      emoji: "📊",
    },
  ],
  markers: [
    {
      id: "agra",
      name: "Agra — Imperial Capital",
      lat: 27.18,
      lng: 78.02,
      type: "capital",
      description: "The primary Mughal capital, home to Agra Fort (Red Fort), and the future site of the Taj Mahal (built 1632–1653). Agra under Akbar was one of the most cosmopolitan cities on earth.",
    },
    {
      id: "fatehpur-sikri",
      name: "Fatehpur Sikri",
      lat: 27.09,
      lng: 77.67,
      type: "city",
      description: "Akbar's purpose-built imperial capital (1571–1585), abandoned due to water shortages. A UNESCO World Heritage Site, its Buland Darwaza (Gate of Magnificence) stands 54 metres tall — the highest gateway in the world.",
    },
    {
      id: "delhi-shahjahanabad",
      name: "Delhi (Sher Shah's city)",
      lat: 28.65,
      lng: 77.2,
      type: "city",
      description: "Though Sher Shah Suri had rebuilt Delhi as Sher Shah Suri's capital, Akbar retained Delhi within the empire and it would later be refounded as Shahjahanabad under Shah Jahan.",
    },
    {
      id: "lahore",
      name: "Lahore",
      lat: 31.56,
      lng: 74.36,
      type: "city",
      description: "The empire's north-western gateway and a major cultural centre. Lahore Fort was expanded by Akbar, and the city flourished as a hub of Punjabi and Sufi literary traditions.",
    },
    {
      id: "kabul",
      name: "Kabul",
      lat: 34.53,
      lng: 69.17,
      type: "city",
      description: "Ancestral homeland of the Mughals and Babur's first capital. Babur is buried here, and Kabul remained sentimentally central to Mughal identity throughout the dynasty's reign.",
    },
  ],
};

// ==============================================================================
//  CASE 3: SOUTH ASIA & THE 1857 REBELLION — 1850 CE
// ==============================================================================
export const southAsia1850CE: EmpireData = {
  id: "south-asia-1850ce",
  name: "South Asia — Eve of the Great Uprising",
  era: 1850,
  eraLabel: "Late Colonial Period — British East India Company Dominion",
  capital: "Calcutta (EIC Headquarters) / Delhi (Mughal symbolic seat)",
  geojsonFile: "/south-asia-1850ce.json",
  borderColor: "#4A235A",
  fillColor: "#7D3C98",
  fillOpacity: 0.2,
  hoverColor: "#D4AF37",
  flagSymbol: `
    <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="80" fill="#2C2A29"/>
      <rect x="0" y="0" width="120" height="26" fill="#4A235A"/>
      <rect x="0" y="27" width="120" height="26" fill="#1A3A5E"/>
      <rect x="0" y="54" width="120" height="26" fill="#1A5E37"/>
      <text x="60" y="44" text-anchor="middle" font-family="serif" font-size="22" fill="#D4AF37">☪</text>
      <text x="60" y="70" text-anchor="middle" font-family="serif" font-size="7" fill="#F4EBE1">1857 — AZAADI</text>
    </svg>
  `,
  flagDescription:
    "The 1857 Uprising had no single flag — it was a coalition of Mughal loyalists, Sepoy soldiers, princely states, and popular resistance fighters united by a shared rejection of colonial rule. Bahadur Shah Zafar's Mughal crescent and the saffron, green and white banners of diverse rebel factions have been retrospectively interpreted as proto-national symbols of South Asian resistance.",
  summary:
    "By 1850, the British East India Company had reduced the Mughal Emperor Bahadur Shah Zafar to a pensioned figurehead in Delhi's Red Fort, while systematically annexing princely states through the Doctrine of Lapse. The annexation of Awadh (Oudh) in 1856 and the introduction of the controversial Enfield rifle cartridge (greased with animal fat, violating both Hindu and Muslim religious law) ignited the powder keg. The uprising began on 10 May 1857 in Meerut, spread explosively along the Gangetic plain through Delhi, Lucknow, Kanpur, Jhansi, and into Bihar. Although suppressed by 1858, the rebellion catalysed the transfer of power from the Company to the British Crown, and planted the seeds of modern Indian nationalism. Thousands of scholars, soldiers, and civilians chose exile — many following routes westward through Afghanistan, Persia, and Arabia toward Makkah al-Mukarramah.",
  keyEvents: [
    "1848–1856: Lord Dalhousie's 'Doctrine of Lapse' annexes Satara, Nagpur, Jhansi, and finally Awadh",
    "January 1857: Enfield cartridge controversy ignites sepoy unrest across cantonments",
    "10 May 1857: Sepoys in Meerut mutiny and march to Delhi — Bahadur Shah Zafar proclaimed Emperor of Hindustan",
    "June–July 1857: Siege of Lucknow begins; Rani Lakshmibai raises her standard at Jhansi",
    "July–August 1857: Rebellion spreads into Bihar — Kunwar Singh leads resistance near Arrah and Jagdishpur",
    "September 1857: British forces recapture Delhi; Bahadur Shah Zafar exiled to Rangoon (Yangon), Burma",
    "1858: British Crown assumes direct governance of India; East India Company dissolved",
    "Post-1858: Mass emigration of Muslim scholars, soldiers, and families westward toward Makkah and Madinah",
  ],
  figures: [
    {
      id: "bahadur-shah-zafar",
      name: "Bahadur Shah Zafar",
      title: "Last Mughal Emperor & Poet",
      years: "1775–1862 CE",
      bio: "The last Mughal Emperor — a Sufi mystic and sublime Urdu poet rather than a warrior king — found himself at the centre of the 1857 uprising. Proclaimed 'Emperor of Hindustan' by the rebel Sepoys, he lent the revolt moral authority before its defeat. Exiled to Rangoon by the British, he died in captivity, his famous couplet echoing through history: 'Kitna hai bad-naseeb Zafar dafn ke liye / Do gaz zameen bhi na mili kuy-e-yaar mein.'",
      emoji: "✍️",
    },
    {
      id: "rani-lakshmibai",
      name: "Rani Lakshmibai of Jhansi",
      title: "The Queen of Jhansi — Rebel Commander",
      years: "1828–1858 CE",
      bio: "A figure of extraordinary martial courage, the Rani of Jhansi took up arms after the British annexed her kingdom via the Doctrine of Lapse following her husband's death. She personally led cavalry charges against British forces, and died on the battlefield near Gwalior. British general Hugh Rose wrote that she was 'the most dangerous of all Indian leaders'.",
      emoji: "⚔️",
    },
    {
      id: "kunwar-singh",
      name: "Kunwar Singh",
      title: "Bihar's Lion — Commander of Jagdishpur",
      years: "1777–1858 CE",
      bio: "A 80-year-old Rajput zamindar of Jagdishpur, Kunwar Singh rose to become the most formidable rebel commander in Bihar. Fighting despite losing his arm to a British bullet (he reportedly cut off the wounded limb himself and threw it into the Ganges as an offering), he won major engagements at Arrah and Azamgarh before dying victorious days after his final triumph.",
      emoji: "🦁",
    },
    {
      id: "begum-hazrat-mahal",
      name: "Begum Hazrat Mahal",
      title: "Regent of Awadh — Voice of Lucknow",
      years: "1820–1879 CE",
      bio: "After the British deposed her husband, Nawab Wajid Ali Shah, Begum Hazrat Mahal took control of Awadh and issued a proclamation refuting Queen Victoria's promises of tolerance. She organised the defence of Lucknow and, after the rebellion's suppression, refused a British pardon and chose exile in Nepal, where she died.",
      emoji: "👑",
    },
    {
      id: "shah-waliullah",
      name: "Shah Waliullah Dehlawi's Legacy",
      title: "Scholar, Theologian & Reform Movement Founder",
      years: "1703–1762 CE",
      bio: "Though he died before 1857, Shah Waliullah's reform movement provided the ideological backbone of Muslim resistance. His students and followers — including the Mujahideen Movement of Syed Ahmad Barelvi — channelled the reformist energy into armed resistance, and many of his intellectual descendants chose the hijra (emigration) routes toward Makkah after the uprising's defeat.",
      emoji: "📚",
    },
  ],
  markers: [
    {
      id: "delhi-1857",
      name: "Delhi — Rebel Capital",
      lat: 28.65,
      lng: 77.23,
      type: "rebellion",
      description: "The epicentre of the 1857 Uprising. Sepoys proclaimed Bahadur Shah Zafar Emperor here. The Red Fort served as the rebel headquarters until British forces recaptured the city in September 1857.",
    },
    {
      id: "meerut",
      name: "Meerut — Spark of the Uprising",
      lat: 28.98,
      lng: 77.71,
      type: "rebellion",
      description: "The site of the first open mutiny on 10 May 1857. Sepoys of the 3rd Light Cavalry refused the Enfield cartridges, were imprisoned, liberated by their comrades, and marched on Delhi — igniting the Great Uprising.",
    },
    {
      id: "lucknow",
      name: "Lucknow — Seat of Awadh",
      lat: 26.85,
      lng: 80.95,
      type: "rebellion",
      description: "Capital of the annexed kingdom of Awadh. The Siege of Lucknow lasted from June to November 1857. Begum Hazrat Mahal directed the resistance from the Kaiserbagh palace.",
    },
    {
      id: "jhansi",
      name: "Jhansi — Kingdom of the Rani",
      lat: 25.45,
      lng: 78.57,
      type: "rebellion",
      description: "Rani Lakshmibai's kingdom, annexed via the Doctrine of Lapse. The Rani organised a formidable defence before retreating toward Gwalior, where she was killed in battle in June 1858.",
    },
    {
      id: "arrah-bihar",
      name: "Arrah, Bihar — Kunwar Singh's Stronghold",
      lat: 25.56,
      lng: 84.66,
      type: "rebellion",
      description: "The Siege of Arrah (July 1857) was one of the rebellion's pivotal engagements in Bihar. Kunwar Singh's forces besieged the British garrison and won multiple subsequent engagements across the region.",
    },
    {
      id: "jagdishpur",
      name: "Jagdishpur, Bihar — Final Victory",
      lat: 25.45,
      lng: 84.44,
      type: "rebellion",
      description: "Kunwar Singh's ancestral seat. He died here on 26 April 1858, just days after winning his final battle — the only rebel leader to die undefeated on his own soil.",
    },
    {
      id: "calcutta",
      name: "Calcutta — EIC Headquarters",
      lat: 22.57,
      lng: 88.36,
      type: "city",
      description: "The administrative nerve centre of the British East India Company's Indian empire. Fort William commanded the Bengal Presidency from here.",
    },
    {
      id: "kabul-exile",
      name: "Kabul — Gateway of Exile",
      lat: 34.53,
      lng: 69.17,
      type: "exile",
      description: "A major waypoint on the westward exile and migration routes. Thousands of Muslim scholars, soldiers, and their families passed through Kabul after 1857, continuing toward Persia and Arabia.",
    },
    {
      id: "makkah",
      name: "Makkah al-Mukarramah",
      lat: 21.38,
      lng: 39.83,
      type: "mosque",
      description: "The final destination of the great post-1857 hijra (migration). Scholars, sufis, and families from Delhi, Lucknow, and across the subcontinent resettled in the Hijaz, forming diaspora communities that preserved South Asian Islamic intellectual traditions in exile.",
    },
  ],
  routes: [
    {
      id: "rebellion-route",
      name: "1857 Rebellion Corridor — Meerut to Bihar",
      type: "rebellion_route",
      color: "#C0392B",
      dashArray: undefined,
    },
    {
      id: "exile-route",
      name: "Exile & Migration Route — Delhi to Makkah",
      type: "exile_route",
      color: "#8E44AD",
      dashArray: "8, 5",
    },
  ],
};

// ==============================================================================
//  MASTER MAP — Indexed by era year for O(1) lookup
// ==============================================================================
export const EMPIRES_BY_YEAR: Record<EraYear, EmpireData> = {
  100: romanEmpire100CE,
  1550: mughalEmpire1550CE,
  1850: southAsia1850CE,
};
