import * as React from 'react';
import type { EditorialGridProps, EditorialItemProps } from './EditorialGrid';
/** Drop-in for {@link EditorialGridProps} — same props, the V4 "showcase" design. */
export type EditorialGridV4Props = EditorialGridProps;
/** Drop-in for {@link EditorialItemProps} — same props, the V4 "showcase" design. */
export type EditorialItemV4Props = EditorialItemProps;
/**
 * EditorialItem — **V4** "showcase" design (native mirror of the web V4). One
 * editorial cell as an elevated image-forward showcase card: the media floats in
 * a soft-primary media well, with the `caption` slotted below on the card
 * surface. NOT a gradient surface — a clean elevated card (`colors.card` +
 * border + soft shadow). The base's `span`/`start`/`offset`/`z` geometry props
 * are accepted for parity but are inert on native (phones are single-column, so
 * there is no overlap grid), exactly as the base native `EditorialItem`. Same
 * props/behavior as {@link EditorialItemProps}; token-only colors, no literals.
 */
export declare function EditorialItemV4({ media, caption, children, style, }: EditorialItemV4Props & {
    children?: React.ReactNode;
}): React.ReactElement;
/**
 * EditorialGrid — **V4** "showcase" design (native mirror of the web V4). A
 * clean vertical stack of elevated `EditorialItemV4` showcase cards. As with the
 * base native `EditorialGrid`, the web's 12-column overlap geometry has no phone
 * analogue and the `columns`/`span`/`start`/`offset`/`z` props are inert on
 * native. Accepts the base's `items` data array or `EditorialItemV4` children
 * (array wins). Same props/behavior as {@link EditorialGridProps}; token-only
 * colors, no literals.
 */
export declare function EditorialGridV4({ items, children, style }: EditorialGridV4Props): React.ReactElement;
//# sourceMappingURL=EditorialGridV4.d.ts.map