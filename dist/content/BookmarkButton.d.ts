import * as React from 'react';
export type BookmarkButtonVariant = 'icon' | 'labeled';
export interface BookmarkButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onToggle'> {
    /** Whether the article is currently bookmarked (controlled). */
    bookmarked: boolean;
    /** Called with the next bookmarked state when the user clicks. */
    onToggle: (next: boolean) => void;
    /**
     * - `icon`    — just the bookmark glyph (default).
     * - `labeled` — glyph + "Save"/"Saved" text.
     */
    variant?: BookmarkButtonVariant;
    /** Blocks clicks (e.g. while a save request is in flight). */
    disabled?: boolean;
}
/**
 * A toggle for saving / bookmarking an article — the web (React DOM) mirror of
 * the native `BookmarkButton`. Controlled: it reflects the `bookmarked` prop and
 * calls `onToggle(!bookmarked)` on click — the parent owns the state. Filled
 * accent glyph when saved, muted outline glyph when not. Exposes
 * `aria-pressed`/label to screen readers. Two variants (`icon` / `labeled`).
 * All colors from `--xen-*` token classes.
 */
export declare const BookmarkButton: React.ForwardRefExoticComponent<BookmarkButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=BookmarkButton.d.ts.map