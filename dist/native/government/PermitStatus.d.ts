import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type PermitStatusValue } from './internal/status';
export type { PermitStatusValue };
export interface PermitStatusProps {
    /** Current permit lifecycle status. */
    status: PermitStatusValue;
    /** Permit / application reference number (e.g. "BLD-2026-0417"). */
    permitNumber?: string;
    /** Human permit title (e.g. "Building permit — 12 Oak St"). */
    title?: string;
    /** Localized date of the most recent status change. */
    updatedDate?: string;
    /** Show a skeleton-free loading placeholder instead of the tracker. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A permit / license application status tracker. Renders the ordered happy-path
 * stages (submitted → review → approved → issued) via the `Steps` primitive; a
 * `denied` permit branches into a danger banner conveyed by **glyph + text +
 * color** (never color alone). Guarded against unknown statuses. Every color
 * traces to a `SemanticColors` slot or a token-derived tint — no literals.
 */
export declare function PermitStatus({ status, permitNumber, title, updatedDate, loading, style, }: PermitStatusProps): React.ReactElement;
//# sourceMappingURL=PermitStatus.d.ts.map