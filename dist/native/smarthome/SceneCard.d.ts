import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Fires when the card is pressed to run the scene. */
    onActivate?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A tappable scene / preset card — glyph, name, description and a device count.
 * When `active`, the card switches to the `elevated` surface, tints the glyph
 * with `primary`, and shows an "Active" {@link Badge} so the running state is
 * labeled, not color-only. Pressing anywhere fires `onActivate`. `deviceCount`
 * is rendered defensively (only when a positive number). Token-bound throughout.
 */
export declare function SceneCard({ name, icon, description, deviceCount, active, onActivate, style, }: SceneCardProps): React.ReactElement;
//# sourceMappingURL=SceneCard.d.ts.map