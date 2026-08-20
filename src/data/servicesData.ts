export interface ServiceItem {
  id: string;
  name: string;
  category: 'exterior' | 'interior' | 'correction' | 'protection' | 'all';
  tagline: string;
  duration: string;
  price: number;
  highlight?: boolean;
  badge?: string;
  description: string;
  includes: string[];
  image: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'signature-detail',
    name: 'Auto Detailing — Reserve Signature',
    category: 'exterior',
    tagline: 'Complete comprehensive rejuvenation for the uncompromising collector.',
    duration: '4 – 6 Hours',
    price: 349,
    highlight: true,
    badge: 'Most Popular',
    description: 'Our flagship full-spectrum detailing protocol combining deep multi-stage deionization hand wash, chemical decontamination, interior conditioning, and high-gloss polymer sealant.',
    includes: [
      'Pure deionized zero-mineral foam hand wash with grit-guard isolation',
      'Wheel barrels, brake calipers, and wheel arch deep decontamination',
      'Synthetic clay bar smoothing and iron fallout dissolution',
      'Engine bay detail with anti-static hydrophobic dress',
      'Full interior dry-steam purification and Swissvax leather feed',
      'Ultra-gloss hydrophobic hybrid ceramic sealant (6-month durability)'
    ],
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'hand-wash',
    name: 'Hand Wash — Deionized Pure',
    category: 'exterior',
    tagline: 'Two-bucket filtered wash system with scratch-free micro-chenille.',
    duration: '60 – 90 Mins',
    price: 119,
    description: 'Bespoke hand wash executed using 000-PPM deionized water, pH-balanced citrus pre-soak, ultra-plush microfiber mitts, and warm air-touch drying.',
    includes: [
      'pH-neutral citrus pre-rinse to lift road film without friction',
      'Two-bucket method with dual grit guards and fresh mitt per panel',
      'Dedicated pH-neutral wheel cleaner and soft boar hair lug brushes',
      'Filtered heated warm-air touchless drying + plush silk-edge towel finish',
      'Streak-free glass cleaning inside and out',
      'Satin non-sling natural rubber tire dressing'
    ],
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'car-waxing',
    name: 'Car Waxing — Swissvax Concours',
    category: 'exterior',
    tagline: 'Hand-warmed Brazilian Grade-One Carnauba for wet-look depth.',
    duration: '2.5 Hours',
    price: 199,
    description: 'Enriched with 50% by volume of pure white Brazilian grade-one carnauba wax, applied by hand palms to achieve an unmatched warm, deep optical glow.',
    includes: [
      'Paint cleansing oil massage to enhance surface transparency',
      'Hand-palm application of Swissvax organic carnauba blend',
      'Natural curing period followed by micro-buff with ultra-dense towels',
      'Intense water beading contact angle > 110°',
      'UV ray inhibitor shielding against Florida sunshine fading'
    ],
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'clay-bar',
    name: 'Clay Bar Treatment — Decon Prep',
    category: 'exterior',
    tagline: 'Surgical extraction of embedded industrial fallout, brake dust, and sap.',
    duration: '2 Hours',
    price: 169,
    description: 'Fine-grade synthetic clay bar coupled with slick lubricity agents gliding across clear coat to extract microscopic contaminants leaving paint silk-smooth.',
    includes: [
      'Chemical iron fallout reactive dissolve treatment (turns purple on contact)',
      'Fine-grade optical clay bar application on all exterior painted panels',
      'Automotive glass clay exfoliation for crystal clarity',
      'Tar and organic sap dissolving solvent treatment',
      'Surface prep wipe-down for maximum coating/wax adhesion'
    ],
    image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'polishing',
    name: 'Precision Polishing — Gloss Jeweling',
    category: 'correction',
    tagline: 'Rotary & Dual-Action jeweling for unmatched clarity and mirror reflections.',
    duration: '4 – 7 Hours',
    price: 499,
    highlight: true,
    badge: 'Enthusiast Favorite',
    description: 'Micro-abrasive jeweling pass with Rupes BigFoot orbital polishers and bespoke foam pads to restore rich depth, remove light hazing, and amplify gloss to 98+ GU.',
    includes: [
      'Digital ultrasonic paint depth gauge readings across 24 panel points',
      'Single-stage jeweling polish using nano-diminishing abrasive creams',
      'Elimination of fine wash swirls, oxidation, and buffer trails',
      'Deep optical clarity enhancement on darker metallic and black clear coats',
      'Alcohol prep wipe to reveal true un-filled paint condition'
    ],
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'scratch-removal',
    name: 'Scratch Removal — Defect Correction',
    category: 'correction',
    tagline: 'Multi-stage wet-sanding & rotary leveling for deep scratch restoration.',
    duration: '6 – 10 Hours',
    price: 699,
    badge: 'Specialist Level',
    description: 'Surgical clear coat leveling targeting deep scratches, bird etching, acid rain damage, and heavy spider webbing without jeopardizing clear coat thickness.',
    includes: [
      'Detailed paint thickness profiling to ensure safe clear coat tolerance',
      'Spot wet-sanding with 3000/5000 grit 3M Trizact discs where needed',
      'Stage 1: Heavy compounding with wool/microfiber rotary pad',
      'Stage 2: Medium foam pad correction to eliminate compounding haze',
      'Stage 3: Fine jeweling finish for flawless 95%+ swirl-free paint',
      'Panel-by-panel Scangrip 3-color temperature LED light inspection'
    ],
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'interior-vacuuming',
    name: 'Vehicle Interior Vacuuming & Crevice Detail',
    category: 'interior',
    tagline: 'High-vacuum pneumatic vortex extraction for every seam and carpet fiber.',
    duration: '90 Mins',
    price: 139,
    description: 'Industrial dual-motor extraction and high-pressure air-wand purging beneath seats, slider rails, center console crevices, and trunk compartments.',
    includes: [
      'Tornador compressed air pulse purge of all seams, vents, and buttons',
      'Deep fiber vacuuming with brush agitation of carpets and floor mats',
      'Under-seat slide rail and console gap extraction',
      'Trunk compartment and spare wheel well vacuuming',
      'Lint and pet hair removal with specialized rubberized brushes'
    ],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'vacuuming-steam',
    name: 'Vacuuming & Dry-Steam Sanitization',
    category: 'interior',
    tagline: '212°F thermal steam sterilization, fabric shampoo, and odor neutralization.',
    duration: '3 Hours',
    price: 249,
    description: 'Medical-grade dry thermal steam penetrating deep into upholstery fibers, climate control ducts, and headliners to eradicate 99.9% of bacteria and allergens.',
    includes: [
      '212°F dry vapor steam cleaning of dashboard, door cards, and HVAC vents',
      'Hot water extraction shampooing of carpet mats and fabric seat cushions',
      'Enzyme-based active biological stain and odor neutralizer',
      'UV-blocking matte interior sealant on all touch points',
      'Cabin air filtration ozone refresh treatment'
    ],
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'detailing-car',
    name: 'Detailing Car — Interior Sanctuary',
    category: 'interior',
    tagline: 'Bespoke leather feeding, Alcantara revival, and matte luxury preservation.',
    duration: '4 Hours',
    price: 329,
    highlight: true,
    badge: 'Luxury Interior',
    description: 'An obsessive interior restoration focusing on delicate semi-aniline leathers, Alcantara fiber brushing, open-pore wood nourishment, and satin protection.',
    includes: [
      'Swissvax Leather Cleaner and conditioning milk rich in vitamin E & oils',
      'Dedicated Alcantara specialized cleaner and directional grooming comb',
      'Matte factory finish restoration (no oily shine or artificial scents)',
      'Navigation screen anti-static oleophobic glass coating',
      'Seatbelt steam cleaning and tensioner inspection'
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'ceramic-coating',
    name: 'Ceramic Pro 9H — Matrix Protection',
    category: 'protection',
    tagline: 'Permanent nano-ceramic molecular bond with 5 to 9 Year warranty.',
    duration: '1 – 2 Days',
    price: 999,
    highlight: true,
    badge: 'Ultimate Armor',
    description: 'Military-grade Silicon Dioxide (SiO2) nano-matrix cured under infrared quartz lamps. Delivers extreme chemical resistance, intense hydrophobicity, and unmatched gloss.',
    includes: [
      'Includes full Stage 2 machine paint correction prior to application',
      'Multiple layers of Ceramic Pro 9H base coat + Top Coat gloss shield',
      'Infrared (IR) short-wave bake curing for maximum surface hardness',
      'Hydrophobic glass rain repellent on all exterior windows',
      'Ceramic wheel barrel and brake caliper high-heat coating',
      'Official registered warranty with CarFax vehicle history record'
    ],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'ppf-film',
    name: 'XPEL Ultimate Plus — Paint Protection Film',
    category: 'protection',
    tagline: 'Self-healing 8.5 mil polyurethane shield against rock chips and road debris.',
    duration: '2 – 3 Days',
    price: 1899,
    badge: 'Maximum Defense',
    description: 'Custom computerized plot-cut XPEL Ultimate Plus self-healing film wrapped seamlessly over wrapped edges for invisible, zero-orange-peel rock chip protection.',
    includes: [
      'Full front clip coverage: Bumper, hood, fenders, headlights, side mirrors',
      'Computer-cut precision templates with wrapped tuck-in edges',
      'Self-healing elastomeric polymers (scratches vanish under sun/heat)',
      '10-Year manufacturer warranty against yellowing, cracking, or peeling',
      'Top ceramic coating applied over film for effortless washing'
    ],
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'concierge-delivery',
    name: 'Delivery — Enclosed Concierge Transport',
    category: 'all',
    tagline: 'Climate-controlled white-glove pickup & delivery across South Florida.',
    duration: 'On-Demand',
    price: 150,
    description: 'Single-car enclosed hydraulic trailer transport with low-clearance race ramps. Your vehicle stays 100% shielded from weather, highway debris, and mileage accumulation.',
    includes: [
      'Enclosed air-ride single-car transporter with soft-tie wheel straps',
      'Ultra-low loading angle safe for GT3, Aventador, and lowered exotics',
      'Live GPS telemetry tracking shared directly to client phone',
      'Pre-transport 4K video walkaround inspection with timestamp',
      'Delivered covered in breathable satin indoor dust sheet'
    ],
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=85'
  }
];
