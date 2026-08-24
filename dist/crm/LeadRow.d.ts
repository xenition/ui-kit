import * as React from 'react';
import { type LeadTemperature } from './internal';
export interface LeadRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Lead / person name. */
    name: string;
    /** Company or source line. */
    company?: string;
    /** Lead temperature — drives the glyph + word (never color alone). */
    temperature: LeadTemperature;
    /** Estimated value in integer **cents**. */
    valueCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Lead score 0–100, rendered as a badge. */
    score?: number;
    /** Avatar image URL; initials fallback from `name`. */
    avatarUrl?: string;
    /** Whether this row is selected/active (adds a primary border). */
    selected?: boolean;
    /** Click handler (renders as a keyboard-accessible button). */
    onClick?: () => void;
}
/**
 * Dense list row for a lead, keyed by **temperature** (`hot` 🔥 / `warm` ☀ /
 * `cold` ❄). Temperature is shown as a glyph *and* a label so it never relies on
 * color; the matching tone (`text-danger`/`text-warn`/`text-primary`) is only
 * reinforcement. Shows optional value (cents → `formatMoney`) and a score badge.
 * When `onClick` is set the row is a `role="button"` div with Enter/Space
 * activation. All colors are `--xen-*` token classes.
 */
export declare const LeadRow: React.ForwardRefExoticComponent<LeadRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeadRow.d.ts.map