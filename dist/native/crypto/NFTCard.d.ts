import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type NFTCardVariant = 'grid' | 'list';
export interface NFTCardProps {
    /** Item name (e.g. `Punk #4231`). */
    name: string;
    /** Collection name (e.g. `CryptoPunks`). */
    collection?: string;
    /** Artwork image URL. When absent a token-bound placeholder is shown. */
    image?: string;
    /** Floor price amount in native token units. */
    floorAmount?: number;
    /** Native token ticker for the floor price. */
    floorSymbol?: string;
    /** Fraction digits for the floor amount (default `3`). */
    floorDecimals?: number;
    /** Chain name for a {@link NetworkBadge} overlay/footer. */
    network?: string;
    variant?: NFTCardVariant;
    /** Skeleton state while metadata loads. */
    loading?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A collectible tile: artwork (or a token-bound `No image` placeholder), name,
 * collection, an optional chain {@link NetworkBadge}, and a floor price
 * (fixed-precision — no float drift). `grid` stacks the media over the meta;
 * `list` places a thumbnail beside it. Handles a `loading` skeleton and a
 * missing image gracefully. Token-bound throughout.
 */
export declare function NFTCard({ name, collection, image, floorAmount, floorSymbol, floorDecimals, network, variant, loading, onPress, style, }: NFTCardProps): React.ReactElement;
//# sourceMappingURL=NFTCard.d.ts.map