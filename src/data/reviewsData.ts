export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  vehicle: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  avatar: string;
  service: string;
}

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: '1',
    author: 'Alejandro Vance',
    location: 'Brickell, Miami',
    vehicle: 'Porsche 911 GT3 RS (992)',
    rating: 5,
    date: '3 days ago',
    title: 'Flawless paint correction on PTS Arctic Grey',
    comment: 'The level of craftsmanship RESERVE delivers is on another planet. My GT3 RS had minor track rubber marks and fine swirls from the previous dealer prep. They spent 18 hours jeweling the clear coat and applying Ceramic Pro. Under inspection lights, the paint is liquid glass.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    service: 'Paint Correction & Ceramic 9H'
  },
  {
    id: '2',
    author: 'Marcus Sterling',
    location: 'Star Island, Miami Beach',
    vehicle: 'Ferrari SF90 Spider',
    rating: 5,
    date: '1 week ago',
    title: 'Apple-like precision and true white-glove transport',
    comment: 'They arranged enclosed transport right from my driveway. When the SF90 was returned, every single stitch in the Daytona seats was pristine, the carbon fiber engine bay looked factory fresh, and the ceramic coating beads water like nothing I have ever seen. Truly Miami’s #1 studio.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    service: 'Full PPF & Ceramic Matrix'
  },
  {
    id: '3',
    author: 'Elena Rostova',
    location: 'Coconut Grove',
    vehicle: 'Aston Martin DBS Superleggera',
    rating: 5,
    date: '2 weeks ago',
    title: 'Obsessed with the detail is an understatement',
    comment: 'I am extremely meticulous about who touches my Aston. The team at RESERVE walked me through every paint gauge reading before even turning on a machine. The interior smells sublime and the leather feed took away all the stiffness without leaving any greasy residue. Worth every penny.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    service: 'Reserve Signature Detail'
  },
  {
    id: '4',
    author: 'David Chen',
    location: 'Coral Gables',
    vehicle: 'Mercedes-AMG G63 "Edition 55"',
    rating: 5,
    date: '3 weeks ago',
    title: 'Rescued my matte black Magno paint',
    comment: 'Matte paint is notoriously difficult because you cannot polish out scratches without ruining the finish. RESERVE specialized matte decon and ceramic coating protected my G63 flawlessly without adding artificial gloss. Their Miami studio is cleaner than an operating room.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    service: 'Matte Paint Ceramic Shield'
  },
  {
    id: '5',
    author: 'Sofia Delgado',
    location: 'Fisher Island',
    vehicle: 'Rolls-Royce Spectre',
    rating: 5,
    date: '1 month ago',
    title: 'The benchmark for automotive luxury in South Florida',
    comment: 'From the digital booking experience to the private unveil in their presentation bay, RESERVE feels like a luxury Swiss watch atelier. 2,900+ reviews and 4.9 stars is not hype—they earn it on every square inch of the car.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    service: 'Bespoke Sanctuary Detail'
  }
];

