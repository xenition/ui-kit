import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Ticket priority levels, low → urgent. */
export type Priority = 'low' | 'normal' | 'high' | 'urgent';
/** `chip` = pill with label; `bars` = a compact signal-strength indicator. */
export type TicketPriorityVariant = 'chip' | 'bars';
export type TicketPrioritySize = 'sm' | 'md';
export interface TicketPriorityProps {
    /** The priority level. */
    level: Priority;
    /** Visual treatment (default `chip`). */
    variant?: TicketPriorityVariant;
    /** Size scale (default `md`). */
    size?: TicketPrioritySize;
    /** Hide the text label (glyph/bars only). Label still drives a11y. */
    hideLabel?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Ticket priority indicator (`low`/`normal`/`high`/`urgent`). Two variants: a
 * `chip` (glyph + label pill) and `bars` (a four-step signal indicator whose
 * filled count encodes the level). Tone maps to `SemanticColors`
 * (`danger`/`warn`/`primary`/`muted`) via a token tint; the glyph and the bar
 * count carry the level independently of color. No literal hex. Presentational.
 */
export declare function TicketPriority({ level, variant, size, hideLabel, style, }: TicketPriorityProps): React.ReactElement;
//# sourceMappingURL=TicketPriority.d.ts.map