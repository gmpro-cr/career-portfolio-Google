import React from 'react';
import { ShieldCheck, Phone, Scales } from '@phosphor-icons/react';
import type { ProjectTheme } from '../../../types';
import { SceneShell, Appear, Typed, type Beat } from './SceneShell';

/* A single transfer, as the caller hears it on the left and as the
   server checks it on the right. The checks are the four gates the
   gateway really enforces: session, policy limits, the confirmation
   token and the one-time step-up code. */
const BEATS: Beat[] = [
  { caption: 'A customer calls the bank and the voice assistant picks up. No "press 1 for balance".' },
  { caption: 'They say what they want in their own words.', ms: 3200 },
  { caption: 'Before anything else, the server confirms who is calling. The AI itself never gets access to the bank database.' },
  { caption: 'The server checks the amount against the customer\'s limits and holds a single-use confirmation token for exactly this transfer.' },
  { caption: 'The assistant reads the transfer back and asks for the one-time code shown on the customer\'s screen.', ms: 3400 },
  { caption: 'The customer reads out the code. The server checks it and spends the token, so the same approval can never be used twice.' },
  { caption: 'The money moves in a double-entry ledger: one account down, the other up, always balancing. The balance on screen updates by itself.', ms: 3600 },
];

function Bubble({ who, children, accent }: { who: 'caller' | 'agent'; children: React.ReactNode; accent: string }) {
  const agent = who === 'agent';
  return (
    <div className={`flex ${agent ? 'justify-start' : 'justify-end'}`}>
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={agent ? { background: '#F5F5F4', color: '#1A1410' } : { background: accent, color: '#fff' }}
      >
        <span className="block text-[11px] font-medium opacity-70 mb-0.5">{agent ? 'Assistant' : 'Customer'}</span>
        {children}
      </div>
    </div>
  );
}

function Check({ show, title, detail, accent }: { show: boolean; title: string; detail: string; accent: string }) {
  return (
    <Appear show={show}>
      <div className="flex gap-3 rounded-xl border px-3.5 py-3" style={{ borderColor: `${accent}55`, background: `${accent}0D` }}>
        <ShieldCheck size={18} weight="fill" style={{ color: accent }} className="flex-shrink-0 mt-0.5" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="text-xs text-ink/70 leading-relaxed">{detail}</p>
        </div>
      </div>
    </Appear>
  );
}

export default function VaaniScene({ theme }: { theme: ProjectTheme }) {
  const a = theme.accent;
  return (
    <SceneShell
      title="Listen in on one transfer"
      intro="A customer sends money by voice. The call is on the left. On the right is what the bank's server checks while the conversation carries on, which is the part the AI cannot talk its way past."
      beats={BEATS}
      theme={theme}
      note="Example call"
    >
      {beat => (
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-6 md:gap-10">
          {/* The call */}
          <div className="rounded-2xl border border-hairline p-4 md:p-5 space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-hairline">
              <span className="grid h-8 w-8 place-items-center rounded-full" style={{ background: `${a}1A`, color: a }}><Phone size={16} weight="fill" aria-hidden /></span>
              <div>
                <p className="text-sm font-semibold text-ink">ABC Bank assistant</p>
                <p className="text-xs text-ink-muted tabular">{beat === 0 ? 'Connecting...' : 'On call'}</p>
              </div>
            </div>
            <Appear show={beat >= 1}>
              <Bubble who="caller" accent={a}><Typed text="Send twelve thousand rupees to Rohan." run={beat >= 1} done={beat > 1} /></Bubble>
            </Appear>
            <Appear show={beat >= 4}>
              <Bubble who="agent" accent={a}>
                <Typed text="Sending ₹12,000 from your savings account to Rohan. Please read me the one-time code on your screen." run={beat >= 4} done={beat > 4} />
              </Bubble>
            </Appear>
            <Appear show={beat >= 5}>
              <Bubble who="caller" accent={a}>Four, eight, one, nine.</Bubble>
            </Appear>
            <Appear show={beat >= 6}>
              <Bubble who="agent" accent={a}>Done. ₹12,000 has gone to Rohan.</Bubble>
            </Appear>
          </div>

          {/* The server */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-ink-muted">Checked on the bank&rsquo;s server</p>
            <Check show={beat >= 2} accent={a} title="Caller verified" detail="Session and trust level checked before any account is touched." />
            <Check show={beat >= 3} accent={a} title="Within limits" detail="Per-transfer cap, daily cap and new-payee cooling-off all pass. A token is issued for these exact details." />
            <Check show={beat >= 5} accent={a} title="Code correct, token spent" detail="The approval is used up. Replaying the same words cannot move money twice." />
            <Appear show={beat >= 6}>
              <div className="rounded-xl border border-hairline p-3.5">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink"><Scales size={17} aria-hidden /> Ledger entry</p>
                <table className="mt-2 w-full text-sm tabular">
                  <tbody>
                    <tr><td className="py-1 text-ink/80">Savings account</td><td className="py-1 text-right text-ink">&minus;₹12,000</td></tr>
                    <tr><td className="py-1 text-ink/80">Rohan</td><td className="py-1 text-right text-ink">+₹12,000</td></tr>
                    <tr className="border-t border-hairline"><td className="pt-1.5 text-ink-muted">Total</td><td className="pt-1.5 text-right font-semibold" style={{ color: a }}>₹0, balanced</td></tr>
                  </tbody>
                </table>
              </div>
            </Appear>
          </div>
        </div>
      )}
    </SceneShell>
  );
}
