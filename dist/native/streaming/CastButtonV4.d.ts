import * as React from 'react';
import type { CastButtonProps, CastButtonSize, CastButtonVariant } from './CastButton';
export type { CastButtonSize, CastButtonVariant };
/** Drop-in for {@link CastButtonProps} — same props, the V4 "spotlight" design. */
export type CastButtonV4Props = CastButtonProps;
/**
 * CastButton — **V4** "spotlight" design. A polished cast control: the glyph
 * (plus a "Cast" / device-name label in the `labeled` variant) sits in a ≥44px
 * rounded tap target that lights up with a soft `withAlpha(primary, 0.12)` tint
 * and a `primary` accent when **connected**, staying plain otherwise. Keeps the
 * base's variants (`icon` / `labeled`) and sizes, and reports taps via
 * `onPress`. The `connected` state is reflected in the color, accessibility
 * state, and accessible label ("Cast to a device" vs. "Casting to <device>.
 * Disconnect"). Token-only colors via `useXenitionTheme()` + `withAlpha` — no
 * literal hex.
 */
export declare function CastButtonV4({ connected, deviceName, variant, size, onPress, disabled, style, }: CastButtonV4Props): React.ReactElement;
//# sourceMappingURL=CastButtonV4.d.ts.map