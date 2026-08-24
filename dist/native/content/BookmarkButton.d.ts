import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BookmarkButtonVariant = 'icon' | 'labeled';
export interface BookmarkButtonProps {
    /** Whether the article is currently bookmarked (controlled). */
    bookmarked: boolean;
    /** Called with the next bookmarked state when the user taps. */
    onToggle: (next: boolean) => void;
    /**
     * - `icon`    — just the bookmark glyph (default).
     * - `labeled` — glyph + "Save"/"Saved" text.
     */
    variant?: BookmarkButtonVariant;
    /** Blocks presses (e.g. while a save request is in flight). */
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A toggle for saving / bookmarking an article. Controlled: it reflects the
 * `bookmarked` prop and calls `onToggle(!bookmarked)` on press — the parent
 * owns the state. Filled accent glyph when saved, muted outline glyph when not.
 * Announces its pressed/selected state to screen readers. Two variants
 * (`icon` / `labeled`). All colors from `SemanticColors`; no literal hex.
 */
export declare function BookmarkButton({ bookmarked, onToggle, variant, disabled, style, }: BookmarkButtonProps): React.ReactElement;
//# sourceMappingURL=BookmarkButton.d.ts.map