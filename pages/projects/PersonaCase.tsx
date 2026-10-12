import React from 'react';
import type { CaseProps } from './caseData';
import { ProductBlock } from './kit';
import { RadialMap, Funnel } from './diagrams';

const RETENTION = [
  { label: 'Discover', value: 'Guest', sub: 'Browse 350+ personas with no sign-up' },
  { label: 'Engage', value: 'Aha', sub: 'An unexpected but in-character reply' },
  { label: 'Habit', value: '2+', sub: 'Personas tried in week 1. Hypothesis: these users retain 3× better (not yet validated)' },
  { label: 'Convert', value: '₹249', sub: 'Premium per month. Target: ₹10K MRR at 3% free → paid' },
];

/* Chapter 02 visuals for AI Spirit. How memory works lives in Key parts. */
export default function PersonaCase({ theme }: CaseProps) {
  return (
    <>
      <ProductBlock
        title="One hub for forty persona worlds"
        visual={<>
          <RadialMap theme={theme} center="AI Spirit" nodes={['Business', 'Spiritual', 'Entertainment', 'Companion', 'Fitness', 'Anime']} />
          <p className="mt-3 text-center text-xs text-ink-muted">Six flagship categories shown, of 40 in the catalogue.</p>
        </>}
      >
        <p>350+ curated personas fan out from a single product surface across 40 categories. India-first by design: Chanakya, Sadhguru, Shah Rukh Khan, Osho, characters Western platforms don&rsquo;t serve. The breadth is the moat: discovery across categories is what drives the multi-persona habit that retains.</p>
      </ProductBlock>
      <ProductBlock title="The retention funnel I&rsquo;m testing" visual={<Funnel stages={RETENTION} theme={theme} />} wideVisual />
    </>
  );
}
