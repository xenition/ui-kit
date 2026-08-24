import * as React from 'react';
import { type EmployeeStatus, type EmploymentType } from './internal';
export type EmployeeCardVariant = 'default' | 'compact' | 'detailed';
export interface EmployeeContactAction {
    key: string;
    glyph: string;
    label: string;
    /** DOM click handler (web parity of the native `onPress`). */
    onClick: () => void;
}
export interface EmployeeCardProps {
    /** Full name. */
    name: string;
    /** Job title / role. */
    title?: string;
    /** Department or team. */
    department?: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Employment arrangement — shown as a glyph + word chip. */
    employmentType?: EmploymentType;
    /** Lifecycle state — shown as a glyph + word chip, never color alone. */
    status?: EmployeeStatus;
    /** Location / office (detailed variant). */
    location?: string;
    /** Pre-formatted hire/start date (detailed variant). */
    startDate?: string;
    /** Quick contact affordances (call / email / message) — real `<button>`s. */
    actions?: EmployeeContactAction[];
    /** Visual density / emphasis. */
    variant?: EmployeeCardVariant;
    /** Render a placeholder skeleton instead of content. */
    loading?: boolean;
    /** Click handler for the whole card (web parity of native `onPress`). */
    onClick?: () => void;
    className?: string;
}
/**
 * Profile card for a single employee: avatar, name, title, department, and
 * employment-type / status chips (each a glyph + word so state never rests on
 * color alone). `compact` trims to a single row; `detailed` adds location and
 * start date. Quick contact `actions` render as real `<button>`s. Renders a
 * `loading` skeleton on demand. When `onClick` is set the card becomes a
 * keyboard-operable `role="button"`. All colors are `--xen-*` token classes —
 * no literals.
 */
export declare const EmployeeCard: React.ForwardRefExoticComponent<EmployeeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmployeeCard.d.ts.map