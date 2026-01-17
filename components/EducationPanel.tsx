import React from 'react';
import { EDUCATION_DATA, CERTIFICATIONS_DATA } from '../constants';

const EducationPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col border-l border-terminal-border bg-terminal-bg">
      <div className="p-4 border-b border-terminal-border bg-terminal-surface">
        <h3 className="font-mono font-bold text-terminal-text uppercase tracking-widest text-sm">
          Regulatory Filings
        </h3>
      </div>
      
      <div className="flex-grow p-6 overflow-y-auto space-y-8">
        {/* Education */}
        <div>
          <h4 className="font-mono text-xs text-terminal-secondary mb-4 border-b border-terminal-border pb-2 inline-block">
            ACCREDITATIONS (EDUCATION)
          </h4>
          <div className="space-y-4">
            {EDUCATION_DATA.map((edu) => (
              <div key={edu.id} className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white text-sm">{edu.institution}</span>
                  <span className="font-mono text-xs text-terminal-muted">{edu.year}</span>
                </div>
                <div className="text-sm text-terminal-muted">{edu.degree}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="font-mono text-xs text-terminal-accent mb-4 border-b border-terminal-border pb-2 inline-block">
            COMPLIANCE (CERTIFICATIONS)
          </h4>
          <div className="space-y-4">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div key={cert.id} className="flex flex-col gap-1">
                 <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white text-sm">{cert.name}</span>
                  <span className="font-mono text-xs text-terminal-muted">{cert.year}</span>
                </div>
                <div className="text-sm text-terminal-muted flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terminal-accent"></span>
                  Issued by {cert.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPanel;