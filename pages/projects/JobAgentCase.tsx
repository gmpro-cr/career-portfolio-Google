import React from 'react';
import type { CaseProps } from './caseData';
import { ProductBlock } from './kit';
import { RadialMap, Funnel } from './diagrams';

const SIGNAL = [
  { label: 'Raw listings scraped per run', value: '200–500', sub: '6 portals scraped in parallel' },
  { label: 'After fingerprint dedup', value: '~7.4K', sub: 'portal + company + role + location hash' },
  { label: 'Score ≥ 65 (rules + embeddings)', value: 'cut', sub: 'below 65 stored but excluded from digest' },
  { label: 'Delivered as a digest', value: '~10/run', sub: '5-minute review vs 2-hour browse' },
];

/* Chapter 02 visuals for the job agent. Scoring itself lives in Key parts. */
export default function JobAgentCase({ theme }: CaseProps) {
  return (
    <>
      <ProductBlock
        title="Six job portals, one pipeline"
        visual={<RadialMap theme={theme} center="Scraper" nodes={['LinkedIn', 'Naukri', 'Indeed', 'HiringCafe', 'Wellfound', 'IIMJobs']} />}
      >
        <p>Selenium + BeautifulSoup scrape six fragmented job boards in parallel, each with its own anti-scrape handling, session management, and pagination quirks, and funnel everything into a single deduplicated stream. No portal is hit twice within 12 hours.</p>
      </ProductBlock>
      <ProductBlock title="Hundreds of listings in, ten out" visual={<Funnel stages={SIGNAL} theme={theme} />} wideVisual>
        <p>The 65-point relevance threshold is the product&rsquo;s most important parameter, and setting it is a product decision. Calibrated empirically over three months of self-use against 7,413 catalogued jobs as ground truth.</p>
      </ProductBlock>
    </>
  );
}
