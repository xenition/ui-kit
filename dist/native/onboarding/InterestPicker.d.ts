import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { InterestOption } from './types';
export interface InterestPickerProps {
    /** Choosable topics. Empty renders the empty state. */
    options: InterestOption[];
    /** Currently selected ids (controlled). */
    selectedIds: string[];
    /** Fires with the full next selection set on each toggle. */
    onChange: (selectedIds: string[]) => void;
    /** Optional heading above the chips. */
    title?: string;
    /** Optional helper line (e.g. `'Pick at least 3'`). */
    helper?: string;
    /** Cap on selections; chips past the cap disable when unselected. */
    maxSelections?: number;
    /** Accessible name for the chip group. Default `'Interests'`. */
    accessibilityLabel?: string;
    /**
     * Supporting line under the headline (§4). Falls back to `helper` when only
     * `helper` is given, so an existing caller's one line still reads as the
     * subhead rather than disappearing.
     */
    subtitle?: string;
    /** Hero art for the step (§3). Rendered in a centred, tinted panel. */
    illustration?: React.ReactNode;
    /** Glyph for the fallback hero medallion when `illustration` is absent (§3). */
    logoGlyph?: string;
    /**
     * Header progress slot (§1/§2) — pass the segmented bars, e.g.
     * `<ProgressDots variant="bars" count={4} activeIndex={1} />`. A slot rather
     * than a `steps` number so this screen never owns the progress rendering.
     */
    progress?: React.ReactNode;
    /** Renders the header's back control. */
    onBack?: () => void;
    /** Renders the header's dismiss (✕) control. */
    onDismiss?: () => void;
    /**
     * Validation message (e.g. `'Pick at least 3 to continue'`). Rendered as a
     * `dangerText` line beside a danger glyph — never colour alone.
     */
    error?: string;
    /** Sticky-footer CTA copy. The footer is hidden without `onContinue`. */
    ctaLabel?: string;
    /** Fires from the sticky CTA. */
    onContinue?: () => void;
    /** CTA spinner + block. */
    loading?: boolean;
    /** Secondary action under the CTA (`'Skip'`). Hidden without `onSecondary`. */
    secondaryLabel?: string;
    /** Fires from the secondary link. */
    onSecondary?: () => void;
    /** Empty-state copy. Default `'No topics to choose from.'`. */
    emptyMessage?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Multi-select interest chips — the "personalize your feed" onboarding step,
 * built to the step anatomy in `ONBOARDING-DESIGN-SPEC.md`: an optional header
 * (back · progress · dismiss), a hero slot, a centred headline block, the chip
 * field, and an optional sticky CTA footer.
 *
 * **The chips wrap and are never clipped.** The shipped screen scrolled its
 * options horizontally and cut the last one off the right edge —
 * "Pace / Filler words / Clarity / Structure / Confiden…" — which made that
 * option impossible to choose at all, not merely hard to read. §7 is therefore
 * a hard rule here: `flexWrap: 'wrap'` with `spacing.sm` gaps and no horizontal
 * scroll container anywhere in this file. A user cannot choose what they cannot
 * see.
 *
 * Selected chips take the `primary` fill with an `onPrimary` label; unselected
 * chips are `surface` with a `border` outline; both clear the 44pt tap target.
 * Selection state is announced per-chip and the running count is exposed on the
 * group. Enforces an optional `maxSelections` cap and guards an empty option
 * list. Every new prop is optional — a caller passing only the original
 * `options`/`selectedIds`/`onChange` gets the same component it always had, in
 * better clothes. No literal colors.
 */
export declare function InterestPicker({ options, selectedIds, onChange, title, helper, maxSelections, accessibilityLabel, subtitle, illustration, logoGlyph, progress, onBack, onDismiss, error, ctaLabel, onContinue, loading, secondaryLabel, onSecondary, emptyMessage, style, }: InterestPickerProps): React.ReactElement;
//# sourceMappingURL=InterestPicker.d.ts.map