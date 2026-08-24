import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type DealOutcome } from './internal';
export type { DealOutcome } from './internal';
export type DealCardVariant = 'default' | 'compact' | 'highlighted';
export interface DealOwner {
    name?: string;
    avatarUrl?: string;
}
export interface DealCardProps {
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
    /** Show a shimmer-free placeholder skeleton instead of content. */
    loading?: boolean;
    /** Tap handler for the whole card. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Summary card for a single deal / opportunity: name, account, value, stage,
 * win-probability meter, owner avatar and outcome badge. `compact` drops the
 * meter and secondary meta for list use; `highlighted` tints the surface with a
 * token-derived primary wash for the focused deal. Value is integer cents run
 * through the shared `formatMoney`. Outcome is conveyed by {@link WinLossBadge}
 * (glyph + word), so it never depends on color alone. Renders a `loading`
 * skeleton on demand. All colors are theme tokens — no literals.
 */
export declare function DealCard({ name, company, valueCents, currency, stage, probability, owner, closeDate, outcome, variant, loading, onPress, testID, style, }: DealCardProps): React.ReactElement;
//# sourceMappingURL=DealCard.d.ts.map