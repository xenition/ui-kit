import * as React from 'react';
import type { EditorialGridProps, EditorialItemProps } from './EditorialGrid';
/** Drop-in for {@link EditorialGridProps} — same props, the V4 "showcase" design. */
export type EditorialGridV4Props = EditorialGridProps;
/** Drop-in for {@link EditorialItemProps} — same props, the V4 "showcase" design. */
export type EditorialItemV4Props = EditorialItemProps;
/**
 * EditorialGrid — **V4** "showcase" design (web parity of the native V4). The
 * same asymmetric 12-column overlap canvas as the base `EditorialGrid` (uneven
 * spans/starts + negative offsets, z-order keeping captions readable), re-skinned
 * so each cell is an elevated image-forward showcase card. Same props/behavior as
 * {@link EditorialGridProps} (`columns` drives the `lg` grid). Token-only colors,
 * no literals.
 */
export declare const EditorialGridV4: React.ForwardRefExoticComponent<EditorialGridProps & React.RefAttributes<HTMLDivElement>>;
/**
 * EditorialItem — **V4** "showcase" design (web parity of the native V4). One
 * editorial cell as an elevated rounded showcase card: the media (children)
 * floats in a soft-primary media well, with the `caption` slotted below on the
 * surface backing and a bold, tight-tracked heading. Honors the base's
 * `span`/`start`/`offset`/`z` geometry (grid placement + stacking) and the
 * `caption` slot. Same props/behavior as {@link EditorialItemProps}; token-only
 * colors, no literals.
 */
export declare const EditorialItemV4: React.ForwardRefExoticComponent<EditorialItemProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=EditorialGridV4.d.ts.map