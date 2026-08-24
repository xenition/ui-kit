import * as React from 'react';
export interface SceneCardProps {
    /** Scene name (e.g. "Movie Night", "Good Morning"). */
    name: string;
    /** Leading glyph/emoji (e.g. "🎬", "🌅"). */
    icon?: string;
    /** Short description of what the scene does. */
    description?: string;
    /** Number of devices the scene controls. */
    deviceCount?: number;
    /** Whether this scene is currently active. */
    active?: boolean;
    /** Fires when the card is clicked to run the scene. */
    onActivate?: () => void;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * A clickable scene / preset card — glyph, name, description and a device count.
 * When `active`, the card elevates, tints the glyph with `primary`, and shows an
 * "Active" {@link Badge} so the running state is labeled, not color-only. The
 * card is a `role="button"` surface firing `onActivate` on click / Enter / Space.
 * `deviceCount` is rendered defensively (only when a positive number).
 * Token-bound throughout — no literal colors.
 */
export declare const SceneCard: React.ForwardRefExoticComponent<SceneCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SceneCard.d.ts.map