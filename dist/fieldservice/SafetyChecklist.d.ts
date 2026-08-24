import * as React from 'react';
/** Per-item safety verdict — text + glyph + color (never color-alone). */
export type SafetyVerdict = 'pass' | 'fail' | 'unchecked';
export interface SafetyItem {
    /** Stable id. */
    id: string;
    /** Safety checkpoint label (e.g. "Fall protection anchored"). */
    label: string;
    /** Verdict — pass / fail / unchecked. */
    verdict: SafetyVerdict;
    /** Marks a failure as a blocking hazard (drives the top hazard banner). */
    hazard?: boolean;
}
export interface SafetyChecklistProps {
    /** Section title (e.g. "Pre-task safety"). */
    title?: string;
    /** The safety items to render. */
    items: SafetyItem[];
    /** Fires with the item id and the verdict to advance to on tap. */
    onToggle?: (id: string, next: SafetyVerdict) => void;
    /** Show skeleton placeholders instead of the list. */
    loading?: boolean;
    /** Copy for the empty state when there are no items. */
    emptyLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A pass/fail safety checklist. Each item is a clickable `<button>` row with a
 * verdict glyph disc (pass → success, fail → danger — conveyed by glyph +
 * label + color, never color alone) that cycles the verdict via `onToggle`.
 * When any item is a flagged `hazard` failure, a danger `Alert` banner is
 * raised at the top. Handles the empty state (`EmptyState`) and a `loading`
 * skeleton. No literal colors.
 */
export declare const SafetyChecklist: React.ForwardRefExoticComponent<SafetyChecklistProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SafetyChecklist.d.ts.map