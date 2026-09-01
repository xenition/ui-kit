import * as React from 'react';
import type { LightboxThumbProps } from './LightboxThumb';
/** Drop-in for {@link LightboxThumbProps} — same props, the V4 "studio" design. */
export type LightboxThumbV4Props = LightboxThumbProps;
/**
 * LightboxThumb — **V4** "studio" design (native parity of the web V4). A
 * **matted** filmstrip thumbnail — the photo sits inside a thin inset mat ring
 * (`borderWidth: 1`, `border` token) over a `neutral[100]` ground, with **no
 * gradient** (the studio line reserves gradient for the gallery hero). When
 * `active`, the mat ring turns `primary` and a small `✓` glyph badge appears, so
 * selection is never carried by color alone; it is also reported via the
 * accessibility `selected` state. Both `sm` (56px) and `md` (80px) sizes are
 * honored and stay ≥44px so a pressable thumb is a valid tap target. Exposes a
 * `button` with an accessible label when `onPress` is set. Identical
 * props/behavior to {@link LightboxThumbProps}; token-only colors via
 * `useXenitionTheme()`, no literals.
 */
export declare function LightboxThumbV4({ url, alt, active, size, index, onPress, style, }: LightboxThumbV4Props): React.ReactElement;
//# sourceMappingURL=LightboxThumbV4.d.ts.map