import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type Appearance } from '../primitives/internal/appearance';
export interface ShareTarget {
    id: string;
    /** Target name (e.g. `Messages`, `Copy link`). */
    label: string;
    /** Emoji/glyph icon. */
    icon?: string;
}
export interface ShareSheetProps {
    /** Controls mount — the sheet renders nothing when `false`. */
    visible: boolean;
    /** Sheet heading. Default `Share`. */
    title?: string;
    /** Optional subtitle (e.g. the URL/permalink being shared). */
    subtitle?: string;
    /** Share destinations shown in a wrapping grid. */
    targets: ReadonlyArray<ShareTarget>;
    /** Fires with the chosen target id. */
    onSelect?: (id: string) => void;
    /** Dismiss (backdrop tap or Cancel). */
    onClose?: () => void;
    /** Message shown when `targets` is empty. */
    emptyLabel?: string;
    /**
     * Surface treatment for the sheet panel — fill/border/elevation only; the
     * rounded top corners/padding are unchanged. Default `'classic'`.
     */
    appearance?: Appearance;
    style?: StyleProp<ViewStyle>;
}
/**
 * A bottom share sheet: a dimmed backdrop and a rounded panel holding a grid of
 * share destinations plus a Cancel action. Self-contained overlay (renders
 * `null` while hidden) — the parent owns `visible`. Handles an empty target
 * list. Token-only.
 */
export declare function ShareSheet({ visible, title, subtitle, targets, onSelect, onClose, emptyLabel, appearance, style, }: ShareSheetProps): React.ReactElement | null;
//# sourceMappingURL=ShareSheet.d.ts.map