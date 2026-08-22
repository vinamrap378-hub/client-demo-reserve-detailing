import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import BrandStatement from '@/components/home/BrandStatement';
import PrecisionEditorial from '@/components/home/PrecisionEditorial';
import ThreePanelsServices from '@/components/home/ThreePanelsServices';
import TheFinishSection from '@/components/home/TheFinishSection';
import MolecularSection from '@/components/home/MolecularSection';
import BeforeAfterCompare from '@/components/home/BeforeAfterCompare';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import EditorialGallery from '@/components/home/EditorialGallery';
import EditorialReviews from '@/components/home/EditorialReviews';
import FinalCinematicCTA from '@/components/home/FinalCinematicCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* 1. Hero: Centered vehicle, lower-left headline, exact entrance & scroll pull-away */}
      <HeroSection />

      {/* 2. Brand Statement: THE RESERVE STANDARD, NOT JUST CLEAN. -> REDEFINED. */}
      <BrandStatement />

      {/* 3. Precision Editorial: Left 60% image, Right 40% black */}
      <PrecisionEditorial />

      {/* 4. Service Section: Three full-height panels 33.33% */}
      <ThreePanelsServices />

      {/* 5. Signature Section: THE FINISH (4-phase scroll transformation) */}
      <TheFinishSection />

      {/* 6. Molecular / Protection: #050505, technical labels & connecting lines */}
      <MolecularSection />

      {/* 7. Before / After: Full-width 50/50 draggable comparison */}
      <BeforeAfterCompare />

      {/* 8. Process: 6-stage scroll timeline with large visual area */}
      <ProcessTimeline />

      {/* 9. Gallery: Asymmetrical 5-piece grid (2x2, 1x1, 1x2, 2x1, 1x1) */}
      <EditorialGallery />

      {/* 10. Reviews: Large editorial testimonial (4.9 ★★★★★ & 2,900+ reviews) */}
      <EditorialReviews />

      {/* 11. Final CTA: 90vh cinematic ending */}
      <FinalCinematicCTA />
    </div>
  );
}