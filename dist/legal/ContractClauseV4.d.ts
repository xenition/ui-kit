import * as React from 'react';
import type { ContractClauseProps } from './ContractClause';
/** Drop-in for {@link ContractClauseProps} — same props, the V4 "chambers" design. */
export type ContractClauseV4Props = ContractClauseProps;
/**
 * ContractClause — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a contract clause: an elevated rounded card
 * with a soft shadow and a token-tinted left rail that keys off risk / flag
 * state, a section-number eyebrow over the heading, negotiation-status and risk
 * pills (each a glyph + word so state never rests on color alone), and — when
 * expanded — the body. When `onToggle` + `body` are set the clause is a
 * keyboard-activable `role="button"` with `aria-expanded`. Reuses the base
 * `variant` (`default` / `compact`). All colors from `--xen-*` token classes
 * (no literals).
 */
export declare const ContractClauseV4: React.ForwardRefExoticComponent<ContractClauseProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContractClauseV4.d.ts.map