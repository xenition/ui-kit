import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { IconName } from '../../primitives/icon-names';
export interface ProfileField {
    /** Key returned in the values map. */
    id: string;
    /** Field label. */
    label: string;
    /** Placeholder text. */
    placeholder?: string;
    /** Keyboard hint. Default `'default'`. */
    keyboard?: 'default' | 'email-address' | 'phone-pad';
    /**
     * Leading icon from the kit's named set (§6 — `'user'`, `'mail'`, `'phone'`).
     * Optional: a field without one renders with the glyph column collapsed, not
     * with a hole where an icon should be.
     */
    icon?: IconName;
    /**
     * Per-field validation message. Raises the field's border to `danger` **and**
     * prints the message in `dangerText` — never colour alone, which a
     * colour-blind user cannot see (§6).
     */
    error?: string;
}
export interface ProfileSetupProps {
    /** Display name to seed initials/greeting. */
    name?: string;
    /** Avatar image URI when the user already has one. */
    avatarUri?: string;
    /** Fires when the avatar affordance is tapped (host opens a picker). */
    onEditAvatar?: () => void;
    /** Editable fields (name/bio/etc). Controlled via `values`. */
    fields?: ProfileField[];
    /** Current field values keyed by `ProfileField.id`. */
    values?: Record<string, string>;
    /** Fires with `(id, text)` on each edit. */
    onChangeField?: (id: string, value: string) => void;
    /** Heading. Default `'Set up your profile'`. */
    title?: string;
    /** Save CTA copy. Default `'Save profile'`. */
    saveLabel?: string;
    /** Fires on save. */
    onSave?: () => void;
    /** Save spinner + block. */
    loading?: boolean;
    /** "Skip for now" link copy. Hidden without `onSkip`. */
    skipLabel?: string;
    /** Fires on skip. */
    onSkip?: () => void;
    /** Supporting line under the headline (§4). */
    subtitle?: string;
    /**
     * Hero art for the step (§3). When absent the avatar editor is the hero —
     * this screen always has something to show, so the panel is never empty.
     */
    illustration?: React.ReactNode;
    /** Copy under the avatar. Default `'Add photo'`. */
    avatarActionLabel?: string;
    /**
     * Header progress slot (§1/§2) — pass the segmented bars, e.g.
     * `<ProgressDots variant="bars" count={4} activeIndex={1} />`.
     */
    progress?: React.ReactNode;
    /** Renders the header's back control. */
    onBack?: () => void;
    /** Renders the header's dismiss (✕) control. */
    onDismiss?: () => void;
    /** Form-level error, shown above the CTA in `dangerText` beside a glyph. */
    error?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Profile setup step — the "What should we call you?" screen, rebuilt to the
 * anatomy in `ONBOARDING-DESIGN-SPEC.md`: an optional header (back · progress ·
 * dismiss), the avatar editor sitting in the hero panel, a centred headline
 * block, the §6 field stack, and the sticky CTA footer.
 *
 * The old screen was a bare 40px box under a small left-aligned label with a
 * short flat button floating mid-page. Per §6 each field is now **56 tall** with
 * `radius.lg`, a 1px `border` that rises to `primary` on focus and to `danger`
 * on error, and a leading icon; per §5 the save action is a full-width button in
 * a footer band with a hairline divider above it and a muted "skip" link
 * beneath — never beside — it.
 *
 * Fully controlled: the host owns `values` and gets `(id, text)` callbacks.
 * Field access is guarded through the `values` map so a missing key renders
 * empty, never crashes, and an empty `fields` array renders the screen without
 * a form rather than a broken one. Every new prop is optional. No literal
 * colors.
 */
export declare function ProfileSetup({ name, avatarUri, onEditAvatar, fields, values, onChangeField, title, saveLabel, onSave, loading, skipLabel, onSkip, subtitle, illustration, avatarActionLabel, progress, onBack, onDismiss, error, style, }: ProfileSetupProps): React.ReactElement;
//# sourceMappingURL=ProfileSetup.d.ts.map