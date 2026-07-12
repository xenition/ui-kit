import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface VideoEmbedProps {
    /** Video URL (kept for parity; actual playback needs `expo-av`, out of scope). */
    url: string;
    /** Accessible title. */
    title: string;
    /** Poster image shown before playback. */
    poster?: string;
    /** Fired when the play affordance is pressed (wire to a player / deep link). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A 16:9 video card with a poster + play affordance — the native mirror of the
 * web `VideoEmbed`. React Native has no `<iframe>`/`<video>`, so this renders a
 * token-styled poster thumbnail with a circular play button; `onPress` is the
 * hook a caller uses to launch playback. Real inline playback requires
 * `expo-av` (out of scope here); the `url`/`title` props are preserved so a
 * host app can pass them straight through. Token-only.
 */
export declare function VideoEmbed({ url: _url, title, poster, onPress, style, }: VideoEmbedProps): React.ReactElement;
//# sourceMappingURL=VideoEmbed.d.ts.map