import * as React from 'react';
import type { ContractClauseProps } from './ContractClause';
/** Drop-in for {@link ContractClauseProps} — same props, the V4 "chambers" design. */
export type ContractClauseV4Props = ContractClauseProps;
/**
 * ContractClause — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow and a token-tinted left rail that keys
 * off risk / flag state, a section-number eyebrow over the heading, negotiation
 * and risk pills (each a glyph + word so state never rests on color alone), and —
 * when expanded — the body. When `onToggle` + `body` are set the clause is a
 * tappable `role="button"` with expand/collapse. Reuses the base `variant`
 * (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
export declare function ContractClauseV4({ number, title, body, status, risk, expanded, variant, onToggle, testID, style, }: ContractClauseV4Props): React.ReactElement;
//# sourceMappingURL=ContractClauseV4.d.ts.map