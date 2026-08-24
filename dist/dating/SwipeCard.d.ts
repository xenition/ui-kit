import * as React from 'react';
/** Which drag-decision stamp to overlay on the card. */
export type SwipeOverlay = 'like' | 'nope' | 'superlike';
export interface SwipeCardProfile {
    id: string;
    name: string;
    age?: number;
    /** Primary photo URL. */
    photoUri?: string;
    /** One-line tagline / headline. */
    tagline?: string;
    /** Distance in km for the corner badge. */
    distanceKm?: number;
    /** "Active now" / online. */
    online?: boolean;
    /** Verified profile check. */
    verified?: boolean;
}
export type SwipeCardVariant = 'photo' | 'compact';
export interface SwipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The profile to render. */
    profile: SwipeCardProfile;
    /** Presentation. `photo` (full-bleed, default) or `compact`. */
    variant?: SwipeCardVariant;
    /** Drag-decision stamp to reveal (LIKE / NOPE / SUPER). */
    overlay?: SwipeOverlay | null;
    /** Stamp opacity 0–1 (drag progress). Defaults to 1 when `overlay` is set. */
    overlayOpacity?: number;
}
/**
 * A single deck card — the web parity of the native swipe card. Renders a
 * full-bleed profile photo with a bottom scrim carrying the name/age/tagline and
 * a distance badge, plus a decision stamp (LIKE / NOPE / SUPER) whose opacity
 * tracks drag progress. Used standalone or, more often, driven by {@link SwipeDeck}.
 * Scrim and colors derive from token classes — no literal colors. Missing photos
 * fall back to a token placeholder.
 */
export declare const SwipeCard: React.ForwardRefExoticComponent<SwipeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SwipeCard.d.ts.map