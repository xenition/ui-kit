import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type StatisticTrend } from '../primitives/Statistic';
/** Accent tone for the stat tile's icon chip / emphasis. */
export type QueueStatTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface QueueStatProps {
    /** Caption (e.g. "Open tickets"). */
    label: string;
    /** Headline value (number or preformatted string). */
    value: React.ReactNode;
    /** Optional change indicator (see `Statistic`). */
    delta?: string | number;
    /** Explicit delta trend; otherwise inferred from a numeric delta. */
    trend?: StatisticTrend;
    /** Optional unit suffix (e.g. `%`, `min`). */
    suffix?: React.ReactNode;
    /** Accent tone for the leading glyph chip (default `neutral`). */
    tone?: QueueStatTone;
    /** Optional glyph shown in a tinted chip. */
    glyph?: string;
    /** Render a loading placeholder. */
    loading?: boolean;
    /** Wrap in a card surface (default true). */
    card?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single queue KPI tile — a leading tinted glyph chip plus a `Statistic`
 * (caption, big value, optional delta/suffix). Built for helpdesk dashboards
 * ("Open", "Waiting", "Breached SLA", "CSAT"). The chip tone maps to
 * `SemanticColors` via a token tint; the delta arrow/tone comes from the
 * underlying `Statistic`. Supports a `loading` placeholder. No literal hex.
 */
export declare function QueueStat({ label, value, delta, trend, suffix, tone, glyph, loading, card, style, }: QueueStatProps): React.ReactElement;
//# sourceMappingURL=QueueStat.d.ts.map