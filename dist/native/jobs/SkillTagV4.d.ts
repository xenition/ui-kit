import * as React from 'react';
import type { SkillTagProps, SkillTagVariant } from './SkillTag';
export interface SkillTagV4Props extends SkillTagProps {
    /** Name of the ✕ affordance. Default `'Remove'`. */
    removeLabel?: string;
    /**
     * What each variant *means*, spoken after the label. Default
     * `matched` → `'on your résumé'`, `missing` → `'missing from your résumé'`;
     * `default` says nothing extra.
     */
    variantLabels?: Partial<Record<SkillTagVariant, string>>;
}
/**
 * **V4 skill tag** — same props as {@link SkillTag} plus `removeLabel` and
 * `variantLabels`.
 *
 * ## Four changes
 *
 * 1. **The ✕ is a sibling of the chip, not a child of it.** The base nested a
 *    remove `Pressable` *inside* the chip's own `Pressable`. On native the
 *    outer one is `accessible` by default and flattens its subtree, so the ✕
 *    was not a focus stop at all — a VoiceOver user could not remove a skill;
 *    on web the same shape emits a `<button>` inside a `<button>`, which is
 *    invalid HTML and invalid ARIA. Both halves are now real siblings inside a
 *    plain chip container, so there are two names where there are two actions.
 * 2. **The variant's meaning survives.** `accessibilityLabel={label}`
 *    overrode the visible `!` marker, so a skill the applicant does **not**
 *    have announced identically to one they do. The name now carries the
 *    meaning — "GraphQL, missing from your résumé" — and `variantLabels`
 *    re-words it.
 * 3. **`border` was the default chip's ground.** `border` is a hairline
 *    colour; used as a fill it makes a chip read as a disabled input. The
 *    neutral chip is now `card` with a hairline, and the two toned variants go
 *    through `toneFill`/`onPair` so their ink is the compiler's guaranteed
 *    pair rather than a hopeful `onSuccess`.
 * 4. **Press is a state layer and the targets clear 44.** The base drew press
 *    as `opacity: 0.85` — inside M3's disabled band, so a pressed chip read as
 *    unavailable — and gave the ✕ nothing but `hitSlop`. A chip that is not
 *    interactive keeps its compact size: there is no target, so there is no
 *    floor to clear.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export declare function SkillTagV4({ label, variant, selected, onPress, onRemove, removeLabel, variantLabels, style, }: SkillTagV4Props): React.ReactElement | null;
//# sourceMappingURL=SkillTagV4.d.ts.map