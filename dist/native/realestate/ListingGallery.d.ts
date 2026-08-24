import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ListingGalleryProps {
    /** Ordered photo URIs. Empty renders a token-styled empty state. */
    images: string[];
    /** Frame height in px (default 220). */
    height?: number;
    /** Controlled active index; falls back to internal state when omitted. */
    index?: number;
    /** Fires with the new page index after a swipe. */
    onIndexChange?: (index: number) => void;
    /** Empty-state headline. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontally paged photo carousel for a listing — a token-styled `ScrollView`
 * with a "n / total" counter and a dot indicator. The active page is derived
 * from the scroll offset (works uncontrolled, or drive it with `index`). Data
 * only: URIs in, an `onIndexChange` callback out; nothing fetches. On an empty
 * `images` array it renders the shared `EmptyState`. Token-only colors.
 */
export declare function ListingGallery({ images, height, index, onIndexChange, emptyLabel, style, }: ListingGalleryProps): React.ReactElement;
//# sourceMappingURL=ListingGallery.d.ts.map