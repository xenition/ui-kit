import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type HashtagChipSize = 'sm' | 'md';
export interface HashtagChipProps {
    /** Tag text — a leading `#` is added automatically if missing. */
    tag: string;
    /** Filled/primary appearance when the tag is selected/active. */
    active?: boolean;
    /** Optional post count shown after the tag (e.g. `1.2k`). */
    count?: string | number;
    size?: HashtagChipSize;
    /** Fires with the bare tag (no `#`). */
    onPress?: (tag: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A tappable hashtag pill. Idle chips read muted-on-surface; `active` chips
 * fill with the primary color. Composes into topic bars, trending lists, and
 * post footers. Token-only, `link` a11y role.
 */
export declare function HashtagChip({ tag, active, count, size, onPress, style, }: HashtagChipProps): React.ReactElement;
//# sourceMappingURL=HashtagChip.d.ts.map