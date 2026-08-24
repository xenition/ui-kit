import * as React from 'react';
import { type DealOutcome } from './internal';
export type { DealOutcome } from './internal';
export type DealCardVariant = 'default' | 'compact' | 'highlighted';
export interface DealOwner {
    name?: string;
    avatarUrl?: string;
}
export interface DealCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Deal / opportunity name. */
    name: string;
    /** Account or company the deal belongs to. */
    company?: string;
    /** Deal value in integer **cents**. */
    valueCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Named pipeline stage (e.g. "Negotiation"). */
    stage?: string;
    /** Win probability 0–100. Rendered as a labelled meter. */
    probability?: number;
    /** Deal owner / rep — shown as an avatar. */
    owner?: DealOwner;
    /** Expected/actual close date, pre-formatted for display. */
    closeDate?: string;
    /** Lifecycle result. `won` reads success, `lost` reads danger. */
    outcome?: DealOutcome;
    /** Visual density / emphasis. */
    variant?: DealCardVariant;
    /** Show a placeholder skeleton instead of content. */
    loading?: boolean;
    /** Click handler for the whole card (renders as a keyboard-accessible button). */
    onClick?: () => void;
}
/**
 * Summary card for a single deal / opportunity: name, account, value, stage,
 * win-probability meter, owner avatar and outcome badge. `compact` drops the
 * meter and secondary meta for list use; `highlighted` tints the surface with
 * the `primary-50` token wash for the focused deal. Value is integer cents run
 * through the shared `formatMoney`. Outcome is conveyed by {@link WinLossBadge}
 * (glyph + word), so it never depends on color alone. When `onClick` is set the
 * card becomes a `role="button"` div with Enter/Space activation. All colors are
 * `--xen-*` token classes — no literals.
 */
export declare const DealCard: React.ForwardRefExoticComponent<DealCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DealCard.d.ts.map