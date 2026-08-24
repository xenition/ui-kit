import * as React from 'react';
import { type ClauseRisk, type ClauseStatus } from './internal';
export type ContractClauseVariant = 'default' | 'compact';
export interface ContractClauseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
    /** Clause number / section reference (e.g. "§ 7.2"). */
    number?: string;
    /** Clause heading / title. */
    title: string;
    /** Clause body text. */
    body?: string;
    /** Negotiation state — glyph + word pill, never color alone. */
    status?: ClauseStatus;
    /** Risk level — glyph + word pill. */
    risk?: ClauseRisk;
    /** Whether the clause is expanded to show the full body. */
    expanded?: boolean;
    /** Density. */
    variant?: ContractClauseVariant;
    /** Toggle expand/collapse; passes the next expanded state. */
    onToggle?: (expanded: boolean) => void;
    testID?: string;
}
/**
 * A single contract clause: section number, heading, and (when expanded) body,
 * with negotiation-status and risk pills (each a glyph + word so state never
 * rests on color alone). A flagged / high-risk clause gets a token-tinted left
 * rail for scannability. When `onToggle` + `body` are set the clause is an
 * accessible `role="button"` with `aria-expanded`. All colors are `--xen-*`
 * token classes — no literals.
 */
export declare const ContractClause: React.ForwardRefExoticComponent<ContractClauseProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ContractClause.d.ts.map