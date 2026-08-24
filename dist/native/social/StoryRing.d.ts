import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type AvatarSize } from '../primitives/Avatar';
export type StoryState = 'unseen' | 'seen' | 'live' | 'add';
export interface StoryRingProps {
    /** Avatar image URL. */
    src?: string;
    /** Name used for initials fallback + the caption. */
    name?: string;
    /**
     * Ring appearance: `unseen` (primary ring), `seen` (muted ring), `live`
     * (danger ring + LIVE tag), or `add` (dashed ring with a `+` — your own
     * "add story" tile).
     */
    state?: StoryState;
    size?: AvatarSize;
    /** Caption under the ring (defaults to `name`; `'Your story'` for `add`). */
    label?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An avatar wrapped in a story ring. The ring color encodes state — unseen
 * (primary), seen (muted), live (danger with a LIVE badge) — and an `add`
 * variant renders a dashed ring with a `+` for the viewer's own tile. Token-only.
 */
export declare function StoryRing({ src, name, state, size, label, onPress, style, }: StoryRingProps): React.ReactElement;
//# sourceMappingURL=StoryRing.d.ts.map