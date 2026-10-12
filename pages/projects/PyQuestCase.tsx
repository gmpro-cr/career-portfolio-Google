import React from 'react';
import type { CaseProps } from './caseData';
import { ProductBlock } from './kit';
import { Funnel } from './diagrams';

const FRICTION = [
  { label: 'Land on PyQuest', value: '0s', sub: 'One URL, no signup wall, no course paywall' },
  { label: 'Runtime ready', value: '~1s felt', sub: 'WASM loads in the background while stage one is read' },
  { label: 'First code run', value: '1 click', sub: 'Type, hit Run, see real CPython output' },
  { label: 'Traditional path', value: 'hours', sub: 'Installer → PATH errors → editor choice → most never start' },
];

/* Chapter 02 visual for PyQuest. How an answer is checked lives in Key parts. */
export default function PyQuestCase({ theme }: CaseProps) {
  return (
    <ProductBlock title="Time to first working code" visual={<Funnel stages={FRICTION} theme={theme} />}>
      <p>Every second between landing and successfully running code is funnel leakage. PyQuest treats time-to-first-run as the product&rsquo;s north-star metric: the heavyweight WASM runtime loads quietly behind the first lesson, so the learner&rsquo;s very first interaction is typing real Python instead of installing it.</p>
    </ProductBlock>
  );
}
