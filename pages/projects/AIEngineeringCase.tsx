import React from 'react';
import type { CaseProps } from './caseData';
import { ProductBlock } from './kit';
import { RadialMap } from './diagrams';

const CHAPTERS = ['Intro', 'Foundation Models', 'Eval Methodology', 'Eval AI Systems', 'Prompt Eng.', 'RAG & Agents', 'Finetuning', 'Dataset Eng.', 'Inference Opt.', 'Architecture'];
// cross-chapter connections (index pairs)
const LINKS: [number, number][] = [[2, 3], [4, 5], [5, 7], [6, 7], [8, 9], [1, 6]];

/* Chapter 02 visual for the AI Engineering guide. Retrieval lives in Key parts. */
export default function AIEngineeringCase({ theme }: CaseProps) {
  return (
    <ProductBlock
      title="How the ten chapters link to each other"
      visual={<RadialMap theme={theme} center="AI Engineering" nodes={CHAPTERS.map((c, i) => `${i + 1} ${c}`)} links={LINKS} />}
    >
      <p>The book is stored as pure data, each chapter a structured file of sections, concepts, terms, and connections. Dashed links mark the cross-chapter references that turn a linear read into a navigable graph: eval methodology feeds eval-of-systems, RAG borrows from finetuning and dataset engineering.</p>
    </ProductBlock>
  );
}