export const PROCESS_DATA = [
  {
    step: '01',
    name: 'INSPECT',
    subtitle: 'Diagnostic Assessment',
    description: 'Comprehensive 40-point assessment utilizing ultrasonic digital paint thickness gauges across 24 panel coordinates, paired with Scangrip 3-color CRI inspection lamps to document clear coat depth, orange peel, swirl density, and factory edge tolerances.',
    details: [
      'Paint thickness measured in microns (clear coat vs primer)',
      'High-resolution macro defect photo documentation',
      'Trim and rubber vulnerability heat-mapping',
      'Electronic client diagnostic report'
    ],
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    step: '02',
    name: 'PREPARE',
    subtitle: 'Surface Decontamination',
    description: 'Multi-stage zero-contact chemical purification. pH-neutral citrus snow foam lifts abrasive traffic films, while reactive iron de-fallout chemistry dissolves embedded metallic brake dust, followed by synthetic fine-grade clay bar lubrication.',
    details: [
      '000-PPM reverse osmosis deionized pure water rinse',
      'Active iron-dissolving fallout decontamination bath',
      'Synthetic clay bar extraction of industrial fallout',
      'Delicate badges and sensitive matte trims taped with 3M Precision tape'
    ],
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=85'
  },
  {
    step: '03',
    name: 'CORRECT',
    subtitle: 'Paint Leveling & Jeweling',
    description: 'Multi-stage rotary and dual-action machine correction. Micro-abrasive emulsions level clear coat imperfections, eliminating 90–98% of spider webs, buffer trails, and sanding marks to unlock pure optical mirror depth.',
    details: [
      'Stage 1: Heavy compounding for defect eradication',
      'Stage 2: Micro-refinement removing compounding haze',
      'Stage 3: Jeweling pass with ultra-soft pads for liquid mirror gloss',
      'True IPA alcohol wipe-down revealing zero filler concealments'
    ],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85'
  },
  {
    step: '04',
    name: 'PROTECT',
    subtitle: 'Molecular Bonding & PPF',
    description: 'Application of 9H nano-ceramic matrix or computerized XPEL Ultimate Plus self-healing film. Forms a permanent covalent molecular bond with high chemical resistance (pH 2–12) and extreme water-repellency.',
    details: [
      'Multi-layer Ceramic Pro 9H base coat & hydrophobic top layer',
      'Short-wave infrared quartz lamp bake curing',
      'Computer-cut precision PPF templates with wrapped tucked edges',
      'Hydrophobic glass, wheel caliper, and exhaust tip shield'
    ],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    step: '05',
    name: 'REFINE',
    subtitle: 'Interior & Trim Nourishment',
    description: 'Deep restorative detailing of the cabin and peripheral components. Semi-aniline leathers are fed organic oils, Alcantara fibers are directionally combed, and engine bay plastics receive heat-resistant satin nourishment.',
    details: [
      'Swissvax organic leather conditioning milk',
      '212°F dry vapor steam sterilization and extraction',
      'Non-greasy OEM matte finish on all touch surfaces',
      'Infrared curing of ceramic wheel barrel coatings'
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85'
  },
  {
    step: '06',
    name: 'REVEAL',
    subtitle: 'The Studio Handover',
    description: 'The vehicle is staged in our bespoke dark presentation bay under balanced 5000K studio spotlights. Every reflection is inspected with the client alongside our master detailer before handing over the keys and warranty certificate.',
    details: [
      'Final 360-degree LED spotlight quality sign-off',
      'Digital before/after transformation archive dossier',
      'CarFax warranty registration & maintenance care guide',
      'Bespoke RESERVE collector key fob tag and micro-care kit'
    ],
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85'
  }
];

export const GALLERY_DATA = [
  {
    id: 'g1',
    title: 'Porsche 911 GT3 RS (992)',
    category: 'correction',
    service: 'Stage 3 Correction + Ceramic Pro 9H',
    specs: 'Gloss Meter: 99.1 GU | 22h Craft Time',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=85',
    aspect: 'wide'
  },
  {
    id: 'g2',
    title: 'Ferrari SF90 Stradale',
    category: 'protection',
    service: 'Full Body XPEL Ultimate Plus PPF',
    specs: 'Wrapped Edges | 10-Yr Warranty',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall'
  },
  {
    id: 'g3',
    title: 'Aston Martin DBS Superleggera',
    category: 'exterior',
    service: 'Reserve Signature Detail + Swissvax Concours',
    specs: 'Carnauba Hand-Wax | Mirror Finish',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    aspect: 'square'
  },
  {
    id: 'g4',
    title: 'Mercedes-AMG G63 "Edition 55"',
    category: 'protection',
    service: 'Matte Ceramic Pro Hydrophobic Shield',
    specs: 'Zero Gloss Change | Extreme Beading',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=85',
    aspect: 'wide'
  },
  {
    id: 'g5',
    title: 'Bespoke Rolls-Royce Phantom Interior',
    category: 'interior',
    service: 'Leather Sanctuary & Steam Purification',
    specs: 'Semi-Aniline Feed | Starlight Headliner Clean',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall'
  },
  {
    id: 'g6',
    title: 'Lamborghini Revuelto V12 Hybrid',
    category: 'correction',
    service: 'Stage 2 Paint Correction & Graphene Armor',
    specs: 'Graphene Matrix 10H | 18h Craft Time',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=85',
    beforeImage: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1400&q=85',
    aspect: 'wide'
  },
  {
    id: 'g7',
    title: 'McLaren 720S Performance',
    category: 'exterior',
    service: 'Clay Bar Decontamination & Jeweling',
    specs: 'Carbon Fiber Polish | Ultra-Gloss',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=85',
    aspect: 'square'
  },
  {
    id: 'g8',
    title: 'BMW M8 Competition Gran Coupe',
    category: 'interior',
    service: 'Alcantara Revival & Dry-Vapor Sanitization',
    specs: '212°F Vapor Extraction | Matte Finish',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85',
    aspect: 'tall'
  },
  {
    id: 'g9',
    title: 'Porsche Taycan Turbo S',
    category: 'protection',
    service: 'XPEL Stealth PPF Conversion',
    specs: 'Satin Conversion | Self-Healing 8.5mil',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=85',
    aspect: 'wide'
  }
];