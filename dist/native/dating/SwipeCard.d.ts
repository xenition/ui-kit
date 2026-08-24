import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Which drag-decision stamp to overlay on the card. */
export type SwipeOverlay = 'like' | 'nope' | 'superlike';
export interface SwipeCardProfile {
    id: string;
    name: string;
    age?: number;
    /** Primary photo URI. */
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
export interface SwipeCardProps {
    /** The profile to render. */
    profile: SwipeCardProfile;
    /** Presentation. `photo` (full-bleed, default) or `compact`. */
    variant?: SwipeCardVariant;
    /** Drag-decision stamp to reveal (LIKE / NOPE / SUPER). */
    overlay?: SwipeOverlay | null;
    /** Stamp opacity 0–1 (drag progress). Defaults to 1 when `overlay` is set. */
    overlayOpacity?: number;
    /** Aspect ratio of the photo card. Defaults to 3/4. */
    aspectRatio?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single deck card — the native swipe card. Renders a full-bleed profile photo
 * with a bottom scrim carrying the name/age/tagline and a distance badge, plus a
 * decision stamp (LIKE / NOPE / SUPER) whose opacity tracks drag progress. Used
 * standalone or, more often, driven by `SwipeDeck`. Colors and scrims derive
 * from theme tokens via `withAlpha` — no literal colors. Missing photos fall
 * back to a token placeholder.
 */
export declare function SwipeCard({ profile, variant, overlay, overlayOpacity, aspectRatio, style, }: SwipeCardProps): React.ReactElement;
//# sourceMappingURL=SwipeCard.d.ts.map